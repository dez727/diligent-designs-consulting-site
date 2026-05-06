"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      theme?: "light" | "dark" | "auto";
    }
  ) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const focusOptions = [
  "Automation strategy",
  "Marketing analytics",
  "AI implementation",
  "Lead follow-up",
  "Not sure yet"
];

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function collectAttribution() {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const storedAttribution = window.sessionStorage.getItem("ddc_attribution");
  let previous: Record<string, string> = {};

  try {
    previous = storedAttribution ? (JSON.parse(storedAttribution) as Record<string, string>) : {};
  } catch {
    previous = {};
  }

  const attribution = {
    sourcePage: window.location.href,
    referrer: document.referrer || previous.referrer || "",
    utmSource: params.get("utm_source") || previous.utmSource || "",
    utmMedium: params.get("utm_medium") || previous.utmMedium || "",
    utmCampaign: params.get("utm_campaign") || previous.utmCampaign || "",
    utmTerm: params.get("utm_term") || previous.utmTerm || "",
    utmContent: params.get("utm_content") || previous.utmContent || ""
  };

  window.sessionStorage.setItem("ddc_attribution", JSON.stringify(attribution));
  return attribution;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileElementRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | undefined>(undefined);

  const statusMessage = useMemo(() => {
    if (status === "success") {
      return "Got it. I will review what is getting stuck and follow up with a practical next step.";
    }

    if (status === "error") {
      return error || "Something did not go through. Please try again.";
    }

    return "";
  }, [error, status]);

  useEffect(() => {
    collectAttribution();
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileElementRef.current || turnstileWidgetIdRef.current) {
      return;
    }

    const renderWidget = () => {
      if (!window.turnstile || !turnstileElementRef.current || turnstileWidgetIdRef.current) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileElementRef.current, {
        sitekey: turnstileSiteKey,
        theme: "dark",
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken("")
      });
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    const script = existingScript ?? document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderWidget);

    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      script.removeEventListener("load", renderWidget);
    };
  }, []);

  function resetTurnstile() {
    setTurnstileToken("");
    window.turnstile?.reset(turnstileWidgetIdRef.current);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("nickname")) {
      return;
    }

    setStatus("submitting");
    setError("");

    const fullName = clean(data.get("name"));
    const email = clean(data.get("email"));
    const message = clean(data.get("message"));
    const focusArea = clean(data.get("focus"));

    if (!fullName || !email || !focusArea || message.length < 10) {
      setError("Please include your name, email, focus area, and a short note about what is getting stuck.");
      setStatus("error");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setError("Please complete the bot check before submitting.");
      setStatus("error");
      return;
    }

    const payload = {
      fullName,
      email,
      phone: clean(data.get("phone")),
      companyName: clean(data.get("company")),
      websiteUrl: clean(data.get("website")),
      focusArea,
      message,
      consentToContact: data.get("consent") === "on",
      turnstileToken,
      ...collectAttribution()
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        form.reset();
        resetTurnstile();
        setStatus("success");
        return;
      }

      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(result?.error ?? "The form could not be submitted.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The form could not be submitted.");
      setStatus("error");
      resetTurnstile();
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
          <span>Phone</span>
          <input autoComplete="tel" name="phone" type="tel" />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Website</span>
          <input name="website" placeholder="https://" type="url" />
        </label>
        <label>
          <span>Preferred starting point</span>
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
      </div>

      <label>
        <span>What is slowing the business down?</span>
        <textarea
          name="message"
          placeholder="A few sentences is enough. Manual follow-up, unclear reporting, disconnected tools, or an AI idea you want to make practical."
          required
          rows={5}
        />
      </label>

      <label className="contact-consent">
        <input name="consent" required type="checkbox" />
        <span>I agree to be contacted about this request.</span>
      </label>

      {turnstileSiteKey ? <div ref={turnstileElementRef} className="turnstile-widget" /> : null}

      <button className="button-primary contact-submit" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending..." : "Start the Conversation"}
      </button>

      <p className={`contact-status ${status === "error" ? "is-error" : ""}`} role="status">
        {statusMessage || "No pressure pitch. Just a clear first read on what to clean up next."}
      </p>
    </form>
  );
}
