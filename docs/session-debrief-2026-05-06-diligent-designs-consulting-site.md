# Session Debrief - Diligent Designs Consulting Site - 2026-05-06

## Purpose

This debrief captures the high-signal lessons from building, branding, deploying, and operationalizing the Diligent Designs Consulting website. Use it as a startup checklist for future web projects so the next build starts with fewer unknowns, fewer platform surprises, and a cleaner path from idea to deployed system.

## What We Built

- Repositioned Diligent Designs Consulting as an AI automation, marketing operations, and analytics strategy partner for small and medium-size businesses.
- Created a premium red, black, and silver visual system with restrained UI, Fraunces display typography, Manrope body/UI typography, and scroll-driven motion.
- Reworked the homepage into a landing page with:
  - Clear consulting positioning.
  - Practical AI adoption language.
  - Services and workflow examples.
  - Premium scroll motion and section transitions.
  - A contact form instead of a mailto-only CTA.
- Built and refined the Automation Opportunity Scanner:
  - Business context step.
  - Workflow scoring step.
  - Top-three results page.
  - Priority scoring based on impact and automation ease.
  - Progress indicator across scanner steps.
  - Safer workflow removal confirmation.
- Added consistent navigation across homepage and scanner pages.
- Replaced the nav logo with a cleaned transparent logo asset.
- Set up lead capture infrastructure:
  - Browser form.
  - Cloudflare Pages Function.
  - Turnstile validation.
  - Supabase insert.
  - n8n webhook notification.
  - Gmail notification to `diligentdesignsconsulting@gmail.com`.
- Created Supabase schema and setup docs for lead storage.
- Added GitHub Actions deployment to Cloudflare Pages so future pushes deploy automatically.

## Key Decisions

### Brand and UX

- The brand should feel premium, practical, creative, and trustworthy.
- Avoid generic AI language such as "revolutionary", "seamless", "unlock", "cutting-edge", "game-changing", "effortless", "supercharge", and "unleash".
- Use concrete business-owner language:
  - "Show me where the work is getting stuck."
  - "Find the workflow worth fixing first."
  - "Practical AI adoption, built around your actual operations."
- Use scroll motion to clarify hierarchy and create a premium feel, but keep content readable and accessible.
- Treat mobile QA as first-class. Several important issues were only obvious at mobile widths:
  - Nav logo cropping.
  - Priority score crowding.
  - CTA heading/body spacing.
  - Section headlines feeling visually smooshed.

### Lead Capture

- GitHub is code only. Do not store lead submissions, scanner results, analytics data, or client information in GitHub.
- Supabase is the first system of record for lead submissions.
- The browser should not write directly to Supabase for this flow.
- Cloudflare Pages Function should handle:
  - Input validation.
  - Turnstile verification.
  - Supabase service-role insert.
  - n8n webhook forwarding.
- Sensitive discovery details should wait for later intake/discovery flows, not the first contact form.

### Hosting and Deployment

- The existing Cloudflare Pages project, `diligent-designs-consulting`, is a Direct Upload project.
- Cloudflare showed `Git Provider: No`; this explains why GitHub pushes did not auto-deploy.
- Cloudflare Direct Upload projects cannot be converted into native Git-backed Pages projects after the fact.
- To preserve the existing project and custom domain, we added GitHub Actions:
  - Push to `master`.
  - Build the Next.js static export.
  - Deploy `out/` to Cloudflare Pages with Wrangler.
- This provides automatic deploys without moving the custom domain to a new Pages project.

## Things We Learned

### 1. Decide hosting mode before building too much

Cloudflare Pages has two relevant paths:

- Git-backed Pages project: Cloudflare owns the build/deploy trigger from GitHub.
- Direct Upload Pages project: deployments happen through Wrangler/API/manual upload.

The Direct Upload path works, but it does not show as a Git service inside Cloudflare. If native Git integration is important, start the Pages project from GitHub on day one.

### 2. Repo layout matters

The app currently lives inside:

```text
client-automation-opportunity-scanner/
```

The actual Git repo root is one level above it:

```text
C:\Users\addez\Documents\Projects\Codex
```

