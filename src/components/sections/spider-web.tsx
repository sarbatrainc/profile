"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Features rendered as labelled nodes on the spider web. Positions are
 * fractions of the canvas (0–1) so they map to any viewport. Colours come from
 * the design tokens in globals.css (--accent / --accent-2 / --foreground).
 */
const FEATURES: { label: string; pos: [number, number] }[] = [
  { label: "Flutter", pos: [0.18, 0.18] },
  { label: "Dart", pos: [0.82, 0.14] },
  { label: "Laravel", pos: [0.22, 0.8] },
  { label: "PostgreSQL", pos: [0.78, 0.78] },
  { label: "REST API", pos: [0.5, 0.26] },
  { label: "Auth", pos: [0.34, 0.5] },
  { label: "Reporting", pos: [0.66, 0.5] },
  { label: "Offline-First", pos: [0.12, 0.62] },
  { label: "Hardware I/O", pos: [0.88, 0.62] },
];

const NODE_COUNT = 40;
const LINE_DISTANCE = 0.13; // normalised distance under which two nodes connect
const LINE_ALPHA = 0.15;
const NODE_RADIUS = 1.6;

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: boolean;
  label?: string;
};

/** Returns the inner oklch coords (e.g. `47% 0.17 140`) or a fallback string. */
function oklchInner(name: string, fallback: string): string {
  if (typeof getComputedStyle === "undefined" || typeof document === "undefined") {
    return fallback;
  }
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const match = raw.match(/oklch\(([^)]+)\)/);
  return match ? match[1] : fallback;
}

function oklchWithAlpha(name: string, alpha: number, fallback: string): string {
  return `oklch(${oklchInner(name, fallback)} / ${alpha})`;
}

export function SpiderWeb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Honour changes to the user's motion preference after first render.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  // Size the canvas to its parent box (one ResizeObserver instance).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;

    const resize = () => {
      const el = canvas.parentElement;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement as Element);
    window.addEventListener("resize", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Animated web: spreads across the canvas, breathes subtly and ripples on
  // mouse movement (the primary driver of motion).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lineColor = oklchWithAlpha("--foreground-subtle", LINE_ALPHA, "61% 0.012 265");
    const lineGlow = oklchInner("--accent", "47% 0.17 262");
    const nodeColor = oklchInner("--foreground-subtle", "61% 0.012 265");

    const nodes: Point[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({ x: Math.random(), y: Math.random(), vx: 0, vy: 0 });
    }
    for (const f of FEATURES) {
      nodes.push({ x: f.pos[0], y: f.pos[1], vx: 0, vy: 0, fx: true, label: f.label });
    }

    let mouseX = -9;
    let mouseY = -9;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const client = "touches" in e ? e.touches[0] : e;
      const x = (client.clientX - rect.left) / rect.width;
      const y = (client.clientY - rect.top) / rect.height;
      // Only react when the cursor is meaningfully over the canvas.
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        mouseX = x;
        mouseY = y;
      }
    };
    const onPointerLeave = () => {
      mouseX = -9;
      mouseY = -9;
    };
    canvas.parentElement?.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.parentElement?.addEventListener("pointerleave", onPointerLeave);
    canvas.parentElement?.addEventListener("mouseenter", onPointerLeave);

    let w = canvas.width;
    let h = canvas.height;

    const step = () => {
      if (!canvasRef.current) return;
      w = canvas.width;
      h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Physics: subtle idle drift + mouse-driven repulsion.
      for (const n of nodes) {
        if (n.fx) continue;

        const tx = Math.sin(performance.now() * 0.0002 + n.x * 13) * 0.008;
        const ty = Math.cos(performance.now() * 0.00017 + n.y * 13) * 0.008;

        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.28 && dist > 0.0001) {
          const f = (0.28 - dist) / 0.28;
          n.vx += (dx / dist) * f * 0.022;
          n.vy += (dy / dist) * f * 0.022;
        }

        n.vx += (tx - n.vx) * 0.1;
        n.vy += (ty - n.vy) * 0.1;
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x = (n.x + n.vx + 1) % 1;
        n.y = (n.y + n.vy + 1) % 1;
      }

      // Web lines between nearby nodes, glowing near the cursor.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy > LINE_DISTANCE * LINE_DISTANCE) continue;

          const mx = a.x + (b.x - a.x) / 2;
          const my = a.y + (b.y - a.y) / 2;
          const near = Math.hypot(mx - mouseX, my - mouseY) < 0.16;

          if (near) {
            ctx.save();
            ctx.shadowBlur = 6;
            ctx.shadowColor = `oklch(${lineGlow} / 0.45)`;
            ctx.strokeStyle = `oklch(${lineGlow} / 0.32)`;
          } else {
            ctx.strokeStyle = `oklch(${lineColor})`;
          }
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
          if (near) ctx.restore();
        }
      }

      // Regular web nodes. (Feature nodes are rendered as crisp DOM badges
      // over the canvas; they stay in the array so lines still connect to them.)
      for (const n of nodes) {
        if (n.label) continue;
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const parent = canvas.parentElement;
      parent?.removeEventListener("pointermove", onPointerMove);
      parent?.removeEventListener("pointerleave", onPointerLeave);
      parent?.removeEventListener("mouseenter", onPointerLeave);
    };
  }, [reduced]);

  // Static web for reduced-motion users: draw once, no movement.
  useEffect(() => {
    if (!reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;
    const styleW = parseFloat(canvas.style.width) || w;
    const pxW = w / styleW;

    const lineColor = `oklch(${oklchInner("--foreground-subtle", "61% 0.012 265")} / ${LINE_ALPHA})`;
    const featureColor = `oklch(${oklchInner("--accent-2", "52% 0.14 305")})`;
    const nodeColor = oklchInner("--foreground-subtle", "61% 0.012 265");
    const labelColor = oklchWithAlpha("--accent", 0.9, "47% 0.17 262");

    const nodes: Point[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({ x: Math.random(), y: Math.random(), vx: 0, vy: 0 });
    }
    for (const f of FEATURES) {
      nodes.push({ x: f.pos[0], y: f.pos[1], vx: 0, vy: 0, fx: true, label: f.label });
    }

    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (dx * dx + dy * dy > LINE_DISTANCE * LINE_DISTANCE) continue;
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(a.x * w, a.y * h);
        ctx.lineTo(b.x * w, b.y * h);
        ctx.stroke();
      }
    }

    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    for (const n of nodes) {
      if (n.label) {
        ctx.fillStyle = featureColor;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, NODE_RADIUS + 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `600 ${Math.max(10, 11 * pxW)}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillStyle = labelColor;
        ctx.fillText(n.label, n.x * w + 10, n.y * h + 8);
      } else {
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />

      {/* Feature labels: crisp DOM overlays anchored at their web positions,
          so the feature each node represents is always readable. */}
      <div className="absolute inset-0" aria-hidden="true">
        {FEATURES.map((f) => (
          <span
            key={f.label}
            className="pointer-events-none absolute flex items-center gap-1.5 rounded-full border border-accent/30 bg-surface/70 px-2.5 py-1 text-[10px] font-semibold text-accent backdrop-blur-sm"
            style={{
              left: `${f.pos[0] * 100}%`,
              top: `${f.pos[1] * 100}%`,
              transform: "translate(-50%, -50%)",
              textShadow: "0 0 4px oklch(47% 0.17 262 / 0.6)",
            }}
          >
            <span className="mb-[1px] block size-1.5 rounded-full bg-accent-2 shadow-[0_0_6px_oklch(52%_0.14_305_/_0.6)]" />
            <span>{f.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
