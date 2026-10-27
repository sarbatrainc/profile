"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Configuration — overridable through CSS variables:
 *   --cursor-glow-rgb      base glow colour (defaults to --accent-rgb)
 *   --cursor-glow-size     base glow diameter in px (default 140)
 *   --cursor-glow-hover    glow diameter on hover in px (default 200)
 *   --cursor-max-particles maximum concurrent particles (default 22)
 *   --cursor-particle-life particle lifetime in seconds (default 0.9)
 *   --cursor-spawn-interval ms between particle spawns (default 45)
 */
const DEFAULTS = {
  glowSize: 160,
  glowHoverSize: 240,
  maxParticles: 22,
  particleLife: 0.9,
  spawnInterval: 45,
  lerpFactor: 0.18,
} as const;

const DEFAULTS_CONFIG = {
  glowRgb: "96, 76, 232",
  glowSize: DEFAULTS.glowSize,
  glowHoverSize: DEFAULTS.glowHoverSize,
  maxParticles: DEFAULTS.maxParticles,
  particleLife: DEFAULTS.particleLife,
  spawnInterval: DEFAULTS.spawnInterval,
} as const;

interface Particle {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function CursorGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const spawnRef = useRef<number>(0);
  const hoverRef = useRef(false);
  const loopRef = useRef<((now: number) => void) | null>(null);

  const getConfig = useCallback(() => {
    if (typeof window === "undefined") return DEFAULTS_CONFIG;
    const computed = getComputedStyle(document.documentElement);
    return {
      glowRgb: computed.getPropertyValue("--cursor-glow-rgb").trim() || DEFAULTS_CONFIG.glowRgb,
      glowSize:
        parseFloat(computed.getPropertyValue("--cursor-glow-size").trim()) ||
        DEFAULTS_CONFIG.glowSize,
      glowHoverSize:
        parseFloat(computed.getPropertyValue("--cursor-glow-hover").trim()) ||
        DEFAULTS_CONFIG.glowHoverSize,
      maxParticles:
        Math.floor(
          parseFloat(computed.getPropertyValue("--cursor-max-particles").trim()) ||
            DEFAULTS_CONFIG.maxParticles,
        ) || DEFAULTS_CONFIG.maxParticles,
      particleLife:
        parseFloat(computed.getPropertyValue("--cursor-particle-life").trim()) ||
        DEFAULTS_CONFIG.particleLife,
      spawnInterval:
        parseFloat(computed.getPropertyValue("--cursor-spawn-interval").trim()) ||
        DEFAULTS_CONFIG.spawnInterval,
    };
  }, []);

  const spawnParticle = useCallback(() => {
    if (!containerRef.current) return;
    const { glowRgb, maxParticles } = getConfig();
    if (particlesRef.current.length >= maxParticles) return;

    const el = document.createElement("div");
    const size = Math.random() * 5 + 3;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 30 + 20;

    el.style.position = "absolute";
    el.style.pointerEvents = "none";
    el.style.borderRadius = "50%";
    el.style.zIndex = "9998";
    el.style.transform = "translate(-50%, -50%)";
    el.style.willChange = "left, top, opacity, width, height";
    el.style.background = `radial-gradient(circle, rgba(${glowRgb} / 0.5) 0%, rgba(${glowRgb} / 0) 70%)`;

    containerRef.current.appendChild(el);

    particlesRef.current = [
      ...particlesRef.current,
      {
        el,
        x: posRef.current.x,
        y: posRef.current.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        size,
      },
    ];
  }, [getConfig]);

  // Client-only setup: device support check + animation loop.
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // Apply CSS variables to the glow element (client only; defaults already rendered).
    if (glowRef.current) {
      const { glowRgb } = getConfig();
      glowRef.current.style.background = `radial-gradient(circle, rgba(${glowRgb} / 0.35) 0%, rgba(${glowRgb} / 0) 70%)`;
      glowRef.current.style.mixBlendMode = "lighten";
    }

    loopRef.current = (now: number) => {
      const { glowSize, glowHoverSize } = getConfig();

      // Smooth interpolation toward target (no jitter).
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      posRef.current.x += dx * DEFAULTS.lerpFactor;
      posRef.current.y += dy * DEFAULTS.lerpFactor;

      if (glowRef.current) {
        const size = hoverRef.current ? glowHoverSize : glowSize;
        glowRef.current.style.left = `${posRef.current.x}px`;
        glowRef.current.style.top = `${posRef.current.y}px`;
        glowRef.current.style.width = `${size}px`;
        glowRef.current.style.height = `${size}px`;
        glowRef.current.style.transform = "translate(-50%, -50%)";
      }

      // Spawn particles on a throttle.
      if (now - spawnRef.current > getConfig().spawnInterval) {
        spawnParticle();
        spawnRef.current = now;
      }

      // Update particles — drift, fade, cleanup expired.
      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        const el = p.el;
        const life = p.life - 1 / 60;
        if (life <= 0) {
          el.remove();
          continue;
        }
        const t = Math.max(0, life / p.maxLife);
        const x = p.x + p.vx * 0.16;
        const y = p.y + p.vy * 0.16;
        const vx = p.vx * 0.94;
        const vy = p.vy * 0.94;

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.opacity = String(t);
        el.style.width = `${p.size * t}px`;
        el.style.height = `${p.size * t}px`;

        alive.push({ el, x, y, vx, vy, life, maxLife: p.maxLife, size: p.size });
      }
      particlesRef.current = alive;

      rafRef.current = requestAnimationFrame(loopRef.current!);
    };

    const handleMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (posRef.current.x === 0 && posRef.current.y === 0) {
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
    };

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return el.matches(
        "button, a, input, select, textarea, [role='button'], [role='link'], [data-cursor-hover]",
      );
    };

    const handleOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) hoverRef.current = true;
    };

    const handleOut = (e: MouseEvent) => {
      if (isInteractive(e.relatedTarget) || isInteractive(e.target)) return;
      hoverRef.current = false;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, true);
    document.addEventListener("mouseout", handleOut, true);

    rafRef.current = requestAnimationFrame(loopRef.current!);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver, true);
      document.removeEventListener("mouseout", handleOut, true);
      cancelAnimationFrame(rafRef.current);
      particlesRef.current.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, [getConfig, spawnParticle]);

  // Render always uses defaults so server and client HTML match (no hydration mismatch).
  const { glowRgb } = DEFAULTS_CONFIG;

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-[9998] pointer-events-none" />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed z-[9999] rounded-full pointer-events-none"
        style={{
          left: "0",
          top: "0",
          width: `${DEFAULTS_CONFIG.glowSize}px`,
          height: `${DEFAULTS_CONFIG.glowSize}px`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(${glowRgb} / 0.35) 0%, rgba(${glowRgb} / 0) 70%)`,
          mixBlendMode: "lighten",
        }}
      />
    </>
  );
}
