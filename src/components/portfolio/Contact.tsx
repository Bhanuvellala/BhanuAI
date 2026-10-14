import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedInIcon, InstagramIcon, GitHubIcon } from "./SocialIcons";
import { profile } from "@/data/profile";
import { SectionHeader } from "./About";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-16 md:py-20">
      <div className="container-premium">
        <SectionHeader eyebrow="Contact" title="Get in touch." />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="font-display text-2xl font-semibold">
              Working on something AI shaped?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Happy to talk about Generative AI products, agent systems or enterprise LLM work. I read everything that comes in.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <InfoRow icon={<Mail className="h-4 w-4" />} label={profile.email} href={`mailto:${profile.email}`} />
              <InfoRow icon={<Phone className="h-4 w-4" />} label={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
              <InfoRow icon={<MapPin className="h-4 w-4" />} label={profile.location} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Social href={profile.linkedin} icon={<LinkedInIcon className="h-4 w-4" />} label="LinkedIn" />
              <Social href={profile.github} icon={<GitHubIcon className="h-4 w-4" />} label="GitHub" />
              {profile.personalSite ? (
                <Social href={profile.personalSite} icon={<Globe className="h-4 w-4" />} label="Site" />
              ) : null}
              {profile.instagram ? (
                <Social href={profile.instagram} icon={<InstagramIcon className="h-4 w-4" />} label="Instagram" />
              ) : null}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass relative rounded-3xl p-8"
          >
            <ContactForm className="space-y-5" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};


const InfoRow = ({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) => {
  const className = "flex items-center gap-3 text-foreground/90 transition-colors hover:text-primary";
  const inner = (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted/60 text-primary">{icon}</span>
      {label}
    </>
  );
  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
};

const Social = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="glow-on-hover inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm transition-all hover:border-primary/60 hover:text-primary"
  >
    {icon} {label}
  </a>
);
