import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Fingerprint, FileText, Landmark, Building2, Coins } from "lucide-react";
import Logo from "./Logo";
import MotionGraphicPlayer, {
  MgScene,
  SceneShell,
  ease,
  totalDuration,
} from "./MotionGraphicPlayer";

/**
 * EgovMotionGraphic
 * -----------------
 * Code-drawn explainer for the "e-Government & Civil Services" briefing — the
 * citizen-facing service layer built on top of Azul Tech's DPI.
 *
 * Styled as a soft, product-UI piece — emerald accent, halftone dots, rounded
 * cards and a phone frame — deliberately unlike the cyan blueprint (DPI), the
 * amber atlas (Global South) and the ringed brand intro.
 */

const A = "var(--mg-accent)"; // emerald, set by the player

const SERVICES = [
  { icon: FileText, label: "Birth & marriage certificates" },
  { icon: Fingerprint, label: "National ID & civil registry" },
  { icon: Landmark, label: "Land titles & property" },
  { icon: Building2, label: "Business registration" },
  { icon: Coins, label: "Tax filing & payments" },
];

const FLOW = ["Request", "Verify identity", "Check records", "Apply rules", "Deliver result"];

const REACH = [
  "Works on basic phones",
  "Tolerates weak signal & offline",
  "Local languages, by default",
  "Staffed service points for assisted help",
];

// ─── Scenes ───────────────────────────────────────────────────────────────────

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex h-[200px] w-[112px] flex-col rounded-[20px] border-2 p-2"
      style={{ borderColor: `rgba(var(--mg-accent-rgb),0.5)`, background: "rgba(255,255,255,0.03)" }}
    >
      <span
        className="mx-auto mb-2 h-1 w-8 rounded-full"
        style={{ background: `rgba(var(--mg-accent-rgb),0.5)` }}
      />
      <div className="flex flex-1 flex-col gap-1.5">{children}</div>
    </div>
  );
}

function TitleScene() {
  return (
    <SceneShell>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-technical text-[10px] font-bold uppercase tracking-[0.4em]"
        style={{ color: A }}
      >
        The citizen service layer
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.7, ease }}
        className="font-serif text-3xl font-bold text-white md:text-5xl"
      >
        e-Government &amp;{" "}
        <span className="italic font-normal" style={{ color: A }}>
          Civil Services
        </span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-5 max-w-md font-serif text-sm text-white/60 md:text-base"
      >
        The services citizens actually touch — built on top of the identity,
        payment and data rails.
      </motion.p>
    </SceneShell>
  );
}

function IdentityScene() {
  return (
    <SceneShell>
      <div className="flex items-center gap-8">
        <Phone>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col items-center gap-1 rounded-md py-3"
            style={{ background: `rgba(var(--mg-accent-rgb),0.12)` }}
          >
            <Fingerprint size={20} style={{ color: A }} />
            <span className="font-technical text-[7px] uppercase tracking-widest text-white/70">
              Verify once
            </span>
          </motion.div>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.3 }}
                className="flex aspect-square items-center justify-center rounded"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <Check size={9} style={{ color: A }} />
              </motion.span>
            ))}
          </div>
        </Phone>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="max-w-[190px] text-left"
        >
          <p className="font-serif text-lg font-bold text-white">One identity.</p>
          <p className="mt-1 text-sm text-white/60">
            Sign in once — it works across every ministry. No repeated forms, no
            queues.
          </p>
        </motion.div>
      </div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="mt-6 font-serif text-lg font-bold text-white md:text-xl"
      >
        One verified identity, every service.
      </motion.h3>
    </SceneShell>
  );
}

function ServicesScene() {
  return (
    <SceneShell>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Civil services, digitised end to end.
      </motion.h3>
      <div className="flex w-full max-w-md flex-col gap-2.5">
        {SERVICES.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.45, ease }}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-left"
          >
            <Icon size={16} style={{ color: A }} />
            <span className="font-serif text-sm text-white/90">{label}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

function FlowScene() {
  return (
    <SceneShell>
      <div className="flex w-full max-w-[560px] flex-wrap items-center justify-center gap-2">
        {FLOW.map((step, i) => (
          <React.Fragment key={step}>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.28, duration: 0.4, ease }}
              className="rounded-full border px-3 py-1.5 font-technical text-[10px] font-bold uppercase tracking-wider"
              style={{
                borderColor: `rgba(var(--mg-accent-rgb),0.4)`,
                color: i === FLOW.length - 1 ? "#0b1f17" : "#fff",
                background: i === FLOW.length - 1 ? A : "rgba(255,255,255,0.04)",
              }}
            >
              {step}
            </motion.span>
            {i < FLOW.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.28, duration: 0.3 }}
                style={{ color: A }}
              >
                <ArrowRight size={13} />
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.5 }}
        className="mt-8 flex items-center gap-4 font-mono text-xs"
      >
        <span className="text-white/40 line-through">≈ 3 weeks</span>
        <ArrowRight size={14} style={{ color: A }} />
        <span className="font-bold" style={{ color: A }}>
          ≈ 3 minutes
        </span>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="mt-6 font-serif text-lg font-bold text-white md:text-xl"
      >
        The counter queue, replaced by a request.
      </motion.h3>
    </SceneShell>
  );
}

