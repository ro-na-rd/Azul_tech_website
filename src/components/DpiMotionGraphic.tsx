import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Check, ArrowDown } from "lucide-react";
import Logo from "./Logo";
import MotionGraphicPlayer, { MgScene, SceneShell, ease } from "./MotionGraphicPlayer";

/**
 * DpiMotionGraphic
 * ----------------
 * A code-drawn explainer "video" about Azul Tech's Digital Public Infrastructure
 * work in Rwanda — no video file, no external embed. Rendered in the MediaBlock
 * "Digital Public Infrastructure" briefing instead of an external clip.
 */

// Stylised Rwanda silhouette (viewBox 0 0 100 100). Kigali ≈ (50, 50).
const RWANDA_PATH =
  "M22,26 C18,32 14,40 16,46 C18,54 20,60 18,66 C22,74 28,80 34,83 L46,88 " +
  "C54,89 62,86 68,82 C76,76 82,66 86,56 C89,48 88,38 84,32 C80,26 72,20 64,17 " +
  "L50,13 C42,13 32,15 26,20 Z";

const RAILS = ["Identity", "Payments", "Data Exchange"];

const DEPLOYMENTS = [
  "National civil records digitisation",
  "MINAGRI knowledge hub · TUNGA AI voicebot",
  "6-nation cross-border road-safety data network",
];

const STACK = [
  { label: "Citizens & Businesses", note: "One login, every service" },
  { label: "e-Government Services", note: "Permits, health, tax, records" },
  { label: "DPI Rails — Identity · Payments · Data", note: "Shared, reusable, open" },
  { label: "Sovereign Cloud & Security", note: "Hosted and governed in Rwanda" },
];

const OUTCOMES = [
  { k: "Faster", v: "Services in days, not months" },
  { k: "Cheaper", v: "Shared rails, not siloed builds" },
  { k: "Auditable", v: "Every transaction traceable" },
  { k: "Interoperable", v: "Ministries and borders connected" },
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
        What Azul Tech builds in Rwanda
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.7, ease }}
        className="font-serif text-4xl font-bold text-white md:text-6xl"
      >
        Digital Public <span className="italic font-normal text-brand-blue">Infrastructure</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-5 max-w-md font-serif text-sm text-white/60 md:text-base"
      >
        The shared digital rails a nation runs on — the way roads and power grids
        underpin the physical economy.
      </motion.p>
    </SceneShell>
  );
}

function RailsScene() {
  return (
    <SceneShell>
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Services riding on top */}
        <div className="mb-3 flex gap-2">
          {["Health", "Tax", "Permits", "Records"].map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
              className="border border-white/15 bg-white/[0.04] px-2 py-1 font-technical text-[9px] uppercase tracking-widest text-white/60"
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* Pillars */}
        <div className="flex h-[130px] items-end gap-3">
          {RAILS.map((rail, i) => (
            <motion.div
              key={rail}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.6, ease }}
              style={{ transformOrigin: "bottom", backgroundColor: `rgba(14,207,254,${0.14 + i * 0.05})` }}
              className="flex w-[92px] items-end justify-center border-x border-t border-brand-blue/40 pb-2"
            >
              <span className="font-serif text-[11px] font-bold text-white">{rail}</span>
            </motion.div>
          ))}
        </div>

        {/* Foundation */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease }}
          className="mt-1 flex w-full items-center justify-center border border-brand-blue bg-brand-blue/15 py-2 font-technical text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue"
        >
          Digital Public Infrastructure
        </motion.div>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-6 font-serif text-xl font-bold text-white md:text-2xl"
      >
        Three rails. Every public service rides on them.
      </motion.h3>
    </SceneShell>
  );
}

