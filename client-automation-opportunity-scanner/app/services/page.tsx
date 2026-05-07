import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { ServiceVisual } from "@/components/ServiceVisual";
import { ScrollAnimations } from "@/app/ScrollAnimations";

export const metadata: Metadata = {
  title: "Services | Diligent Designs Consulting",
  description:
    "Automation strategy, marketing analytics, and AI implementation for small businesses. See how each service works and what you get.",
  openGraph: {
    title: "Services | Diligent Designs Consulting",
    description:
      "Automation strategy, marketing analytics, and AI implementation for small businesses. See how each service works and what you get.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Diligent Designs Consulting",
    description:
      "Automation strategy, marketing analytics, and AI implementation for small businesses. See how each service works and what you get.",
    images: ["/og-image.png"]
  }
};

const details: Record<string, { what: string; result: string }> = {
  workflow: {
    what: "We map your recurring workflows, score each one by business impact, manual effort, risk, and process clarity, then build the first automation where it will remove the most friction. This is not a general audit. It is a focused engagement that produces a working system.",
    result: "A prioritized list of automation candidates, a working first automation, and a clear path to the next improvement."
  },
  analytics: {
    what: "We connect your marketing channels, campaign data, lead sources, and follow-up activity into dashboards and reports that actually support decisions. If your team has the data but still does not know what to do with it, this is the engagement.",
    result: "Attribution you can trust, dashboards your team will use, and a clearer picture of what is working and what to change."
  },
  ai: {
    what: "We identify specific places in your workflow where AI fits: intake processing, lead routing, draft generation, internal summaries, and decision support. No general AI strategy decks. We build the layer that handles real work.",
    result: "AI tools wired into your existing workflow, handling tasks your team currently does manually."
  }
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <ScrollAnimations />
      <section className="services-hero">
        <div className="services-hero-inner" data-animate="fade-up">
          <p className="eyebrow">Services</p>
          <h1>Three ways we help your team move faster.</h1>
          <p>
            Every engagement starts with a diagnostic and ends with a working system. Pick the lane that fits your
            problem, or start a conversation and we will figure it out together.
          </p>
        </div>
      </section>

      <section className="services-detail-section">
        {services.map((service, index) => (
          <article
            className={`service-card service-panel service-detail delay-${index + 1}`}
            data-animate="service-panel"
            data-service-panel
            key={service.title}
          >
            <div className="service-copy">
              <span>{service.index}</span>
              <h2>{service.title}</h2>
              <p>{service.copy}</p>
              <div className="service-detail-body">
                <div>
                  <strong>What this looks like</strong>
                  <p>{details[service.visual].what}</p>
                </div>
                <div>
                  <strong>What you walk away with</strong>
                  <p>{details[service.visual].result}</p>
                </div>
              </div>
              <div className="service-tags" aria-label={`${service.title} focus areas`}>
                {service.tags.map((tag) => (
                  <small key={tag}>{tag}</small>
                ))}
              </div>
              <Link className="service-link" href="/#contact">
                Start a conversation <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <ServiceVisual service={service} />
          </article>
        ))}
      </section>

      <section className="services-cta" data-animate="fade-up">
        <h2>Not sure which one fits?</h2>
        <p>
          Most engagements touch more than one lane. Start a conversation and we will figure out the right first move
          based on where your team is spending the most time.
        </p>
        <div className="services-cta-actions">
          <Link className="button-primary" href="/#contact">
            Start a Conversation
          </Link>
          <Link className="button-secondary" href="/scanner">
            Run the Scanner
          </Link>
        </div>
      </section>
    </main>
  );
}
