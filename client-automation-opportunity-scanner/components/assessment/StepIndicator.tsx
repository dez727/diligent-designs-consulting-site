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
    <ol className="grid gap-3 md:grid-cols-4">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isComplete = step.id < currentStep;

        return (
          <li
            key={step.id}
            className={`rounded-2xl border px-4 py-3 transition ${
              isActive
                ? "border-slateBlue bg-slateBlue text-white shadow-soft"
                : isComplete
                  ? "border-sage/50 bg-sage/15 text-[var(--ink)]"
                  : "border-[var(--line)] bg-white/70 text-[var(--ink-soft)]"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em]">Step {step.id}</p>
            <p className="mt-1 text-sm font-semibold">{step.label}</p>
          </li>
        );
      })}
    </ol>
  );
}
