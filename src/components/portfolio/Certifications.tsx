import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Trophy, X, ZoomIn } from "lucide-react";
import { certifications, competition } from "@/data/profile";
import { SectionHeader } from "./About";

type Viewing = { image: string; title: string; caption: string } | null;

/** Fresh props per element: framer-motion tracks viewport state on the object. */
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

export const Certifications = () => {
  const [viewing, setViewing] = useState<Viewing>(null);

  const close = useCallback(() => setViewing(null), []);

  // Close on Escape, and stop the page scrolling behind the lightbox.
  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewing, close]);

  return (
    <section id="certifications" className="relative py-16 md:py-20">
      <div className="container-premium">
        <SectionHeader eyebrow="Credentials" title="Certifications and recognition." />

        {/* Competition result */}
        <motion.div
          {...fadeIn()}
          className="glass card-surface card-accent mt-12 grid gap-8 overflow-hidden rounded-3xl p-6 md:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">
              <Trophy className="h-3 w-3" /> 3rd place
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">
              {competition.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {competition.detail}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="glass rounded-2xl px-4 py-3">
                <div className="text-gradient font-display text-xl font-bold">
                  {competition.points}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">Points scored</div>
              </div>
              <div className="glass rounded-2xl px-4 py-3">
                <div className="text-gradient font-display text-xl font-bold">
                  {competition.prize}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">Prize won</div>
              </div>
              <div className="glass rounded-2xl px-4 py-3">
                <div className="text-gradient font-display text-xl font-bold">6 weeks</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">Competition run</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setViewing({
                image: competition.image,
                title: competition.title,
                caption: "Final leaderboard. Other participants are blurred for their privacy.",
              })
            }
            className="group relative overflow-hidden rounded-2xl border border-border bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="View the full leaderboard screenshot"
          >
            <img
              src={competition.image}
              alt="Competition leaderboard showing Bhanu Prakash in third place with 381 points. The other participants are blurred."
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 grid place-items-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/10 group-hover:opacity-100">
              <span className="glass-strong grid h-11 w-11 place-items-center rounded-full">
                <ZoomIn className="h-4 w-4" />
              </span>
            </span>
          </button>
        </motion.div>

        {/* Certificates */}
        <motion.h3
          {...fadeIn()}
          className="mt-14 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          Certifications
        </motion.h3>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, idx) => (
            <motion.div
              key={c.title}
              {...fadeIn(Math.min(idx * 0.06, 0.3))}
              className="glass card-surface flex flex-col overflow-hidden rounded-3xl"
            >
              <button
                type="button"
                onClick={() =>
                  setViewing({ image: c.image, title: c.title, caption: `${c.issuer} · ${c.date}` })
                }
                className="group relative block aspect-[4/3] overflow-hidden border-b border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                aria-label={`View the ${c.title} certificate`}
              >
                <img
                  src={c.image}
                  alt={`${c.title} certificate issued by ${c.issuer}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 grid place-items-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/10 group-hover:opacity-100">
                  <span className="glass-strong grid h-10 w-10 place-items-center rounded-full">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                  <BadgeCheck className="h-3 w-3" /> {c.date}
                </div>
                <h4 className="mt-2 font-display text-base font-semibold leading-snug">
                  {c.title}
                </h4>
                <div className="mt-1 text-sm text-muted-foreground">{c.issuer}</div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{c.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {viewing ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={viewing.title}
          onClick={close}
          className="fixed inset-0 z-[90] grid place-items-center bg-foreground/60 p-4 backdrop-blur-sm md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full w-full max-w-5xl flex-col rounded-3xl bg-card p-3 shadow-elegant"
          >
            <img
              src={viewing.image}
              alt={viewing.title}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <div className="flex items-start justify-between gap-4 px-2 py-3">
              <div className="min-w-0">
                <div className="font-display text-sm font-semibold">{viewing.title}</div>
                <div className="text-xs text-muted-foreground">{viewing.caption}</div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
};
