import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Hero from '../components/Hero';
import SocietalImpact from '../components/SocietalImpact';
import HowWeHelp from '../components/HowWeHelp';
import roboticHandAfrica from '../assets/azul_robotic_hand_africa.png';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#040D14] text-white flex flex-col justify-between">
      <CustomCursor />
      <Header />
      
      <main className="pt-36 flex-1">
        {/* Company Profile Official Header Banner — Slide 2 Matching Layout */}
        <section className="container-editorial mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: About Us & Unique Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold">
                    COMPANY PROFILE — AUGUST 2026
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[10px] font-technical text-emerald-400 uppercase tracking-widest font-bold">
                    RWANDA-BASED SYSTEM INTEGRATION FIRM
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                  About Us
                </h1>
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed font-serif">
                  Azul Tech is a Rwanda-based technology and systems integration firm specializing in the design, integration, and delivery of secure, auditable digital infrastructure for governments and regulated institutions.
                </p>
              </div>

              {/* Unique Value Proposition */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brand-blue mb-4">
                  Unique Value Proposition
                </h2>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed font-serif">
                  Azul Tech leverages local insights and global standards to design the system architectures that governments across Africa run on.
                </p>
              </div>
            </motion.div>

            {/* Right Column: 3D Futuristic Robotic Hand & Dotted Africa Map (Exact Slide 2 Asset) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent p-6 border border-brand-blue/30 shadow-[0_0_50px_rgba(14,207,254,0.15)] group">
                <img
                  src={roboticHandAfrica}
                  alt="Azul Tech 3D Robotic Hand with Dotted Africa Map"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[9px] font-technical text-brand-blue uppercase tracking-widest border border-white/10">
                  Architecting Africa's Sovereign Stack
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Hero />
        <SocietalImpact />
        <HowWeHelp />
      </main>

      <Footer />
    </div>
  );
}
