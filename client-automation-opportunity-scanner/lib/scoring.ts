import { getMaxOptionScore, getOptionLabel, getOptionScore } from "@/lib/assessment-options";
import type { AssessmentData, OpportunityRecommendation, OpportunityScore, ScoredOpportunity, WorkflowPainPoint } from "@/lib/types";

const round2 = (value: number): number => Math.round(value * 100) / 100;

export const calculateScores = (workflow: WorkflowPainPoint): OpportunityScore => {
  const impactFields = ["frequency", "manualEffort", "timeConsumed", "errorRisk", "businessImportance"] as const;
  const normalizedImpactValues = impactFields.map((field) => {
    const score = getOptionScore(field, workflow.ratings[field]);
    return score / getMaxOptionScore(field);
  });

  const impactScore = round2((normalizedImpactValues.reduce((sum, value) => sum + value, 0) / impactFields.length) * 100);
  const easeScore = round2(
    (getOptionScore("processComplexity", workflow.ratings.processComplexity) / getMaxOptionScore("processComplexity")) * 100
  );
  const priorityScore = round2(impactScore * 0.75 + easeScore * 0.25);

  return { impactScore, easeScore, priorityScore };
};

const buildRecommendation = (workflow: WorkflowPainPoint, assessment: AssessmentData, score: OpportunityScore): OpportunityRecommendation => {
  const { industry } = assessment.business;
  const { priorityScore, impactScore, easeScore } = score;
  const frequencyLabel = getOptionLabel("frequency", workflow.ratings.frequency).toLowerCase();
  const complexityLabel = getOptionLabel("processComplexity", workflow.ratings.processComplexity).toLowerCase();

  let approach = "Create a lightweight workflow automation with trigger-based actions and status tracking.";
  const tools = ["Zapier", "Make", "Airtable"];

  if (industry.toLowerCase().includes("service")) {
    approach = "Use form-to-CRM automations with automatic follow-up tasks and reminder sequences.";
    tools.splice(0, tools.length, "HubSpot", "Zapier", "Calendly");
  } else if (industry.toLowerCase().includes("retail")) {
    approach = "Automate order/event updates and exception alerts across sales and inventory tools.";
    tools.splice(0, tools.length, "Shopify Flow", "Make", "Slack");
  } else if (industry.toLowerCase().includes("agency")) {
    approach = "Automate project handoffs, client updates, and internal QA checkpoints.";
    tools.splice(0, tools.length, "ClickUp", "Zapier", "Notion");
  }

  const rationale =
    priorityScore >= 80
      ? `High-value candidate: this process happens ${frequencyLabel}, carries meaningful operational impact (${impactScore}), and looks ${complexityLabel}.`
      : `Balanced candidate: this workflow shows steady impact (${impactScore}) and appears ${complexityLabel}, which keeps automation feasible (${easeScore}).`;

  return { rationale, approach, tools };
};

export const getTopOpportunities = (assessment: AssessmentData, maxItems = 3): ScoredOpportunity[] => {
  return assessment.workflows
    .map((workflow) => {
      const score = calculateScores(workflow);
      const recommendation = buildRecommendation(workflow, assessment, score);
      return {
        ...workflow,
        ...score,
        ...recommendation
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, maxItems);
};
