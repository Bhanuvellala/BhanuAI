import emailjs from "@emailjs/browser";

/**
 * EmailJS configuration.
 *
 * Only the PUBLIC key belongs here. Everything prefixed `VITE_` is inlined
 * into the JavaScript bundle that every visitor downloads, so the EmailJS
 * private key, SMTP passwords and any other secret must never be referenced
 * in this file or anywhere else under `src/`. The public key is designed to
 * be exposed; abuse is contained by the allowed-origins and rate limits you
 * set in the EmailJS dashboard.
 */
export const emailjsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "",
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "",
};

/** False when any of the three values is missing, so the UI can fall back. */
export const isEmailjsConfigured = (): boolean =>
  Boolean(emailjsConfig.publicKey && emailjsConfig.serviceId && emailjsConfig.templateId);

export type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactValues, string>>;

// Deliberately permissive: enough to catch typos without rejecting valid
// addresses that a stricter pattern would refuse.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 5000;

export const validateContact = (values: ContactValues): FieldErrors => {
  const errors: FieldErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please tell me your name.";
  else if (name.length > 100) errors.name = "That name is a little too long.";

  const email = values.email.trim();
  if (!email) errors.email = "I need an email address to reply to.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That does not look like a valid email address.";

  if (values.subject.trim().length > 150) errors.subject = "Please keep the subject under 150 characters.";

  const message = values.message.trim();
  if (!message) errors.message = "Please write a message.";
  else if (message.length < MESSAGE_MIN_LENGTH)
    errors.message = `A little more detail please, at least ${MESSAGE_MIN_LENGTH} characters.`;
  else if (message.length > MESSAGE_MAX_LENGTH)
    errors.message = `Please keep the message under ${MESSAGE_MAX_LENGTH} characters.`;

  return errors;
};

/**
 * Turn whatever EmailJS throws into something a visitor can act on.
 * The SDK rejects with `{ status, text }`, but a network failure rejects
 * with a plain Error, so handle both.
 */
export const describeEmailjsError = (error: unknown): string => {
  const status =
    typeof error === "object" && error !== null && "status" in error
      ? Number((error as { status: unknown }).status)
      : undefined;

  if (status === 0) return "Could not reach the mail service. Check your connection and try again.";
  if (status === 400 || status === 422)
    return "The message could not be sent because of a configuration problem. Please email me directly.";
  if (status === 401 || status === 403)
    return "The mail service rejected the request. Please email me directly.";
  if (status === 429) return "Too many messages just now. Please wait a minute and try again.";
  if (status && status >= 500) return "The mail service is having trouble. Please try again shortly.";

  return "Something went wrong sending that. Please try again, or email me directly.";
};

/**
 * Send via EmailJS. Resolves only when EmailJS confirms a 200, so callers can
 * treat resolution as genuine delivery confirmation.
 */
export const sendContactEmail = async (values: ContactValues): Promise<void> => {
  if (!isEmailjsConfigured()) {
    throw new Error("EmailJS is not configured");
  }

  const response = await emailjs.send(
    emailjsConfig.serviceId,
    emailjsConfig.templateId,
    {
      from_name: values.name.trim(),
      reply_to: values.email.trim(),
      subject: values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`,
      message: values.message.trim(),
    },
    { publicKey: emailjsConfig.publicKey },
  );

  if (response.status !== 200) {
    throw Object.assign(new Error("EmailJS did not confirm delivery"), response);
  }
};
