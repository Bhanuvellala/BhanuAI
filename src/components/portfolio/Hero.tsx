import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { LinkedInIcon, InstagramIcon, GitHubIcon } from "./SocialIcons";
import profileImg from "@/assets/profile-hero.webp";
import { profile } from "@/data/profile";
import { ParticleField } from "./ParticleField";

const surnameLine = profile.fullName.startsWith(profile.name)
  ? profile.fullName.slice(profile.name.length).trim()
  : profile.fullName;

const resumeHref = profile.resumeUrl?.trim()
  ? profile.resumeUrl.trim()
  : `mailto:${profile.email}?subject=${encodeURIComponent("Resume / CV request")}`;
const resumeIsFile = Boolean(profile.resumeUrl?.trim());

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden pt-24 pb-10"
    >
      <ParticleField />

      <div className="container-premium relative z-10 grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        {/* Left: copy */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="block text-foreground">Hi, I'm</span>
            <span className="block text-gradient">{profile.name}</span>
            <span className="block text-foreground">
              {surnameLine}
              {surnameLine ? "." : ""}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 max-w-xl text-base text-muted-foreground lg:text-lg"
          >
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> {profile.title}
            </span>{" "}
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              View my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={resumeHref}
              {...(resumeIsFile ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              {profile.instagram ? (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-accent"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {profile.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl px-3 py-3 text-center">
                <div className="text-gradient font-display text-xl font-bold lg:text-2xl">{m.value}</div>
                <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-[20rem] lg:block xl:max-w-[22rem]"
        >
          {/* soft halo so the portrait lifts off the page */}
          <div className="portrait-halo pointer-events-none absolute inset-0 -m-20 -z-10" aria-hidden="true" />

          {/* rings */}
          <div className="absolute inset-0 -m-6 rounded-[2.5rem] border border-primary/20 animate-pulse-glow" />
          <div className="absolute inset-0 -m-12 rounded-[3rem] border border-secondary/15" />

          {/* Portrait card */}
          <div className="relative aspect-[3/4] max-h-[62vh] overflow-hidden rounded-[2rem] neon-border shadow-elegant animate-float">
            {/* backdrop behind the cut-out portrait */}
            <div className="absolute inset-0 bg-[linear-gradient(160deg,hsl(var(--background))_0%,hsl(var(--primary)/0.18)_45%,hsl(var(--secondary)/0.22)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,hsl(var(--primary)/0.35)_0%,transparent_62%)]" />
            <img
              src={profileImg}
              alt={`Portrait of ${profile.fullName}, ${profile.title}`}
              className="relative z-10 h-full w-full object-cover object-top drop-shadow-[0_18px_40px_rgba(15,23,42,0.3)]"
            />
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/50 to-transparent p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold leading-snug">{profile.fullName}</div>
                  <div className="text-[11px] leading-snug text-muted-foreground">{profile.subtitle}</div>
                </div>
                <div className="glass mt-0.5 shrink-0 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
                  v.2026
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
