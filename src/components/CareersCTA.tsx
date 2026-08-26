import React from "react";
import { motion, useTransform } from "framer-motion";
import { useSanityData } from "../contexts/SanityDataContext";
import { optimizedUrl } from "../services/sanity";
import { useTilt } from "../lib/animations";

function imgSrc(slide: any): string {
  if (!slide?.image) return "";
  if (typeof slide.image === "string") return slide.image;
  try { return optimizedUrl(slide.image, { width: 720, quality: 80 }); }
  catch { return ""; }
}

// ─── Single card — extracted so useTilt can be called per card ────────────────

function CareerCard({ slide, index }: { slide: any; index: number }) {
  const src = imgSrc(slide);
  const { ref, rotateX, rotateY, scale, glareX, glareY, glareOpacity } = useTilt({ strength: 7 });

  // Image moves opposite to tilt — parallax effect
  const imgX = useTransform(rotateY, [-7, 7], ["3%", "-3%"]);
  const imgY = useTransform(rotateX, [7, -7], ["3%", "-3%"]);

  // Cursor spotlight gradient (same approach as HowWeHelp / SovereignSection)
  const spotBg = useTransform(
    [glareX, glareY] as any,
    ([gx, gy]: [string, string]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(14,207,254,0.14) 0%, transparent 55%)`,
  );

  return (
    <motion.a
      ref={ref as any}
      href={slide.link || "#"}
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
      className="group relative flex flex-col bg-white/[0.03] border border-white/10 overflow-hidden"
    >
      {/* ── Image ───────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden bg-white/5 shrink-0">
        {src ? (
          <motion.img
            src={src}
            alt={slide.title}
            loading="lazy"
            decoding="async"
            style={{ x: imgX, y: imgY, scale: 1.1 }}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}

        {/* Blue overlay tint on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Cursor spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: spotBg as any, opacity: glareOpacity }}
        />

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Label chip */}
        {slide.label && (
          <div className="absolute top-4 left-4">
            <span className="bg-brand-blue/90 backdrop-blur-sm text-white text-[8px] font-technical font-bold uppercase tracking-widest px-2.5 py-1">
              {slide.label}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-serif font-bold text-white mb-3 leading-snug group-hover:text-brand-blue transition-colors duration-300">
          {slide.title}
        </h3>

        {slide.description && (
          <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
            {slide.description}
          </p>
        )}

      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/40 transition-all duration-400 pointer-events-none" />

    </motion.a>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CareersCTA() {
  const { careers: slides, careersLabel, careersHeading, loading } = useSanityData();

  if (loading) {
    return (
      <section className="bg-brand-midnight py-24 lg:py-32">
        <div className="container-editorial">
          <div className="skeleton-box h-4 w-24 mb-6" />
          <div className="skeleton-box h-10 w-1/2 mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => <div key={i} className="skeleton-box h-72" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!slides || slides.length === 0) return null;

  return (
    <section id="careers" className="bg-brand-midnight py-24 lg:py-32 border-t border-white/5">
      <div className="container-editorial">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {careersLabel && (
            <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold underline underline-offset-8 mb-5">
              {careersLabel}
            </p>
          )}
          {careersHeading && (
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight max-w-lg">
              {typeof careersHeading === "string"
                ? careersHeading
                : ""}
            </h2>
          )}
        </motion.div>

        {/* ── Cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide: any, i: number) => (
            <CareerCard
              key={i}
              slide={slide}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
