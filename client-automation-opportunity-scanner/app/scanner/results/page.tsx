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
    <main id="main-content" className="page-with-site-nav mx-auto w-full max-w-7xl px-5 pb-8 md:px-8 md:pb-12">
      <div className="space-y-6">
        <div className="rise-in rounded-lg border border-[var(--line)] bg-[var(--panel)] p-8 shadow-[var(--shadow)] md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Results</p>
              <h1 className="mt-1 text-4xl md:text-6xl">Top 3 automation opportunities</h1>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Prioritized using workflow impact plus the automation ease implied by process complexity.
              </p>
            </div>
            <Link href="/scanner/assessment" className="button-secondary">
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
