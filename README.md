# Diligent Designs Consulting Site

This repository contains the public website for Diligent Designs Consulting: a premium landing page, the Automation Opportunity Scanner, scroll-driven brand motion, and the contact/lead-generation flow.

Diligent Designs Consulting helps small and medium-size businesses automate the right work, clean up marketing operations, and turn scattered activity into systems they can trust.

## Project Layout

The application source currently lives in `client-automation-opportunity-scanner/`. That folder name comes from the original scanner MVP; the repository and app metadata now represent the broader consulting website.

Key pieces:

- `app/page.tsx`: main landing page.
- `app/ContactForm.tsx`: premium contact form CTA.
- `app/scanner/*`: Automation Opportunity Scanner flow.
- `functions/api/contact.ts`: Cloudflare Pages Function for lead routing.
- `app/globals.css`: Diligent Designs visual and motion system.

## Run Locally

From the repository root:

```powershell
cd client-automation-opportunity-scanner
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

From the app directory:

```powershell
npm run build
```

The site is configured as a static Next.js export and writes the production build to `client-automation-opportunity-scanner/out/`.

## Deploy

The live site is hosted on Cloudflare Pages.

Cloudflare Pages project:

`diligent-designs-consulting`

Production domains:

- `https://diligentdesignsconsulting.com`
- `https://www.diligentdesignsconsulting.com`

Manual production deploy from the app directory:

```powershell
$env:CLOUDFLARE_API_TOKEN=[Environment]::GetEnvironmentVariable('CLOUDFLARE_API_TOKEN','User')
npm run build
npx wrangler pages deploy out --project-name diligent-designs-consulting --branch main --commit-dirty=true --commit-message "Deploy Diligent Designs site"
```

## Environment And Secrets

Keep real secrets in Cloudflare Pages environment variables or `client-automation-opportunity-scanner/.env.local` for local development only.

Do not commit real keys, tokens, or passwords to the repository. The repo is configured to ignore `.env*` files, so local secrets should stay out of Git by default.

Current planned environment variables:

- `LEAD_WEBHOOK_URL`: webhook endpoint for contact form submissions, such as n8n, Supabase Edge Functions, Airtable automation, or a CRM intake endpoint.
- `LEAD_WEBHOOK_SECRET`: optional shared secret sent as `x-lead-webhook-secret` when forwarding leads.

Until `LEAD_WEBHOOK_URL` is configured, the contact form falls back to a prefilled email flow so leads are not silently lost.

## Data Ownership

GitHub stores the source code only. Lead submissions, scanner results, analytics, and future client data should live in a proper data system such as n8n, Supabase, Airtable, HubSpot, Google Sheets, or Cloudflare storage services.
