import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Logo from "./Logo";
import MotionGraphicPlayer, {
  MgScene,
  SceneShell,
  ease,
  totalDuration,
} from "./MotionGraphicPlayer";

/**
 * GlobalSouthMotionGraphic
 * ------------------------
 * Code-drawn explainer for the "Kigali, Rwanda → The World" briefing: where
 * Azul Tech was founded, and how its reference architecture spreads outward
 * across the Global South.
 *
 * Styled as a warm, map-led *atlas* piece — amber accent, world map, arcs
 * radiating from Kigali — deliberately unlike the cyan blueprint DPI graphic.
 *
 * Facts on screen are taken from Azul Tech's own site content:
 *  • Founded in Kigali, Rwanda (History page: 2021–2023 "Foundation & Protocol Design").
 *  • HQ: KG 17 Ave — KU Building, 2nd Floor, Kigali · P.O. Box 0040785150.
 *  • Offices: Kigali (Rwanda), Lusaka (Zambia), Abidjan (Côte d'Ivoire).
 */

const A = "var(--mg-accent)"; // amber, set by the player

// Stylised Rwanda silhouette (viewBox 0 0 100 100). Kigali ≈ (52, 48).
const RWANDA_PATH =
  "M22,26 C18,32 14,40 16,46 C18,54 20,60 18,66 C22,74 28,80 34,83 L46,88 " +
  "C54,89 62,86 68,82 C76,76 82,66 86,56 C89,48 88,38 84,32 C80,26 72,20 64,17 " +
  "L50,13 C42,13 32,15 26,20 Z";

// ── Simplified world map, equirectangular ───────────────────────────────────
// Projection into a 360×180 box: x = lon + 180, y = 90 − lat.
const WORLD: Record<string, string> = {
  africa:
    "170,55 174,54 190,53 200,58 211,59 214,62 217,72 223,78 231,78 222,90 220,94 219,97 220,103 213,116 211,120 206,124 198,125 194,113 192,105 193,99 192,96 189,90 188,86 180,85 176,85 171,84 167,81 163,75 164,69 166,64",
  madagascar: "227,102 230,105 227,115 224,110",
  eurasia:
    "171,51 171,47 175,42 184,38 188,34 185,29 205,19 220,23 250,19 280,14 320,17 356,24 340,34 320,35 309,55 302,59 294,68 287,80 284,89 277,74 270,68 260,77 257,82 253,71 247,65 237,64 239,68 225,77 219,70 214,61 215,56 216,54 207,51 203,52 197,51 189,46 185,47 181,51 175,54",
  uk: "176,37 179,36 179,41 176,40",
  japan: "318,53 321,47 314,51 311,57 316,55",
  greenland: "136,30 158,20 150,8 125,14 130,28",
  northAmerica:
    "15,26 23,19 55,20 85,20 100,27 120,35 127,43 117,45 110,48 106,50 104,55 100,64 96,60 90,61 83,64 82,68 93,69 93,72 96,79 100,82 100,83 88,75 80,73 75,70 70,67 66,60 63,57 58,52 56,44 52,39 45,32 30,30 18,35",
  southAmerica:
    "103,82 105,79 113,80 122,83 130,90 142,94 145,98 142,103 137,113 134,114 129,120 124,125 122,128 115,135 112,145 109,143 107,131 109,123 110,114 103,102 99,95 100,92 102,86",
  australia:
    "296,122 302,108 311,102 317,106 323,101 326,107 333,117 331,124 325,128 318,125 309,122 302,124",
  newZealand: "351,126 355,124 356,132 352,133",
  sumatraJava: "278,90 300,95 300,97 278,92",
  borneo: "290,87 297,87 297,93 290,93",
  newGuinea: "312,95 326,97 326,100 312,98",
  philippines: "299,73 302,73 302,79 299,79",
};

const KIGALI = { x: 209, y: 91 };

type Dest = { n: string; x: number; y: number; office?: boolean };
type Anchor = "middle" | "start" | "end";
const DESTINATIONS: (Dest & { dx?: number; dy?: number; anchor?: Anchor })[] = [
  { n: "Lusaka", x: 208, y: 105, office: true, dy: 8 },
  { n: "Abidjan", x: 176, y: 85, office: true, dx: -4, anchor: "end" },
  { n: "Lagos", x: 187, y: 86, dy: 9 },
  { n: "Nairobi", x: 218, y: 90, dx: 5, anchor: "start", dy: 2 },
  { n: "Cairo", x: 211, y: 60, dy: -5 },
  { n: "Pretoria", x: 208, y: 116, dy: 9 },
  { n: "New Delhi", x: 257, y: 61, dy: -5 },
  { n: "Jakarta", x: 287, y: 96, dy: 9 },
  { n: "Manila", x: 301, y: 75, dy: -5 },
  { n: "Dhaka", x: 270, y: 66, dx: 5, anchor: "start" },
  { n: "Bogotá", x: 106, y: 85, dy: -5 },
  { n: "São Paulo", x: 133, y: 114, dy: 9 },
];

