import type { AssessmentData, WorkflowPainPoint } from "@/lib/types";

const createWorkflow = (id: string, workflowName: string): WorkflowPainPoint => ({
  id,
  workflowName,
  ratings: {
    frequency: 3,
    manualEffort: 3,
    timeConsumed: 3,
    errorRisk: 3,
    businessImportance: 3,
    easeOfAutomation: 3
  }
});

export const defaultWorkflowPainPoints: WorkflowPainPoint[] = [
  createWorkflow("w1", "Lead Intake & Qualification"),
  createWorkflow("w2", "Appointment Scheduling"),
  createWorkflow("w3", "Invoice Creation & Follow-up"),
  createWorkflow("w4", "Customer Onboarding"),
  createWorkflow("w5", "Weekly Reporting")
];

const cloneWorkflow = (workflow: WorkflowPainPoint): WorkflowPainPoint => ({
  ...workflow,
  ratings: { ...workflow.ratings }
});

export const createDefaultAssessmentData = (): AssessmentData => ({
  business: {
    businessName: "",
    industry: "",
    teamSize: "",
    currentTools: ""
  },
  workflows: defaultWorkflowPainPoints.map(cloneWorkflow)
});
