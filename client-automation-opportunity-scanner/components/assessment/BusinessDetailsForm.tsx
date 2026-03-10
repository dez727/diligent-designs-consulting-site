"use client";

import type { BusinessProfile } from "@/lib/types";

type BusinessDetailsFormProps = {
  business: BusinessProfile;
  onUpdate: (field: keyof BusinessProfile, value: string) => void;
};

export function BusinessDetailsForm({ business, onUpdate }: BusinessDetailsFormProps) {
  return (
    <section className="card p-6">
      <h2 className="text-2xl">Business Snapshot</h2>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        A little context helps tailor the automation recommendations to the tools and team you already have.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label>
          <span className="label">Business Name</span>
          <input
            className="input"
            value={business.businessName}
            onChange={(event) => onUpdate("businessName", event.target.value)}
            placeholder="Evergreen Dental Studio"
          />
        </label>

        <label>
          <span className="label">Industry</span>
          <input
            className="input"
            value={business.industry}
            onChange={(event) => onUpdate("industry", event.target.value)}
            placeholder="Professional Services"
          />
        </label>

        <label>
          <span className="label">Team Size</span>
          <input
            className="input"
            value={business.teamSize}
            onChange={(event) => onUpdate("teamSize", event.target.value)}
            placeholder="5-15 employees"
          />
        </label>

        <label className="md:col-span-2">
          <span className="label">Current Tools Used</span>
          <textarea
            className="input min-h-28 resize-y"
            value={business.currentTools}
            onChange={(event) => onUpdate("currentTools", event.target.value)}
            placeholder="Google Workspace, QuickBooks, Calendly"
          />
        </label>
      </div>
    </section>
  );
}
