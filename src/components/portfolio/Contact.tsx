import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Globe } from "lucide-react";
import { LinkedInIcon, InstagramIcon, GitHubIcon } from "./SocialIcons";
import { profile } from "@/data/profile";
import { SectionHeader } from "./About";
import { toast } from "sonner";

export const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if ((data.get("company_website") as string)?.trim()) {
      return;
    }
    const name = data.get("name") as string;
    const message = data.get("message") as string;
    const email = data.get("email") as string;
    const subjectRaw = (data.get("subject") as string)?.trim();
    const subject = encodeURIComponent(subjectRaw || `Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    toast.success("Opening your email client");
  };

  return (
    <section id="contact" className="relative py-28">
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
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass relative space-y-5 rounded-3xl p-8"
            noValidate
          >
            <div className="pointer-events-none absolute -left-[9999px] h-0 overflow-hidden opacity-0" aria-hidden="true">
              <label htmlFor="company_website">Company website</label>
              <input tabIndex={-1} autoComplete="off" id="company_website" name="company_website" type="text" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name" name="name" autoComplete="name" placeholder="Jane Doe" required />
              <Field label="Email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" required />
            </div>
            <Field label="Subject" name="subject" autoComplete="off" placeholder="What is this about?" />
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
                required
                rows={5}
                autoComplete="off"
                placeholder="Tell me about your project"
                className="w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:shadow-glow"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              {sent ? "Sent" : "Send message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const id = props.id ?? (typeof props.name === "string" ? props.name : undefined);
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        {...props}
        id={id}
        className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:shadow-glow"
      />
    </div>
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
