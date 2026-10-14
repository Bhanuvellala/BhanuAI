/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical site URL (no trailing slash), used for JSON-LD and canonical links. */
  readonly VITE_SITE_URL?: string;
  /**
   * EmailJS browser credentials. These are public by design: anything prefixed
   * with VITE_ is inlined into the client bundle. Never put the EmailJS
   * *private* key here, it is for server-side REST calls only.
   */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
