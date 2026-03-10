export type FrequencyValue = "rarely" | "monthly" | "weekly" | "daily";
export type ManualEffortValue = "partiallyAutomated" | "mostlyManual" | "fullyManual";
export type TimeConsumedValue = "under1Hour" | "oneToFiveHours" | "overFiveHours";
export type ErrorRiskValue = "minorRework" | "customerVisible" | "financialOrCompliance";
export type BusinessImportanceValue = "niceToHave" | "important" | "missionCritical";
export type ProcessComplexityValue = "judgmentHeavy" | "someExceptions" | "ruleBased";

export type WorkflowRatings = {
  frequency: FrequencyValue;
  manualEffort: ManualEffortValue;
  timeConsumed: TimeConsumedValue;
  errorRisk: ErrorRiskValue;
  businessImportance: BusinessImportanceValue;
  processComplexity: ProcessComplexityValue;
};

export type WorkflowRatingField = keyof WorkflowRatings;

export type WorkflowPainPoint = {
  id: string;
  workflowName: string;
  ratings: WorkflowRatings;
};

export type BusinessProfile = {
  businessName: string;
  industry: string;
  teamSize: string;
  currentTools: string;
};

export type AssessmentData = {
  business: BusinessProfile;
  workflows: WorkflowPainPoint[];
};

export type OpportunityScore = {
  impactScore: number;
  easeScore: number;
  priorityScore: number;
};

export type OpportunityRecommendation = {
  rationale: string;
  approach: string;
  tools: string[];
};

export type ScoredOpportunity = WorkflowPainPoint & OpportunityScore & OpportunityRecommendation;

export type SegmentedOption<TValue extends string> = {
  value: TValue;
  label: string;
  description: string;
  score: number;
};
