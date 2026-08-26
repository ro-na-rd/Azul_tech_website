import React, { useRef, useCallback } from "react";
import {
  Shield, ArrowUpRight, CheckCircle2,
  TrendingUp, FileCheck, Network, XCircle,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useSanityData } from "../contexts/SanityDataContext";
import { motion, useInView, useTransform } from "framer-motion";
import { useCountUp, useMagnetic } from "../lib/animations";

const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Network, TrendingUp, FileCheck,
};

// ─── PortableText renderer (no overflow-hidden trap) ─────────────────────────

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight mb-10">
        {children}
      </h2>
    ),
  },
  marks: {
    gradient: ({ children }: any) => (
      <span className="text-gradient-brand">{children}</span>
    ),
  },
};

// ─── Stat tile with count-up ──────────────────────────────────────────────────

function StatTile({ stat, index }: { stat: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const numericTarget = parseFloat(stat.value);
  const isNumeric = !isNaN(numericTarget);
  const countValue = useCountUp(isNumeric ? numericTarget : 0, isInView, 2);
  const displayCount = useTransform(countValue, v => {
    const rounded = Number.isInteger(numericTarget) ? Math.round(v) : v.toFixed(1);
    return String(rounded);
  });

  const IconComponent = ICON_MAP[stat.icon] || Shield;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="flex flex-col items-start group cursor-default"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 + 0.2 }}
      >
        <IconComponent
          size={24}
          className="text-brand-blue/40 mb-6 group-hover:text-brand-blue transition-colors duration-300"
        />
      </motion.div>

      <div className="text-4xl font-serif font-bold text-white mb-2 tabular-nums">
        {isNumeric ? <motion.span>{displayCount}</motion.span> : <span>{stat.value}</span>}
        <span className="text-brand-blue">{stat.suffix}</span>
      </div>
      <div className="text-[10px] font-technical text-white/30 uppercase tracking-widest group-hover:text-white/50 transition-colors duration-300">
        {stat.label}
      </div>
    </motion.div>
  );
}

// ─── Comparison card — CSS-variable spotlight, no MotionValue chains ──────────