That means CI/CD files like `.github/workflows/...` must live at the repo root, while app commands run inside `client-automation-opportunity-scanner`.

Future projects should avoid confusing root structure unless there is a strong reason. A cleaner project would be:

```text
diligent-designs-consulting-site/
  .github/
  app/
  components/
  functions/
  public/
  package.json
```

### 3. Deployment tokens need the right permissions

For Cloudflare Pages deployment through CI, the token needs enough access for Pages deployment and account access. The token also needs to exist as a GitHub Actions secret, not just a local environment variable.

Current GitHub Actions secrets used:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

Cloudflare production secrets remain in Cloudflare:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TURNSTILE_SECRET_KEY`
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

### 4. Public and private env vars must stay separated

Use `NEXT_PUBLIC_` only for values safe to expose in the browser.

Never expose:

- Supabase service role keys.
- Turnstile secret key.
- Webhook signing secrets.
- Private CRM/API tokens.

### 5. Supabase RLS should be intentional

The lead table has RLS enabled. That is good.

The first version should not create broad anonymous read policies. Inserts should happen through the Cloudflare server/function using the Supabase service role key.

For future Supabase projects:

- Enable RLS.
- Keep anonymous browser permissions narrow.
- Prefer server-side writes for lead capture and business data.
- Create migrations early and commit them.

### 6. Browser QA catches what builds cannot

`npm run build` and TypeScript can pass while the page still feels wrong.

Issues found through visual QA/tester feedback:

- Nav logo was cut off.
- Scanner priority score was crowded on mobile.
- Contact section text spacing was too tight on mobile.
- Homepage headings felt stacked/smooshed.
- Progress bar filled at the wrong point.
- Remove button was technically functional but not intuitive.

Future frontend work should include:

- Desktop screenshot.
- Mobile screenshot.
- One interaction test for the changed flow.
- Console error check.

### 7. Install Playwright early

Playwright was not fully ready at first because the browser binary was missing. We installed:

- `@playwright/test`
- Playwright Chromium browser

This should be part of future project setup from the start.

### 8. Image assets need inspection, not assumptions

The uploaded `DDC-logo-only.png` looked like it had a transparent checkerboard background, but the file itself was `Format24bppRgb` with alpha 255 everywhere. In other words, the checkerboard was baked into the image.

Lesson:

- Verify transparency before using logo assets.
- Create web-ready logo derivatives for nav/favicons.
- Keep source artwork separate from optimized public assets.

### 9. Direct tester language is valuable

Feedback like "smooshed" is useful. It pointed to a real hierarchy problem: two major section headlines were sharing the same visual moment.

Design response:

- Increase section separation.
- Give the first section its own editorial panel.
- Add a divider and more top spacing before the next section.

## Future Project Startup Checklist

Use this order for the next serious web project.

### Phase 0 - Project Definition

- Define business goal.
- Define primary user.
- Define primary CTA.
- Define what data will be collected.
- Define where data should live.
- Define what must not be stored in GitHub.
- Decide whether the first version is static, serverless, or full-stack.

### Phase 1 - Repo and Hosting

- Create the GitHub repo with the final name before work begins.
- Avoid nested repo/app confusion unless needed.
- Choose hosting mode:
  - Native Cloudflare Git integration if you want Cloudflare to auto-build from GitHub.
  - GitHub Actions plus Wrangler if using existing Direct Upload Pages project.
- Confirm production branch naming (`master` vs `main`) before deployment automation.
- Add `.env.example` before implementation spreads.
- Add `.gitignore` for `.env*`, `.next`, `out`, and generated artifacts.

### Phase 2 - Design System

- Create or import brand tokens first.
- Define:
  - Colors.
  - Typefaces.
  - Button styles.
  - Form styles.
  - Nav pattern.
  - Motion rules.
  - Mobile spacing rules.
- Create logo and favicon assets in web-ready sizes.
- Verify transparency and cropping.

### Phase 3 - App Architecture

- Decide routing structure.
- Decide whether forms require server routes or Cloudflare Pages Functions.
- Keep shared nav/layout components early.
- Build real workflows first, not a marketing shell.
- Add scanner/calculator/data flows with typed domain models.

### Phase 4 - Data and Automation

- Stand up Supabase before collecting real leads.
- Add migration files.
- Enable RLS intentionally.
- Create n8n webhook flow.
- Test the webhook manually before connecting production form.
- Add notification routing.
- Keep secrets in platform env/secrets, not repo files.

### Phase 5 - CI/CD

- Add GitHub Actions or native host Git integration before launch.
- Add required secrets to GitHub Actions or hosting provider.
- Run first automatic deployment before relying on it.
- Document deployment command and trigger behavior.
- Confirm custom domain still points to the deployed project.

### Phase 6 - QA Before Launch

- Build:
  - `npm run build`
  - `npx tsc --noEmit --pretty false`
- Visual QA:
  - Home desktop.
  - Home mobile.
  - Scanner desktop.
  - Scanner mobile.
  - Contact form visible state.
  - Results page.
- Interaction QA:
  - Scanner step progression.
  - Add/remove workflow.
  - Lead form validation.
  - Lead form bot-check failure state.
- Production smoke tests:
  - Home returns 200.
  - Scanner returns 200.
  - API protected route returns expected bot-check error without Turnstile.

## Constraints Moving Forward

- The current Cloudflare Pages project remains Direct Upload based. GitHub Actions now handles auto-deploys.
- Cloudflare dashboard may still say `Git Provider: No`; that is expected.
- If native Cloudflare Git integration becomes a must-have, create a new Git-backed Pages project and migrate the custom domain carefully.
- Supabase service role keys must stay server-side only.
- Turnstile requires both:
  - public site key in the frontend build
  - secret key in Cloudflare runtime env
- n8n webhook should be treated as production infrastructure. Changes should be tested with a sample payload.
- The app is a static Next.js export plus Cloudflare Pages Functions. Avoid adding features that require a traditional Node server unless deployment architecture changes.
- Mobile layout cannot be treated as "later"; much of the important feedback has come from mobile screenshots.
- Large visual assets should be optimized before commit.

## Current Systems Touched

- GitHub repo: `dez727/diligent-designs-consulting-site`
- Local app folder: `client-automation-opportunity-scanner`
- Production domain: `https://diligentdesignsconsulting.com`
- Cloudflare Pages project: `diligent-designs-consulting`
- Supabase project: `Diligent Designs Consulting`
- n8n workflow: lead notification workflow
- Gmail notification destination: `diligentdesignsconsulting@gmail.com`
- GitHub Actions workflow: `.github/workflows/deploy-cloudflare-pages.yml`

