import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AssessmentProvider } from "@/app/providers";

export const metadata: Metadata = {
  title: "Diligent Designs Consulting | AI, Automation, and Marketing Analytics",
  description:
    "AI, automation, and digital marketing strategy for small and medium-size businesses ready to clean up operations, reporting, and follow-up."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}
