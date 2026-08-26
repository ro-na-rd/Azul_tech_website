import {
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  type MotionValue,
} from "framer-motion";
import { useRef, useEffect, useCallback } from "react";

// ─── Reusable Variants ────────────────────────────────────────────────────────

/** Stagger container — pair with any child variants */
export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Simple fade + rise */
export const fadeUp = (delay = 0, distance = 24) => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
  },
});

/** Blur + fade — good for images and secondary text */
export const blurFade = (delay = 0) => ({
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  },
});

/** Clip-path line reveal — text appears to slide up from a mask.
 *  Wrap the text in overflow-hidden for the effect to work. */
export const clipReveal = (delay = 0) => ({
  hidden: { y: "105%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, delay, ease: [0.33, 1, 0.68, 1] as any },
  },
});

/** Slide in from left */
export const slideInLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
  },
});

/** Slide in from right */
export const slideInRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
  },
});

/** Scale pop — good for icons and small UI elements */
export const scalePop = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
      delay,
    },
  },
});

// ─── 3-D Tilt Hook ────────────────────────────────────────────────────────────

interface TiltOptions {
  /** Maximum tilt angle in degrees (default 10) */
  strength?: number;
  /** Spring config (default: snappy) */
  spring?: { stiffness: number; damping: number };
}

export interface TiltReturn {
  ref: React.RefObject<HTMLElement>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  glareX: MotionValue<string>;
  glareY: MotionValue<string>;
  glareOpacity: MotionValue<number>;
}

export function useTilt(opts: TiltOptions = {}): TiltReturn {
  const { strength = 10, spring = { stiffness: 300, damping: 30 } } = opts;
  const ref = useRef<HTMLElement>(null!);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawScale = useMotionValue(1);
  const rawGlareX = useMotionValue(50);
  const rawGlareY = useMotionValue(50);

  const rotateX = useSpring(useTransform(rawY, [-1, 1], [strength, -strength]), spring);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-strength, strength]), spring);
  const scale = useSpring(rawScale, { stiffness: 300, damping: 30 });

  const glareX = useTransform(rawGlareX, v => `${v}%`);
  const glareY = useTransform(rawGlareY, v => `${v}%`);
  const glareOpacity = useMotionValue(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(nx);
    rawY.set(ny);
    rawGlareX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawGlareY.set(((e.clientY - rect.top) / rect.height) * 100);
    animate(glareOpacity, 0.15, { duration: 0.2 });
  }, [rawX, rawY, rawGlareX, rawGlareY, glareOpacity]);

  const handleMouseEnter = useCallback(() => {
    rawScale.set(1.02);
  }, [rawScale]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    rawScale.set(1);
    animate(glareOpacity, 0, { duration: 0.3 });
  }, [rawX, rawY, rawScale, glareOpacity]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ref, rotateX, rotateY, scale, glareX, glareY, glareOpacity };
}

// ─── Animated Counter Hook ────────────────────────────────────────────────────

/**
 * Returns a MotionValue that animates from 0 → target when `isInView` turns true.
 * Use with `useTransform(value, v => Math.round(v))` for integers.
 */
export function useCountUp(target: number, isInView: boolean, duration = 2) {
  const value = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(value, target, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, target, duration, value]);

  return value;
}

// ─── Magnetic Hover Hook ──────────────────────────────────────────────────────

/** Makes an element drift toward the cursor slightly — good for CTAs. */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null!);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, strength]);

  return { ref, x, y };
}
