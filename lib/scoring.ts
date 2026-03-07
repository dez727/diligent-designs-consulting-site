import type { AssessmentData, OpportunityRecommendation, OpportunityScore, ScoredOpportunity, WorkflowPainPoint } from "@/lib/types";

const round2 = (value: number): number => Math.round(value * 100) / 100;

export const calculateScores = (workflow: WorkflowPainPoint): OpportunityScore => {
  const { frequency, manualEffort, timeConsumed, errorRisk, businessImportance, easeOfAutomation } = workflow.ratings;

  const impactScore = round2(((frequency + manualEffort + timeConsumed + errorRisk + businessImportance) / 25) * 100);
  const easeScore = round2((easeOfAutomation / 5) * 100);
  const priorityScore = round2(impactScore * 0.72 + easeScore * 0.28);

  return { impactScore, easeScore, priorityScore };
};

const buildRecommendation = (workflow: WorkflowPainPoint, assessment: AssessmentData, score: OpportunityScore): OpportunityRecommendation => {
  const { industry } = assessment.business;
  const { priorityScore, impactScore, easeScore } = score;

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
      ? `High-value candidate: this workflow is very impactful (${impactScore}) and sufficiently easy to automate (${easeScore}).`
      : `Balanced candidate: this workflow has meaningful impact (${impactScore}) with workable automation feasibility (${easeScore}).`;

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
