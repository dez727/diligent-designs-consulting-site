# Diligent Designs Consulting Site

Premium landing page and Automation Opportunity Scanner for Diligent Designs Consulting, an AI automation, marketing operations, and analytics strategy agency for small and medium-size businesses.

GitHub stores code only. Lead submissions, scanner results, analytics data, and client information should live in the secure data and automation services configured for deployment.

## Stack

- Next.js App Router with static export
- TypeScript
- Tailwind CSS
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare Turnstile
- Supabase
- n8n webhook automation

## Lead Capture Flow

Current Phase 1 flow:

```text
Browser form
-> /api/leads Cloudflare Pages Function
-> Cloudflare Turnstile server-side validation
-> Supabase public.leads insert
-> n8n webhook notification
-> success response
```

The browser does not write directly to Supabase. `SUPABASE_SERVICE_ROLE_KEY` is used only inside the Cloudflare Pages Function.

## Environment Variables

Add these variables to Cloudflare Pages for the `diligent-designs-consulting` project.

Server-side secrets:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
TURNSTILE_SECRET_KEY=
LEAD_WEBHOOK_URL=
LEAD_WEBHOOK_SECRET=
```

Public build variable:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

Because this project is usually deployed from the local static export with Wrangler, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` must be present when `npm run build` runs. Put it in a local `.env.local` file or set it in the PowerShell session before building. The Turnstile secret remains server-side in Cloudflare Pages.

Optional:

```text
NEXT_PUBLIC_SITE_URL=https://diligentdesignsconsulting.com
LEAD_NOTIFY_EMAIL=
HUBSPOT_PRIVATE_APP_TOKEN=
ENABLE_HUBSPOT_SYNC=false
```

Important: never prefix `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`, or `LEAD_WEBHOOK_SECRET` with `NEXT_PUBLIC_`.

## Supabase Setup

Run the SQL migration in:

```text
supabase/migrations/001_create_lead_capture.sql
```

The migration creates:

- `public.leads`
- `lead_status` enum
- useful lead indexes
- `updated_at` trigger
- Row Level Security enabled

There is intentionally no public read policy. Inserts are performed through the Cloudflare Pages Function using the server-side service role key.

## n8n Webhook Contract

The Pages Function sends a POST request to `LEAD_WEBHOOK_URL` after a successful Supabase insert.

Headers:

```text
content-type: application/json
x-lead-webhook-secret: <LEAD_WEBHOOK_SECRET>
```

Body shape:

```json
{
  "event": "lead.created",
  "leadId": "uuid",
  "notifyEmail": "optional@email.com",
  "lead": {
    "full_name": "Example Name",
    "email": "name@example.com",
    "phone": null,
    "company_name": "Example Co",
    "website_url": "https://example.com/",
    "focus_area": "Marketing analytics",
    "message": "What is getting stuck.",
    "consent_to_contact": true,
    "source_page": "https://diligentdesignsconsulting.com/",
    "referrer": "",
    "utm_source": null,
    "utm_medium": null,
    "utm_campaign": null,
    "utm_term": null,
    "utm_content": null,
    "raw_payload": {
      "source": "diligentdesignsconsulting.com",
      "submitted_at": "ISO timestamp",
      "user_agent": "browser user agent",
      "form_version": "lead-capture-v1"
    }
  }
}
```

If the n8n webhook fails after the lead is inserted, the function records `n8n_webhook_status = 'failed'` and stores the error on the lead record. The user still receives a success response because the lead was captured.

## Local Development

Install dependencies:

```powershell
npm install
```

Run the Next.js app:

```powershell
npm run dev
```

Build the static export:

```powershell
npm run build
```

For local Pages Function testing, use Wrangler with local environment variables in a non-committed `.dev.vars` file or through the Cloudflare dashboard. `.env*` files are ignored except `.env.example`.

## Deployment Notes

Deploy production from the static export and functions:

```powershell
npm run build
npx wrangler pages deploy out --project-name diligent-designs-consulting --branch main
```

Set or update Cloudflare Pages server variables before deploying this lead capture flow to production. Without Supabase and Turnstile server variables, the form will return a setup error instead of accepting leads. Without `NEXT_PUBLIC_TURNSTILE_SITE_KEY` during the local build, the browser widget will not render.
