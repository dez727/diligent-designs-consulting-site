"use client";

import { FormEvent, useMemo, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "fallback" | "error";

const focusOptions = [
  "Automation strategy",
  "Marketing analytics",
  "AI implementation",
  "Lead follow-up",
  "Not sure yet"
];

function buildMailto(form: HTMLFormElement) {
  const data = new FormData(form);
  const subject = encodeURIComponent("Diligent Designs conversation request");
  const body = encodeURIComponent(
    [
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Company: ${data.get("company") ?? ""}`,
      `Website: ${data.get("website") ?? ""}`,
      `Focus: ${data.get("focus") ?? ""}`,
      "",
      "What they want to improve:",
      `${data.get("message") ?? ""}`
    ].join("\n")
  );

  return `mailto:hello@diligentdesignsconsulting.com?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const statusMessage = useMemo(() => {
    if (status === "success") {
      return "Got it. I will review the workflow and follow up with a practical next step.";
    }

    if (status === "fallback") {
      return "The lead workflow is not connected yet, so your email app opened as a fallback.";
    }

    if (status === "error") {
      return error || "Something did not go through. Please try again.";
    }

    return "";
  }, [error, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("nickname")) {
      return;
    }

    setStatus("submitting");
    setError("");

    const payload = Object.fromEntries(data.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      if (response.status === 404 || response.status === 503) {
        window.location.href = buildMailto(form);
        setStatus("fallback");
        return;
      }

      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(result?.error ?? "The form could not be submitted.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The form could not be submitted.");
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input aria-hidden="true" autoComplete="off" className="contact-honey" name="nickname" tabIndex={-1} />

      <div className="form-row">
        <label>
          <span>Name</span>
          <input name="name" required type="text" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" required type="email" />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Company</span>
          <input name="company" type="text" />
        </label>
        <label>
          <span>Website</span>
          <input name="website" placeholder="https://" type="url" />
        </label>
      </div>

      <label>
        <span>What are you trying to improve?</span>
        <select defaultValue="" name="focus" required>
          <option disabled value="">
            Choose a focus
          </option>
          {focusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>What is slowing the business down?</span>
        <textarea
          name="message"
          placeholder="A few sentences is enough. Manual follow-up, unclear reporting, disconnected tools, or an AI idea you want to make practical."
          required
          rows={5}
        />
      </label>

      <button className="button-primary contact-submit" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending..." : "Start the Conversation"}
      </button>

      <p className={`contact-status ${status === "error" ? "is-error" : ""}`} role="status">
        {statusMessage || "No hard pitch. Just a practical first look at where automation may help."}
      </p>
    </form>
  );
}
