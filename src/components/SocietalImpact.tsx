import React, { useRef, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { useSanityData } from "../contexts/SanityDataContext";
import { optimizedUrl } from "../services/sanity";
import { motion, useInView, AnimatePresence } from "framer-motion";

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
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

interface TextBlockProps {
  item: any;
  index: number;
  isActive: boolean;
  onInView: (index: number) => void;
}

function TextBlock({ item, index, isActive, onInView }: TextBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) onInView(index);
  }, [isInView, index, onInView]);

  return (
    <div
      ref={ref}
      className={`approach-text-block transition-all duration-700 ease-out ${
        isActive ? "opacity-100 translate-x-0" : "opacity-20 translate-x-4"
      }`}
    >
      <div className="text-brand-blue font-technical text-[10px] uppercase tracking-widest mb-4 lg:mb-6 font-bold">
        PHASE 0{index + 1}
      </div>
      <h3 className="text-2xl lg:text-5xl font-serif font-bold text-white mb-6 lg:mb-8 leading-tight">
        {item.title}
      </h3>
      <p className="text-white/60 leading-relaxed max-w-none lg:max-w-xl text-sm lg:text-base">
        {item.description}
      </p>
      <div className="mt-8 lg:mt-10 h-px w-24 bg-brand-blue/30" />
    </div>
  );
}

export default function SocietalImpact() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { approach, loading } = useSanityData();

  const label = approach?.label || "";
  const items = approach?.items || [];

  const getImageSrc = (item: any) => {
    if (!item.image) return "";
    return optimizedUrl(item.image, { width: 1200, quality: 80 });
  };

  if (loading) {
    return (
      <section className="bg-[#040D14] py-32 min-h-[600px]">
        <div className="container-editorial">
          <div className="skeleton-box h-4 w-24 mb-6" />
          <div className="skeleton-box h-12 w-3/4 mb-32" />
          <div className="flex gap-20">
            <div className="skeleton-box h-[500px] w-1/2" />
            <div className="skeleton-box h-[500px] w-1/2" />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section id="approach" className="bg-[#040D14] py-20 lg:py-32">
      <div className="container-editorial">
        {/* Header */}
        <div className="approach-header mb-16 lg:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] mb-4 lg:mb-6 font-bold flex items-center gap-4">
                <span className="w-12 h-px bg-brand-blue" />
                {label}
              </div>
              {approach?.heading?.content ? (
                <PortableText value={approach.heading.content} components={portableTextComponents} />
              ) : (
                <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight">
                  {typeof approach?.heading === "string" ? approach.heading : ""}
                </h2>
              )}
            </motion.div>

            {/* Phase Stepper */}
            <div className="hidden lg:flex items-center gap-6 pb-4">
              {items.map((_: any, i: number) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    activeIndex === i ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span className="font-technical text-[10px] text-brand-blue font-bold">0{i + 1}</span>
                  <div
                    className={`h-[2px] transition-all duration-500 ${
                      activeIndex === i ? "w-12 bg-brand-blue" : "w-4 bg-white/20"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Sticky Side-by-Side */}
        <div className="hidden lg:flex relative items-start gap-20">
          <div className="sticky top-32 w-1/2 h-[70vh] overflow-hidden border border-white/5 bg-white/[0.02] group">
            <AnimatePresence mode="wait">
              {items.map((item: any, i: number) => {
                if (i !== activeIndex) return null;
                const src = getImageSrc(item);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {src ? (
                      <>
                        <img
                          src={src}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040D14] via-transparent to-transparent opacity-80" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-[#0a1a24] flex items-center justify-center">
                        <span className="text-white/10 text-[10px] font-technical uppercase tracking-widest">
                          Image coming soon
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="w-1/2 space-y-[40vh] py-[20vh]">
            {items.map((item: any, i: number) => (
              <TextBlock
                key={i}
                item={item}
                index={i}
                isActive={activeIndex === i}
                onInView={setActiveIndex}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal Snap Cards */}
        <div className="lg:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory no-scrollbar flex gap-4 pb-8">
          {items.map((item: any, i: number) => {
            const src = getImageSrc(item);
            return (
              <div
                key={i}
                className="snap-center shrink-0 w-[85vw] flex flex-col bg-white/[0.03] border border-white/10 overflow-hidden"
              >
                <div className="h-[240px] relative">
                  {src ? (
                    <img
                      src={src}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-brand-blue rounded-full text-[9px] font-technical font-bold text-white uppercase tracking-widest">
                      Phase 0{i + 1}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040D14] to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 leading-tight">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
