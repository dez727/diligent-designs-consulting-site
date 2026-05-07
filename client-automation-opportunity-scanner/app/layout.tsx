import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AssessmentProvider } from "@/app/providers";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const siteUrl = "https://diligentdesignsconsulting.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Diligent Designs Consulting | AI, Automation, and Marketing Analytics",
  description:
    "AI, automation, and digital marketing strategy for small and medium-size businesses ready to clean up operations, reporting, and follow-up.",
  icons: {
    icon: [
      { url: "/ddc-favicon.png", sizes: "256x256", type: "image/png" },
      { url: "/ddc-logo.svg", type: "image/svg+xml" }
    ],
    shortcut: "/ddc-favicon.png",
    apple: "/ddc-favicon.png"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Diligent Designs Consulting",
    title: "Diligent Designs Consulting | AI, Automation, and Marketing Analytics",
    description:
      "AI, automation, and digital marketing strategy for small and medium-size businesses ready to clean up operations, reporting, and follow-up.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diligent Designs Consulting — AI, Automation, and Marketing Analytics"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Diligent Designs Consulting | AI, Automation, and Marketing Analytics",
    description:
      "AI, automation, and digital marketing strategy for small and medium-size businesses ready to clean up operations, reporting, and follow-up.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AssessmentProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <SiteNav />
          {children}
          <SiteFooter />
        </AssessmentProvider>
      </body>
    </html>
  );
}
