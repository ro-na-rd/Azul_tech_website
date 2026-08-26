import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { Calendar, Newspaper, ArrowUpRight } from 'lucide-react';

export default function EventsNewsPage() {
  return (
    <div className="min-h-screen bg-[#040D14] text-white flex flex-col justify-between">
      <CustomCursor />
      <Header />
      
      <main className="pt-40 pb-24 container-editorial flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold mb-4">
            PRESS & DISPATCHES
          </p>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">
            Events & News
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-16 max-w-3xl">
            Stay updated with Azul Tech's latest summit keynotes, pan-African infrastructure briefings, press announcements, and technical publications.
          </p>

          {/* ── Upcoming Events ──────────────────────── */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="text-brand-blue" size={20} />
              <h2 className="text-2xl font-serif font-bold text-white">Upcoming Events & Summits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:border-brand-blue/40 transition-colors">
                <span className="text-[10px] font-technical text-brand-blue uppercase tracking-widest font-bold">
                  NOV 12-14, 2026 · KIGALI, RWANDA
                </span>
                <h3 className="text-xl font-serif font-bold mt-4 mb-3 group-hover:text-brand-blue transition-colors">
                  Pan-African DPI Summit 2026
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Keynote address on "Sovereign Identity & Interoperability Across Borders" featuring Protocol Lab reference architectures.
                </p>
                <a href="/#contact" className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
                  Request Delegate Invite <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:border-brand-blue/40 transition-colors">
                <span className="text-[10px] font-technical text-brand-blue uppercase tracking-widest font-bold">
                  DEC 04, 2026 · LUSAKA, ZAMBIA
                </span>
                <h3 className="text-xl font-serif font-bold mt-4 mb-3 group-hover:text-brand-blue transition-colors">
                  Global South Digital Government Forum
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Panel discussion on replacing proprietary vendor lock-in with open, sovereign, and auditable digital public infrastructure.
                </p>
                <a href="/#contact" className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
                  View Program Agenda <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* ── Press & News Releases ────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Newspaper className="text-brand-blue" size={20} />
              <h2 className="text-2xl font-serif font-bold text-white">Latest News & Releases</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-brand-blue/40 transition-colors">
                <div>
                  <span className="text-[10px] font-technical text-white/40 uppercase tracking-widest">PRESS RELEASE · OCT 2026</span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1">
                    Azul Tech Releases Sovereign Infrastructure Reference Architecture v2.0
                  </h3>
                  <p className="text-white/60 text-sm mt-2 max-w-2xl">
                    Comprehensive technical specification for identity, data exchange, and governance layers available for sovereign adaptation.
                  </p>
                </div>
                <a href="/#contact" className="shrink-0 bg-brand-blue/20 text-brand-blue border border-brand-blue/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-colors">
                  Read Release
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-brand-blue/40 transition-colors">
                <div>
                  <span className="text-[10px] font-technical text-white/40 uppercase tracking-widest">ANNOUNCEMENT · SEP 2026</span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1">
                    6-Nation Cross-Border Data Platform Completes Initial Interoperability Audit
                  </h3>
                  <p className="text-white/60 text-sm mt-2 max-w-2xl">
                    Successful cross-border test of road safety data verification protocol across six Southern African countries.
                  </p>
                </div>
                <a href="/#contact" className="shrink-0 bg-brand-blue/20 text-brand-blue border border-brand-blue/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-colors">
                  Read Release
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
