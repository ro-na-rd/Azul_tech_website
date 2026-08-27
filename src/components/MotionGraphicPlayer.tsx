import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * MotionGraphicPlayer
 * -------------------
 * Shared engine for the site's code-drawn "videos" — a timed sequence of
 * SVG + Framer Motion scenes with play / pause / replay and a click-to-seek
 * scrubber. No video file, no external embed.
 *
 * Feed it a list of scenes; each scene owns its own entrance animation.
 * Used by IntroMotionGraphic and DpiMotionGraphic.
 */

export interface MgScene {
  id: string;
  label: string;
  duration: number; // ms
  render: () => React.ReactNode;
}

export const ease = [0.33, 1, 0.68, 1] as const;

/** Centred, full-bleed wrapper with a soft entrance — use inside a scene. */
export function SceneShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
    >
      {children}
    </motion.div>
  );
}

interface Props {
  scenes: MgScene[];
  watermark?: string;
  autoPlay?: boolean;
}

export default function MotionGraphicPlayer({ scenes, watermark, autoPlay = true }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const total = scenes.reduce((s, x) => s + x.duration, 0);

  const [playing, setPlaying] = useState(autoPlay && !prefersReducedMotion);
  const [elapsed, setElapsed] = useState(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (!playing || prefersReducedMotion) return;
    lastRef.current = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(now - lastRef.current, 250); // clamp long gaps (bg tab)
      lastRef.current = now;
      setElapsed((e) => (e + dt) % total);
    }, 1000 / 30);
    return () => window.clearInterval(id);
  }, [playing, prefersReducedMotion, total]);

  // Derive the active scene from elapsed time.
  let acc = 0;
  let index = scenes.length - 1;
  for (let i = 0; i < scenes.length; i++) {
    if (elapsed < acc + scenes[i].duration) {
      index = i;
      break;
    }
    acc += scenes[i].duration;
  }
  const activeScene = scenes[index];
  const progress = elapsed / total;

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      setElapsed(ratio * total);
    },
    [total],
  );

  const replay = useCallback(() => {
    setElapsed(0);
    setPlaying(true);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#040D14] text-white select-none">
      {/* Background grid + vignette */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]" aria-hidden>
        <defs>
          <pattern id="mg-grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M34 0H0V34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mg-grid)" />
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#040D14_95%)]" />

      {/* Watermark + scene counter */}
      {watermark && (
        <div className="pointer-events-none absolute left-5 top-4 z-20 font-technical text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">
          {watermark}
        </div>
      )}
      <div className="pointer-events-none absolute right-5 top-4 z-20 font-technical text-[9px] uppercase tracking-[0.25em] text-white/30">
        {String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
      </div>

      {/* Active scene — one mounted at a time, keyed so it re-runs its entrance */}
      <div key={activeScene.id} className="absolute inset-0">
        {activeScene.render()}
      </div>

      {/* Caption */}
      <div className="pointer-events-none absolute bottom-16 left-0 right-0 z-20 text-center">
        <motion.p
          key={activeScene.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-technical text-[10px] uppercase tracking-[0.3em] text-white/45"
        >
          {activeScene.label}
        </motion.p>
      </div>

      {/* Controls */}
      {!prefersReducedMotion && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-8">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
          </button>
          <button
            onClick={replay}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Replay from start"
          >
            <RotateCcw size={13} />
          </button>

          <div
            onClick={seek}
            className="group relative h-4 flex-1 cursor-pointer"
            role="slider"
            aria-label="Timeline"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white/15" />
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand-blue"
              style={{ width: `${progress * 100}%` }}
            />
            {scenes.slice(0, -1).map((_, i) => {
              const pct =
                (scenes.slice(0, i + 1).reduce((s, x) => s + x.duration, 0) / total) * 100;
              return (
                <span
                  key={i}
                  className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-[#040D14]"
                  style={{ left: `${pct}%` }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
