import { useEffect } from "react";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/config/site";

/**
 * Person + WebSite JSON-LD for search engines; updates canonical / og:url when `VITE_SITE_URL` is set.
 */
export function StructuredData() {
  const siteUrl = getSiteUrl();

  useEffect(() => {
    if (!siteUrl) return;
    const href = `${siteUrl}/`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = href;

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", href);
  }, [siteUrl]);

  const sameAs = [profile.linkedin, profile.github, profile.instagram, profile.personalSite].filter(Boolean);

  const graph: Record<string, unknown>[] = [];

  if (siteUrl) {
    graph.push({
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: `${profile.name} Portfolio`,
      description: profile.tagline,
      inLanguage: "en",
    });
  }

  graph.push({
    "@type": "Person",
    ...(siteUrl ? { "@id": `${siteUrl}/#person` } : {}),
    name: profile.fullName,
    jobTitle: profile.title,
    email: profile.email,
    telephone: profile.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    url: siteUrl ? `${siteUrl}/` : profile.linkedin,
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: profile.subtitle.split("·").map((s) => s.trim()),
    description: profile.bio.slice(0, 500),
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
