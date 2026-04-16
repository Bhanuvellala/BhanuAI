import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { achievements } from "@/data/profile";
import { SectionHeader } from "./About";

export const Achievements = () => {
  return (
    <section className="relative py-28">
      <div className="container-premium">
        <SectionHeader eyebrow="Highlights" title="Wins, certifications & signals." />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, idx) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="glass tilt-card relative overflow-hidden rounded-3xl p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