// Quadratic Bézier keyframes (for the travelling pulse along each arc).
function bezierKeyframes(p0: number[], p1: number[], p2: number[], steps = 10) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    xs.push(u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0]);
    ys.push(u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]);
  }
  return { xs, ys };
}

const CONTEXT = [
  "Intermittent connectivity",
  "Mobile-first, low-end devices",
  "Offline-tolerant by design",
  "Multi-language from day one",
  "Built to a public budget",
];

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
        className="mb-4 font-technical text-[10px] font-bold uppercase tracking-[0.4em]"
        style={{ color: A }}
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
        <span className="italic font-normal" style={{ color: A }}>
          → the world.
        </span>
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
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
        <div className="relative h-[150px] w-[150px] shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
            <motion.path
              d={RWANDA_PATH}
              fill={`rgba(var(--mg-accent-rgb),0.10)`}
              stroke={A}
              strokeWidth={1.6}
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease }}
            />
            <motion.circle
              cx={52}
              cy={48}
              r={2.8}
              fill={A}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3, duration: 0.4 }}
            />
            <motion.circle
              cx={52}
              cy={48}
              r={2.8}
              fill="none"
              stroke={A}
              strokeWidth={0.9}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ delay: 1.4, duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.55, ease }}
          className="max-w-[260px] text-left"
        >
          <p className="font-technical text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: A }}>
            Where Azul Tech was born
          </p>
          <p className="mt-2 font-serif text-xl font-bold text-white">Kigali, Rwanda</p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/55">
            KG 17 Ave · KU Building, 2nd Floor
            <br />
            P.O. Box 0040785150, Kigali
          </p>
          <p className="mt-3 font-mono text-[11px] text-white/45">Founded 2021 · Protocol Lab</p>
        </motion.div>
      </div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-6 font-serif text-lg font-bold text-white md:text-xl"
      >
        One office. One idea. A reference stack for a whole region.
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
      <div className="relative mb-4 h-[56%] w-full max-w-[440px]">
        <svg viewBox="0 0 320 200" className="h-full w-full overflow-visible">
          {items.map((it, i) => (
            <motion.line
              key={`l-${i}`}
              x1={cx}
              y1={cy}
              x2={it.x}
              y2={it.y}
              stroke={`rgba(var(--mg-accent-rgb),0.3)`}
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
              <circle cx={it.x} cy={it.y} r={3.4} fill="#040D14" stroke={A} strokeWidth={1.2} />
              <text
                x={it.x}
                y={it.y < cy ? it.y - 8 : it.y + 13}
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                style={{ fontSize: 10 }}
              >
                {it.name}
              </text>
            </motion.g>
          ))}
          <motion.circle
            cx={cx}
            cy={cy}
            r={26}
            fill={`rgba(var(--mg-accent-rgb),0.12)`}
            stroke={A}
            strokeWidth={1.2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease }}
          />
          <text x={cx} y={cy - 2} textAnchor="middle" fill="#fff" style={{ fontSize: 9.5, fontWeight: 700 }}>
            Emerging-market
          </text>
          <text x={cx} y={cy + 9} textAnchor="middle" fill="#fff" style={{ fontSize: 9.5, fontWeight: 700 }}>
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
  const arcs = useMemo(
    () =>
      DESTINATIONS.map((d) => {
        const mx = (KIGALI.x + d.x) / 2;
        const my = (KIGALI.y + d.y) / 2;
        const dist = Math.hypot(d.x - KIGALI.x, d.y - KIGALI.y);
        const ctrl = [mx, my - dist * 0.28];
        const path = `M${KIGALI.x},${KIGALI.y} Q${ctrl[0]},${ctrl[1]} ${d.x},${d.y}`;
        const kf = bezierKeyframes([KIGALI.x, KIGALI.y], ctrl, [d.x, d.y]);
        return { d, path, ...kf };
      }),
    [],
  );

  return (
    <SceneShell>
      <div className="relative w-full max-w-[640px]">
        <svg viewBox="0 0 360 180" className="h-auto w-full overflow-visible">
          {/* graticule */}
          {[40, 80, 120, 160, 200, 240, 280, 320].map((x) => (
            <line key={`gx${x}`} x1={x} y1={10} x2={x} y2={170} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          ))}
          {[30, 60, 90, 120, 150].map((y) => (
            <line key={`gy${y}`} x1={10} y1={y} x2={350} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          ))}
          <line x1={10} y1={90} x2={350} y2={90} stroke="rgba(255,255,255,0.09)" strokeWidth={0.6} />

          {/* land */}
          {Object.entries(WORLD).map(([name, points], i) => (
            <motion.polygon
              key={name}
              points={points}
              fill={`rgba(var(--mg-accent-rgb),0.10)`}
              stroke={`rgba(var(--mg-accent-rgb),0.40)`}
              strokeWidth={0.5}
              strokeLinejoin="round"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.5, ease }}
            />
          ))}

          {/* spread arcs */}
          {arcs.map(({ d, path }, i) => (
            <motion.path
              key={`arc-${d.n}`}
              d={path}
              fill="none"
              stroke={d.office ? A : `rgba(var(--mg-accent-rgb),0.75)`}
              strokeWidth={d.office ? 1.2 : 0.9}
              strokeDasharray={d.office ? undefined : "2 1.5"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.3, duration: 0.9, ease }}
            />
          ))}

          {/* travelling pulses */}
          {arcs.map(({ d, xs, ys }, i) => (
            <motion.circle
              key={`pulse-${d.n}`}
              r={1.7}
              fill={A}
              cx={KIGALI.x}
              cy={KIGALI.y}
              initial={{ opacity: 0 }}
              animate={{ cx: xs, cy: ys, opacity: [0, 1, 1, 1, 0] }}
              transition={{
                delay: 1.7 + i * 0.32,
                duration: 1.7,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "linear",
              }}
            />
          ))}

          {/* destination markers */}
          {arcs.map(({ d }, i) => (
            <motion.g
              key={`dot-${d.n}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1 + i * 0.32, duration: 0.35 }}
              style={{ transformOrigin: `${d.x}px ${d.y}px` }}
            >
              <circle
                cx={d.x}
                cy={d.y}
                r={d.office ? 2.6 : 2}
                fill={d.office ? A : "#040D14"}
                stroke={A}
                strokeWidth={1.1}
              />
              <text
                x={d.x + (d.dx ?? 0)}
                y={d.y + (d.dy ?? -5)}
                textAnchor={d.anchor ?? "middle"}
                fill={d.office ? A : "rgba(255,255,255,0.6)"}
                style={{ fontSize: d.office ? 7 : 6, fontWeight: d.office ? 700 : 500 }}
              >
                {d.n}
              </text>
            </motion.g>
          ))}

          {/* Kigali origin */}
          <motion.circle
            cx={KIGALI.x}
            cy={KIGALI.y}
            r={3}
            fill="none"
            stroke={A}
            strokeWidth={1}
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <circle cx={KIGALI.x} cy={KIGALI.y} r={2.6} fill={A} />
          <text
            x={KIGALI.x + 4}
            y={KIGALI.y - 4}
            fill={A}
            style={{ fontSize: 7.5, fontWeight: 700 }}
          >
            KIGALI
          </text>
        </svg>

        {/* origin callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute bottom-1 left-1 border-l-2 bg-[#040D14]/70 py-1 pl-3 pr-2 text-left backdrop-blur-sm"
          style={{ borderColor: A }}
        >
          <p className="font-technical text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: A }}>
            Origin
          </p>
          <p className="font-mono text-[10px] leading-snug text-white/60">
            Kigali, Rwanda · founded 2021
            <br />
            Offices: Kigali · Lusaka · Abidjan
          </p>
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-4 max-w-xl font-serif text-lg font-bold text-white md:text-xl"
      >
        From one office in Kigali, outward across the Global South.
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
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `rgba(var(--mg-accent-rgb),0.15)`, color: A }}
            >
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
          <span className="italic font-normal" style={{ color: A }}>
            Built for the Global South.
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
    label: "Kigali, Rwanda → the world",
    duration: 7500,
    narration: "Azul Tech was born in Kigali, Rwanda — and built for the wider Global South.",
    render: () => <TitleScene />,
  },
  {
    id: "origin",
    label: "Where Azul Tech was born",
    duration: 13000,
    narration:
      "It was founded here in twenty twenty-one, at its headquarters on K.G. seventeen Avenue in Kigali — the K.U. Building. That single office is where the work began.",
    render: () => <OriginScene />,
  },
  {
    id: "context",
    label: "Emerging-market context at the core",
    duration: 11500,
    narration:
      "Emerging-market realities sit at the centre of the design: patchy connectivity, low-end phones, tight public budgets — not edge cases bolted on later.",
    render: () => <ContextScene />,
  },
  {
    id: "reach",
    label: "From Kigali, outward across the Global South",
    duration: 17000,
    narration:
      "From that one office, the model has spread outward. Reference architectures now shape digital public infrastructure across Africa — and reach toward South Asia, South-East Asia and Latin America — with Azul Tech offices in Lusaka, Zambia, and Abidjan, Côte d'Ivoire.",
    render: () => <ReachScene />,
  },
  {
    id: "travels",
    label: "The blueprint travels, sovereignty stays",
    duration: 7500,
    narration:
      "The blueprint travels through open protocols and forkable code. The sovereignty stays local.",
    render: () => <TravelsScene />,
  },
  {
    id: "outro",
    label: "Born in Africa, built for the Global South",
    duration: 5500,
    narration: "Born in Africa. Built for the Global South.",
    render: () => <OutroScene />,
  },
];

export const RUNTIME_MS = totalDuration(SCENES);

interface Props {
  autoPlay?: boolean;
}

export default function GlobalSouthMotionGraphic({ autoPlay = true }: Props) {
  return (
    <MotionGraphicPlayer
      scenes={SCENES}
      watermark="Azul Tech · Global South"
      autoPlay={autoPlay}
      accent="#F5A623"
      accentRgb="245,166,35"
      pattern="arcs"
    />
  );
}
