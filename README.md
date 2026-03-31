# Client Automation Opportunity Scanner

This repository contains the MVP for the Client Automation Opportunity Scanner. The app is built with Next.js, TypeScript, and Tailwind CSS and helps small businesses score workflow pain points, then surface the top three automation opportunities.

## Project Layout

The application source lives in `client-automation-opportunity-scanner/`.

## Run Locally

From the repository root:

```powershell
cd client-automation-opportunity-scanner
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment And Secrets

This app does not require API keys today. If you add integrations later, keep real secrets in `client-automation-opportunity-scanner/.env.local` only.

Do not commit real keys, tokens, or passwords to the repository. The repo is configured to ignore `.env*` files, so local secrets should stay out of Git by default.

If the app ever needs documented environment variables, add placeholder values to a future `.env.example` file and keep the real values only in `.env.local`.
