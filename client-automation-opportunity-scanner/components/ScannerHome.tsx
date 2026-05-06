import Link from "next/link";
import { StepIndicator } from "@/components/assessment/StepIndicator";

export function ScannerHome() {
  return (
    <main id="main-content" className="page-with-site-nav mx-auto min-h-screen w-full max-w-7xl px-5 pb-5 md:px-8">
      <section className="grid min-h-[calc(100vh-2.5rem)] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between p-7 md:p-12">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">Diligent Designs Consulting</p>
            <span className="hidden rounded-full border border-[var(--line)] px-3 py-1 text-xs font-bold text-[var(--ink-soft)] sm:inline-flex">
              Diagnostic 01
            </span>
          </div>

          <div className="py-16 md:py-24">
            <p className="mb-5 inline-flex border-b border-[var(--copper)] pb-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--brand)]">
              Automation Opportunity Scanner
            </p>
            <h1 className="max-w-4xl text-5xl leading-[0.95] text-[var(--brand-deep)] md:text-7xl">
              Find the workflow worth automating first.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--ink-soft)] md:text-lg">
              Score recurring work by business impact, manual effort, risk, and process clarity. The scanner turns a messy
              list of operational pain points into a ranked shortlist your team can actually act on.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button-primary" href="/scanner/assessment">
                Start the Scanner
              </Link>
              <a className="button-secondary" href="mailto:hello@diligentdesignsconsulting.com">
                Discuss a Process Audit
              </a>
            </div>
          </div>

          <div className="max-w-4xl">
            <StepIndicator currentStep={1} />
          </div>
        </div>

        <aside className="rule-panel border-t border-[var(--line)] bg-[var(--brand-deep)] p-7 text-white lg:border-l lg:border-t-0 md:p-10">
          <div className="flex h-full flex-col justify-between gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">What It Measures</p>
              <div className="mt-6 grid gap-3">
                {[
                  ["01", "Frequency", "How often the work returns to the team."],
                  ["02", "Manual load", "How much human effort is still trapped in the process."],
                  ["03", "Operational risk", "Whether mistakes stay internal or touch revenue, customers, or compliance."],
                  ["04", "Process clarity", "How repeatable the work is before automation enters the room."]
                ].map(([num, title, copy]) => (
                  <div key={num} className="rounded-lg border border-white/12 bg-white/[0.06] p-4">
                    <p className="text-xs font-bold text-[var(--gold)]">{num}</p>
                    <h2 className="mt-2 text-xl text-white">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/70">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-[#f7f2e8] p-5 text-[var(--ink)]">
              <p className="eyebrow">Output</p>
              <h2 className="mt-3 text-3xl text-[var(--brand-deep)]">Top 3 automation candidates</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                Each result includes a priority score, rationale, recommended approach, and a 2026 build path.
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/[0.06] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">Build Options Included</p>
              <div className="mt-4 grid gap-2 text-sm text-white/76">
                {[
                  "OpenAI AgentKit, Agents SDK, Responses API, and Codex-assisted builds",
                  "Gemini ADK, Gemini function calling, and Vertex AI Agent Builder paths",
                  "Claude Code and Claude Code SDK for custom portals, codebase tasks, and internal tools",
                  "Zapier, Make, n8n, Airtable, Notion, CRM, and reporting automations"
                ].map((item) => (
                  <p key={item} className="border-t border-white/10 pt-2">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
