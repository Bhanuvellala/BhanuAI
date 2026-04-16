import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/profile";
import { SectionHeader } from "./About";

export const Projects = () => {
  return (
    <section id="projects" className="relative py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Projects"
          title="Generative AI shipped across 6 industries."
        />
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A selection of production AI systems — RAG platforms, NL→SQL agents, automation copilots and analytics tools.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (idx % 2) * 0.08 }}
              className="glass tilt-card group relative overflow-hidden rounded-3xl p-7"
            >
              {/* Accent gradient */}
              <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`} />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      {p.domain}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-border/60 pt-4 text-xs">
                  <span className="text-muted-foreground">Impact · </span>
                  <span className="font-medium text-foreground">{p.impact}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
