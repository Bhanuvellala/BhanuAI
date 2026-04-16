import { motion } from "framer-motion";

export const ParticleField = () => {
  // Generate deterministic "stars"
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    size: ((i * 13) % 3) + 1,
    delay: (i % 10) * 0.4,
    duration: 4 + (i % 6),
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Glow orbs */}
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full bg-secondary/20 blur-[140px] animate-float-slow" style={{ animationDelay: "5s" }} />
      <div className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[130px] animate-float-slow" style={{ animationDelay: "10s" }} />

      {/* Particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary-glow"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
