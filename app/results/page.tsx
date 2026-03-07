"use client";

import Link from "next/link";
import { useMemo } from "react";
import { OpportunityCard } from "@/components/results/OpportunityCard";
import { useAssessment } from "@/app/providers";
import { getTopOpportunities } from "@/lib/scoring";

export default function ResultsPage() {
  const { data } = useAssessment();

  const topOpportunities = useMemo(() => getTopOpportunities(data, 3), [data]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slateBlue">Results</p>
          <h1 className="mt-1 text-3xl md:text-4xl">Top 3 Automation Opportunities</h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">Prioritized for immediate action using your impact and ease ratings.</p>
        </div>
        <Link href="/assessment" className="button-secondary">
          Edit Assessment
        </Link>
      </div>

      <section className="space-y-4">
        {topOpportunities.map((opportunity, index) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} rank={index + 1} />
        ))}
      </section>
    </main>
  );
}
