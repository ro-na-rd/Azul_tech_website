import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

/**
 * MotionGraphicPlayer
 * -------------------
 * Shared engine for the site's code-drawn "videos" — a timed sequence of
 * SVG + Framer Motion scenes with play / pause / replay, an optional spoken
 * voice-over (browser SpeechSynthesis) and a click-to-seek scrubber.
 * No video file, no external embed.
 *
 * Look is themed per graphic via `accent` / `accentRgb` / `pattern` so the
 * different videos on the site do not read as the same design.
 */

export interface MgScene {
  id: string;
  label: string;
  duration: number; // ms
  narration?: string; // spoken when the scene becomes active (if sound is on)
  render: () => React.ReactNode;
}

export const ease = [0.33, 1, 0.68, 1] as const;

/** Total runtime of a scene list, in ms. */
export const totalDuration = (scenes: MgScene[]) =>
  scenes.reduce((sum, s) => sum + s.duration, 0);

/** Format a ms runtime as `M:SS` (e.g. 70000 → "1:10"). */
export function formatRuntime(ms: number): string {
  const secs = Math.round(ms / 1000);
  return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
}

/** Centred, full-bleed wrapper with a soft entrance — use inside a scene. */
export function SceneShell({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      className={`absolute inset-0 flex flex-col justify-center gap-1 px-8 pb-20 ${
        align === "left" ? "items-start text-left pt-16 md:px-16" : "items-center text-center pt-14"
      }`}
    >
      {children}
    </motion.div>
  );
}

// ─── Voice-over ───────────────────────────────────────────────────────────────

// Soft, natural female voices, best-first, across Win / macOS / Chrome / Edge.
const FEMALE_VOICE_PREFS = [
  /aria/i, /jenny/i, /ava/i, /libby/i, /sonia/i, /michelle/i, /clara/i, /nova/i,
  /samantha/i, /allison/i, /serena/i, /victoria/i, /karen/i, /moira/i, /tessa/i,
  /zira/i, /hazel/i, /susan/i, /linda/i, /google us english/i, /google uk english female/i,
  /female/i,
];

function pickVoice(
  voices: SpeechSynthesisVoice[],
  extraPrefs: RegExp[] = [],
): SpeechSynthesisVoice | null {
  const en = voices.filter((v) => /^en(-|_|$)/i.test(v.lang));
  const pool = en.length ? en : voices;
  for (const re of [...extraPrefs, ...FEMALE_VOICE_PREFS]) {
    const hit = pool.find((v) => re.test(v.name));
    if (hit) return hit;
  }
  // Avoid obvious male voices if we can.
  const notMale = pool.find((v) => !/david|mark|george|james|guy|daniel|alex|fred|rishi|paul/i.test(v.name));
  return notMale || pool[0] || null;
}

const speechSupported =
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;

/**
 * Stable voice-over controller (browser SpeechSynthesis). Returns a ref-stable
 * `api` object so it can be used in effect deps without re-running every frame.
 */
function useNarrator(voicePrefs: RegExp[]) {
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const prefsRef = useRef(voicePrefs);
  prefsRef.current = voicePrefs;
  const cfgRef = useRef({ muted: false, volume: 1, rate: 0.97, pitch: 1.08 });
  const keepAliveRef = useRef<number | null>(null);

  useEffect(() => {
    if (!speechSupported) return;
    const load = () => {
      const v = pickVoice(window.speechSynthesis.getVoices(), prefsRef.current);
      if (v) voiceRef.current = v;
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
      if (keepAliveRef.current) window.clearInterval(keepAliveRef.current);
    };
  }, []);

  const api = useRef({
    setConfig(cfg: { muted: boolean; volume: number; rate: number; pitch: number }) {
      cfgRef.current = cfg;
    },
    /** Call from inside a user gesture to unlock audio on Chrome/Safari. */
    prime() {
      if (!speechSupported) return;
      try {
        window.speechSynthesis.resume();
        const u = new SpeechSynthesisUtterance("");
        u.volume = 0;
        window.speechSynthesis.speak(u);
        window.speechSynthesis.cancel();
      } catch {
        /* no-op */
      }
    },
    speak(text?: string) {
      if (!speechSupported || !text || cfgRef.current.muted) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (voiceRef.current) u.voice = voiceRef.current;
      u.volume = cfgRef.current.volume;
      u.rate = cfgRef.current.rate;
      u.pitch = cfgRef.current.pitch;
      u.lang = voiceRef.current?.lang || "en-US";
      try {
        synth.resume();
      } catch {
        /* no-op */
      }
      synth.speak(u);
      // Chrome pauses long/queued speech after ~15s — nudge it awake.
      if (keepAliveRef.current) window.clearInterval(keepAliveRef.current);
      keepAliveRef.current = window.setInterval(() => {
        if (synth.speaking) synth.resume();
        else if (keepAliveRef.current) {
          window.clearInterval(keepAliveRef.current);
          keepAliveRef.current = null;
        }
      }, 5000);
    },
    stop() {
      if (speechSupported) window.speechSynthesis.cancel();
      if (keepAliveRef.current) {
        window.clearInterval(keepAliveRef.current);
        keepAliveRef.current = null;
      }
    },
  }).current;

  return { supported: speechSupported, api };
}