function ComparisonCard({
  side,
  title,
  features,
  isApproach,
}: {
  side: "left" | "right";
  title: string;
  features: string[];
  isApproach: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    el.style.setProperty("--spot-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    cardRef.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: side === "left" ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`comparison-card relative overflow-hidden p-10 border border-brand-blue/30 cursor-default ${
        isApproach ? "bg-brand-blue/[0.03]" : "bg-white/[0.02]"
      }`}
    >
      {/* Ambient top-right glow for approach card */}
      {isApproach && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl pointer-events-none" />
      )}

      {/* CSS-variable spotlight */}
      <span className="comparison-spot pointer-events-none absolute inset-0" />

      {/* Hover glow border */}
      <span className="absolute inset-0 border border-brand-blue/0 hover-border pointer-events-none transition-all duration-300" />

      <div className="relative z-10">
        {/* Card header */}
        <div className="flex items-center justify-between mb-8">
          {isApproach
            ? <CheckCircle2 size={24} className="text-brand-blue" />
            : <XCircle size={24} className="text-brand-blue" />
          }
          <div className="text-right">
            {isApproach ? (
              <>
                <div className="text-[8px] font-technical text-brand-blue tracking-[0.2em] uppercase mb-1">The Azul Way</div>
                <div className="text-xs font-serif text-brand-blue">Protocol-First Architecture</div>
              </>
            ) : (
              <>
                <div className="text-[8px] font-technical text-brand-blue tracking-[0.2em] uppercase mb-1">The Specification</div>
                <div className="text-xs text-brand-blue">Conventional Consulting</div>
              </>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-serif font-bold text-white mb-8 leading-tight">{title}</h3>

        <div className="space-y-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: side === "left" ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`flex ${isApproach ? "items-start" : "items-center"} gap-4 text-sm ${
                isApproach ? "text-white/90" : "text-white"
              }`}
            >
              {isApproach
                ? <CheckCircle2 size={15} className="text-brand-blue mt-0.5 shrink-0" />
                : <div className="w-1 h-1 bg-brand-blue shrink-0" />
              }
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Magnetic CTA ─────────────────────────────────────────────────────────────

function MagneticCTA({ href, text }: { href: string; text: string }) {
  const { ref, x, y } = useMagnetic(0.3);
  return (
    <motion.a
      ref={ref as any}
      href={href}
      style={{ x, y }}
      className="group inline-flex items-center gap-4 bg-brand-blue hover:bg-brand-blue/90 px-8 py-3.5 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-300"
    >
      <span>{text}</span>
      <ArrowUpRight
        size={18}
        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </motion.a>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function SovereignSection() {
  const { sovereign, loading } = useSanityData();

  if (loading) {
    return (
      <section className="relative bg-brand-midnight overflow-hidden border-t border-white/10">
        <div className="container-editorial relative z-10 py-32">
          <div className="skeleton-box h-4 w-32 mb-6" />
          <div className="skeleton-box h-12 w-3/4 mb-10" />
          <div className="skeleton-box h-20 w-1/2 mb-20" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="skeleton-box h-[400px]" />
            <div className="skeleton-box h-[400px]" />
          </div>
        </div>
      </section>
    );
  }

  if (!sovereign) return null;

  const label: string = sovereign.label || "";
  const description: string = sovereign.description || "";
  const conventionalTitle: string = sovereign.conventionalTitle || "";
  const conventionalFeatures: string[] = sovereign.conventionalFeatures || [];
  const approachTitle: string = sovereign.approachTitle || "";
  const approachFeatures: string[] = sovereign.approachFeatures || [];
  const stats: any[] = sovereign.stats || [];
  const partnersLabel: string = sovereign.partnersLabel || "";
  const partnersDescription: string = sovereign.partnersDescription || "";
  const partners: string[] = sovereign.partners || [];
  const ctaText: string = sovereign.ctaText || "";
  const ctaLink: string = sovereign.ctaLink || "#";

  return (
    <section className="relative bg-brand-midnight overflow-hidden border-t border-white/10">
      <div className="container-editorial relative z-10 py-32">

        {/* ── Header ───────────────────────────────────────── */}
        <motion.div
          className="max-w-4xl mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Label — plain text, no clip trick */}
          <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold underline underline-offset-8 mb-8">
            {label}
          </p>

          {/* Heading */}
          {sovereign.heading?.content ? (
            <PortableText value={sovereign.heading.content} components={portableTextComponents} />
          ) : (
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight mb-10">
              {typeof sovereign.heading === "string" ? sovereign.heading : ""}
            </h2>
          )}

          {/* Description */}
          <p className="text-white/50 max-w-2xl leading-relaxed border-l border-white/20 pl-8">
            {description}
          </p>
        </motion.div>

        {/* ── Comparison cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <ComparisonCard
            side="left"
            title={conventionalTitle}
            features={conventionalFeatures}
            isApproach={false}
          />
          <ComparisonCard
            side="right"
            title={approachTitle}
            features={approachFeatures}
            isApproach={true}
          />
        </div>

        {/* ── Stats ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, i) => (
            <StatTile key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* ── Partners ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-24 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-16"
        >
          <div className="max-w-xs">
            <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.2em] mb-4 font-bold">
              {partnersLabel}
            </p>
            <p className="text-white/40 text-sm leading-relaxed">{partnersDescription}</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
            {partners.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                whileHover={{ scale: 1.06, opacity: 1 }}
                className="text-xl font-bold text-white tracking-tight opacity-25 grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-32 text-center"
        >
          <MagneticCTA href={ctaLink} text={ctaText} />
        </motion.div>
      </div>
    </section>
  );
}
