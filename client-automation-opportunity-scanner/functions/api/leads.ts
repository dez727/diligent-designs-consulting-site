type LeadPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  websiteUrl?: string;
  focusArea?: string;
  message?: string;
  consentToContact?: boolean;
  sourcePage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  turnstileToken?: string;
  nickname?: string;
};

type LeadEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
  LEAD_NOTIFY_EMAIL?: string;
};

type PagesContext = {
  request: Request;
  env: LeadEnv;
};

type SupabaseLead = {
  id: string;
};

function json(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init?.headers
    }
  });
}

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeWebsite(value: string) {
  if (!value) {
    return "";
  }

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(withProtocol);
    return url.toString().slice(0, 300);
  } catch {
    return "";
  }
}

function requiredEnv(env: LeadEnv) {
  const missing = [
    ["SUPABASE_URL", env.SUPABASE_URL],
    ["SUPABASE_SERVICE_ROLE_KEY", env.SUPABASE_SERVICE_ROLE_KEY],
    ["TURNSTILE_SECRET_KEY", env.TURNSTILE_SECRET_KEY],
    ["LEAD_WEBHOOK_URL", env.LEAD_WEBHOOK_URL]
  ].filter(([, value]) => !value);

  return missing.map(([name]) => name);
}

async function verifyTurnstile(token: string, remoteIp: string | null, secret: string) {
  if (!token || token.length > 2048) {
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      secret,
      response: token,
      remoteip: remoteIp ?? undefined,
      idempotency_key: crypto.randomUUID()
    })
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

function supabaseHeaders(env: LeadEnv) {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
    "content-type": "application/json"
  };
}

async function insertLead(env: LeadEnv, lead: Record<string, unknown>) {
  const url = new URL("/rest/v1/leads", env.SUPABASE_URL ?? "");
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      ...supabaseHeaders(env),
      prefer: "return=representation"
    },
    body: JSON.stringify(lead)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase insert failed: ${message.slice(0, 240)}`);
  }

  const rows = (await response.json()) as SupabaseLead[];
  return rows[0];
}

async function updateLeadWebhookStatus(env: LeadEnv, leadId: string, status: string, error?: string) {
  const url = new URL("/rest/v1/leads", env.SUPABASE_URL ?? "");
  url.searchParams.set("id", `eq.${leadId}`);

  await fetch(url.toString(), {
    method: "PATCH",
    headers: {
      ...supabaseHeaders(env),
      prefer: "return=minimal"
    },
    body: JSON.stringify({
      n8n_webhook_sent_at: status === "sent" ? new Date().toISOString() : null,
      n8n_webhook_status: status,
      n8n_error: error ? error.slice(0, 1000) : null
    })
  });
}

async function notifyN8n(env: LeadEnv, leadId: string, lead: Record<string, unknown>) {
  const response = await fetch(env.LEAD_WEBHOOK_URL ?? "", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(env.LEAD_WEBHOOK_SECRET ? { "x-lead-webhook-secret": env.LEAD_WEBHOOK_SECRET } : {})
    },
    body: JSON.stringify({
      event: "lead.created",
      leadId,
      notifyEmail: env.LEAD_NOTIFY_EMAIL ?? "",
      lead
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`n8n webhook failed: ${response.status} ${message.slice(0, 240)}`);
  }
}

export async function onRequestPost({ request, env }: PagesContext) {
  const missing = requiredEnv(env);

  if (missing.length > 0) {
    return json({ error: "Lead capture is not configured yet.", missing }, { status: 503 });
  }

  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return json({ error: "Invalid request body." }, { status: 400 });
  }

  if (clean(body.nickname)) {
    return json({ ok: true });
  }

  const turnstileOk = await verifyTurnstile(
    clean(body.turnstileToken, 2048),
    request.headers.get("CF-Connecting-IP"),
    env.TURNSTILE_SECRET_KEY ?? ""
  );

  if (!turnstileOk) {
    return json({ error: "The bot check expired or could not be verified. Please try again." }, { status: 403 });
  }

  const lead = {
    full_name: clean(body.fullName, 120),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 40) || null,
    company_name: clean(body.companyName, 160) || null,
    website_url: normalizeWebsite(clean(body.websiteUrl, 300)) || null,
    focus_area: clean(body.focusArea, 80),
    message: clean(body.message, 2000),
    consent_to_contact: body.consentToContact === true,
    source_page: clean(body.sourcePage, 500) || null,
    referrer: clean(body.referrer, 500) || null,
    utm_source: clean(body.utmSource, 200) || null,
    utm_medium: clean(body.utmMedium, 200) || null,
    utm_campaign: clean(body.utmCampaign, 200) || null,
    utm_term: clean(body.utmTerm, 200) || null,
    utm_content: clean(body.utmContent, 200) || null,
    raw_payload: {
      source: "diligentdesignsconsulting.com",
      submitted_at: new Date().toISOString(),
      user_agent: clean(request.headers.get("user-agent"), 500),
      form_version: "lead-capture-v1"
    }
  };

  if (!lead.full_name || !isEmail(lead.email) || !lead.focus_area || lead.message.length < 10) {
    return json({ error: "Please include name, email, focus area, and a short note." }, { status: 422 });
  }

  if (!lead.consent_to_contact) {
    return json({ error: "Please confirm that Diligent Designs can contact you about this request." }, { status: 422 });
  }

  let insertedLead: SupabaseLead;

  try {
    insertedLead = await insertLead(env, lead);
  } catch (error) {
    console.error(error);
    return json({ error: "Lead capture is temporarily unavailable." }, { status: 502 });
  }

  try {
    await notifyN8n(env, insertedLead.id, lead);
    await updateLeadWebhookStatus(env, insertedLead.id, "sent");
  } catch (error) {
    console.error(error);
    await updateLeadWebhookStatus(env, insertedLead.id, "failed", error instanceof Error ? error.message : "Unknown webhook error").catch(
      () => undefined
    );
  }

  return json({ ok: true, id: insertedLead.id });
}

export function onRequestOptions() {
  return json({ ok: true });
}
