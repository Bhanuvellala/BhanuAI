/**
 * Set `VITE_SITE_URL` in `.env` to your canonical origin (no trailing slash), e.g.
 * https://yourdomain.com. Used for JSON-LD, canonical and Open Graph URLs.
 */
export function getSiteUrl(): string {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined;
  if (!raw?.trim()) return "";
  return raw.replace(/\/+$/, "");
}