// ─── Background patterns ──────────────────────────────────────────────────────

type Pattern = "grid" | "arcs" | "rings" | "dots";

function Backdrop({ pattern }: { pattern: Pattern }) {
  if (pattern === "dots") {
    return (
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]" aria-hidden>
        <defs>
          <pattern id="mg-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.10)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mg-dots)" />
      </svg>
    );
  }
  if (pattern === "arcs") {
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {[30, 60, 90, 120, 150].map((r) => (
          <ellipse
            key={r}
            cx="160"
            cy="200"
            rx={r * 1.6}
            ry={r}
            fill="none"
            stroke="rgba(245,166,35,0.10)"
            strokeWidth="0.8"
          />
        ))}
        {[40, 80, 120, 160, 200, 240, 280].map((x) => (
          <line key={x} x1={x} y1="0" x2="160" y2="200" stroke="rgba(245,166,35,0.06)" strokeWidth="0.6" />
        ))}
      </svg>
    );
  }
  if (pattern === "rings") {
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {[24, 48, 72, 96, 120, 150].map((r) => (
          <circle key={r} cx="160" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
      </svg>
    );
  }
  // grid (blueprint)
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4]" aria-hidden>
      <defs>
        <pattern id="mg-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <pattern id="mg-grid-lg" width="140" height="140" patternUnits="userSpaceOnUse">
          <path d="M140 0H0V140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mg-grid)" />
      <rect width="100%" height="100%" fill="url(#mg-grid-lg)" />
    </svg>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface Props {
  scenes: MgScene[];
  watermark?: string;
  autoPlay?: boolean;
  accent?: string; // hex
  accentRgb?: string; // "r,g,b" — must match `accent`
  pattern?: Pattern;
  /** Corner registration ticks (blueprint feel). */
  cornerTicks?: boolean;
  /** Voice-over speaking rate (0.1–10, ~1 = normal). Lower = softer/calmer. */
  narrationRate?: number;
  /** Voice-over pitch (0–2, ~1 = normal). */
  narrationPitch?: number;
  /** Extra voice-name matchers tried before the default female-voice list. */
  voicePrefs?: RegExp[];
}

const EMPTY_PREFS: RegExp[] = [];

export default function MotionGraphicPlayer({
  scenes,
  watermark,
  autoPlay = true,
  accent = "#0ECFFE",
  accentRgb = "14,207,254",
  pattern = "grid",
  cornerTicks = false,
  narrationRate = 0.97,
  narrationPitch = 1.08,
  voicePrefs = EMPTY_PREFS,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const total = scenes.reduce((s, x) => s + x.duration, 0);

  const [playing, setPlaying] = useState(autoPlay && !prefersReducedMotion);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [, forceTick] = useState(0);

  // Wall-clock timeline: `elapsed` is derived from real timestamps every render,
  // so throttled timers (background tabs) change only the refresh rate, never the
  // playback speed. `baseRef` holds committed time; `runStartRef` is the clock at
  // which the current play segment began (null while paused).
  const baseRef = useRef(0);
  const runStartRef = useRef<number | null>(null);

  const commit = () => {
    if (runStartRef.current != null) {
      baseRef.current = (baseRef.current + (performance.now() - runStartRef.current)) % total;
      runStartRef.current = null;
    }
  };

  const { supported: speechOk, api: narrator } = useNarrator(voicePrefs);

  // Keep the narrator's config in sync (ref-stable api, so this is cheap).
  useEffect(() => {
    narrator.setConfig({ muted, volume, rate: narrationRate, pitch: narrationPitch });
  }, [muted, volume, narrationRate, narrationPitch, narrator]);

  useEffect(() => {
    if (!playing || prefersReducedMotion) return;
    runStartRef.current = performance.now();
    const id = window.setInterval(() => forceTick((t) => (t + 1) % 1_000_000), 1000 / 30);
    return () => {
      window.clearInterval(id);
      commit();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, prefersReducedMotion, total]);

  const elapsed =
    runStartRef.current == null
      ? baseRef.current % total
      : (baseRef.current + (performance.now() - runStartRef.current)) % total;

  // Active scene from elapsed time.
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

  // Speak the active scene's narration when the scene (or play/mute state) changes.
  const spokenForRef = useRef<string | null>(null);
  useEffect(() => {
    if (playing && !muted) {
      const token = `${activeScene.id}|${muted}`;
      if (spokenForRef.current !== token) {
        spokenForRef.current = token;
        narrator.speak(activeScene.narration);
      }
    } else {
      spokenForRef.current = null;
      narrator.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScene.id, playing, muted]);

  // Stop narration only when the whole player unmounts.
  useEffect(() => () => narrator.stop(), [narrator]);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      baseRef.current = ratio * total;
      if (runStartRef.current != null) runStartRef.current = performance.now();
      spokenForRef.current = null; // let the new scene re-narrate
      forceTick((t) => t + 1);
    },
    [total],
  );

  const replay = useCallback(() => {
    narrator.prime();
    baseRef.current = 0;
    if (runStartRef.current != null) runStartRef.current = performance.now();
    spokenForRef.current = null;
    setPlaying(true);
    forceTick((t) => t + 1);
  }, [narrator]);

  const togglePlay = useCallback(() => {
    narrator.prime();
    setPlaying((p) => !p);
  }, [narrator]);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#040D14] text-white select-none"
      style={{ ["--mg-accent" as any]: accent, ["--mg-accent-rgb" as any]: accentRgb }}
    >
      <Backdrop pattern={pattern} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#040D14_95%)]" />

      {cornerTicks && (
        <>
          {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map((pos) => (
            <span
              key={pos}
              className={`pointer-events-none absolute ${pos} h-4 w-4 border-white/25`}
              style={{
                borderTopWidth: pos.includes("top") ? 1 : 0,
                borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                borderLeftWidth: pos.includes("left") ? 1 : 0,
                borderRightWidth: pos.includes("right") ? 1 : 0,
              }}
            />
          ))}
        </>
      )}

      {watermark && (
        <div className="pointer-events-none absolute left-5 top-4 z-20 font-technical text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">
          {watermark}
        </div>
      )}
      <div className="pointer-events-none absolute right-5 top-4 z-20 font-technical text-[9px] uppercase tracking-[0.25em] text-white/30">
        {String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
      </div>

      {/* Active scene — one mounted at a time, keyed so it re-runs its entrance */}
      <div
        key={activeScene.id}
        className="absolute inset-0"
        role="img"
        aria-label={activeScene.label}
      >
        {activeScene.render()}
      </div>

      {/* Controls */}
      {!prefersReducedMotion && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-3 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-8">
          <button
            onClick={togglePlay}
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

          {speechOk && (
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={() => {
                  const next = !muted;
                  setMuted(next);
                  if (!next) {
                    narrator.prime();
                    if (playing) narrator.speak(activeScene.narration);
                  }
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label={muted ? "Unmute voice-over" : "Mute voice-over"}
              >
                {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  narrator.prime();
                  setMuted(v === 0);
                  setVolume(v);
                }}
                onMouseUp={() => {
                  if (!muted && volume > 0 && playing) narrator.speak(activeScene.narration);
                }}
                onTouchEnd={() => {
                  if (!muted && volume > 0 && playing) narrator.speak(activeScene.narration);
                }}
                aria-label="Voice-over volume"
                className="mg-volume h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
                style={{ accentColor: accent }}
              />
            </div>
          )}

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
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
              style={{ width: `${progress * 100}%`, backgroundColor: accent }}
            />
            {scenes.slice(0, -1).map((_, i) => {
              const pct = (scenes.slice(0, i + 1).reduce((s, x) => s + x.duration, 0) / total) * 100;
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
