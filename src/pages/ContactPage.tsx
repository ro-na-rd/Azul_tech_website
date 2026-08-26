import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#040D14] text-white flex flex-col justify-between">
      <CustomCursor />
      <Header />
      
      <main className="pt-40 pb-16 flex-1">
        <div className="container-editorial mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold mb-4">
              START THE CONVERSATION
            </p>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Contact & Partnerships
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
              Initiate a dialogue with Azul Tech system architects and policy strategists. We operate across Kigali, Lusaka, Abidjan, and pan-African partner networks.
            </p>
          </motion.div>
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
