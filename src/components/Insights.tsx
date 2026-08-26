import React from "react";
import { ArrowRight, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

interface InsightCard {
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const insights: InsightCard[] = [
  {
    category: "Architecture",
    title: "EAC Northern Corridor: A Model for Multi-Nation Data Compacts",
    description: "How we designed a cross-border data-sharing protocol for 6 sovereign governments to harmonize transit coordination.",
    author: "David Mugisha",
    date: "2025-04-14",
    readTime: "8 min read",
    image: "/Users/macbookpro/.gemini/antigravity/brain/81500446-7c4b-41b2-be29-4e952c5c9c36/azul_tech_insight_pattern_1776764368642.png"
  },
  {
    category: "Sovereignty",
    title: "10 Governments by 2030: The Road to National Digital Sovereignty",
    description: "A roadmap for deploying the Azul Stack as the reference architecture for the next generation of African digital states.",
    author: "Amina Osei",
    date: "2025-04-08",
    readTime: "6 min read",
    image: "/Users/macbookpro/.gemini/antigravity/brain/81500446-7c4b-41b2-be29-4e952c5c9c36/azul_tech_insight_pattern_1776764368642.png"
  },
  {
    category: "Implementation",
    title: "Rwanda National Civil Records: Digitizing 12.5 Million Sovereign Records",
    description: "Tracing the implementation of the L01 Identity layer across 416 administrative sectors in Rwanda.",
    author: "Jean-Paul Nkurunziza",
    date: "2025-03-31",
    readTime: "10 min read",
    image: "/Users/macbookpro/.gemini/antigravity/brain/81500446-7c4b-41b2-be29-4e952c5c9c36/azul_tech_insight_pattern_1776764368642.png"
  }
];

function InsightCardComponent({ card, index }: { card: InsightCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card group overflow-hidden flex flex-col h-full"
    >
      {/* Card Image / Pattern */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={card.image} 
          alt={card.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-brand-blue/20 border border-brand-blue/30 backdrop-blur-md text-[10px] font-technical uppercase tracking-widest text-brand-cyan">
            {card.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-blue transition-colors duration-300">
            {card.title}
          </h3>
          <p className="text-sm text-muted mb-8 leading-relaxed line-clamp-3">
            {card.description}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-[10px] font-technical text-muted/60 uppercase tracking-tighter">
            <div className="flex items-center gap-2">
              <User size={12} className="text-brand-blue" />
              <span>{card.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span>{card.readTime}</span>
            </div>
          </div>
          
          <a href="#" className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:gap-4 transition-all">
            Read Case Study
            <ArrowRight size={14} className="text-brand-blue" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Insights() {
  return (
    <section id="insights" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-brand-violet/5 blur-[120px] pointer-events-none" />
      
      <div className="container-editorial relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <div className="section-label mb-4">Latest Insights</div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight mb-10 flex-1">
              Ideas that <span className="text-glow">Move</span> Africa Forward
            </h2>
          </div>
          
          <a href="#" className="btn-outline group">
            All Insights
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((card, i) => (
            <InsightCardComponent key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
