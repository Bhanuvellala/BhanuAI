import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { experience } from "@/data/profile";
import { SectionHeader } from "./About";

const work = experience.filter((e) => e.type !== "education");
const education = experience.filter((e) => e.type === "education");

/** The current headline role gets the full treatment; the rest are summarised. */
const [featured, ...previously] = work;

/** Fresh props per element: framer-motion tracks viewport state on the object. */
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

export const Experience = () => {
  return (
    <section id="experience" className="relative py-16 md:py-20">
      <div className="container-premium">
        <SectionHeader eyebrow="Experience" title="Where I have worked and studied." />

        {/* Featured current role */}
        <motion.div
          {...fadeIn()}
          className="glass card-surface card-accent relative mt-12 overflow-hidden rounded-3xl p-8 md:p-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">
              <span className="relative grid h-1.5 w-1.5 place-items-center">
                <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-primary-foreground/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              </span>
              Current
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
              {featured.period}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight md:text-3xl">
            {featured.role}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" /> {featured.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {featured.location}
            </span>
          </div>

          {featured.department || featured.practice ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {featured.department ? (
                <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">
                  {featured.department}
                </span>
              ) : null}
              {featured.practice ? (
                <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-foreground/80">
                  {featured.practice} practice
                </span>
              ) : null}
            </div>
          ) : null}

          <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-foreground/85 md:grid-cols-2 md:gap-x-8">
            {featured.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Earlier roles, condensed */}
        <motion.h3
          {...fadeIn()}
          className="mt-12 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          Previously
        </motion.h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {previously.map((e, idx) => (
            <motion.div
              key={`${e.role}-${e.period}`}
              {...fadeIn(Math.min(idx * 0.06, 0.24))}
              className="glass card-surface rounded-2xl p-5"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {e.period}
              </div>
              <h4 className="mt-2 font-display text-base font-semibold leading-snug">{e.role}</h4>
              <div className="mt-1 text-sm text-muted-foreground">{e.company}</div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.h3
          {...fadeIn()}
          className="mt-12 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          Education
        </motion.h3>

        <div className="mt-5 grid gap-3">
          {education.map((e, idx) => (
            <motion.div
              key={`${e.role}-${e.period}`}
              {...fadeIn(Math.min(idx * 0.06, 0.18))}
              className="glass card-surface flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl px-5 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <GraduationCap className="h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold leading-snug">{e.role}</div>
                  <div className="text-sm text-muted-foreground">{e.company}</div>
                </div>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {e.period}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
