import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import MotionGraphicPlayer, {
  MgScene,
  SceneShell,
  ease,
  totalDuration,
} from "./MotionGraphicPlayer";

/**
 * DpiMotionGraphic
 * ----------------
 * Code-drawn explainer for Azul Tech's Digital Public Infrastructure work in
 * Rwanda. Deliberately styled as an engineering *blueprint* — left-aligned,
 * monospaced annotations, construction lines, cyan on a drafting grid — so it
 * does not read like the other motion graphics on the site.
 */

const A = "var(--mg-accent)"; // cyan, set by the player

// Stylised Rwanda silhouette (viewBox 0 0 100 100). Kigali ≈ (50, 50).
const RWANDA_PATH =
  "M22,26 C18,32 14,40 16,46 C18,54 20,60 18,66 C22,74 28,80 34,83 L46,88 " +
  "C54,89 62,86 68,82 C76,76 82,66 86,56 C89,48 88,38 84,32 C80,26 72,20 64,17 " +
  "L50,13 C42,13 32,15 26,20 Z";

const RAILS = ["Identity", "Payments", "Data Exchange"];
const DEPLOYMENTS = [
  ["01", "National civil records digitisation"],
  ["02", "MINAGRI knowledge hub · TUNGA AI voicebot"],
  ["03", "6-nation cross-border road-safety data network"],
];
const STACK = [
  "Citizens & Businesses",
  "e-Government Services",
  "DPI Rails — Identity · Payments · Data",
  "Sovereign Cloud & Security",
];
const OUTCOMES = [
  ["Faster", "days, not months"],
  ["Cheaper", "shared, not siloed"],
  ["Auditable", "every transaction traced"],
  ["Interoperable", "ministries + borders"],
];

// ─── Blueprint chrome ─────────────────────────────────────────────────────────

function Fig({ n, title }: { n: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease }}
      className="mb-5 flex items-center gap-3"
    >
      <span
        className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]"
        style={{ color: A }}
      >
        Fig. {n}
      </span>
      <span className="h-px w-10" style={{ backgroundColor: A, opacity: 0.5 }} />
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
        {title}
      </span>
    </motion.div>
  );
}

// ─── Scenes ───────────────────────────────────────────────────────────────────

function TitleScene() {
  return (
    <SceneShell align="left">
      <Fig n="00" title="Overview" />
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease }}
        className="font-serif text-3xl font-bold leading-[1.05] text-white md:text-5xl"
      >
        Digital Public
        <br />
        <span style={{ color: A }}>Infrastructure</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 max-w-sm font-mono text-xs leading-relaxed text-white/55"
      >
        The shared digital rails a nation runs on — the way roads and power grids
        underpin the physical economy.
      </motion.p>
    </SceneShell>
  );
}

function RailsScene() {
  return (
    <SceneShell align="left">
      <Fig n="01" title="Core rails — elevation" />
      <div className="flex items-end gap-4">
        {RAILS.map((rail, i) => (
          <div key={rail} className="flex flex-col items-center">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2 + i * 0.16, duration: 0.55, ease }}
              style={{ transformOrigin: "bottom", borderColor: A }}
              className="h-[110px] w-[84px] border-x border-t border-dashed"
            >
              <div
                className="h-full w-full"
                style={{ backgroundColor: `rgba(var(--mg-accent-rgb),${0.1 + i * 0.06})` }}
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.16, duration: 0.4 }}
              className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/70"
            >
              {rail}
            </motion.span>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.2 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease }}
        style={{ transformOrigin: "left", borderColor: A }}
        className="mt-2 w-[300px] border py-1.5 text-center font-mono text-[9px] font-bold uppercase tracking-[0.3em]"
      >
        <span style={{ color: A }}>Digital Public Infrastructure</span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-5 font-serif text-lg font-bold text-white md:text-xl"
      >
        Three rails. Every public service builds on them.
      </motion.p>
    </SceneShell>
  );
}

