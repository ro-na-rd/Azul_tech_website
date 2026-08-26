import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

export default function AspirationPage() {
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
            WHO WE ARE — ASPIRATION
          </p>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">
            Our Aspiration
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-16 max-w-3xl">
            We envision a world where digital government infrastructure is open, sovereign, and self-sustaining across every nation in the Global South.
          </p>

          
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-16">
        <div className="bg-white/5 border border-white/10 p-8">
          <h3 className="text-xl font-serif font-bold mb-3">100% Sovereign Architectures</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Eliminating black-box dependencies and empowering national engineering teams to operate and extend their own systems.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8">
          <h3 className="text-xl font-serif font-bold mb-3">Cross-Border Interoperability</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Enabling regional digital trade, identity validation, and data exchange powered by open standards.
          </p>
        </div>
      </div>
    
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
