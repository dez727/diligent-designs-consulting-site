export type RatingValue = 1 | 2 | 3 | 4 | 5;

export type WorkflowRatings = {
  frequency: RatingValue;
  manualEffort: RatingValue;
  timeConsumed: RatingValue;
  errorRisk: RatingValue;
  businessImportance: RatingValue;
  easeOfAutomation: RatingValue;
};

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