function SovereignScene() {
  return (
    <SceneShell align="left">
      <Fig n="02" title="Data residency — site plan" />
      <div className="flex items-center gap-8">
        <svg viewBox="0 0 100 100" className="h-[150px] w-auto shrink-0 overflow-visible">
          <defs>
            <pattern id="dpi-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="5" stroke={A} strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          <motion.path
            d={RWANDA_PATH}
            fill="url(#dpi-hatch)"
            stroke={A}
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
            fill={A}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
          />
          <motion.text
            x={54}
            y={51}
            fill={A}
            style={{ fontSize: 6, fontFamily: "monospace" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            KGL
          </motion.text>
        </svg>
        <motion.ul
          initial="hide"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } } }}
          className="space-y-2 font-mono text-[11px] text-white/70"
        >
          {["Hosted in-country", "Encrypted at rest + in transit", "Governed under national law"].map((t) => (
            <motion.li
              key={t}
              variants={{ hide: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
              className="flex items-center gap-2"
            >
              <span style={{ color: A }}>—</span>
              {t}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-5 font-serif text-lg font-bold text-white md:text-xl"
      >
        Rwanda's data stays in Rwanda.
      </motion.p>
    </SceneShell>
  );
}

function DeploymentsScene() {
  return (
    <SceneShell align="left">
      <Fig n="03" title="In production" />
      <div className="flex flex-col gap-0 border-l border-dashed" style={{ borderColor: A }}>
        {DEPLOYMENTS.map(([n, line], i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.3, duration: 0.5, ease }}
            className="flex items-baseline gap-4 py-3 pl-5"
          >
            <span className="font-mono text-sm font-bold" style={{ color: A }}>
              {n}
            </span>
            <span className="font-serif text-sm text-white/90 md:text-base">{line}</span>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-5 font-serif text-lg font-bold text-white md:text-xl"
      >
        Live national systems, not slideware.
      </motion.p>
    </SceneShell>
  );
}

function StackScene() {
  return (
    <SceneShell align="left">
      <Fig n="04" title="Stack — section view" />
      <div className="flex items-stretch gap-3">
        <div className="flex flex-col gap-1.5">
          {STACK.map((row, i) => (
            <motion.div
              key={row}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.22, duration: 0.45, ease }}
              className="w-[320px] px-4 py-2.5 font-mono text-[12px]"
              style={{
                border: `1px ${i === 2 ? "solid" : "dashed"} ${i === 2 ? A : "rgba(255,255,255,0.18)"}`,
                backgroundColor: i === 2 ? `rgba(var(--mg-accent-rgb),0.12)` : "rgba(255,255,255,0.03)",
                color: i === 2 ? "#fff" : "rgba(255,255,255,0.7)",
              }}
            >
              {row}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <div className="h-full w-3 border-y border-r" style={{ borderColor: A }} />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="self-center font-mono text-[10px] uppercase tracking-widest"
          style={{ color: A }}
        >
          citizen → ministry
        </motion.span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="mt-5 font-serif text-lg font-bold text-white md:text-xl"
      >
        One stack, end to end.
      </motion.p>
    </SceneShell>
  );
}

function OutcomesScene() {
  return (
    <SceneShell align="left">
      <Fig n="05" title="Result — schedule" />
      <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
        {OUTCOMES.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.14, duration: 0.4 }}
            className="bg-[#040D14] px-5 py-4"
          >
            <div className="font-serif text-lg font-bold" style={{ color: A }}>
              {k}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-white/55">{v}</div>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-5 font-serif text-lg font-bold text-white md:text-xl"
      >
        What a nation gains by owning its rails.
      </motion.p>
    </SceneShell>
  );
}

function OutroScene() {
  return (
    <SceneShell align="left">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <Logo className="mb-5 h-7 w-auto text-white" />
        <h2 className="max-w-xl font-serif text-2xl font-bold leading-tight text-white md:text-4xl">
          Digital Public Infrastructure,
          <br />
          <span style={{ color: A }}>engineered in Kigali.</span>
        </h2>
        <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
          azultech.rw
        </p>
      </motion.div>
    </SceneShell>
  );
}

const SCENES: MgScene[] = [
  {
    id: "title",
    label: "Fig. 00 — Digital Public Infrastructure",
    duration: 9500,
    narration:
      "Digital public infrastructure is the shared digital foundation a country runs on — like its roads or power grid.",
    render: () => <TitleScene />,
  },
  {
    id: "rails",
    label: "Fig. 01 — Three core rails",
    duration: 10000,
    narration:
      "Azul Tech builds three core rails: identity, payments, and data exchange. Every public service is built on top of them.",
    render: () => <RailsScene />,
  },
  {
    id: "sovereign",
    label: "Fig. 02 — Data stays in Rwanda",
    duration: 7500,
    narration:
      "For Rwanda, that infrastructure is hosted, encrypted, and governed entirely inside the country.",
    render: () => <SovereignScene />,
  },
  {
    id: "deployments",
    label: "Fig. 03 — Live national systems",
    duration: 9500,
    narration:
      "These are live national systems — from civil records digitisation to a cross-border road-safety network spanning six countries.",
    render: () => <DeploymentsScene />,
  },
  {
    id: "stack",
    label: "Fig. 04 — One stack, end to end",
    duration: 8500,
    narration:
      "One coherent stack connects the citizen to the ministry, with security built in at the foundation.",
    render: () => <StackScene />,
  },
  {
    id: "outcomes",
    label: "Fig. 05 — What a nation gains",
    duration: 10000,
    narration:
      "When a nation owns its rails, services get faster and cheaper, every transaction is auditable, and systems finally connect.",
    render: () => <OutcomesScene />,
  },
  {
    id: "outro",
    label: "Engineered in Kigali",
    duration: 6000,
    narration: "Digital public infrastructure, engineered in Kigali by Azul Tech.",
    render: () => <OutroScene />,
  },
];

export const RUNTIME_MS = totalDuration(SCENES);

interface Props {
  autoPlay?: boolean;
}

export default function DpiMotionGraphic({ autoPlay = true }: Props) {
  return (
    <MotionGraphicPlayer
      scenes={SCENES}
      watermark="Azul Tech · DPI Rwanda"
      autoPlay={autoPlay}
      accent="#0ECFFE"
      accentRgb="14,207,254"
      pattern="grid"
      cornerTicks
    />
  );
}
