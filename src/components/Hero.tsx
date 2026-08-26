import React, { useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
} from "framer-motion";
import { optimizedUrl, subscribeToNewsletter } from "../services/sanity";
import { useHero } from "../hooks/useHero";
import { PortableText } from "@portabletext/react";
import { useTilt } from "../lib/animations";
import SubscriptionModal from "./SubscriptionModal";

// ─── Animated bento card with 3-D tilt + image parallax ──────────────────────

interface BentoCardProps {
  type: string;
  title: string;
  image: any;
  link?: string;
  className?: string;
  tag?: string;
  date?: string;
  index: number;
}

function BentoCard({ type, title, image, link, className = "", tag, date, index }: BentoCardProps) {
  const imgSrc = optimizedUrl(image, { width: 800, quality: 75 });
  const { ref, rotateX, rotateY, scale, glareX, glareY, glareOpacity } = useTilt({ strength: 8 });

  // Image parallax — moves opposite to tilt direction
  const imgX = useTransform(rotateY, [-8, 8], ["3%", "-3%"]);
  const imgY = useTransform(rotateX, [8, -8], ["3%", "-3%"]);

  return (
    <motion.div
      ref={ref as any}
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3 + index * 0.07, ease: "easeOut" }}
      id={`bento-card-${type.toLowerCase().replace(/\s+/g, "-")}`}
      className={`group relative overflow-hidden border border-white/10 cursor-pointer ${className}`}
    >
      {/* Parallax image */}
      <motion.img
        src={imgSrc}
        alt={title}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        style={{ x: imgX, y: imgY, scale: 1.08 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Spotlight glare that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: useTransform(
            [glareX, glareY] as any,
            ([gx, gy]: [string, string]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          ) as any,
          opacity: glareOpacity,
        }}
      />

      {/* Hover border glow */}
      <div className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/40 transition-all duration-500" />

      {tag && (
        <div className="absolute top-6 left-6 z-20">
          <span className="bg-brand-blue text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase">
            {tag}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-8 w-full z-10">
        <div className="text-[10px] font-technical text-white/70 uppercase tracking-[0.2em] mb-3 flex items-center justify-between">
          <span>{type}</span>
          {date && <span className="text-white/40">{date}</span>}
        </div>
        <h3 className="text-xl lg:text-2xl font-serif font-bold text-white leading-tight flex items-center justify-between group-hover:text-brand-blue transition-colors duration-300">
          <span className="max-w-[85%]">{title}</span>
          <motion.span
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="shrink-0 ml-2"
          >
            <ArrowRight size={20} />
          </motion.span>
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Interview card with spotlight follow ─────────────────────────────────────

function InterviewCard({ data }: { data?: any }) {
  if (!data) return null;
  const imageSrc = optimizedUrl(data.image, { width: 900, quality: 80 });

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotOpacity = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      spotX.set(((e.clientX - rect.left) / rect.width) * 100);
      spotY.set(((e.clientY - rect.top) / rect.height) * 100);
      animate(spotOpacity, 1, { duration: 0.25 });
    },
    [spotX, spotY, spotOpacity],
  );

  const handleMouseLeave = useCallback(() => {
    animate(spotOpacity, 0, { duration: 0.4 });
  }, [spotOpacity]);

  const spotBg = useTransform(
    [spotX, spotY] as any,
    ([x, y]: [number, number]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(14,207,254,0.18) 0%, transparent 55%)`,
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      id="interview-card"
      className="group relative h-full min-h-[600px] overflow-hidden border border-white/10 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={imageSrc}
        alt={data.title}
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      {/* Spotlight follow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotBg as any, opacity: spotOpacity }}
      />

      {/* Animated border on hover */}
      <div className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/30 transition-all duration-500" />

      <div className="absolute bottom-0 left-0 p-10 w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-[10px] font-technical text-white/70 uppercase tracking-[0.2em] mb-4"
        >
          {data.category || ""}
        </motion.div>
        <h3 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-12 leading-tight group-hover:text-brand-blue/90 transition-colors duration-500">
          {data.title}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Subscribe card ───────────────────────────────────────────────────────────

function SubscribeCard() {
  const [email, setEmail] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
        id="subscribe-card"
        className="bg-[#0A1A24] border border-white/10 hover:border-brand-blue/30 p-10 flex flex-col justify-center h-full transition-colors duration-500"
      >
        <h4 className="text-lg font-serif text-white mb-8 leading-snug text-center">
          Subscribe to the latest Azul Tech insights on the topics you care about.
        </h4>
        <form onSubmit={handleSubmit} className="flex overflow-hidden border border-white/10 focus-within:border-brand-blue/50 transition-colors duration-300">
          <input
            id="newsletter-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 bg-white px-6 py-4 text-sm text-brand-midnight focus:outline-none"
          />
          <motion.button
            id="newsletter-submit"
            type="submit"
            whileHover={{ backgroundColor: "rgba(14,207,254,0.85)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-brand-blue px-6 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowRight size={20} className="text-white" />
          </motion.button>
        </form>
      </motion.div>

      <SubscriptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultEmail={email}
      />
    </>
  );
}

// ─── Portable text with animated heading lines ────────────────────────────────

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.05] mb-10">
        {children}
      </h1>
    ),
  },
  marks: {
    gradient: ({ children }: any) => (
      <span className="text-gradient-brand">{children}</span>
    ),
  },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <section className="relative pt-32 pb-24 bg-[#040D14] overflow-hidden min-h-screen flex flex-col">
      <div className="container-editorial relative z-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col">
            <div className="max-w-2xl mb-20">
              <div className="skeleton-box h-24 w-full mb-10" />
              <div className="skeleton-box h-4 w-11/12 mb-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-8">
                <div className="skeleton-box h-[320px] w-full" />
                <div className="skeleton-box h-[480px] w-full" />
              </div>
              <div className="flex flex-col gap-8">
                <div className="skeleton-box h-[480px] w-full" />
                <div className="skeleton-box h-[320px] w-full" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="skeleton-box h-[600px] w-full" />
            <div className="skeleton-box h-[200px] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Hero() {
  const { data: heroData, loading } = useHero();

  if (loading) return <HeroSkeleton />;

  const col1 = (heroData?.bentoCards || []).filter((_: any, i: number) => i % 2 === 0);
  const col2 = (heroData?.bentoCards || []).filter((_: any, i: number) => i % 2 !== 0);

  return (
    <section id="about" className="relative pt-32 pb-24 bg-[#040D14] overflow-hidden min-h-screen flex flex-col">
      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-brand-blue/6 via-transparent to-transparent opacity-70" />

      <div className="container-editorial relative z-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Main column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex justify-between items-start mb-20">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
                >
                  {heroData?.title?.content ? (
                    <PortableText
                      value={heroData.title.content}
                      components={portableTextComponents}
                    />
                  ) : (
                    <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.05] mb-10">
                      {typeof heroData?.title === "string" ? heroData.title : ""}
                    </h1>
                  )}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
                  className="text-sm text-white/60 max-w-xl leading-relaxed"
                >
                  {heroData?.subtitle || ""}
                </motion.p>
              </div>
            </div>

            {/* Bento grid */}
            {heroData?.bentoCards?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                  {col1.map((card: any, idx: number) => (
                    <BentoCard
                      key={idx}
                      index={idx * 2}
                      type={card.type}
                      title={card.title}
                      image={card.image}
                      className={card.isTall ? "h-[480px]" : "h-[320px]"}
                      link={card.link}
                      tag={card.tag}
                      date={card.date}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-8">
                  {col2.map((card: any, idx: number) => (
                    <BentoCard
                      key={idx}
                      index={idx * 2 + 1}
                      type={card.type}
                      title={card.title}
                      image={card.image}
                      className={card.isTall ? "h-[480px]" : "h-[320px]"}
                      link={card.link}
                      tag={card.tag}
                      date={card.date}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex-1">
              <InterviewCard data={heroData?.interviewCard} />
            </div>
            <div>
              <SubscribeCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
