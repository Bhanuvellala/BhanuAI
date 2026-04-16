import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "@/data/profile";
import { SectionHeader } from "./About";

export const Experience = () => {
  return (
    <section id="experience" className="relative py-28">
      <div className="container-premium">
        <SectionHeader eyebrow="Journey" title="Career & education timeline." />

        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent md:left-1/2" />

          <div className="space-y-12">
            {experience.map((e, idx) => {
              const isLeft = idx % 2 === 0;
              const isEdu = e.type === "education";
              const Icon = isEdu ? GraduationCap : Briefcase;
              return (
                <motion.div
                  key={`${e.role}-${e.period}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="relative grid md:grid-cols-2 md:gap-12"
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-3 -translate-x-1/2 md:left-1/2">
                    <span className={`relative grid h-4 w-4 place-items-center rounded-full shadow-glow ${isEdu ? "bg-gradient-to-br from-secondary to-accent" : "bg-gradient-primary"}`}>
                      <span className="absolute h-8 w-8 animate-ping rounded-full bg-primary/30" />
                    </span>
                  </div>

                  <div className={`pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12"}`}>
                    <div className="glass inline-block rounded-2xl p-6">
                      <div className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest ${isEdu ? "text-accent" : "text-primary"} ${isLeft ? "md:justify-end" : ""}`}>
                        <Icon className="h-3 w-3" /> {e.period}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold">{e.role}</h3>
                      <div className="text-sm text-muted-foreground">
                        {e.company} · {e.location}
                      </div>
                      <ul className={`mt-4 space-y-2 text-sm text-foreground/85 ${isLeft ? "md:text-right" : ""}`}>
                        {e.highlights.map((h, i) => (
                          <li key={i}>— {h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