## Useful Commands

From the app folder:

```powershell
cd "C:\Users\addez\Documents\Projects\Codex\client-automation-opportunity-scanner"
npm run build
npx tsc --noEmit --pretty false
npx playwright screenshot -b chromium --viewport-size="412,915" https://diligentdesignsconsulting.com/ mobile-check.png
```

From the repo root:

```powershell
cd "C:\Users\addez\Documents\Projects\Codex"
git status --short
git add <files>
git commit -m "Describe the change"
git push origin master
gh run list --workflow "Deploy Cloudflare Pages" --limit 5
```

Manual Cloudflare deploy fallback from the app folder:

```powershell
npx wrangler pages deploy out --project-name diligent-designs-consulting --branch main
```

## Recommended Next Improvements

- Add a small automated Playwright test suite for scanner progression and lead-form rendering.
- Add a README section that explains the GitHub Actions deployment path and why Cloudflare shows `Git Provider: No`.
- Add an asset preparation folder or documentation note for logo/favicons.
- Add analytics/event tracking once the lead system is stable.
- A/B test CTA language:
  - "Show me where the work is getting stuck."
  - "Tell me what is slowing the business down."
  - "Find the first workflow worth fixing."
- Create a light CRM pipeline view later, but only after lead capture volume justifies it.

## Bottom Line

The biggest lesson is to start future projects with the operating system in place before the design work accelerates: repo name, hosting mode, env strategy, deployment automation, data destination, and QA workflow. The creative work moved quickly once those pieces were known. Most of the slowdown came from platform ambiguity, token permissions, deployment path uncertainty, and late visual QA discoveries.

