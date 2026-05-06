"use client";

import { useState } from "react";
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
  const [isConfirmingRemoval, setIsConfirmingRemoval] = useState(false);
  const workflowName = workflow.workflowName.trim() || "this workflow";

  const handleConfirmRemoval = () => {
    onRemove(workflow.id);
    setIsConfirmingRemoval(false);
  };

  return (
    <article className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-[240px] flex-1">
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
          <button
            type="button"
            className="button-secondary remove-workflow-button"
            onClick={() => setIsConfirmingRemoval(true)}
            aria-expanded={isConfirmingRemoval}
          >
            Remove workflow
          </button>
        ) : null}
      </div>

      {isConfirmingRemoval ? (
        <div className="workflow-remove-confirmation" role="group" aria-label={`Confirm removal of ${workflowName}`}>
          <div>
            <p className="label">Confirm removal</p>
            <p>
              Remove <strong>{workflowName}</strong> from this scan? Your other workflow scores will stay in place.
            </p>
          </div>
          <div className="workflow-remove-actions">
            <button type="button" className="button-ghost" onClick={() => setIsConfirmingRemoval(false)}>
              Keep workflow
            </button>
            <button type="button" className="button-danger" onClick={handleConfirmRemoval}>
              Remove workflow
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
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
