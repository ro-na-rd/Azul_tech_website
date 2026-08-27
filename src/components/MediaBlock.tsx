import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSanityData } from "../contexts/SanityDataContext";
import { PortableText } from "@portabletext/react";
import { optimizedUrl } from "../services/sanity";
import DpiMotionGraphic from "./DpiMotionGraphic";
import GlobalSouthMotionGraphic from "./GlobalSouthMotionGraphic";

// Some briefings are rendered as in-app, code-drawn motion graphics rather than
// an external clip or a CMS-uploaded video. A briefing opts in explicitly with
// `motionGraphic: "<key>"`, or is matched by title as a fallback.
const MOTION_GRAPHICS: Record<string, React.FC<{ autoPlay?: boolean }>> = {
  dpi: DpiMotionGraphic,
  "global-south": GlobalSouthMotionGraphic,
};

const motionGraphicFor = (item: any): React.FC<{ autoPlay?: boolean }> | null => {
  const key = item?.motionGraphic;
  if (key && MOTION_GRAPHICS[key]) return MOTION_GRAPHICS[key];
  const title = (item?.title || "").toLowerCase();
  if (/digital public infrastructure/.test(title)) return DpiMotionGraphic;
  if (/kigali.*(world|global)/.test(title)) return GlobalSouthMotionGraphic;
  return null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
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

const getEmbedUrl = (url: string, autoPlay: boolean = false) => {
  if (!url) return "";
  let out = url;
  if (url.includes("youtube.com/watch?v=")) out = url.replace("watch?v=", "embed/");
  else if (url.includes("youtu.be/")) out = url.replace("youtu.be/", "youtube.com/embed/");
  else if (url.includes("vimeo.com/")) out = url.replace("vimeo.com/", "player.vimeo.com/video/");
  return autoPlay
    ? (out.includes("?") ? `${out}&autoplay=1` : `${out}?autoplay=1`)
    : (out.includes("?") ? `${out}&autoplay=0` : `${out}?autoplay=0`);
};

const getImageUrl = (item: any) => {
  if (!item) return '';
  const img = item.image || item.thumbnail || item.poster;
  if (!img) return '';
  return optimizedUrl(img, { width: 1000, quality: 80 });
};

// ─── Playlist card ────────────────────────────────────────────────────────────
// Uses a CSS-variable spotlight instead of heavy MotionValue chains.

function PlaylistCard({
  item,
  index,
  isActive,
  onSelect,
}: {
  item: any;
  index: number;
  isActive: boolean;
  onSelect: (i: number) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
    el.style.setProperty("--spot-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    el.style.setProperty("--spot-opacity", "0");
  }, []);

  return (
    <motion.button
      ref={btnRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      onClick={() => onSelect(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`playlist-card relative p-6 transition-colors duration-300 border text-left overflow-hidden ${
        isActive
          ? "bg-sky-500/10 border-sky-500 shadow-[0_0_24px_rgba(56,189,248,0.12)]"
          : "bg-white/5 border-white/10 text-white hover:border-sky-500/40"
      }`}
    >
      {/* CSS spotlight — no MotionValue overhead */}
      <span className="playlist-spot pointer-events-none absolute inset-0" />

      <div
        className={`relative z-10 text-[9px] font-technical uppercase tracking-widest mb-3 transition-colors duration-200 ${
          isActive ? "text-sky-400" : "text-white/40"
        }`}
      >
        {item.duration || "Episode"} min
      </div>
      <h5
        className={`relative z-10 text-sm font-bold leading-snug transition-colors duration-200 ${
          isActive ? "text-white" : "text-white/70 group-hover:text-white"
        }`}
      >
        {item.title}
      </h5>

      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute top-4 right-4 z-10"
        >
          <span className="block w-2 h-2 bg-sky-400 rounded-full animate-ping" />
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MediaBlock() {
  const {
    discussions: sanityDiscussions,
    discussionsLabel,
    discussionsTitle,
    discussionsSubtitle,
    loading,
  } = useSanityData();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const discussions = sanityDiscussions ?? [];

  // Set initial featured item when data arrives
  useEffect(() => {
    if (discussions.length > 0) {
      const fi = discussions.findIndex((d: any) => d.isFeatured);
      setActiveIndex(fi !== -1 ? fi : 0);
    }
  }, [discussions.length]);

  if (loading) {
    return (
      <section className="bg-brand-midnight min-h-[600px]">
        <div className="container-editorial pt-24">
          <div className="skeleton-box h-4 w-20 mb-6" />
          <div className="skeleton-box h-12 w-1/2 mb-16" />
          <div className="skeleton-box h-[500px] w-full" />
        </div>
      </section>
    );
  }

  if (discussions.length === 0) return null;

  const current = discussions[activeIndex];
  const MotionGraphic = motionGraphicFor(current);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(true);
    if (window.innerWidth < 1024) {
      document.getElementById("media-player")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="whoweare" className="bg-brand-midnight relative overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      <div className="container-editorial py-24 lg:py-32 relative z-10">

        {/* ── Section header ───────────────────────────────── */}
        <motion.div
          className="max-w-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-[10px] font-technical text-sky-400 uppercase tracking-widest font-bold mb-6 underline underline-offset-8">
            {discussionsLabel || "ARCHIVE"}
          </p>

          {discussionsTitle?.content ? (
            <PortableText value={discussionsTitle.content} components={portableTextComponents} />
          ) : (
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
              {typeof discussionsTitle === "string" ? discussionsTitle : ""}
            </h2>
          )}

          {discussionsSubtitle && (
            <p className="whitespace-pre-line text-white/60 text-sm max-w-xl leading-relaxed mt-5">
              {discussionsSubtitle}
            </p>
          )}
        </motion.div>

        {/* ── Main player card ─────────────────────────────── */}
        <motion.div
          id="media-player"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col lg:flex-row border border-white/10 hover:border-white/20 transition-colors duration-500 shadow-2xl"
        >
          {/* Info pane — AnimatePresence only on the text, not the video */}
          <div className="flex-1 bg-white/5 backdrop-blur-md p-10 lg:p-16 flex flex-col justify-center lg:border-r border-white/10 border-b lg:border-b-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {/* Live badge */}
                <div className="flex items-center gap-2 text-[10px] font-technical text-sky-400 uppercase tracking-widest mb-5 font-bold">
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]" />
                  {current.category || "Now Playing"}
                </div>

                <h3 className="text-2xl lg:text-4xl font-serif font-bold text-white leading-tight mb-5 hover:text-sky-300 transition-colors duration-300">
                  {current.title}
                </h3>

                {current.description && (
                  <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-8">
                    {current.description}
                  </p>
                )}

                {/* Play button */}
                <motion.button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-4 group/play mt-auto"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                >
                  <motion.div
                    className="w-11 h-11 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center"
                    whileHover={{ scale: 1.15, backgroundColor: "rgba(14,165,233,0.9)" }}
                    transition={{ duration: 0.18 }}
                  >
                    <Play
                      size={18}
                      fill="currentColor"
                      className="text-sky-400 group-hover/play:text-white ml-0.5 transition-colors"
                    />
                  </motion.div>
                  <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-sky-400 group-hover/play:text-sky-200 transition-colors">
                    Watch · {current.duration || "15"} min
                  </span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Video pane */}
          <div className="flex-1 min-h-[320px] lg:min-h-[460px] relative bg-black overflow-hidden">
            {!isPlaying ? (
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full bg-cover bg-center cursor-pointer group/overlay flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: getImageUrl(current)
                    ? `url(${getImageUrl(current)})`
                    : 'linear-gradient(to bottom right, #061A2A, #040D14)',
                }}
              >
                <div className="absolute inset-0 bg-black/60 group-hover/overlay:bg-black/40 transition-colors" />

                <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-brand-blue text-brand-midnight flex items-center justify-center shadow-2xl shadow-brand-blue/30 group-hover/overlay:bg-white transition-colors"
                  >
                    <Play size={32} className="fill-current ml-1" />
                  </motion.div>
                  <span className="text-xs font-technical text-white uppercase tracking-widest font-bold bg-black/70 px-5 py-2.5 rounded-full border border-white/20 shadow-lg">
                    Click to Play Video
                  </span>
                </div>
              </div>
            ) : MotionGraphic ? (
              <div className="absolute inset-0">
                <MotionGraphic autoPlay />
              </div>
            ) : current.videoFile?.asset?.url ? (
              <video
                key={current.videoFile.asset.url}
                src={current.videoFile.asset.url}
                className="absolute inset-0 w-full h-full object-contain"
                controls
                autoPlay
              />
            ) : current.videoUrl || current.link ? (
              <iframe
                key={getEmbedUrl(current.videoUrl || current.link, true)}
                src={getEmbedUrl(current.videoUrl || current.link, true)}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={current.title}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                No video available
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Playlist ─────────────────────────────────────── */}
        <div className="mt-16 pb-8">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-[10px] font-technical text-white/40 uppercase tracking-[0.4em] font-bold shrink-0">
              Select Briefing
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {discussions.map((item: any, i: number) => (
              <PlaylistCard
                key={i}
                item={item}
                index={i}
                isActive={i === activeIndex}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
