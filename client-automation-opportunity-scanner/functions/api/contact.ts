type LeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  focus?: string;
  message?: string;
  nickname?: string;
};

type ContactEnv = {
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
};

type PagesContext = {
  request: Request;
  env: ContactEnv;
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

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function onRequestPost({ request, env }: PagesContext) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return json({ error: "Invalid request body." }, { status: 400 });
  }

  if (clean(body.nickname)) {
    return json({ ok: true });
  }

  const lead = {
    name: clean(body.name),
    email: clean(body.email),
    company: clean(body.company),
    website: clean(body.website),
    focus: clean(body.focus),
    message: clean(body.message),
    source: "diligentdesignsconsulting.com/contact",
    submittedAt: new Date().toISOString()
  };

  if (!lead.name || !isEmail(lead.email) || !lead.focus || !lead.message) {
    return json({ error: "Please include name, email, focus, and message." }, { status: 422 });
  }

  if (!env.LEAD_WEBHOOK_URL) {
    return json({ error: "Lead routing is not configured yet." }, { status: 503 });
  }

  const webhookResponse = await fetch(env.LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(env.LEAD_WEBHOOK_SECRET ? { "x-lead-webhook-secret": env.LEAD_WEBHOOK_SECRET } : {})
    },
    body: JSON.stringify(lead)
  });

  if (!webhookResponse.ok) {
    return json({ error: "Lead routing failed." }, { status: 502 });
  }

  return json({ ok: true });
}

export function onRequestOptions() {
  return json({ ok: true });
}
