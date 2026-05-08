import Link from "next/link";
import { ContactForm } from "@/app/ContactForm";
import { ScrollAnimations } from "@/app/ScrollAnimations";
import { services } from "@/lib/services";

const signals = [
  "Manual handoffs slow down response time",
  "Reporting exists, but decisions still feel unclear",
  "Leads fall through gaps between tools",
  "AI experiments are scattered instead of operational"
];

const process = [
  ["01", "Diagnose", "Map the workflow as it actually runs: inputs, handoffs, data quality, and decisions."],
  ["02", "Prioritize", "Score opportunities by impact, manual effort, risk, clarity, and owner readiness."],
  ["03", "Automate", "Build the focused automation, dashboard, or AI support layer that removes real drag."],
  ["04", "Measure", "Track what changed, tighten the system, and choose the next improvement with evidence."]
];

const diagnosticFactors = [
  ["Impact", "91", "Revenue, response time, and customer experience"],
  ["Manual effort", "78", "Repeatable work that still depends on people moving data"],
  ["Risk", "64", "Failure points, exceptions, and handoff sensitivity"],
  ["Clarity", "86", "How cleanly the work can be described, owned, and measured"]
];

export default function HomePage() {
  return (
    <main id="main-content">
      <ScrollAnimations />
      <section className="hero-shell">
        <div className="hero-cinema" aria-hidden="true">
          <span className="cinema-plane plane-a" />
          <span className="cinema-plane plane-b" />
          <span className="cinema-node node-a" />
          <span className="cinema-node node-b" />
          <span className="cinema-rail rail-a" />
          <span className="cinema-rail rail-b" />
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title" data-animate="headline">
              <span>We help small</span>
              <span>businesses run</span>
              <span>smoother and make</span>
              <span>better decisions.</span>
            </h1>
            <p data-animate="fade-up" className="delay-1">
              Automation, marketing analytics, and practical AI for teams that want less manual work and clearer data
              to act on.
            </p>

            <div className="hero-actions delay-2" data-animate="fade-up">
              <Link className="button-primary" href="/scanner">
                Run the Scanner
              </Link>
              <a className="button-secondary dark button-conversation" href="#contact">
                Start a Conversation
              </a>
            </div>
          </div>

          <div className="system-map delay-2" aria-label="Automation and analytics system preview" data-animate="map">
            <div className="map-header">
              <span>Workflow signal</span>
              <strong>Automation readiness</strong>
            </div>
            <div className="map-rail">
              <span className="map-dot active" />
              <span className="map-line" />
              <span className="map-dot" />
              <span className="map-line" />
              <span className="map-dot" />
            </div>
            <div className="map-stack">
              <div>
                <span>Lead response</span>
                <strong>High impact</strong>
              </div>
              <div>
                <span>Campaign reporting</span>
                <strong>Decision gap</strong>
              </div>
              <div>
                <span>Client intake</span>
                <strong>Repeatable</strong>
              </div>
            </div>
            <div className="map-score">
              <span>Priority score</span>
              <strong data-count-to="87">0</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band intro-band">
        <div className="section-grid">
          <div data-animate="fade-up">
            <p className="eyebrow">What We Actually Do</p>
            <h2>Find the manual work costing you time, then build the system that handles it.</h2>
          </div>
          <p className="delay-1" data-animate="fade-up">
            We look at how your team works today, identify where time is lost to repetitive tasks and disconnected tools,
            and build focused automations, dashboards, and AI layers that make the day-to-day run smoother.
          </p>
        </div>
      </section>

      <section className="section-wrap problem-section">
        <div className="problem-layout">
          <div data-animate="fade-up">
            <p className="eyebrow">Where We Help</p>
            <h2>These problems sound familiar?</h2>
          </div>
          <div className="signal-list">
            {signals.map((signal, index) => (
              <p className={`delay-${index + 1}`} data-animate="signal" key={signal}>
                {signal}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap services-preview" id="services">
        <div className="section-heading" data-animate="fade-up">
          <p className="eyebrow">What You Get</p>
          <h2>Three ways we help your team move faster.</h2>
        </div>
        <div className="services-preview-grid">
          {services.map((service, index) => (
            <Link
              href="/services"
              className={`services-preview-card delay-${index + 1}`}
              data-animate="fade-up"
              key={service.title}
            >
              <span className="services-preview-index">{service.index}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <span className="service-link">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-wrap credibility-section" data-animate="fade-up">
        <div className="credibility-layout">
          <div className="credibility-copy">
            <p className="eyebrow">Why Work With Us</p>
            <h2>Real tools. Specific experience. No filler.</h2>
            <p>
              Diligent Designs Consulting is led by Desmond Adongo, an AI and automation consultant based in Oshkosh, WI.
              This is not a pitch deck operation. Every engagement starts with a diagnostic, uses real scoring models,
              and produces systems your team can actually maintain.
            </p>
          </div>
          <div className="credibility-grid">
            <div className="credibility-card" data-animate="fade-up">
              <strong>Working diagnostic tool</strong>
              <p>
                The Automation Opportunity Scanner on this site is the same scoring model used in client engagements.
                You can run it yourself before we ever talk.
              </p>
            </div>
            <div className="credibility-card delay-1" data-animate="fade-up">
              <strong>Hands-on consulting stack</strong>
              <p>
                Claude, n8n, Python, SQL, GA4, Looker Studio, HubSpot, and Power Automate. Not a slide deck about AI.
                Actual implementation.
              </p>
            </div>
            <div className="credibility-card delay-2" data-animate="fade-up">
              <strong>Background that fits</strong>
              <p>
                UW System Board of Regents member. BS in Interactive Web Management with Digital Marketing and
                Information Systems credentials. Currently consulting for an active investment firm on AI-assisted
                database and workflow automation.
              </p>
            </div>
          </div>
          <blockquote className="testimonial" data-animate="fade-up">
            <p>
              He takes the time to truly understand your business and goals. He helped me build several Zapier
              automations and devoted a lot of time to making sure we achieved our objectives. He even helped me
              understand how the systems worked, making him a great person to work with if you are not tech-savvy.
              His attention to detail is excellent.
            </p>
            <footer>
              <strong>Anna</strong>
              <span>Florence Strings</span>
            </footer>
          </blockquote>
          <blockquote className="testimonial delay-1" data-animate="fade-up">
            <p>
              He had a remarkable ability to take concepts and ground them immediately in my own real-world
              projects, making everything relevant and accessible rather than abstract or overwhelming. His
              diligence and attentiveness made what could have been an intimidating process into something
              genuinely enjoyable. I recommend Desmond without reservation.
            </p>
            <footer>
              <strong>Matt Mikkelsen</strong>
              <span>Speed Investments LLC</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="section-band process-band" data-process-band>
        <span className="section-side-label" aria-hidden="true">
          Operating method
        </span>
        <div className="process-inner">
          <div className="section-heading process-heading" data-animate="fade-up">
            <p className="eyebrow">Method</p>
            <h2>Find the first useful improvement, then build from there.</h2>
            <p>
              A slow, practical sequence for turning scattered work into a system your team can trust.
            </p>
            <div className="process-progress" aria-hidden="true">
              <span />
            </div>
          </div>
          <div className="process-grid">
            {process.map(([step, title, copy], index) => (
              <article className={`delay-${index + 1}`} data-animate="process" data-process-step key={step}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="process-cta" data-animate="fade-up">
            <Link className="link-arrow" href="/scanner">
              See where your workflows stand
            </Link>
            <span className="process-cta-divider" aria-hidden="true" />
            <Link className="link-arrow" href="/#contact">
              Start with step one
            </Link>
          </div>
        </div>
      </section>

      <section className="section-wrap scanner-feature" data-animate="fade-up" id="scanner">
        <div className="scanner-copy">
          <p className="eyebrow">Featured Tool</p>
          <h2>Start with the Automation Opportunity Scanner.</h2>
          <p>
            Score recurring work by business impact, manual effort, risk, and process clarity. The output gives you a
            ranked shortlist of automation candidates and a clearer first move.
          </p>
          <Link className="button-primary" href="/scanner">
            Open the Scanner
          </Link>
        </div>
        <div className="diagnostic-panel delay-1" data-animate="diagnostic-panel">
          <div className="diagnostic-orbit" aria-label="Automation opportunity diagnostic scorecard">
            <span className="orbit-ring outer" />
            <span className="orbit-ring middle" />
            <span className="orbit-ring inner" />
            {diagnosticFactors.map(([label, value], index) => (
              <span className={`orbit-node node-${index + 1}`} key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
            <div className="orbit-core">
              <span>Scanner</span>
              <strong>87</strong>
              <small>Priority<br />score</small>
            </div>
          </div>
          <div className="diagnostic-readout">
            <div className="panel-row top">
              <span>Top candidate</span>
              <strong>Customer follow-up routing</strong>
            </div>
            <div className="diagnostic-bars">
              {diagnosticFactors.map(([label, value]) => (
                <p key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <i style={{ width: `${value}%` }} />
                </p>
              ))}
            </div>
            <div className="panel-grid">
              <p>
                <strong>Impact</strong>
                Revenue and response time
              </p>
              <p>
                <strong>Build path</strong>
                CRM, email, AI summary
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section final-cta" data-animate="cta" id="contact">
        <div className="contact-copy" data-animate="fade-up">
          <p className="eyebrow">Start A Conversation</p>
          <h2>Show me where the work is getting stuck.</h2>
          <p>
            I will help identify the first system worth cleaning up, whether that is follow-up, reporting, automation,
            or practical AI adoption.
          </p>
          <div className="contact-proof" aria-label="What to expect">
            <span>Clear first read</span>
            <span>No pressure pitch</span>
            <span>Practical next step</span>
          </div>
          <p className="contact-alt">
            Not ready for a conversation yet?{" "}
            <Link href="/scanner">Run the Scanner first</Link> and see where your workflows stand.
          </p>
        </div>
        <div className="contact-panel delay-1" data-animate="fade-up">
          <div className="contact-panel-heading">
            <span>Lead signal</span>
            <strong>Tell me where the drag is</strong>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
