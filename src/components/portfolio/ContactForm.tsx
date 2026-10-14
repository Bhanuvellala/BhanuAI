import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/profile";
import {
  describeEmailjsError,
  isEmailjsConfigured,
  MESSAGE_MAX_LENGTH,
  sendContactEmail,
  validateContact,
  type ContactValues,
  type FieldErrors,
} from "@/lib/emailjs";

const EMPTY: ContactValues = { name: "", email: "", subject: "", message: "" };

/** A bot that fills and submits instantly is not a person writing a message. */
const MIN_FILL_SECONDS = 3;
/** How long the button stays locked after a successful send. */
const COOLDOWN_SECONDS = 30;

type Status = "idle" | "sending" | "sent";

/**
 * Contact form wired to EmailJS. Self-contained: drop it anywhere a form is
 * needed. Falls back to a `mailto:` link when EmailJS is not configured, so
 * the form is never a dead end in a local or preview build.
 */
export const ContactForm = ({ className = "" }: { className?: string }) => {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(0);

  const mountedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement | null>(null);
  const configured = isEmailjsConfigured();

  // Tick the post-send cooldown down to zero.
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => {
      const next = cooldown - 1;
      setCooldown(next);
      // Back to a normal, obviously reusable button rather than a stale "Sent".
      if (next === 0) setStatus("idle");
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const update = (field: keyof ContactValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const sendViaMailto = () => {
    const subject = values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email client");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Guard against double submits and rapid resubmission.
    if (status === "sending" || cooldown > 0) return;

    // Honeypot. Never report success for a message that was not sent: if a
    // real person somehow trips this, they get a way to reach me instead of a
    // checkmark that lies to them.
    if (honeypot.current?.value.trim()) {
      toast.error("Could not verify this submission. Please email me directly.");
      return;
    }

    // Validate first, so a visitor always sees which field needs fixing
    // rather than a timing message that tells them nothing actionable.
    const nextErrors = validateContact(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Move focus to the first problem so keyboard and screen reader users land on it.
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    // Only once the payload is valid: too fast to have been typed by a person.
    if ((Date.now() - mountedAt.current) / 1000 < MIN_FILL_SECONDS) {
      toast.error("That was quick. Please take a moment and try again.");
      return;
    }

    if (!configured) {
      sendViaMailto();
      return;
    }

    setStatus("sending");
    try {
      await sendContactEmail(values);
      // Only past this line has EmailJS confirmed a 200.
      setStatus("sent");
      setValues(EMPTY);
      setErrors({});
      setCooldown(COOLDOWN_SECONDS);
      toast.success("Message sent. I will get back to you soon.");
    } catch (error) {
      setStatus("idle");
      toast.error(describeEmailjsError(error));
    }
  };

  const busy = status === "sending";
  const locked = busy || cooldown > 0;

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {/*
        Honeypot. `display: none` matters: browsers autofill off-screen fields
        from the saved profile, which made real visitors look like bots. A
        non-semantic name keeps autofill heuristics away from it too.
      */}
      <div style={{ display: "none" }} aria-hidden="true">
        <input
          ref={honeypot}
          tabIndex={-1}
          autoComplete="off"
          id="hp-ref"
          name="hp_ref"
          type="text"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          placeholder="Jane Doe"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          disabled={busy}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          disabled={busy}
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        autoComplete="off"
        placeholder="What is this about?"
        value={values.subject}
        onChange={update("subject")}
        error={errors.subject}
        disabled={busy}
      />

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          autoComplete="off"
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder="Tell me about your project"
          value={values.message}
          onChange={update("message")}
          disabled={busy}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:shadow-glow disabled:opacity-60"
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-2 text-xs text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={locked}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : status === "sent" ? (
          <>
            <Check className="h-4 w-4" />
            {cooldown > 0 ? `Sent (${cooldown}s)` : "Sent"}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> Send message
          </>
        )}
      </button>

      {/* Announce transitions to screen readers without a visual change. */}
      <p aria-live="polite" className="sr-only">
        {busy ? "Sending your message" : status === "sent" ? "Message sent" : ""}
      </p>
    </form>
  );
};

const Field = ({
  label,
  error,
  ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const id = `contact-${props.name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:shadow-glow disabled:opacity-60"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
};
