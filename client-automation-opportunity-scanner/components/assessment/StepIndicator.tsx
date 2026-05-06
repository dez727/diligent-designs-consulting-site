type StepIndicatorProps = {
  currentStep: 1 | 2 | 3 | 4;
};

const steps = [
  { id: 1, label: "Welcome" },
  { id: 2, label: "Business Context" },
  { id: 3, label: "Workflow Scoring" },
  { id: 4, label: "Results" }
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="grid gap-2 md:grid-cols-4">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isComplete = step.id < currentStep;

        return (
          <li
            key={step.id}
            className={`rounded-lg border px-4 py-3 transition ${
              isActive
                ? "border-[var(--brand-deep)] bg-[var(--brand-deep)] text-white"
                : isComplete
                  ? "border-[var(--copper)]/40 bg-[var(--copper)]/10 text-[var(--ink)]"
                  : "border-[var(--line)] bg-white/55 text-[var(--ink-soft)]"
            }`}
          >
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em]">Step {step.id}</p>
            <p className="mt-1 text-sm font-bold">{step.label}</p>
          </li>
        );
      })}
    </ol>
  );
}