function SovereignScene() {
  const packets = useMemo(
    () => [
      { x: [40, 58, 46], y: [40, 52, 62] },
      { x: [60, 44, 56], y: [58, 44, 66] },
      { x: [50, 62, 42], y: [66, 54, 44] },
    ],
    [],
  );

  return (
    <SceneShell>
      <div className="relative mb-6 h-[48%] max-h-[230px]">
        <svg viewBox="0 0 100 100" className="h-full w-auto overflow-visible">
          <motion.path
            d={RWANDA_PATH}
            fill="rgba(14,207,254,0.07)"
            stroke="#0ECFFE"
            strokeWidth={1.4}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease }}
          />
          {packets.map((p, i) => (
            <motion.circle
              key={i}
              r={2}
              fill="#0ECFFE"
              cx={p.x[0]}
              cy={p.y[0]}
              initial={{ opacity: 0 }}
              animate={{ cx: p.x, cy: p.y, opacity: [0, 1, 1, 1] }}
              transition={{ delay: 1.4 + i * 0.2, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <motion.circle
            cx={50}
            cy={50}
            r={9}
            fill="#040D14"
            stroke="#0ECFFE"
            strokeWidth={1.4}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          />
          <motion.text
            x={50}
            y={53}
            textAnchor="middle"
            fill="#0ECFFE"
            style={{ fontSize: 7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            RW
          </motion.text>
        </svg>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-xl font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Rwanda's data — hosted, encrypted and governed inside Rwanda.
      </motion.h3>
    </SceneShell>
  );
}

function DeploymentsScene() {
  return (
    <SceneShell>
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Live systems, not slideware.
      </motion.h3>
      <div className="flex w-full max-w-lg flex-col gap-3">
        {DEPLOYMENTS.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.35, duration: 0.55, ease }}
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

function StackScene() {
  return (
    <SceneShell>
      <div className="flex w-full max-w-md flex-col items-center gap-1.5">
        {STACK.map((row, i) => (
          <React.Fragment key={row.label}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.28, duration: 0.45, ease }}
              className={`w-full px-4 py-2.5 text-center ${
                i === 2
                  ? "border border-brand-blue bg-brand-blue/15"
                  : "border border-white/12 bg-white/[0.04]"
              }`}
            >
              <div className="font-serif text-[13px] font-bold text-white">{row.label}</div>
              <div className="font-technical text-[9px] uppercase tracking-widest text-white/45">
                {row.note}
              </div>
            </motion.div>
            {i < STACK.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.28, duration: 0.3 }}
                className="text-brand-blue/60"
              >
                <ArrowDown size={13} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mt-5 font-serif text-lg font-bold text-white md:text-xl"
      >
        One stack, from citizen to ministry.
      </motion.h3>
    </SceneShell>
  );
}

function OutcomesScene() {
  return (
    <SceneShell>
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-7 font-serif text-2xl font-bold text-white md:text-3xl"
      >
        What a nation gains by owning its rails.
      </motion.h3>
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {OUTCOMES.map((o, i) => (
          <motion.div
            key={o.k}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.45, ease }}
            className="border border-white/10 bg-white/[0.03] p-4 text-left"
          >
            <div className="font-serif text-lg font-bold text-brand-blue">{o.k}</div>
            <div className="mt-1 font-technical text-[10px] uppercase tracking-wide text-white/55">
              {o.v}
            </div>
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
          Digital Public Infrastructure,{" "}
          <span className="italic font-normal text-brand-blue">engineered in Kigali.</span>
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
  { id: "title", label: "Digital Public Infrastructure", duration: 5200, render: () => <TitleScene /> },
  { id: "rails", label: "Three rails, every service", duration: 6000, render: () => <RailsScene /> },
  { id: "sovereign", label: "Hosted and governed in Rwanda", duration: 5400, render: () => <SovereignScene /> },
  { id: "deployments", label: "Live systems, not slideware", duration: 5800, render: () => <DeploymentsScene /> },
  { id: "stack", label: "From citizen to ministry", duration: 6000, render: () => <StackScene /> },
  { id: "outcomes", label: "Owning the rails", duration: 5600, render: () => <OutcomesScene /> },
  { id: "outro", label: "Engineered in Kigali", duration: 5000, render: () => <OutroScene /> },
];

interface DpiMotionGraphicProps {
  autoPlay?: boolean;
}

export default function DpiMotionGraphic({ autoPlay = true }: DpiMotionGraphicProps) {
  return (
    <MotionGraphicPlayer
      scenes={SCENES}
      watermark="Azul Tech · DPI Rwanda"
      autoPlay={autoPlay}
    />
  );
}
