import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Logo from "./Logo";
import MotionGraphicPlayer, { MgScene, SceneShell, ease } from "./MotionGraphicPlayer";

/**
 * IntroMotionGraphic
 * ------------------
 * A code-drawn brand "video" for the web app — no video file, no external embed.
 * Six timed SVG + Framer Motion scenes telling the Azul Tech Rwanda story with a
 * focus on local impact. Used inside the "Watch Video" modal in SovereignMoveHero.
 */

// Stylised Rwanda silhouette (viewBox 0 0 100 100). Kigali ≈ (50, 50).
const RWANDA_PATH =
  "M22,26 C18,32 14,40 16,46 C18,54 20,60 18,66 C22,74 28,80 34,83 L46,88 " +
  "C54,89 62,86 68,82 C76,76 82,66 86,56 C89,48 88,38 84,32 C80,26 72,20 64,17 " +
  "L50,13 C42,13 32,15 26,20 Z";

const LAYERS = [
  { name: "AI", note: "TUNGA conversational AI" },
  { name: "Security", note: "Hardware-backed, zero-trust" },
  { name: "Payment", note: "Sovereign settlement rails" },
  { name: "Data", note: "Cross-ministry exchange" },
  { name: "Identity", note: "National registry foundation" },
];

const IMPACT = [
  "Digitising Rwanda's civil registration archives",
  "Encrypted data rails linking every ministry",
  "Training Rwandan engineers to run the stack",
];

const INSTITUTIONS = ["NIDA", "MINAGRI", "MINISANTE", "MINECOFIN", "MINIJUST", "MINEDUC"];

// ─── Scenes ───────────────────────────────────────────────────────────────────

function IntroScene() {
  return (
    <SceneShell>
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className="relative mb-8"
      >
        {[0, 1, 2].map((r) => (
          <motion.span
            key={r}
            className="absolute inset-0 rounded-full border border-brand-blue/30"
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 2.6 + r, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, delay: r * 0.6, ease: "easeOut" }}
            style={{ width: 96, height: 96 }}
          />
        ))}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-blue/10">
          <Logo className="h-7 w-auto text-white" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-3 font-technical text-[10px] font-bold uppercase tracking-[0.4em] text-brand-blue"
      >
        Sovereign Digital Infrastructure Firm
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.65, duration: 0.7, ease }}
        className="font-serif text-4xl font-bold text-white md:text-5xl"
      >
        Built in Rwanda,{" "}
        <span className="italic font-normal text-brand-blue">for Rwanda.</span>
      </motion.h2>
    </SceneShell>
  );
}

function MapScene() {
  return (
    <SceneShell>
      <div className="relative mb-6 h-[46%] max-h-[240px]">
        <svg viewBox="0 0 100 100" className="h-full w-auto overflow-visible">
          <motion.path
            d={RWANDA_PATH}
            fill="rgba(14,207,254,0.08)"
            stroke="#0ECFFE"
            strokeWidth={1.4}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease }}
          />
          <motion.circle
            cx={50}
            cy={50}
            r={2.4}
            fill="#0ECFFE"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          />
          <motion.circle
            cx={50}
            cy={50}
            r={2.4}
            fill="none"
            stroke="#0ECFFE"
            strokeWidth={0.8}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ delay: 1.8, duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </svg>
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute left-1/2 top-1/2 ml-4 -translate-y-1/2 font-technical text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue"
        >
          Kigali
        </motion.span>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-xl font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Headquartered in Kigali — engineering national digital public infrastructure.
      </motion.h3>
    </SceneShell>
  );
}

