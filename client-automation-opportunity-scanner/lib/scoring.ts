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
  const workflowName = workflow.workflowName.toLowerCase();
  const frequencyLabel = getOptionLabel("frequency", workflow.ratings.frequency).toLowerCase();
  const complexityLabel = getOptionLabel("processComplexity", workflow.ratings.processComplexity).toLowerCase();

  let approach = "Create a lightweight workflow automation with trigger-based actions and status tracking.";
  const tools = ["Zapier", "Make", "Airtable"];
  let buildMode = "Low-code automation first";
  const buildOptions = ["Zapier / Make / n8n", "Airtable or Notion ops hub", "OpenAI Agents SDK for custom logic"];

  if (industry.toLowerCase().includes("service")) {
    approach = "Use form-to-CRM automations with automatic follow-up tasks and reminder sequences.";
    tools.splice(0, tools.length, "HubSpot", "Zapier", "Calendly", "OpenAI AgentKit");
    buildOptions.splice(0, buildOptions.length, "HubSpot workflow layer", "OpenAI AgentKit / Agents SDK", "Gemini function calling for Google Workspace");
  } else if (industry.toLowerCase().includes("retail")) {
    approach = "Automate order/event updates and exception alerts across sales and inventory tools.";
    tools.splice(0, tools.length, "Shopify Flow", "Make", "Slack", "Gemini ADK");
    buildOptions.splice(0, buildOptions.length, "Shopify Flow or Make", "Gemini ADK for inventory and support agents", "OpenAI Responses API for exception triage");
  } else if (industry.toLowerCase().includes("agency")) {
    approach = "Automate project handoffs, client updates, and internal QA checkpoints.";
    tools.splice(0, tools.length, "ClickUp", "Zapier", "Notion", "Claude Code");
    buildOptions.splice(0, buildOptions.length, "ClickUp / Notion operating system", "Claude Code or Codex-assisted implementation", "OpenAI Agents SDK for client-facing workflows");
  }

  if (workflowName.includes("lead") || workflowName.includes("intake") || workflowName.includes("qualification")) {
    buildMode = "Revenue ops agent";
    approach = "Route form fills into a CRM, enrich the lead record, score fit, and trigger the right follow-up sequence.";
    buildOptions.splice(0, buildOptions.length, "OpenAI AgentKit for lead triage", "HubSpot or Airtable CRM", "Gemini function calling for Gmail and Calendar handoffs");
  } else if (workflowName.includes("schedule") || workflowName.includes("appointment")) {
    buildMode = "Scheduling orchestration";
    approach = "Connect intake, availability, reminders, and no-show follow-up so scheduling stops depending on manual coordination.";
    buildOptions.splice(0, buildOptions.length, "Calendly / Google Calendar automation", "Gemini ADK for Google Workspace-heavy teams", "OpenAI Agents SDK for custom scheduling logic");
  } else if (workflowName.includes("invoice") || workflowName.includes("billing") || workflowName.includes("payment")) {
    buildMode = "Finance workflow guardrail";
    approach = "Automate draft invoice creation, reminders, status updates, and exception review while keeping approval checkpoints human-owned.";
    buildOptions.splice(0, buildOptions.length, "QuickBooks + Make or Zapier", "OpenAI Responses API for exception summaries", "Claude Code for custom approval portals");
  } else if (workflowName.includes("onboarding")) {
    buildMode = "Client onboarding agent";
    approach = "Turn kickoff, document collection, task assignment, and first-week check-ins into one guided onboarding system.";
    buildOptions.splice(0, buildOptions.length, "OpenAI AgentKit + ChatKit", "Notion / ClickUp implementation layer", "Claude Code or Codex-assisted custom portal");
  } else if (workflowName.includes("report") || workflowName.includes("analytics") || workflowName.includes("dashboard")) {
    buildMode = "Reporting intelligence layer";
    approach = "Pull recurring metrics into a standard report, summarize changes, flag anomalies, and package next actions for review.";
    buildOptions.splice(0, buildOptions.length, "Gemini ADK for Sheets / Looker workflows", "OpenAI Agents SDK for metric narratives", "Claude Code for dashboard and data connectors");
  }

  if (workflow.ratings.processComplexity === "judgmentHeavy") {
    buildMode = "Human-in-the-loop agent";
    buildOptions.push("OpenAI or Gemini agent with approval checkpoints");
  } else if (workflow.ratings.processComplexity === "ruleBased") {
    buildMode = buildMode === "Low-code automation first" ? "Rules-first automation" : buildMode;
    buildOptions.push("Direct workflow automation before custom code");
  }

  const rationale =
    priorityScore >= 80
      ? `High-value candidate: this process happens ${frequencyLabel}, carries meaningful operational impact (${impactScore}), and looks ${complexityLabel}.`
      : `Balanced candidate: this workflow shows steady impact (${impactScore}) and appears ${complexityLabel}, which keeps automation feasible (${easeScore}).`;

  return { rationale, approach, tools, buildMode, buildOptions };
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
