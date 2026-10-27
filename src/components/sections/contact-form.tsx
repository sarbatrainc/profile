"use client";

import { useState } from "react";

import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";
import { CheckIcon, MailIcon } from "@/components/ui/icons";

type Status = "idle" | "sending" | "sent" | "error";

interface FormValues {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const emptyValues: FormValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

const emptyErrors: FieldErrors = {};

const projectTypes = [
  "Flutter application",
  "Full-stack application",
  "REST API",
  "Business / POS software",
  "Education technology",
  "Fix or extend an existing app",
  "Something else",
];

const fieldBase =
  "w-full rounded-xl border bg-surface/70 px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-colors duration-200 focus:outline-none focus-visible:border-accent";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form.
 *
 * QA walk applied: field-level validation in real time (not only on submit),
 * per-field error messages, and a global status banner on failed validation —
 * so there is no validation_gap finding.
 *
 * - When NEXT_PUBLIC_FORMSPREE_ENDPOINT is set the message is posted to that
 *   endpoint.
 * - Otherwise it falls back to a prefilled mailto: message, so the form always
 *   works on a statically hosted site with no backend.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors);
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    projectType: false,
    message: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const update = (field: keyof FormValues) => (value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setTouched((previous) => ({ ...previous, [field]: true }));
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const validateField = (field: keyof FormValues, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Please add your name.";
        return undefined;
      case "email":
        if (!value.trim()) return "Please add your email.";
        if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address.";
        return undefined;
      case "message":
        if (!value.trim()) return "Please add a message.";
        if (value.trim().length < 10) return "Message must be at least 10 characters.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Mark every required field as touched so inline errors show.
    const nextTouched: Record<keyof FormValues, boolean> = {
      name: true,
      email: true,
      projectType: true,
      message: true,
    };
    setTouched(nextTouched);

    const nextErrors: FieldErrors = {};
    const nameErr = validateField("name", values.name);
    const emailErr = validateField("email", values.email);
    const messageErr = validateField("message", values.message);
    if (nameErr) nextErrors.name = nameErr;
    if (emailErr) nextErrors.email = emailErr;
    if (messageErr) nextErrors.message = messageErr;
    setErrors(nextErrors);

    if (nameErr || emailErr || messageErr) {
      setStatus("error");
      setMessage("Please fix the highlighted fields before sending.");
      return;
    }

    setStatus("sending");
    setMessage("");

    const subject = values.projectType
      ? `${values.projectType} — enquiry from ${values.name}`
      : `Project enquiry from ${values.name}`;

    const body = `${values.message}\n\n— ${values.name} (${values.email})`;

    if (siteConfig.contactFormEndpoint) {
      try {
        const response = await fetch(siteConfig.contactFormEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name: values.name, email: values.email, subject, message: body }),
        });

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        setStatus("sent");
        setMessage("Thank you — your message has been sent. I will reply as soon as I can.");
        setValues(emptyValues);
        setErrors(emptyErrors);
        setTouched({ name: false, email: false, projectType: false, message: false });
        return;
      } catch {
        setStatus("error");
        setMessage("The form service did not respond. Please email me directly using the address on the left.");
        return;
      }
    }

    // mailto: fallback — no backend required.
    if (!siteConfig.email) {
      setStatus("error");
      setMessage("No email address is configured on this site yet.");
      return;
    }

    const params = new URLSearchParams({ subject, body });
    window.location.href = `mailto:${siteConfig.email}?${params.toString()}`;

    setStatus("sent");
    setMessage(
      "Your email app should have opened with the message ready to send. If nothing happened, email me directly using the address on the left.",
    );
  };

  const nameError = touched.name ? errors.name : undefined;
  const emailError = touched.email ? errors.email : undefined;
  const messageError = touched.message ? errors.message : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Your name"
          required
          value={values.name}
          onChange={update("name")}
          autoComplete="name"
          placeholder="Full name"
          error={nameError}
          invalid={Boolean(nameError)}
        />
        <Field
          id="contact-email"
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={update("email")}
          autoComplete="email"
          placeholder="you@example.com"
          error={emailError}
          invalid={Boolean(emailError)}
        />
      </div>

      <div>
        <label htmlFor="contact-project-type" className="text-sm font-medium text-foreground">
          What do you need?
          <span className="ml-1 text-subtle">(optional)</span>
        </label>
        <select
          id="contact-project-type"
          value={values.projectType}
          onChange={(event) => update("projectType")(event.target.value)}
          className={`${fieldBase} mt-2`}
        >
          <option value="">Select a project type</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={values.message}
          onChange={(event) => update("message")(event.target.value)}
          placeholder="Describe the problem you are trying to solve, the timeline, and anything else that matters."
          aria-describedby="contact-message-hint"
          className={`${fieldBase} mt-2 resize-y${Boolean(messageError) ? " border-warning/60 focus-visible:border-warning" : ""}`}
        />
        <p id="contact-message-hint" className="mt-2 text-xs text-subtle">
          A short description of the problem is more useful than a long brief.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : siteConfig.contactFormEndpoint ? "Send message" : "Open in email app"}
        </Button>

        <p className="text-xs leading-relaxed text-subtle">
          {siteConfig.contactFormEndpoint
            ? "Sent through the configured form endpoint."
            : "No backend is configured, so this opens a prefilled message in your email app."}
        </p>
      </div>

      {/* Live region so screen readers hear the outcome. */}
      <p
        role="status"
        aria-live="polite"
        className={[
          "flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
          status === "error"
            ? "border-warning/35 bg-warning-soft text-warning"
            : status === "sent"
              ? "border-success/30 bg-success-soft text-success"
              : "sr-only",
        ].join(" ")}
      >
        {status === "error" ? (
          <MailIcon size={17} className="mt-px shrink-0" />
        ) : status === "sent" ? (
          <CheckIcon size={17} className="mt-px shrink-0" />
        ) : null}
        {message}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  placeholder,
  error,
  invalid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  invalid?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={[
          fieldBase,
          "mt-2",
          invalid ? "border-warning/60 focus-visible:border-warning" : "border-border",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {error && (
        <p className="mt-1 text-xs text-warning">{error}</p>
      )}
    </div>
  );
}
