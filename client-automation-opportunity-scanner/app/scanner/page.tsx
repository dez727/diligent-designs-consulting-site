import type { Metadata } from "next";
import { ScannerHome } from "@/components/ScannerHome";

export const metadata: Metadata = {
  title: "Automation Opportunity Scanner | Diligent Designs Consulting",
  description:
    "Score recurring workflows by business impact, manual effort, risk, and process clarity. Get a ranked shortlist of automation candidates and a clearer first move.",
  openGraph: {
    title: "Automation Opportunity Scanner | Diligent Designs Consulting",
    description:
      "Score recurring workflows by business impact, manual effort, risk, and process clarity. Get a ranked shortlist of automation candidates and a clearer first move.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation Opportunity Scanner | Diligent Designs Consulting",
    description:
      "Score recurring workflows by business impact, manual effort, risk, and process clarity. Get a ranked shortlist of automation candidates and a clearer first move.",
    images: ["/og-image.png"]
  }
};

export default function ScannerPage() {
  return <ScannerHome />;
}
