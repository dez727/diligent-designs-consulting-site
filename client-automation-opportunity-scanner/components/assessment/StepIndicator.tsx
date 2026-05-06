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
  const totalSteps = steps.length;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  const currentLabel = steps.find((step) => step.id === currentStep)?.label ?? "";

  return (
    <div className="scanner-stepper" aria-label={`Scanner progress: step ${currentStep} of ${totalSteps}, ${currentLabel}`}>
      <div className="scanner-progress-summary">
        <span>Step {currentStep} of {totalSteps}</span>
        <strong>{progressPercent}% complete</strong>
      </div>
      <div
        className="scanner-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-label="Scanner completion progress"
      >
        <span style={{ width: `${progressPercent}%` }} />
      </div>

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
              aria-current={isActive ? "step" : undefined}
            >
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em]">
                {isComplete ? "Complete" : `Step ${step.id}`}
              </p>
              <p className="mt-1 text-sm font-bold">{step.label}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
