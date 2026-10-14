import { motion } from "framer-motion";
import { skills } from "@/data/profile";
import { SectionHeader } from "./About";

export const Skills = () => {
  return (
    <section id="skills" className="relative py-16 md:py-20">
      <div className="container-premium">
        <SectionHeader eyebrow="Skills" title="What I work with." />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass card-surface card-accent group relative overflow-hidden rounded-3xl p-6"
            >
              <div className="relative">
                <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold">{group.category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-foreground/90 transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
