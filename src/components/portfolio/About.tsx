import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export const About = () => {
  return (
    <section id="about" className="relative py-16 md:py-20">
      <div className="container-premium">
        <SectionHeader eyebrow="About" title="A bit about how I work." />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 md:p-10"
          >
            <p className="text-lg leading-relaxed text-foreground/90">
              {profile.bio}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
              <Detail label="Based in" value={profile.location} />
              <Detail label="Role" value={profile.title} />
              <Detail label="Focus" value={profile.subtitle} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4"
          >
            {[
              { title: "Production first", desc: "A demo is easy. I care about the parts that come after: observability, guardrails, latency budgets." },
              { title: "Learn the domain", desc: "Finance, manufacturing, healthcare, IT. You cannot model a business problem you have not sat with." },
              { title: "Boring stack, on purpose", desc: "Python, FastAPI, Azure AI Foundry, Semantic Kernel, a vector DB. Tools I know will hold." },
            ].map((c) => (
              <div key={c.title} className="glass card-surface rounded-2xl p-6">
                <div className="font-display text-lg font-semibold text-gradient">{c.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{c.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className="mt-1 font-medium text-foreground">{value}</div>
  </div>
);

export const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl"
  >
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
      <span className="h-1 w-1 rounded-full bg-primary" /> {eyebrow}
    </div>
    <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
      {title}
    </h2>
  </motion.div>
);
