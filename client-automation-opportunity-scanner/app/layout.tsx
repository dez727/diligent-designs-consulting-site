import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AssessmentProvider } from "@/app/providers";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";

const siteUrl = "https://diligentdesignsconsulting.com";
const siteName = "Diligent Designs Consulting";
const siteDescription =
  "AI, automation, and digital marketing strategy for small and medium-size businesses ready to clean up operations, reporting, and follow-up.";
const googleAnalyticsId = "G-B8PCJD8CNZ";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI, Automation & Analytics | Diligent Designs",
  description: siteDescription,
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
    siteName,
    title: "AI, Automation & Analytics | Diligent Designs",
    description: siteDescription,
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
    title: "AI, Automation & Analytics | Diligent Designs",
    description: siteDescription,
    images: ["/og-image.png"]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/ddc-logo-nav.png`,
      image: `${siteUrl}/og-image.png`,
      description: siteDescription,
      founder: {
        "@type": "Person",
        name: "Desmond Adongo"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}/og-image.png`,
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Oshkosh",
        addressRegion: "WI",
        addressCountry: "US"
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Wisconsin"
        },
        {
          "@type": "Country",
          name: "United States"
        }
      ],
      parentOrganization: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`
      }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `
          }}
        />
      </head>
      <body>
        <AssessmentProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <SiteNav />
          <JsonLd data={organizationSchema} />
          {children}
          <SiteFooter />
        </AssessmentProvider>
      </body>
    </html>
  );
}
