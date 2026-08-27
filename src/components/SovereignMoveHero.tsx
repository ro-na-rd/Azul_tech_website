import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Search, Menu, X, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Layers } from 'lucide-react';
import Logo from './Logo';
import SubscriptionModal from './SubscriptionModal';
import IntroMotionGraphic, { RUNTIME_MS as INTRO_MS } from './IntroMotionGraphic';
import { formatRuntime } from './MotionGraphicPlayer';
import officeLounge from '../assets/azul_office_lounge.png';
import ceoInterview from '../assets/azul_ceo_interview_1776857294654.png';

interface SovereignMoveHeroProps {
  onOpenDrawer?: () => void;
}

export default function SovereignMoveHero({ onOpenDrawer }: SovereignMoveHeroProps) {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [watchModalOpen, setWatchModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhase, setActivePhase] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.play();
        setIsVideoPaused(false);
      } else {
        videoRef.current.pause();
        setIsVideoPaused(true);
      }
    }
  };

  const handleArrowClick = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setWatchModalOpen(true);
    }
  };

  const workflowPhases = [
    {
      phase: "PHASE 01",
      title: "Discovery & System Architecture",
      timeline: "Weeks 1 — 4",
      tag: "Strategic Assessment",
      description: "In-depth audit of existing national registries, legacy databases, data protection compliance, and inter-agency workflows.",
      deliverables: [
        "National DPI Audit & Gap Analysis",
        "Target Reference Architecture (5 Sovereign Layers)",
        "Data Sovereignty & Security Compliance Matrix"
      ]
    },
    {
      phase: "PHASE 02",
      title: "Protocol Lab Reference Blueprinting",
      timeline: "Weeks 5 — 10",
      tag: "Specification Design",
      description: "Engineering open, auditable, zero-trust protocols for identity, payments, entitlements, and cross-border interoperability.",
      deliverables: [
        "Sovereign Stack Reference Codebase",
        "API Contracts & Data Rail Interoperability Spec",
        "Sandbox Environment for Agency Testing"
      ]
    },
    {
      phase: "PHASE 03",
      title: "Core System Integration & Data Rails",
      timeline: "Weeks 11 — 20",
      tag: "Engineered Integration",
      description: "Deploying high-availability infrastructure across ministries, digitizing archives via AI, and establishing real-time data exchange.",
      deliverables: [
        "Civil Record Digitization & AI Indexing Engine",
        "Encrypted Cross-Ministry Data Exchange Rails",
        "Hardware-Backed Security & HSM Key Management"
      ]
    },
    {
      phase: "PHASE 04",
      title: "Nation-Scale Deployment & AI Governance",
      timeline: "Weeks 21 — 32",
      tag: "Institutional Handover",
      description: "Full production launch, training national engineers, enabling AI conversational voicebots, and operationalizing 24/7 oversight.",
      deliverables: [
        "Live Production Rollout across All Administrative Sectors",
        "Conversational AI Voicebot / Chatbot Integration (TUNGA AI)",
        "Continuous Audit & Executive Decision Dashboards"
      ]
    }
  ];

  const searchResults = [
    { title: "Civil Registration Archives Digitization", category: "Project Portfolio", link: "/work" },
    { title: "The Azul Stack — 5 Sovereign Layers", category: "Architecture", link: "/architecture" },
    { title: "MINAGRI Knowledge Hub & TUNGA AI", category: "Data Systems & AI", link: "/work" },
    { title: "6-Nation Road Safety Data Network", category: "Regional Protocol", link: "/work" },
    { title: "Company Profile & Firm Leadership", category: "About Us", link: "/leadership" }
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="relative bg-[#040D14] text-white">
      {/* ── CINEMATIC FULLSCREEN HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden">
        {/* Background Video Stream with Fallback Gradient */}
        <div className="absolute inset-0 z-0 bg-[#040D14]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover opacity-50 filter brightness-75 contrast-110"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-data-center-server-racks-41525-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040D14] via-[#040D14]/40 to-[#040D14]/60" />
        </div>

        {/* Minimal Transparent Top Header Bar (McKinsey Style) */}
        <header className="relative z-20 flex items-center justify-between px-8 lg:px-16 py-8 border-b border-white/10 backdrop-blur-xs">
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenDrawer}
              className="p-2 border-r border-white/20 pr-6 text-white hover:text-brand-blue transition-colors flex items-center gap-2 cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <a href="/">
              <Logo className="w-32 h-auto text-white" />
            </a>
          </div>

          <div className="flex items-center gap-8 text-xs font-technical uppercase tracking-widest text-white/90">
            <button
              onClick={() => setSubModalOpen(true)}
              className="hover:text-brand-blue transition-colors hidden sm:block cursor-pointer font-bold"
            >
              Sign In
            </button>
            <span className="text-white/30 hidden sm:block">|</span>
            <button
              onClick={() => setSubModalOpen(true)}
              className="hover:text-brand-blue transition-colors cursor-pointer font-bold"
            >
              Subscribe
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white hover:text-brand-blue transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </header>

        {/* Center Giant Hero Headline */}
        <div className="relative z-20 container-editorial my-auto text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="text-[11px] font-technical text-brand-blue uppercase tracking-[0.4em] font-bold mb-6">
              SOVEREIGN DIGITAL INFRASTRUCTURE FIRM
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-10 leading-[1.05] tracking-tight">
              What's your next <br />
              <span className="italic font-normal text-gradient-brand">sovereign move?</span>
            </h1>

            {/* Watch Video & Circular Arrow Button Row */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => setWatchModalOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#040D14" }}
                whileTap={{ scale: 0.96 }}
                className="bg-white text-brand-midnight font-technical text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-colors cursor-pointer"
              >
                <span>Watch Video · {formatRuntime(INTRO_MS)}</span>
                <Play size={14} className="fill-current text-brand-midnight" />
              </motion.button>

              {/* McKinsey Circular Arrow Button ( → ) */}
              <motion.button
                onClick={handleArrowClick}
                whileHover={{ scale: 1.1, backgroundColor: "#0ECFFE", color: "#040D14" }}
                whileTap={{ scale: 0.92 }}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 shadow-2xl transition-all cursor-pointer group"
                aria-label="Scroll down to sovereign deployments & video"
              >
                <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Right Pause / Play Controls */}
        <div className="relative z-20 flex justify-between items-end px-8 lg:px-16 pb-8">
          <div className="text-[10px] font-technical text-white/50 uppercase tracking-widest hidden md:block">
            AZUL TECH • SYSTEM ARCHITECTURE & INTEGRATION
          </div>
          
          <button
            onClick={toggleVideo}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
            aria-label={isVideoPaused ? "Play background video" : "Pause background video"}
          >
            {isVideoPaused ? <Play size={18} className="fill-current" /> : <Pause size={18} />}
          </button>
        </div>
      </section>

      {/* ── MCKINSEY FEATURE SHOWCASE SECTION (media_1787835629299.png) ────────── */}
      <section ref={videoSectionRef} className="py-24 bg-[#040D14] border-t border-white/10 relative">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Title, Subtitle, Circular Arrow Button ( → ), Video Cards */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                  What's your next <br />
                  <span className="italic font-normal text-gradient-brand">sovereign move?</span>
                </h2>

                <div className="flex items-center gap-6">
                  <p className="text-white/70 text-base md:text-lg max-w-xl font-serif leading-relaxed">
                    Game-changing work. Sovereign systems and AI powering growth. At Azul Tech, we help you think bigger, build stronger, and expand opportunity for all.
                  </p>

                  {/* McKinsey Circular Arrow Button ( → ) */}
                  <motion.button
                    onClick={() => setWatchModalOpen(true)}
                    whileHover={{ scale: 1.1, backgroundColor: "#0ECFFE", color: "#040D14" }}
                    whileTap={{ scale: 0.92 }}
                    className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 shadow-2xl transition-all cursor-pointer group"
                    aria-label="Launch video modal"
                  >
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  onClick={() => setWatchModalOpen(true)}
                  className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-brand-blue/40 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={ceoInterview}
                      alt="Digital Public Infrastructure"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-blue text-brand-midnight flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={18} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold block mb-1">
                      EXECUTIVE BRIEFING
                    </span>
                    <h4 className="text-base font-serif font-bold text-white group-hover:text-brand-blue transition-colors">
                      Digital Public Infrastructure: The Sovereign Rails
                    </h4>
                  </div>
                </div>

                <div
                  onClick={() => setWatchModalOpen(true)}
                  className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-brand-blue/40 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={officeLounge}
                      alt="Civil Registration Archives"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-blue text-brand-midnight flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={18} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold block mb-1">
                      NATIONAL DEPLOYMENT
                    </span>
                    <h4 className="text-base font-serif font-bold text-white group-hover:text-brand-blue transition-colors">
                      Civil Registration Archives & AI Indexing
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Featured Blue Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-[#1D4ED8] to-[#1E3A8A] border border-blue-400/30 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px] group hover:border-blue-300/50 transition-all">
                <div>
                  <span className="text-[10px] font-technical text-blue-200 uppercase tracking-widest font-bold block mb-4">
                    INSIGHTS & RESEARCH
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                    Lessons from our alliances: What national DPI deployments can teach CEOs about rewiring for AI
                  </h3>
                  <p className="text-blue-100/80 text-sm leading-relaxed font-serif">
                    How governments across Africa are combining sovereign data rails, open API specifications, and conversational AI to transform public service delivery.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-400/20 flex items-center justify-between">
                  <span className="text-xs font-technical text-blue-200 uppercase tracking-wider font-bold">
                    Read Report →
                  </span>
                  <Sparkles size={20} className="text-blue-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Chatbot Badge (McKinsey Style) */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button
          onClick={() => setSubModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-brand-blue text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 hover:scale-105 transition-transform cursor-pointer group"
        >
          <Sparkles size={18} className="text-cyan-200 group-hover:rotate-12 transition-transform" />
          <div className="text-left leading-tight">
            <span className="text-[9px] font-technical uppercase tracking-widest block text-cyan-100 font-bold">
              Ask Azul Tech
            </span>
            <span className="text-xs font-serif font-bold">AI CHATBOT</span>
          </div>
        </button>
      </div>

      {/* ── SCHEDULED WORKFLOW ROADMAP SECTION ("Good Scheduled Workflow") ── */}
      <section className="py-28 bg-[#061521] border-t border-white/10 relative overflow-hidden">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold block mb-4">
                ENGAGEMENT ROADMAP
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Scheduled Infrastructure Workflow
              </h2>
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed font-serif">
              Our structured, 4-phase deployment methodology guarantees secure, audit-ready digital public infrastructure delivered on clear institutional schedules.
            </p>
          </div>

          {/* Interactive Phase Timeline Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Scheduled Phase Tabs */}
            <div className="lg:col-span-5 space-y-4">
              {workflowPhases.map((item, idx) => (
                <div
                  key={item.phase}
                  onClick={() => setActivePhase(idx)}
                  className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    activePhase === idx
                      ? 'bg-brand-blue/15 border-brand-blue shadow-xl'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono font-bold ${activePhase === idx ? 'text-brand-blue' : 'text-white/40'}`}>
                      {item.phase}
                    </span>
                    <div>
                      <h4 className="text-base font-serif font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] font-technical text-white/50">{item.timeline}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className={`transition-transform ${activePhase === idx ? 'rotate-90 text-brand-blue' : 'text-white/30'}`} />
                </div>
              ))}
            </div>

            {/* Right Column: Active Phase Detail Card */}
            <div className="lg:col-span-7 bg-white/5 border border-white/15 rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-technical text-brand-blue uppercase tracking-widest font-bold">
                    {workflowPhases[activePhase].phase} • {workflowPhases[activePhase].tag}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mt-1">
                    {workflowPhases[activePhase].title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded border border-white/10 text-brand-blue">
                  {workflowPhases[activePhase].timeline}
                </span>
              </div>

              <p className="text-white/80 text-base leading-relaxed mb-8 font-serif">
                {workflowPhases[activePhase].description}
              </p>

              <div>
                <h5 className="text-xs font-technical text-brand-blue uppercase tracking-widest font-bold mb-4">
                  Scheduled Deliverables:
                </h5>
                <div className="space-y-3">
                  {workflowPhases[activePhase].deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/40 p-4 rounded-lg border border-white/5">
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm font-serif text-white/90">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH MODAL OVERLAY ────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center pt-24 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[#061521] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 p-6 text-white"
            >
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <Search size={22} className="text-brand-blue" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search Azul Tech architectures, projects, dispatches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-lg text-white placeholder:text-white/40 focus:outline-none font-serif"
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/50 hover:text-white">
                  <X size={22} />
                </button>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((res) => (
                    <a
                      key={res.title}
                      href={res.link}
                      onClick={() => setSearchOpen(false)}
                      className="block p-4 rounded-lg bg-white/5 hover:bg-brand-blue/15 border border-white/5 hover:border-brand-blue/40 transition-colors"
                    >
                      <span className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold block mb-1">
                        {res.category}
                      </span>
                      <h4 className="text-base font-serif font-bold text-white">{res.title}</h4>
                    </a>
                  ))
                ) : (
                  <p className="text-white/40 text-sm py-8 text-center">No matching results found.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── WATCH VIDEO OVERLAY MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {watchModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWatchModalOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/20"
            >
              <button
                onClick={() => setWatchModalOpen(false)}
                className="absolute top-4 right-4 z-20 bg-black/60 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <X size={20} />
              </button>

              {watchModalOpen && <IntroMotionGraphic autoPlay />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── SUBSCRIPTION MODAL ──────────────────────────────────────────────── */}
      <SubscriptionModal
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
      />
    </div>
  );
}
