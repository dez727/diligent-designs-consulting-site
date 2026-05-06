import Link from "next/link";

const services = [
  {
    title: "Automation strategy",
    copy: "Map recurring work, score what matters, and build the first automation where it will actually remove friction."
  },
  {
    title: "Marketing analytics",
    copy: "Turn campaigns, leads, channels, and follow-up activity into reporting that supports better decisions."
  },
  {
    title: "AI implementation",
    copy: "Use AI where it fits the workflow: intake, routing, drafts, summaries, internal tools, and decision support."
  }
];

const signals = [
  "Manual handoffs slow down response time",
  "Reporting exists, but decisions still feel unclear",
  "Leads fall through gaps between tools",
  "AI experiments are scattered instead of operational"
];

const process = [
  ["01", "Audit", "Identify the workflows, data gaps, and marketing decisions creating drag."],
  ["02", "Prioritize", "Score opportunities by impact, effort, risk, and process clarity."],
  ["03", "Build", "Implement focused automations, reporting surfaces, and practical AI support."],
  ["04", "Refine", "Measure what changed, tighten the system, and choose the next improvement."]
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-shell">
        <nav className="site-nav" aria-label="Main navigation">
          <Link className="brand-mark" href="/">
            <span className="brand-monogram">DD</span>
            <span>
              <strong>Diligent Designs</strong>
              <small>Consulting</small>
            </span>
          </Link>
          <div className="nav-actions">
            <Link href="/scanner">Scanner</Link>
            <a href="mailto:hello@diligentdesignsconsulting.com">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Cleaner systems for teams ready to automate the right work.</h1>
            <p>
              AI, automation, and digital marketing strategy for small and medium-size businesses that need clearer
              reporting, faster follow-up, and practical systems they can trust.
            </p>

            <div className="hero-actions">
              <Link className="button-primary" href="/scanner">
                Run the Scanner
              </Link>
              <a className="button-secondary dark" href="mailto:hello@diligentdesignsconsulting.com">
                Start a Conversation
              </a>
            </div>
          </div>

          <div className="system-map" aria-label="Automation and analytics system preview">
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
              <strong>87</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band intro-band">
        <div className="section-grid">
          <div>
            <p className="eyebrow">Practical AI Adoption</p>
            <h2>Build around the business you already run.</h2>
          </div>
          <p>
            The goal is not more software for its own sake. It is better handoffs, cleaner data, stronger follow-up, and
            marketing decisions that are easier to act on.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <div className="problem-layout">
          <div>
            <p className="eyebrow">Where We Help</p>
            <h2>When work is moving, but the system is not keeping up.</h2>
          </div>
          <div className="signal-list">
            {signals.map((signal) => (
              <p key={signal}>{signal}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap services-section">
        <div className="section-heading">
          <p className="eyebrow">Consulting Focus</p>
          <h2>Strategy, automation, and analytics in one operating lane.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band process-band">
        <div className="section-heading">
          <p className="eyebrow">Method</p>
          <h2>Find the first useful improvement, then build from there.</h2>
        </div>
        <div className="process-grid">
          {process.map(([step, title, copy]) => (
            <article key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap scanner-feature">
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
        <div className="scanner-panel">
          <div className="panel-row top">
            <span>Top candidate</span>
            <strong>Customer follow-up routing</strong>
          </div>
          <div className="score-bars">
            <span style={{ width: "91%" }} />
            <span style={{ width: "78%" }} />
            <span style={{ width: "64%" }} />
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
      </section>

      <section className="final-cta">
        <div>
          <h2>Ready to clean up the next system?</h2>
          <p>Bring the workflow, the reporting problem, or the marketing question. We will find the first practical move.</p>
        </div>
        <a className="button-secondary dark" href="mailto:hello@diligentdesignsconsulting.com">
          Start a Conversation
        </a>
      </section>
    </main>
  );
}
