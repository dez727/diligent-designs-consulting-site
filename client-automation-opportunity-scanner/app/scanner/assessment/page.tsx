"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { StepIndicator } from "@/components/assessment/StepIndicator";
import { BusinessDetailsForm } from "@/components/assessment/BusinessDetailsForm";
import { WorkflowPainPointCard } from "@/components/assessment/WorkflowPainPointCard";
import { useAssessment } from "@/app/providers";

type WizardStep = 2 | 3;

export default function AssessmentPage() {
  const router = useRouter();
  const { data, updateBusiness, updateWorkflowName, updateWorkflowRating, addWorkflow, removeWorkflow } = useAssessment();
  const [wizardStep, setWizardStep] = useState<WizardStep>(2);

  const businessStepReady = data.business.businessName.trim().length > 0 && data.business.industry.trim().length > 0;
  const workflowsReady = data.workflows.every((workflow) => workflow.workflowName.trim().length > 0);

  const handleNext = () => {
    setWizardStep(3);
  };

  const handleSubmit = () => {
    startTransition(() => {
      router.push("/scanner/results");
    });
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 md:py-12">
      <div className="space-y-6">
        <div className="rise-in rounded-lg border border-[var(--line)] bg-[var(--brand-deep)] p-8 text-white shadow-[var(--shadow)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--gold)]">Assessment Wizard</p>
              <h1 className="mt-3 text-4xl leading-tight md:text-6xl">Turn operational friction into a ranked action list.</h1>
              <p className="mt-4 max-w-2xl text-sm text-white/78 md:text-base">
                Move from business context to workflow scoring, then rank the top three opportunities by impact, effort,
                risk, and process clarity.
              </p>
            </div>
            <Link href="/scanner" className="button-secondary border-white/15 bg-white/10 text-white hover:bg-white/20">
              Back to Scanner
            </Link>
          </div>
        </div>

        <StepIndicator currentStep={wizardStep} />

        {wizardStep === 2 ? (
          <section className="rise-in grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <BusinessDetailsForm business={data.business} onUpdate={updateBusiness} />

            <aside className="card p-6">
              <p className="eyebrow">Step 2 of 4</p>
              <h2 className="mt-2 text-2xl">Business Context</h2>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">
                This step gives the scanner just enough context to make the recommendations sound grounded rather than generic.
              </p>
              <div className="mt-5 space-y-3 text-sm text-[var(--ink-soft)]">
                <p>Business name and industry help tune the recommended tools and automation pattern.</p>
                <p>Current tools provide clues about practical implementation paths later.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="button-primary" onClick={handleNext} disabled={!businessStepReady}>
                  Continue to Workflow Scoring
                </button>
                {!businessStepReady ? (
                  <p className="basis-full text-xs text-[var(--copper)]">Add at least a business name and industry to continue.</p>
                ) : null}
              </div>
            </aside>
          </section>
        ) : (
          <section className="rise-in space-y-6">
            <div className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Step 3 of 4</p>
                  <h2 className="mt-2 text-2xl">Workflow Scoring</h2>
                  <p className="mt-2 max-w-3xl text-sm text-[var(--ink-soft)]">
                    Use the visible option groups below to score each workflow. We convert your answers into an impact score and
                    estimate ease using process complexity rather than asking you to guess technical difficulty.
                  </p>
                </div>
                <button type="button" className="button-secondary" onClick={() => addWorkflow("New Workflow")}>
                  + Add Workflow
                </button>
              </div>
            </div>

            {data.workflows.map((workflow) => (
              <WorkflowPainPointCard
                key={workflow.id}
                workflow={workflow}
                onWorkflowNameUpdate={updateWorkflowName}
                onRatingUpdate={updateWorkflowRating}
                onRemove={removeWorkflow}
                canRemove={data.workflows.length > 1}
              />
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button type="button" className="button-ghost" onClick={() => setWizardStep(2)}>
                Back to Business Context
              </button>
              <div className="flex flex-col items-end gap-2">
                <button type="button" className="button-primary" onClick={handleSubmit} disabled={!workflowsReady}>
                  Generate Results
                </button>
                {!workflowsReady ? <p className="text-xs text-[var(--copper)]">Give each workflow a name before continuing.</p> : null}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
