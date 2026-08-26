import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { Lightbulb, Shield, Users, Award, Leaf } from 'lucide-react';

export default function MissionValuesPage() {
  const coreValues = [
    {
      title: "Innovation",
      motto: "Because we continuously ought to find better ways",
      description: "We embrace creativity and continuously develop solutions that drive digital transformation.",
      icon: Lightbulb,
    },
    {
      title: "Integrity",
      motto: "Because our word means something",
      description: "We operate with transparency, ethics, and accountability in every project and partnership.",
      icon: Shield,
    },
    {
      title: "Collaboration",
      motto: "Because it takes a village",
      description: "We partner with Governments, businesses and communities to achieve shared success.",
      icon: Users,
    },
    {
      title: "Excellence",
      motto: "Because there is no other worthy way to do things",
      description: "We strive for the highest standards in our solutions, services, and impact.",
      icon: Award,
    },
    {
      title: "Sustainability",
      motto: "Because we are building for the long-term",
      description: "We build solutions that support long-term growth and resilience across Africa.",
      icon: Leaf,
    },
  ];

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
            COMPANY PROFILE — VISION & VALUES
          </p>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">
            Purpose, Mission & Core Values
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-16 max-w-3xl">
            Azul Tech is a Rwanda-based technology and systems integration firm specializing in the design, integration, and delivery of secure, auditable digital infrastructure for governments and regulated institutions.
          </p>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white/5 border border-white/10 p-8 lg:p-10 relative overflow-hidden group hover:border-brand-blue/40 transition-colors">
              <span className="text-brand-blue text-[10px] font-technical font-bold uppercase tracking-widest block mb-4">OUR VISION</span>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">Architecting the Global South</h2>
              <p className="text-white/70 text-base leading-relaxed">
                Architect the foundational digital infrastructure of the Global South and power the next generation of sovereign, interoperable eGovernment ecosystems.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 lg:p-10 relative overflow-hidden group hover:border-brand-blue/40 transition-colors">
              <span className="text-brand-blue text-[10px] font-technical font-bold uppercase tracking-widest block mb-4">OUR MISSION</span>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">Sovereign-Grade System Integration</h2>
              <p className="text-white/70 text-base leading-relaxed">
                Become the leading sovereign-grade system integrator in emerging markets by engineering resilient, compliant, and interoperable digital stacks for identity, payments, entitlements, and public services.
              </p>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="border-t border-white/10 pt-16">
            <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold mb-4">
              GUIDING PRINCIPLES
            </p>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-12">Our Core Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={val.title}
                    className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:border-brand-blue/40 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono text-brand-blue font-bold">0{idx + 1}</span>
                        <IconComponent className="text-white/40 group-hover:text-brand-blue transition-colors" size={24} />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-white mb-2">{val.title}</h3>
                      <p className="text-[11px] font-technical text-brand-blue/80 italic mb-4 font-semibold">{val.motto}</p>
                      <p className="text-white/60 text-xs leading-relaxed">{val.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
