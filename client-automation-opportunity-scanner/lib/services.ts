export const services = [
  {
    index: "01",
    title: "Automation strategy",
    copy: "Map recurring work, score what matters, and build the first automation where it will actually remove friction.",
    signal: "First workflow worth fixing",
    tags: ["Process map", "Priority score", "Build path"],
    visual: "workflow" as const
  },
  {
    index: "02",
    title: "Marketing analytics",
    copy: "Turn campaigns, leads, channels, and follow-up activity into reporting that supports better decisions.",
    signal: "Cleaner decision surface",
    tags: ["Attribution", "Dashboard", "Next action"],
    visual: "analytics" as const
  },
  {
    index: "03",
    title: "AI implementation",
    copy: "Use AI where it fits the workflow: intake, routing, drafts, summaries, internal tools, and decision support.",
    signal: "Practical AI in motion",
    tags: ["Summaries", "Routing", "Internal tools"],
    visual: "ai" as const
  }
];

export type Service = (typeof services)[number];
