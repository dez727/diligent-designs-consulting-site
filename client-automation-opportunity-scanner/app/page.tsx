import Link from "next/link";
import { ContactForm } from "@/app/ContactForm";
import { ScrollAnimations } from "@/app/ScrollAnimations";

const services = [
  {
    index: "01",
    title: "Automation strategy",
    copy: "Map recurring work, score what matters, and build the first automation where it will actually remove friction.",
    signal: "First workflow worth fixing",
    tags: ["Process map", "Priority score", "Build path"],
    visual: "workflow"
  },
  {
    index: "02",
    title: "Marketing analytics",
    copy: "Turn campaigns, leads, channels, and follow-up activity into reporting that supports better decisions.",
    signal: "Cleaner decision surface",
    tags: ["Attribution", "Dashboard", "Next action"],
    visual: "analytics"
  },
  {
    index: "03",
    title: "AI implementation",
    copy: "Use AI where it fits the workflow: intake, routing, drafts, summaries, internal tools, and decision support.",
    signal: "Practical AI in motion",
    tags: ["Summaries", "Routing", "Internal tools"],
    visual: "ai"
  }
];

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
              <span>businesses automate</span>
              <span>the work that</span>
              <span>slows them down.</span>
            </h1>
            <p data-animate="fade-up" className="delay-1">
              Follow-up, reporting, lead routing, and the manual processes your team handles every week. We build the
              systems that take care of it.
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
            <p className="eyebrow">Practical AI Adoption</p>
            <h2>Build around the business you already run.</h2>
          </div>
          <p className="delay-1" data-animate="fade-up">
            The goal is not more software for its own sake. It is better handoffs, cleaner data, stronger follow-up, and
            marketing decisions that are easier to act on.
          </p>
        </div>
      </section>

      <section className="section-wrap problem-section">
        <div className="problem-layout">
          <div data-animate="fade-up">
            <p className="eyebrow">Where We Help</p>
            <h2>When work is moving, but the system is not keeping up.</h2>
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

      <section className="section-wrap services-section" id="services">
        <div className="section-heading" data-animate="fade-up">
          <p className="eyebrow">Consulting Focus</p>
          <h2>Strategy, automation, and analytics in one operating lane.</h2>
        </div>
        <div className="service-showcase">
          {services.map((service, index) => (
            <article
              className={`service-card service-panel delay-${index + 1}`}
              data-animate="service-panel"
              data-service-panel
              key={service.title}
            >
              <div className="service-copy">
                <span>{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <div className="service-tags" aria-label={`${service.title} focus areas`}>
                  {service.tags.map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
                <a className="service-link" href="#contact">
                  Start a conversation <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <div className={`service-visual service-visual-${service.visual}`} aria-hidden="true">
                {service.visual === "workflow" ? (
                  <>
                    <div className="sv-header">
                      <span className="sv-label">Process map</span>
                      <span className="sv-status">
                        <i className="sv-dot sv-dot--live" />
                        Scanning
                      </span>
                    </div>
                    <div className="sv-flow">
                      <div className="sv-node sv-node--source">
                        <small>Intake</small>
                        <strong>12</strong>
                        <span>tasks/wk</span>
                      </div>
                      <svg className="sv-edge" viewBox="0 0 48 24"><path d="M0 12h48" /><path d="M40 6l8 6-8 6" /></svg>
                      <div className="sv-node sv-node--process">
                        <small>Score</small>
                        <strong>87</strong>
                        <span>priority</span>
                      </div>
                      <svg className="sv-edge" viewBox="0 0 48 24"><path d="M0 12h48" /><path d="M40 6l8 6-8 6" /></svg>
                      <div className="sv-node sv-node--target">
                        <small>Build</small>
                        <strong>3</strong>
                        <span>automations</span>
                      </div>
                    </div>
                    <div className="sv-metrics">
                      <div className="sv-metric">
                        <span className="sv-metric-label">Manual effort removed</span>
                        <div className="sv-bar"><i style={{ width: "78%" }} /></div>
                        <span className="sv-metric-value">78%</span>
                      </div>
                      <div className="sv-metric">
                        <span className="sv-metric-label">Process clarity</span>
                        <div className="sv-bar"><i style={{ width: "91%" }} /></div>
                        <span className="sv-metric-value">91%</span>
                      </div>
                    </div>
                    <div className="sv-footer">
                      <span className="sv-signal">{service.signal}</span>
                    </div>
                  </>
                ) : null}

                {service.visual === "analytics" ? (
                  <>
                    <div className="sv-header">
                      <span className="sv-label">Decision surface</span>
                      <span className="sv-status">
                        <i className="sv-dot sv-dot--live" />
                        Live
                      </span>
                    </div>
                    <div className="sv-channels">
                      <div className="sv-channel">
                        <span className="sv-channel-name">Organic</span>
                        <div className="sv-channel-bar"><i style={{ width: "68%" }} /></div>
                        <span className="sv-channel-val">68%</span>
                      </div>
                      <div className="sv-channel">
                        <span className="sv-channel-name">Paid</span>
                        <div className="sv-channel-bar sv-channel-bar--alt"><i style={{ width: "42%" }} /></div>
                        <span className="sv-channel-val">42%</span>
                      </div>
                      <div className="sv-channel">
                        <span className="sv-channel-name">Referral</span>
                        <div className="sv-channel-bar"><i style={{ width: "85%" }} /></div>
                        <span className="sv-channel-val">85%</span>
                      </div>
                      <div className="sv-channel">
                        <span className="sv-channel-name">Direct</span>
                        <div className="sv-channel-bar sv-channel-bar--alt"><i style={{ width: "31%" }} /></div>
                        <span className="sv-channel-val">31%</span>
                      </div>
                    </div>
                    <div className="sv-kpi-row">
                      <div className="sv-kpi">
                        <small>Attribution</small>
                        <strong>Clearer</strong>
                      </div>
                      <div className="sv-kpi-divider" />
                      <div className="sv-kpi">
                        <small>Decision speed</small>
                        <strong>2.4× faster</strong>
                      </div>
                    </div>
                    <div className="sv-footer">
                      <span className="sv-signal">{service.signal}</span>
                    </div>
                  </>
                ) : null}

                {service.visual === "ai" ? (
                  <>
                    <div className="sv-header">
                      <span className="sv-label">AI routing</span>
                      <span className="sv-status">
                        <i className="sv-dot sv-dot--live" />
                        Processing
                      </span>
                    </div>
                    <div className="sv-pipeline">
                      <div className="sv-pipe-stage">
                        <div className="sv-pipe-icon">
                          <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5"/><path d="M4 9h16M9 4v16" stroke="currentColor" strokeWidth="1.5"/></svg>
                        </div>
                        <span>Ingest</span>
                        <small>Raw input</small>
                      </div>
                      <div className="sv-pipe-connector"><i /><i /><i /></div>
                      <div className="sv-pipe-stage sv-pipe-stage--active">
                        <div className="sv-pipe-icon">
                          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </div>
                        <span>Process</span>
                        <small>AI layer</small>
                      </div>
                      <div className="sv-pipe-connector"><i /><i /><i /></div>
                      <div className="sv-pipe-stage">
                        <div className="sv-pipe-icon">
                          <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" stroke="currentColor" strokeWidth="1.5"/><path d="M12 13l9-5M12 13v9M12 13L3 8" stroke="currentColor" strokeWidth="1.5"/></svg>
                        </div>
                        <span>Route</span>
                        <small>Decision</small>
                      </div>
                    </div>
                    <div className="sv-ai-outputs">
                      <div className="sv-ai-output">
                        <i className="sv-dot sv-dot--live" />
                        <span>Lead summary → CRM</span>
                      </div>
                      <div className="sv-ai-output">
                        <i className="sv-dot sv-dot--live" />
                        <span>Route to owner</span>
                      </div>
                      <div className="sv-ai-output">
                        <i className="sv-dot" />
                        <span>Draft follow-up</span>
                      </div>
                    </div>
                    <div className="sv-footer">
                      <span className="sv-signal">{service.signal}</span>
                    </div>
                  </>
                ) : null}
              </div>
            </article>
          ))}
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
              <small>Priority score</small>
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
