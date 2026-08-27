import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Logo from "./Logo";
import MotionGraphicPlayer, { MgScene, SceneShell, ease } from "./MotionGraphicPlayer";

/**
 * GlobalSouthMotionGraphic
 * ------------------------
 * A code-drawn explainer "video" for the "Kigali, Rwanda → The World" briefing:
 * born in Africa, built for the Global South, with emerging-market context at
 * the core rather than as an afterthought. No video file, no external embed.
 */

// Stylised Rwanda silhouette (viewBox 0 0 100 100). Kigali ≈ (50, 50).
const RWANDA_PATH =
  "M22,26 C18,32 14,40 16,46 C18,54 20,60 18,66 C22,74 28,80 34,83 L46,88 " +
  "C54,89 62,86 68,82 C76,76 82,66 86,56 C89,48 88,38 84,32 C80,26 72,20 64,17 " +
  "L50,13 C42,13 32,15 26,20 Z";

const CONTEXT = [
  "Intermittent connectivity",
  "Mobile-first, low-end devices",
  "Offline-tolerant by design",
  "Multi-language from day one",
  "Built to a public budget",
];

const REGIONS = [
  { name: "West Africa", x: 96, y: 96 },
  { name: "East Africa", x: 150, y: 74 },
  { name: "South Asia", x: 210, y: 86 },
  { name: "South-East Asia", x: 258, y: 104 },
  { name: "Latin America", x: 70, y: 128 },
];
const KIGALI = { x: 150, y: 96 };

const TRAVELS = [
  "Open protocols, not black boxes",
  "Reference codebases nations can fork",
  "Sovereign-by-default architecture",
  "Local engineers trained to operate it",
];

// ─── Scenes ───────────────────────────────────────────────────────────────────

function TitleScene() {
  return (
    <SceneShell>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-technical text-[10px] font-bold uppercase tracking-[0.4em] text-brand-blue"
      >
        Born in Africa
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.7, ease }}
        className="font-serif text-3xl font-bold text-white md:text-5xl"
      >
        Kigali, Rwanda{" "}
        <span className="italic font-normal text-brand-blue">→ the world.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-5 max-w-md font-serif text-sm text-white/60 md:text-base"
      >
        Built for the Global South — with the context of emerging markets at the
        core, not as an afterthought.
      </motion.p>
    </SceneShell>
  );
}

function OriginScene() {
  return (
    <SceneShell>
      <div className="relative mb-6 h-[46%] max-h-[220px]">
        <svg viewBox="0 0 100 100" className="h-full w-auto overflow-visible">
          <motion.path
            d={RWANDA_PATH}
            fill="rgba(14,207,254,0.08)"
            stroke="#0ECFFE"
            strokeWidth={1.4}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease }}
          />
          <motion.circle
            cx={50}
            cy={50}
            r={2.6}
            fill="#0ECFFE"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          />
          <motion.circle
            cx={50}
            cy={50}
            r={2.6}
            fill="none"
            stroke="#0ECFFE"
            strokeWidth={0.8}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </svg>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-xl font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Engineered in Kigali by people who live the constraints.
      </motion.h3>
    </SceneShell>
  );
}

