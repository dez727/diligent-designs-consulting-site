import type { SegmentedOption, WorkflowRatingField, WorkflowRatings } from "@/lib/types";

type RatingQuestion<TField extends WorkflowRatingField> = {
  field: TField;
  label: string;
  prompt: string;
  options: readonly SegmentedOption<WorkflowRatings[TField]>[];
};

export const workflowQuestions: { [K in WorkflowRatingField]: RatingQuestion<K> } = {
  frequency: {
    field: "frequency",
    label: "Frequency",
    prompt: "How often does this workflow come up?",
    options: [
      { value: "rarely", label: "Rarely", description: "A few times per quarter", score: 1 },
      { value: "monthly", label: "Monthly", description: "Shows up every month", score: 2 },
      { value: "weekly", label: "Weekly", description: "Happens most weeks", score: 3 },
      { value: "daily", label: "Daily", description: "Part of the daily grind", score: 4 }
    ]
  },
  manualEffort: {
    field: "manualEffort",
    label: "Manual Effort",
    prompt: "How much of the work is still done by hand?",
    options: [
      { value: "partiallyAutomated", label: "Partially Automated", description: "Some steps are already assisted", score: 1 },
      { value: "mostlyManual", label: "Mostly Manual", description: "A few helpers, but people do most of it", score: 2 },
      { value: "fullyManual", label: "Fully Manual", description: "Handled entirely by people", score: 3 }
    ]
  },
  timeConsumed: {
    field: "timeConsumed",
    label: "Time Consumed",
    prompt: "How much team time does this take each week?",
    options: [
      { value: "under1Hour", label: "<1 hr / wk", description: "Minimal time drain", score: 1 },
      { value: "oneToFiveHours", label: "1-5 hrs / wk", description: "Noticeable recurring time", score: 2 },
      { value: "overFiveHours", label: "5+ hrs / wk", description: "Heavy weekly lift", score: 3 }
    ]
  },
  errorRisk: {
    field: "errorRisk",
    label: "Error Risk",
    prompt: "If this goes wrong, how serious is the fallout?",
    options: [
      { value: "minorRework", label: "Minor Rework", description: "Mistakes are easy to catch and fix", score: 1 },
      { value: "customerVisible", label: "Customer Visible", description: "Errors create delays or client friction", score: 2 },
      { value: "financialOrCompliance", label: "Financial / Compliance", description: "Mistakes could cost money or create risk", score: 3 }
    ]
  },
  businessImportance: {
    field: "businessImportance",
    label: "Business Importance",
    prompt: "How important is this workflow to the business?",
    options: [
      { value: "niceToHave", label: "Nice to Have", description: "Helpful, but not core", score: 1 },
      { value: "important", label: "Important", description: "Matters to daily operations", score: 2 },
      { value: "missionCritical", label: "Mission Critical", description: "Directly affects revenue or delivery", score: 3 }
    ]
  },
  processComplexity: {
    field: "processComplexity",
    label: "Process Complexity",
    prompt: "How predictable is the process from start to finish?",
    options: [
      { value: "judgmentHeavy", label: "Requires Judgment", description: "Depends heavily on human decisions", score: 1 },
      { value: "someExceptions", label: "Some Exceptions", description: "Mostly repeatable with occasional edge cases", score: 2 },
      { value: "ruleBased", label: "Rule Based", description: "Clear steps and predictable rules", score: 3 }
    ]
  }
};

export const workflowQuestionList = [
  workflowQuestions.frequency,
  workflowQuestions.manualEffort,
  workflowQuestions.timeConsumed,
  workflowQuestions.errorRisk,
  workflowQuestions.businessImportance,
  workflowQuestions.processComplexity
] as const;

export const getOptionScore = <TField extends WorkflowRatingField>(
  field: TField,
  value: WorkflowRatings[TField]
): number => {
  const option = workflowQuestions[field].options.find((entry) => entry.value === value);
  return option?.score ?? 0;
};

export const getMaxOptionScore = (field: WorkflowRatingField): number =>
  Math.max(...workflowQuestions[field].options.map((option) => option.score));

export const getOptionLabel = <TField extends WorkflowRatingField>(
  field: TField,
  value: WorkflowRatings[TField]
): string => workflowQuestions[field].options.find((entry) => entry.value === value)?.label ?? "";
