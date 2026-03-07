"use client";

import { RatingSelect } from "@/components/assessment/RatingSelect";
import type { WorkflowPainPoint, WorkflowRatings } from "@/lib/types";

type WorkflowPainPointCardProps = {
  workflow: WorkflowPainPoint;
  onWorkflowNameUpdate: (id: string, value: string) => void;
  onRatingUpdate: (id: string, field: keyof WorkflowRatings, value: WorkflowRatings[keyof WorkflowRatings]) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
};

export function WorkflowPainPointCard({
  workflow,
  onWorkflowNameUpdate,
  onRatingUpdate,
  onRemove,
  canRemove
}: WorkflowPainPointCardProps) {
  return (
    <article className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 min-w-[240px]">
          <label>
            <span className="label">Workflow Pain Point</span>
            <input
              className="input"
              value={workflow.workflowName}
              onChange={(event) => onWorkflowNameUpdate(workflow.id, event.target.value)}
              placeholder="Name the workflow"
            />
          </label>
        </div>
        {canRemove ? (
          <button type="button" className="button-secondary" onClick={() => onRemove(workflow.id)}>
            Remove
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <RatingSelect
          label="Frequency"
          value={workflow.ratings.frequency}
          onChange={(value) => onRatingUpdate(workflow.id, "frequency", value)}
        />
        <RatingSelect
          label="Manual Effort"
          value={workflow.ratings.manualEffort}
          onChange={(value) => onRatingUpdate(workflow.id, "manualEffort", value)}
        />
        <RatingSelect
          label="Time Consumed"
          value={workflow.ratings.timeConsumed}
          onChange={(value) => onRatingUpdate(workflow.id, "timeConsumed", value)}
        />
        <RatingSelect
          label="Error Risk"
          value={workflow.ratings.errorRisk}
          onChange={(value) => onRatingUpdate(workflow.id, "errorRisk", value)}
        />
        <RatingSelect
          label="Business Importance"
          value={workflow.ratings.businessImportance}
          onChange={(value) => onRatingUpdate(workflow.id, "businessImportance", value)}
        />
        <RatingSelect
          label="Ease of Automation"
          value={workflow.ratings.easeOfAutomation}
          onChange={(value) => onRatingUpdate(workflow.id, "easeOfAutomation", value)}
        />
      </div>
    </article>
  );
}
