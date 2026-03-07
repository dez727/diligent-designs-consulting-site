"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createDefaultAssessmentData } from "@/lib/defaults";
import type { AssessmentData, BusinessProfile, WorkflowPainPoint, WorkflowRatings } from "@/lib/types";

type AssessmentContextValue = {
  data: AssessmentData;
  updateBusiness: (field: keyof BusinessProfile, value: string) => void;
  updateWorkflowName: (id: string, workflowName: string) => void;
  updateWorkflowRating: (id: string, field: keyof WorkflowRatings, value: WorkflowRatings[keyof WorkflowRatings]) => void;
  addWorkflow: (name?: string) => void;
  removeWorkflow: (id: string) => void;
  reset: () => void;
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

const createWorkflow = (name: string): WorkflowPainPoint => ({
  id: `wf-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  workflowName: name,
  ratings: {
    frequency: 3,
    manualEffort: 3,
    timeConsumed: 3,
    errorRisk: 3,
    businessImportance: 3,
    easeOfAutomation: 3
  }
});

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AssessmentData>(createDefaultAssessmentData);

  const value = useMemo<AssessmentContextValue>(
    () => ({
      data,
      updateBusiness: (field, value) => {
        setData((previous) => ({
          ...previous,
          business: {
            ...previous.business,
            [field]: value
          }
        }));
      },
      updateWorkflowName: (id, workflowName) => {
        setData((previous) => ({
          ...previous,
          workflows: previous.workflows.map((workflow) =>
            workflow.id === id
              ? {
                  ...workflow,
                  workflowName
                }
              : workflow
          )
        }));
      },
      updateWorkflowRating: (id, field, value) => {
        setData((previous) => ({
          ...previous,
          workflows: previous.workflows.map((workflow) =>
            workflow.id === id
              ? {
                  ...workflow,
                  ratings: {
                    ...workflow.ratings,
                    [field]: value
                  }
                }
              : workflow
          )
        }));
      },
      addWorkflow: (name = "Custom Workflow") => {
        setData((previous) => ({
          ...previous,
          workflows: [...previous.workflows, createWorkflow(name)]
        }));
      },
      removeWorkflow: (id) => {
        setData((previous) => ({
          ...previous,
          workflows: previous.workflows.filter((workflow) => workflow.id !== id)
        }));
      },
      reset: () => setData(createDefaultAssessmentData())
    }),
    [data]
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment() {
  const context = useContext(AssessmentContext);

  if (!context) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }

  return context;
}