function LayersScene() {
  return (
    <SceneShell>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 font-technical text-[10px] font-bold uppercase tracking-[0.4em] text-brand-blue"
      >
        The Azul Stack
      </motion.p>
      <div className="flex w-full max-w-md flex-col gap-2">
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, scaleX: 0.2, y: 8 }}
            animate={{ opacity: 1, scaleX: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.14, duration: 0.5, ease }}
            style={{
              transformOrigin: "left",
              backgroundColor: `rgba(14,207,254,${0.1 + i * 0.06})`,
            }}
            className="flex items-center justify-between border-l-2 border-brand-blue px-4 py-3 text-left"
          >
            <span className="font-serif text-sm font-bold text-white">{layer.name}</span>
            <span className="font-technical text-[9px] uppercase tracking-widest text-white/50">
              {layer.note}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-6 font-serif text-xl font-bold text-white md:text-2xl"
      >
        Five sovereign layers. One national stack.
      </motion.h3>
    </SceneShell>
  );
}

function ImpactScene() {
  return (
    <SceneShell>
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Local capacity. Sovereign control.
      </motion.h3>
      <div className="flex w-full max-w-lg flex-col gap-3">
        {IMPACT.map((line, i) => (
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

function NetworkScene() {
  const cx = 160;
  const cy = 110;
  const R = 82;
  const nodes = useMemo(
    () =>
      INSTITUTIONS.map((name, i) => {
        const angle = (-90 + i * (360 / INSTITUTIONS.length)) * (Math.PI / 180);
        return { name, x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
      }),
    [],
  );

  return (
    <SceneShell>
      <div className="relative mb-5 h-[52%] max-h-[240px]">
        <svg viewBox="0 0 320 220" className="h-full w-auto overflow-visible">
          {nodes.map((n, i) => (
            <motion.line
              key={`l-${n.name}`}
              x1={cx}
              y1={cy}
              x2={n.x}
              y2={n.y}
              stroke="rgba(14,207,254,0.35)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease }}
            />
          ))}

          {nodes.map((n, i) => (
            <motion.circle
              key={`p-${n.name}`}
              r={2.4}
              fill="#0ECFFE"
              initial={{ cx, cy, opacity: 0 }}
              animate={{ cx: [cx, n.x], cy: [cy, n.y], opacity: [0, 1, 1, 0] }}
              transition={{
                delay: 1 + i * 0.15,
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 0.6,
                ease: "linear",
              }}
            />
          ))}

          {nodes.map((n, i) => (
            <motion.g
              key={`n-${n.name}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r={4} fill="#040D14" stroke="#0ECFFE" strokeWidth={1.2} />
              <text
                x={n.x}
                y={n.y - 9}
                textAnchor="middle"
                className="font-technical"
                fill="rgba(255,255,255,0.6)"
                style={{ fontSize: 8, letterSpacing: 1 }}
              >
                {n.name}
              </text>
            </motion.g>
          ))}

          <circle cx={cx} cy={cy} r={7} fill="#0ECFFE" />
          <circle cx={cx} cy={cy} r={7} fill="none" stroke="#0ECFFE" strokeWidth={1}>
            <animate attributeName="r" from="7" to="20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-xl font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Every institution, connected on one secure rail.
      </motion.h3>
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
        <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-5xl">
          What's your next{" "}
          <span className="italic font-normal text-brand-blue">sovereign move?</span>
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
  { id: "intro", label: "Sovereign infrastructure, built in Rwanda", duration: 4200, render: () => <IntroScene /> },
  { id: "map", label: "Headquartered in Kigali", duration: 5600, render: () => <MapScene /> },
  { id: "layers", label: "Five sovereign layers", duration: 5200, render: () => <LayersScene /> },
  { id: "impact", label: "Local capacity, sovereign control", duration: 5800, render: () => <ImpactScene /> },
  { id: "network", label: "Every institution on one secure rail", duration: 5200, render: () => <NetworkScene /> },
  { id: "outro", label: "What's your next sovereign move?", duration: 5000, render: () => <OutroScene /> },
];

interface IntroMotionGraphicProps {
  autoPlay?: boolean;
}

export default function IntroMotionGraphic({ autoPlay = true }: IntroMotionGraphicProps) {
  return <MotionGraphicPlayer scenes={SCENES} watermark="Azul Tech · Rwanda" autoPlay={autoPlay} />;
}