function ContextScene() {
  const cx = 160;
  const cy = 96;
  const R = 74;
  const items = useMemo(
    () =>
      CONTEXT.map((name, i) => {
        const angle = (-90 + i * (360 / CONTEXT.length)) * (Math.PI / 180);
        return { name, x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
      }),
    [],
  );

  return (
    <SceneShell>
      <div className="relative mb-4 h-[54%] max-h-[220px]">
        <svg viewBox="0 0 320 200" className="h-full w-auto overflow-visible">
          {items.map((it, i) => (
            <motion.line
              key={`l-${i}`}
              x1={cx}
              y1={cy}
              x2={it.x}
              y2={it.y}
              stroke="rgba(14,207,254,0.3)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease }}
            />
          ))}
          {items.map((it, i) => (
            <motion.g
              key={`n-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
            >
              <circle cx={it.x} cy={it.y} r={3} fill="#040D14" stroke="#0ECFFE" strokeWidth={1} />
              <text
                x={it.x}
                y={it.y < cy ? it.y - 7 : it.y + 12}
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                style={{ fontSize: 8 }}
              >
                {it.name}
              </text>
            </motion.g>
          ))}
          <motion.circle
            cx={cx}
            cy={cy}
            r={26}
            fill="rgba(14,207,254,0.12)"
            stroke="#0ECFFE"
            strokeWidth={1.2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease }}
          />
          <text x={cx} y={cy - 2} textAnchor="middle" fill="#fff" style={{ fontSize: 8, fontWeight: 700 }}>
            Emerging-market
          </text>
          <text x={cx} y={cy + 8} textAnchor="middle" fill="#fff" style={{ fontSize: 8, fontWeight: 700 }}>
            context
          </text>
        </svg>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="max-w-xl font-serif text-xl font-bold text-white md:text-2xl"
      >
        Designed for real conditions — not retrofitted for them.
      </motion.h3>
    </SceneShell>
  );
}

function ReachScene() {
  return (
    <SceneShell>
      <div className="relative mb-4 h-[52%] max-h-[210px]">
        <svg viewBox="0 0 320 180" className="h-full w-auto overflow-visible">
          {/* Global South belt */}
          <motion.path
            d="M20,120 Q160,60 300,120"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease }}
          />
          {REGIONS.map((r, i) => (
            <motion.line
              key={`l-${r.name}`}
              x1={KIGALI.x}
              y1={KIGALI.y}
              x2={r.x}
              y2={r.y}
              stroke="rgba(14,207,254,0.35)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.18, duration: 0.6, ease }}
            />
          ))}
          {REGIONS.map((r, i) => (
            <motion.circle
              key={`p-${r.name}`}
              r={2.2}
              fill="#0ECFFE"
              cx={KIGALI.x}
              cy={KIGALI.y}
              initial={{ opacity: 0 }}
              animate={{ cx: [KIGALI.x, r.x], cy: [KIGALI.y, r.y], opacity: [0, 1, 1, 0] }}
              transition={{
                delay: 1.2 + i * 0.2,
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "linear",
              }}
            />
          ))}
          {REGIONS.map((r, i) => (
            <motion.g
              key={`n-${r.name}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.18, duration: 0.4 }}
              style={{ transformOrigin: `${r.x}px ${r.y}px` }}
            >
              <circle cx={r.x} cy={r.y} r={3.4} fill="#040D14" stroke="#0ECFFE" strokeWidth={1} />
              <text
                x={r.x}
                y={r.y + 13}
                textAnchor="middle"
                fill="rgba(255,255,255,0.55)"
                style={{ fontSize: 7.5 }}
              >
                {r.name}
              </text>
            </motion.g>
          ))}
          <circle cx={KIGALI.x} cy={KIGALI.y} r={5} fill="#0ECFFE" />
          <text x={KIGALI.x} y={KIGALI.y - 9} textAnchor="middle" fill="#0ECFFE" style={{ fontSize: 8, fontWeight: 700 }}>
            KIGALI
          </text>
        </svg>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="max-w-xl font-serif text-xl font-bold text-white md:text-2xl"
      >
        One reference architecture. Many nations.
      </motion.h3>
    </SceneShell>
  );
}

function TravelsScene() {
  return (
    <SceneShell>
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl"
      >
        The blueprint travels. The sovereignty stays local.
      </motion.h3>
      <div className="flex w-full max-w-lg flex-col gap-3">
        {TRAVELS.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.3, duration: 0.5, ease }}
            className="flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-left"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-brand-blue">
              <Check size={14} />
            </span>
            <span className="font-serif text-sm text-white/90 md:text-base">{line}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

function OutroScene() {
  return (
    <SceneShell>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex flex-col items-center"
      >
        <Logo className="mb-6 h-8 w-auto text-white" />
        <h2 className="mb-4 max-w-2xl font-serif text-2xl font-bold text-white md:text-4xl">
          Born in Africa.{" "}
          <span className="italic font-normal text-brand-blue">Built for the Global South.</span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-technical text-[11px] font-bold uppercase tracking-[0.4em] text-white/50"
        >
          azultech.rw
        </motion.p>
      </motion.div>
    </SceneShell>
  );
}

const SCENES: MgScene[] = [
  { id: "title", label: "Kigali, Rwanda → the world", duration: 5200, render: () => <TitleScene /> },
  { id: "origin", label: "Engineered in Kigali", duration: 5200, render: () => <OriginScene /> },
  { id: "context", label: "Emerging-market context at the core", duration: 6200, render: () => <ContextScene /> },
  { id: "reach", label: "One architecture, many nations", duration: 6000, render: () => <ReachScene /> },
  { id: "travels", label: "The blueprint travels, sovereignty stays", duration: 5800, render: () => <TravelsScene /> },
  { id: "outro", label: "Born in Africa, built for the Global South", duration: 5000, render: () => <OutroScene /> },
];

interface Props {
  autoPlay?: boolean;
}

export default function GlobalSouthMotionGraphic({ autoPlay = true }: Props) {
  return (
    <MotionGraphicPlayer
      scenes={SCENES}
      watermark="Azul Tech · Global South"
      autoPlay={autoPlay}
    />
  );
}
