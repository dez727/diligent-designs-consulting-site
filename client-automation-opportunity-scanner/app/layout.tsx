import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AssessmentProvider } from "@/app/providers";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Client Automation Opportunity Scanner",
  description: "Simple assessment to discover high-priority automation opportunities for small businesses."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSans.variable}`}>
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}
