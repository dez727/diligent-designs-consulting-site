"use client";

import Link from "next/link";
import { StepIndicator } from "@/components/assessment/StepIndicator";
import { OpportunityCard } from "@/components/results/OpportunityCard";
import { useAssessment } from "@/app/providers";
import { getTopOpportunities } from "@/lib/scoring";

export default function ResultsPage() {
  const { data } = useAssessment();
  const topOpportunities = getTopOpportunities(data, 3);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
      <div className="space-y-6">
        <div className="rise-in rounded-[2rem] border border-[var(--line)] bg-white/80 p-8 shadow-soft md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slateBlue">Results</p>
              <h1 className="mt-1 text-3xl md:text-4xl">Top 3 Automation Opportunities</h1>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Prioritized using workflow impact plus the automation ease implied by process complexity.
              </p>
            </div>
            <Link href="/assessment" className="button-secondary">
              Edit Assessment
            </Link>
          </div>
        </div>

        <StepIndicator currentStep={4} />

        <section className="space-y-4">
          {topOpportunities.map((opportunity, index) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} rank={index + 1} />
          ))}
        </section>
      </div>
    </main>
  );
}
