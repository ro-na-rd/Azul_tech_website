import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#040D14] text-white flex flex-col justify-between">
      <CustomCursor />
      <Header />
      
      <main className="pt-40 pb-24 container-editorial flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold mb-4">
            WHO WE ARE — HISTORY
          </p>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">
            Our History
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-16 max-w-3xl">
            Born in Africa, built for the Global South. Azul Tech was founded to close the gap between high-level policy intent and system-level execution.
          </p>

          
      <div className="space-y-8 border-t border-white/10 pt-16">
        <div className="bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row gap-6 items-start">
          <span className="text-brand-blue font-mono font-bold text-2xl shrink-0">2021 — 2023</span>
          <div>
            <h3 className="text-xl font-serif font-bold mb-2">Foundation & Protocol Design</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Established Protocol Lab to research and specify the five sovereign layers of digital public infrastructure.
            </p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row gap-6 items-start">
          <span className="text-brand-blue font-mono font-bold text-2xl shrink-0">2024 — Present</span>
          <div>
            <h3 className="text-xl font-serif font-bold mb-2">Pan-African Deployments</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Deploys sovereign civil records, road safety data networks, and health platforms across 6+ nations.
            </p>
          </div>
        </div>
      </div>
    
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
