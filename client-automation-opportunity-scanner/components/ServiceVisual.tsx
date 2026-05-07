import type { Service } from "@/lib/services";

export function ServiceVisual({ service }: { service: Service }) {
  return (
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
              <span>Lead summary &rarr; CRM</span>
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
  );
}
