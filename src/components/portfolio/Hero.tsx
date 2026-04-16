import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { LinkedInIcon, InstagramIcon, GitHubIcon } from "./SocialIcons";
import profileImg from "@/assets/profile.jpg";
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
    <section id="hero" className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <ParticleField />

      <div className="container-premium relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: copy */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
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
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> {profile.title}
            </span>{" "}
            — {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              View my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={resumeHref}
              {...(resumeIsFile ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              {profile.instagram ? (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-accent"
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
            className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            {profile.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl p-4 text-center">
                <div className="text-gradient font-display text-2xl font-bold md:text-3xl">{m.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Orbit rings */}
          <div className="absolute inset-0 -m-8 rounded-full border border-primary/20 animate-pulse-glow" />
          <div className="absolute inset-0 -m-16 rounded-full border border-secondary/15" />

          {/* Floating chips */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong absolute -left-6 top-10 z-20 rounded-2xl px-4 py-2 text-xs font-medium shadow-glow"
          >
            🧠 LLM · RAG
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass-strong absolute -right-4 top-1/3 z-20 rounded-2xl px-4 py-2 text-xs font-medium shadow-glow-violet"
          >
            ⚡ Azure AI Foundry
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass-strong absolute -left-2 bottom-10 z-20 rounded-2xl px-4 py-2 text-xs font-medium"
          >
            🐍 Python · FastAPI
          </motion.div>

          {/* Portrait card */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] neon-border shadow-elegant animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 mix-blend-overlay" />
            <img
              src={profileImg}
              alt={`Portrait of ${profile.fullName}, ${profile.title}`}
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-sm font-semibold">{profile.fullName}</div>
                  <div className="text-xs text-muted-foreground">{profile.subtitle}</div>
                </div>
                <div className="glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
                  v.2026
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="block h-8 w-[1px] animate-pulse bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};
