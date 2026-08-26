import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import HowWeHelp from '../components/HowWeHelp';
import { Fingerprint, CreditCard, Eye, Network, Server } from 'lucide-react';

export default function ArchitecturePage() {
  const protocolLayers = [
    {
      num: "01",
      title: "Identity & Trust",
      subtitle: "CRVS • Digital ID • Authentication • Access Control",
      description: "The root of all entitlements and public services.",
      icon: Fingerprint
    },
    {
      num: "02",
      title: "Entitlements & Payments",
      subtitle: "Benefit Systems • Public Finance Distribution",
      description: "Transparent benefit systems and secure public finance distribution.",
      icon: CreditCard
    },
    {
      num: "03",
      title: "Intelligence & Oversight",
      subtitle: "Dashboards • AI Analytics • Compliance Monitoring",
      description: "Dashboards, AI analytics, compliance monitoring, and audit readiness.",
      icon: Eye
    },
    {
      num: "04",
      title: "Interoperability & Data Rail",
      subtitle: "Secure Data Exchange • Registries • Inter-Agency",
      description: "Secure data exchange across ministries, registries, and government agencies.",
      icon: Network
    },
    {
      num: "05",
      title: "Resilient Infrastructure",
      subtitle: "Zero-Trust • High Availability • Cyber Stress",
      description: "Nation-scale, zero-trust, high-availability architecture built to withstand institutional and cyber stress.",
      icon: Server
    }
  ];

  return (
    <div className="min-h-screen bg-[#040D14] text-white flex flex-col justify-between">
      <CustomCursor />
      <Header />
      
      <main className="pt-40 pb-24 flex-1">
        <div className="container-editorial mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold mb-4">
              THE PROTOCOL LAB — AZUL STACK
            </p>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Core Stack Architecture
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl font-serif">
              Secure • Auditable • Sovereign • Resilient. Discover the 5 foundational layers defining national digital public infrastructure across identity, payments, entitlements, data interoperability, and intelligence oversight.
            </p>
          </motion.div>
        </div>

        {/* Protocol Lab Stack Detailed Grid */}
        <section className="container-editorial mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protocolLayers.map((layer, idx) => {
              const IconComp = layer.icon;
              return (
                <motion.div
                  key={layer.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-xl hover:border-brand-blue/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold text-brand-blue">LAYER {layer.num}</span>
                      <IconComp className="text-white/40 group-hover:text-brand-blue transition-colors" size={24} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{layer.title}</h3>
                    <p className="text-[11px] font-technical text-brand-blue/80 uppercase tracking-wider font-semibold mb-4">{layer.subtitle}</p>
                    <p className="text-white/60 text-xs leading-relaxed">{layer.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <HowWeHelp />
      </main>

      <Footer />
    </div>
  );
}