function RecordsScene() {
  const ministries = ["Home Affairs", "Health", "Revenue", "Lands"];
  return (
    <SceneShell>
      <div className="relative mb-4 h-[46%] w-full max-w-[420px]">
        <svg viewBox="0 0 320 170" className="h-full w-full overflow-visible">
          <motion.rect
            x={124}
            y={66}
            width={72}
            height={38}
            rx={5}
            fill={`rgba(var(--mg-accent-rgb),0.14)`}
            stroke={A}
            strokeWidth={1.4}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease }}
          />
          <text x={160} y={82} textAnchor="middle" fill="#fff" style={{ fontSize: 8, fontWeight: 700 }}>
            Trusted
          </text>
          <text x={160} y={93} textAnchor="middle" fill="#fff" style={{ fontSize: 8, fontWeight: 700 }}>
            record
          </text>
          {ministries.map((m, i) => {
            const x = 30 + i * 87;
            return (
              <motion.g
                key={m}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.16, duration: 0.4 }}
              >
                <line x1={x + 20} y1={30} x2={160} y2={66} stroke={`rgba(var(--mg-accent-rgb),0.35)`} strokeWidth={1} />
                <rect x={x} y={12} width={40} height={20} rx={3} fill="#040D14" stroke={A} strokeWidth={1} />
                <text x={x + 20} y={25} textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: 6.5 }}>
                  {m}
                </text>
              </motion.g>
            );
          })}
          {ministries.map((m, i) => {
            const x = 30 + i * 87;
            return (
              <motion.circle
                key={`p-${m}`}
                r={2}
                fill={A}
                cx={160}
                cy={85}
                initial={{ opacity: 0 }}
                animate={{ cx: [160, x + 20], cy: [85, 22], opacity: [0, 1, 1, 0] }}
                transition={{ delay: 1 + i * 0.2, duration: 1.6, repeat: Infinity, repeatDelay: 0.6, ease: "linear" }}
              />
            );
          })}
        </svg>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-xl font-serif text-xl font-bold text-white md:text-2xl"
      >
        Prove a fact once. Every service sees the update.
      </motion.h3>
    </SceneShell>
  );
}

function ReachScene() {
  return (
    <SceneShell>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-7 font-serif text-2xl font-bold text-white md:text-3xl"
      >
        Built for every citizen.
      </motion.h3>
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {REACH.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.14, duration: 0.4, ease }}
            className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-left"
          >
            <Check size={13} className="mt-0.5 shrink-0" style={{ color: A }} />
            <span className="text-[13px] leading-snug text-white/80">{line}</span>
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
        <h2 className="mb-4 max-w-xl font-serif text-2xl font-bold text-white md:text-4xl">
          The whole of government,{" "}
          <span className="italic font-normal" style={{ color: A }}>
            in a citizen's pocket.
          </span>
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
  {
    id: "title",
    label: "e-Government & Civil Services",
    duration: 15000,
    narration:
      "e-Government is the layer citizens actually touch. It takes the underlying infrastructure — identity, payments and data — and turns it into services people can use from an ordinary phone.",
    render: () => <TitleScene />,
  },
  {
    id: "identity",
    label: "One verified identity, every service",
    duration: 15000,
    narration:
      "It starts with a single verified identity. A citizen signs in once, and that same identity works across every ministry — no repeated forms, no separate accounts, no standing in line.",
    render: () => <IdentityScene />,
  },
  {
    id: "services",
    label: "Civil services, digitised",
    duration: 15500,
    narration:
      "On top of that sit the civil services themselves: birth and marriage certificates, national identity, land titles, business registration, tax filing. The everyday business between a citizen and the state, moved online.",
    render: () => <ServicesScene />,
  },
  {
    id: "flow",
    label: "How a request flows",
    duration: 15500,
    narration:
      "Behind each request, the system verifies the person, checks the relevant registries, applies the rules automatically, and returns a result. What used to take weeks of paperwork and counter visits now takes minutes.",
    render: () => <FlowScene />,
  },
  {
    id: "records",
    label: "Records that talk to each other",
    duration: 14500,
    narration:
      "Because every ministry reads from the same trusted records, a citizen never has to prove the same fact twice. Update your address once, and every service you use sees the change.",
    render: () => <RecordsScene />,
  },
  {
    id: "reach",
    label: "Built for every citizen",
    duration: 14000,
    narration:
      "And it is built for everyone. It runs on low-end phones and weak connections, speaks local languages by default, and keeps staffed service points for people who need a hand.",
    render: () => <ReachScene />,
  },
  {
    id: "outro",
    label: "The state, in your pocket",
    duration: 9500,
    narration:
      "e-Government and civil services, engineered by Azul Tech — bringing the whole of government into a citizen's pocket.",
    render: () => <OutroScene />,
  },
];

export const RUNTIME_MS = totalDuration(SCENES);

interface Props {
  autoPlay?: boolean;
}

export default function EgovMotionGraphic({ autoPlay = true }: Props) {
  return (
    <MotionGraphicPlayer
      scenes={SCENES}
      watermark="Azul Tech · e-Government"
      autoPlay={autoPlay}
      accent="#34D399"
      accentRgb="52,211,153"
      pattern="dots"
      narrationRate={0.9}
      narrationPitch={1.12}
    />
  );
}
