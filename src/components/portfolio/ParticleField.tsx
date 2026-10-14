import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** phase offset so nodes breathe out of sync */
  phase: number;
  /** a few nodes are "hubs" and glow a little more */
  hub: boolean;
};

const MAX_DPR = 2;
/** nodes per million device-independent pixels, so density feels equal on any screen */
const NODE_DENSITY = 26;
const MIN_NODES = 14;
const MAX_NODES = 46;
/** links only form between nodes closer than this fraction of the shorter edge */
const LINK_RATIO = 0.17;

const readToken = (styles: CSSStyleDeclaration, name: string, fallback: string) => {
  const value = styles.getPropertyValue(name).trim();
  return value || fallback;
};

/**
 * Ambient background for the hero: a soft technical grid, a slow neural-network
 * canvas (nodes, hairline links, tiny cyan sparks) and layered pools of light.
 * Renders a single static frame when the visitor prefers reduced motion.
 */
export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = false;
    let last = 0;
    let time = 0;

    // Colours come from the design tokens, so the field tracks the active theme.
    let nodeColor = "194 90% 46%";
    let linkColor = "212 70% 52%";
    let sparkColor = "188 92% 52%";
    let nodeAlpha = 0.55;
    let linkAlpha = 0.16;

    const readTokens = () => {
      const styles = getComputedStyle(document.documentElement);
      nodeColor = readToken(styles, "--node-color", nodeColor);
      linkColor = readToken(styles, "--link-color", linkColor);
      sparkColor = readToken(styles, "--spark-color", sparkColor);
      nodeAlpha = Number(readToken(styles, "--node-alpha", "0.55")) || 0.55;
      linkAlpha = Number(readToken(styles, "--link-alpha", "0.16")) || 0.16;
    };

    const seed = () => {
      const target = Math.round((width * height * NODE_DENSITY) / 1000000);
      const count = Math.max(MIN_NODES, Math.min(MAX_NODES, target));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // deliberately slow: a few pixels per second
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        r: Math.random() * 1.1 + 0.7,
        phase: Math.random() * Math.PI * 2,
        hub: i % 7 === 0,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDistance = Math.min(width, height) * LINK_RATIO;

      // Hairline links first, so the nodes sit on top of them.
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) continue;
          const strength = (1 - dist / linkDistance) * linkAlpha;
          ctx.strokeStyle = `hsl(${linkColor} / ${strength.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        // Out-of-phase breathing keeps the field alive without reading as flicker.
        const breathe = 0.65 + 0.35 * Math.sin(time * 0.6 + node.phase);
        const alpha = nodeAlpha * breathe * (node.hub ? 1 : 0.7);

        if (node.hub) {
          const halo = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 9);
          halo.addColorStop(0, `hsl(${sparkColor} / ${(alpha * 0.32).toFixed(3)})`);
          halo.addColorStop(1, `hsl(${sparkColor} / 0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * 9, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `hsl(${node.hub ? sparkColor : nodeColor} / ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      for (const node of nodes) {
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        // Wrap rather than bounce, so edges never show a direction change.
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      draw();
      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (running || motionQuery.matches) return;
      running = true;
      last = performance.now();
      frame = window.requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const applyMotionPreference = () => {
      readTokens();
      if (motionQuery.matches) {
        stop();
        draw(); // static fallback frame
      } else {
        start();
      }
    };

    readTokens();
    resize();
    applyMotionPreference();

    // No frames while the hero is scrolled away or the tab is in the background.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onResize = () => {
      resize();
      if (motionQuery.matches) draw();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", applyMotionPreference);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient pools of light: one behind the copy, one behind the portrait card */}
      <div className="ambient-copy absolute left-[-10%] top-[6%] h-[70%] w-[72%] lg:left-[-4%] lg:w-[58%]" />
      <div className="ambient-card absolute right-[-12%] top-[2%] hidden h-[82%] w-[46%] lg:block" />

      {/* Technical grid, at two scales */}
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="grid-bg-fine absolute inset-0 hidden md:block" />

      {/* Soft colour orbs for atmospheric depth */}
      <div className="animate-float-slow absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--primary)/var(--orb-alpha))] blur-[140px]" />
      <div
        className="animate-float-slow absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-[hsl(var(--secondary)/var(--orb-alpha))] blur-[160px]"
        style={{ animationDelay: "7s" }}
      />
      <div
        className="animate-float-slow absolute -bottom-40 left-1/3 h-[460px] w-[460px] rounded-full bg-[hsl(var(--accent)/calc(var(--orb-alpha)*0.6))] blur-[150px]"
        style={{ animationDelay: "14s" }}
      />

      {/* Neural network field */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Glass-like reflection, and the fade into the next section */}
      <div className="light-sheen absolute inset-x-0 top-0 h-2/3" />
      <div className="atmosphere-fade absolute inset-x-0 bottom-0 h-40" />
    </div>
  );
};
