"use client";

import { SegmentedControl } from "@/components/assessment/SegmentedControl";
import { workflowQuestionList } from "@/lib/assessment-options";
import type { WorkflowPainPoint, WorkflowRatingField, WorkflowRatings } from "@/lib/types";

type WorkflowPainPointCardProps = {
  workflow: WorkflowPainPoint;
  onWorkflowNameUpdate: (id: string, value: string) => void;
  onRatingUpdate: <TField extends WorkflowRatingField>(id: string, field: TField, value: WorkflowRatings[TField]) => void;
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

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {workflowQuestionList.map((question) => (
          <SegmentedControl
            key={question.field}
            label={question.label}
            prompt={question.prompt}
            value={workflow.ratings[question.field]}
            options={question.options}
            onChange={(value) => onRatingUpdate(workflow.id, question.field, value)}
          />
        ))}
      </div>
    </article>
  );
}
