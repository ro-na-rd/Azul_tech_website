import React from "react";
import { Layers, ArrowUpRight } from "lucide-react";
import { motion, useTransform } from "framer-motion";
import { useSanityData } from "../contexts/SanityDataContext";
import { optimizedUrl } from "../services/sanity";
import { PortableText } from "@portabletext/react";
import { useTilt } from "../lib/animations";

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

// ─── Individual layer card with 3-D tilt ─────────────────────────────────────

function LayerCard({ layer, index }: { layer: any; index: number }) {
  const imgSrc =
    layer.image && typeof layer.image !== "string"
      ? optimizedUrl(layer.image, { width: 700, quality: 75 })
      : layer.image || "";

  const { ref, rotateX, rotateY, scale, glareX, glareY, glareOpacity } = useTilt({ strength: 7 });

  // Image parallax opposite to tilt
  const imgX = useTransform(rotateY, [-7, 7], ["4%", "-4%"]);
  const imgY = useTransform(rotateX, [7, -7], ["4%", "-4%"]);

  const spotBg = useTransform(
    [glareX, glareY] as any,
    ([gx, gy]: [string, string]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(14,207,254,0.15) 0%, transparent 55%)`,
  );

  return (
    <motion.div
      ref={ref as any}
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group relative overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Parallax image */}
        <motion.img
          src={imgSrc}
          alt={layer.title}
          loading="lazy"
          decoding="async"
          style={{ x: imgX, y: imgY, scale: 1.1 }}
          className="w-full h-full object-cover"
        />

        {/* Static gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        {/* Blue overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Cursor spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: spotBg as any, opacity: glareOpacity }}
        />

        {/* Hover border */}
        <div className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/40 transition-all duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
          {/* Layer badge — lifts up slightly on hover */}
          <motion.div
            className="mb-4"
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-brand-blue/40 transition-colors duration-300">
              <span className="text-[9px] font-mono font-bold text-brand-blue uppercase tracking-widest">
                Layer 0{index + 1}
              </span>
            </div>
          </motion.div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <span className="text-xl lg:text-2xl font-serif font-bold text-[#0ECFFE] group-hover:text-white transition-colors duration-300 leading-tight">
              {layer.title}
            </span>
            {/* Arrow appears on hover */}
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 mt-1"
            >
              <ArrowUpRight size={16} className="text-brand-blue" />
            </motion.div>
          </div>

          {/* Description — slides up and fades in on hover */}
          <div className="overflow-hidden">
            <motion.span
              className="text-white/70 text-sm leading-relaxed block"
              initial={{ y: 0, opacity: 0.7 }}
              whileHover={{ y: -2, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {layer.description}
            </motion.span>
          </div>
        </div>

        {/* Corner icon */}
        <div className="absolute top-4 right-4 transition-all duration-500 group-hover:scale-110">
          <div className="bg-black/40 backdrop-blur-md p-2 group-hover:bg-brand-blue/20 transition-colors duration-300">
            <Layers size={14} className="text-brand-blue" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HowWeHelp() {
  const { layers: sanityLayers, layersLabel, layersHeading, layersDescription, loading } =
    useSanityData();

  const displayLayers = sanityLayers ?? [];

  if (loading) {
    return (
      <section className="section-white min-h-[600px]">
        <div className="container-editorial">
          <div className="skeleton-box h-4 w-20 mb-6" />
          <div className="skeleton-box h-12 w-1/2 mb-20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map(i => <div key={i} className="skeleton-box h-[400px]" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="layers" className="section-white">
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          className="layers-header flex flex-col lg:flex-row items-baseline justify-between mb-20 gap-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="max-w-4xl flex-1">
            <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold underline underline-offset-8 mb-6">
              {layersLabel || ""}
            </p>

            {layersHeading?.content ? (
              <PortableText value={layersHeading.content} components={portableTextComponents} />
            ) : (
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight mb-10">
                {typeof layersHeading === "string" ? layersHeading : ""}
              </h2>
            )}
          </div>

          <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
            {layersDescription || ""}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="layers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayLayers.map((layer: any, i: number) => (
            <LayerCard key={i} layer={layer} index={i} />
          ))}
        </div>

        {/* ── Official Consultancy Services Section (Company Profile Slides 5-6) ── */}
        <div className="mt-28 border-t border-slate-200 pt-20">
          <div className="mb-14">
            <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold mb-3">
              AZUL TECH OFFERINGS
            </p>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-slate-900">
              Consultancy Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:border-brand-blue/40 transition-colors">
              <span className="text-[9px] font-mono text-brand-blue font-bold uppercase tracking-widest block mb-3">01 / INTEGRATION</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">Systems Architecture & Integration</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We design and connect secure, scalable digital systems that serve as the foundation for modern institutions. From system planning to integration across departments, we ensure platforms work together seamlessly and reliably.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:border-brand-blue/40 transition-colors">
              <span className="text-[9px] font-mono text-brand-blue font-bold uppercase tracking-widest block mb-3">02 / REGIONAL DPI</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">National & Cross-border DPI</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We build secure and user-friendly digital platforms that improve public service delivery, streamline workflows, and enhance transparency across government institutions.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:border-brand-blue/40 transition-colors">
              <span className="text-[9px] font-mono text-brand-blue font-bold uppercase tracking-widest block mb-3">03 / INTELLIGENCE</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">Data Systems & AI</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We develop data systems and integrate artificial intelligence tools that help organizations analyze information, automate processes, and make smarter, faster decisions.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:border-brand-blue/40 transition-colors">
              <span className="text-[9px] font-mono text-brand-blue font-bold uppercase tracking-widest block mb-3">04 / COMPLIANCE</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">Cybersecurity & Data Privacy</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We protect digital systems from cyber threats and ensure they meet national and international data protection and regulatory standards.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:border-brand-blue/40 transition-colors lg:col-span-2">
              <span className="text-[9px] font-mono text-brand-blue font-bold uppercase tracking-widest block mb-3">05 / LEGACY TRANSFORMATION</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">Digitization & Automation</h3>
              <p className="text-slate-600 text-xs leading-relaxed max-w-xl">
                We transform paper-based records and manual processes into efficient digital systems, reducing errors, improving speed, and increasing operational efficiency across national registries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
