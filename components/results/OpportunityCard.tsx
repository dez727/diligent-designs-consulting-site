import type { ScoredOpportunity } from "@/lib/types";

type OpportunityCardProps = {
  opportunity: ScoredOpportunity;
  rank: number;
};

export function OpportunityCard({ opportunity, rank }: OpportunityCardProps) {
  return (
    <article className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl">#{rank} {opportunity.workflowName}</h3>
        <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slateBlue">
          Priority {opportunity.priorityScore}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--ink-soft)]">Impact Score</p>
          <p className="mt-1 text-2xl font-semibold text-slateBlue">{opportunity.impactScore}</p>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--ink-soft)]">Ease Score</p>
          <p className="mt-1 text-2xl font-semibold text-slateBlue">{opportunity.easeScore}</p>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--ink-soft)]">Priority Score</p>
          <p className="mt-1 text-2xl font-semibold text-coral">{opportunity.priorityScore}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
        <p>
          <span className="font-semibold text-[var(--ink)]">Rationale:</span> {opportunity.rationale}
        </p>
        <p>
          <span className="font-semibold text-[var(--ink)]">Recommended Approach:</span> {opportunity.approach}
        </p>
        <p>
          <span className="font-semibold text-[var(--ink)]">Suggested Tools:</span> {opportunity.tools.join(", ")}
        </p>
      </div>
    </article>
  );
}
