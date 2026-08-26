import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

export default function LeadershipPage() {
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
            WHO WE ARE — LEADERSHIP
          </p>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">
            Our Leadership
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-16 max-w-3xl">
            Azul Tech is steered by architects, system designers, and policy strategists who have led national-scale digital infrastructure initiatives across Africa and the Global South.
          </p>

          
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
        <div className="bg-white/5 border border-white/10 p-8">
          <h3 className="text-2xl font-serif font-bold mb-2">Executive Leadership</h3>
          <p className="text-brand-blue text-sm mb-4">Systems Architecture & Policy Direction</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Directing the development of sovereign reference architectures and leading multi-nation technical partnerships across Africa.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8">
          <h3 className="text-2xl font-serif font-bold mb-2">Protocol Lab Council</h3>
          <p className="text-brand-blue text-sm mb-4">Standards & Infrastructure Engineering</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Ensuring all systems shipped by Azul Tech conform to open, audited, and sovereign-grade engineering standards.
          </p>
        </div>
      </div>
    
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
