import { getOptionLabel } from "@/lib/assessment-options";
import type { ScoredOpportunity } from "@/lib/types";

type OpportunityCardProps = {
  opportunity: ScoredOpportunity;
  rank: number;
};

export function OpportunityCard({ opportunity, rank }: OpportunityCardProps) {
  const complexityLabel = getOptionLabel("processComplexity", opportunity.ratings.processComplexity);
  const frequencyLabel = getOptionLabel("frequency", opportunity.ratings.frequency);

  return (
    <article className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Candidate {rank}</p>
          <h3 className="mt-1 text-2xl">{opportunity.workflowName}</h3>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            {frequencyLabel} cadence · {complexityLabel} process
          </p>
        </div>
        <span className="rounded-full border border-[var(--line)] bg-[var(--platinum)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--brand)]">
          Priority {opportunity.priorityScore}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[var(--line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--ink-soft)]">Impact Score</p>
          <p className="mt-1 text-2xl font-bold text-[var(--brand)]">{opportunity.impactScore}</p>
        </div>
        <div className="rounded-lg border border-[var(--line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--ink-soft)]">Ease Score</p>
          <p className="mt-1 text-2xl font-bold text-[var(--brand)]">{opportunity.easeScore}</p>
        </div>
        <div className="rounded-lg border border-[var(--line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--ink-soft)]">Priority Score</p>
          <p className="mt-1 text-2xl font-bold text-[var(--copper)]">{opportunity.priorityScore}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
        <p>
          <span className="font-semibold text-[var(--ink)]">Rationale:</span> {opportunity.rationale}
        </p>
        <p>
          <span className="font-semibold text-[var(--ink)]">Recommended Approach:</span> {opportunity.approach}
        </p>
        <div className="rounded-lg border border-[var(--line)] bg-[var(--canvas)] p-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--copper)]">2026 Build Path</p>
          <p className="mt-2 font-semibold text-[var(--ink)]">{opportunity.buildMode}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {opportunity.buildOptions.map((option) => (
              <span
                key={option}
                className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-bold text-[var(--brand)]"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
        <p>
          <span className="font-semibold text-[var(--ink)]">Suggested Tools:</span> {opportunity.tools.join(", ")}
        </p>
      </div>
    </article>
  );
}
