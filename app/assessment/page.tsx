"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { BusinessDetailsForm } from "@/components/assessment/BusinessDetailsForm";
import { WorkflowPainPointCard } from "@/components/assessment/WorkflowPainPointCard";
import { useAssessment } from "@/app/providers";

export default function AssessmentPage() {
  const router = useRouter();
  const { data, updateBusiness, updateWorkflowName, updateWorkflowRating, addWorkflow, removeWorkflow } = useAssessment();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/results");
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slateBlue">Assessment</p>
          <h1 className="mt-1 text-3xl md:text-4xl">Score Your Workflow Pain Points</h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">Rate each workflow from 1-5 to generate ranked automation opportunities.</p>
        </div>
        <Link href="/" className="button-secondary">
          Back Home
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BusinessDetailsForm business={data.business} onUpdate={updateBusiness} />

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl">Workflow Pain Points</h2>
            <button type="button" className="button-secondary" onClick={() => addWorkflow("New Workflow")}>+ Add Workflow</button>
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
        </section>

        <div className="flex justify-end">
          <button type="submit" className="button-primary">Generate Top Opportunities</button>
        </div>
      </form>
    </main>
  );
}
