import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { CheckCircle2, Globe2, ShieldCheck, Database, Cpu, Activity, Truck } from 'lucide-react';

import officeLounge from '../assets/azul_office_lounge.png';
import minagriHubImg from '../assets/project_minagri_hub.png';
import partnerMinaloc from '../assets/partner_minaloc.png';
import partnerNida from '../assets/partner_nida.png';
import partnerRisa from '../assets/partner_risa.png';
import networkNodes from '../assets/azul_network_nodes_1776857276664.png';
import serverInfra from '../assets/azul_server_infrastructure.png';

export default function WorkPage() {
  const projects = [
    {
      id: "civil-registration",
      title: "Civil Registration Archives Digitization & AI Indexing",
      category: "Nation-Scale DPI & Civil Identity",
      image: officeLounge,
      partnerLogos: [
        { name: "Ministry of Local Government (MINALOC)", logo: partnerMinaloc },
        { name: "National Identification Agency (NIDA)", logo: partnerNida },
        { name: "Rwanda Information Society Authority (RISA)", logo: partnerRisa }
      ],
      partners: ["Ministry of Local Government (MINALOC)", "National Identification Agency (NIDA)", "Rwanda Information Society Authority (RISA)"],
      description: "In partnership with MINALOC, NIDA, and RISA, we are digitizing 12.5 million civil records across all 416 administrative sectors in Rwanda into the Rwanda NCI CRVS platform — transforming fragile paper archives into a secure, searchable digital legacy.",
      whatWeDo: [
        "Scanning of archive records across the entire country.",
        "AI-enhanced Indexing of documents: Accurate digitization of birth, death, and marriage records.",
        "Electronic Document Management System (EDMS): A secure, cloud-based platform for storage, search, and access."
      ],
      impact: [
        "12.5 million citizens documented",
        "416 sectors covered — 100% national reach",
        "Preserved history, protected from loss or damage",
        "Faster access to legal identity for all Rwandans",
        "Seamless integration with existing e-Government platforms"
      ]
    },
    {
      id: "minagri-hub",
      title: "MINAGRI Knowledge Hub & TUNGA AI",
      category: "Data Systems & AI",
      image: minagriHubImg,
      partners: ["Ministry of Agriculture (MINAGRI)", "Rwanda Agriculture Board (RAB)", "NAEB", "Centre for 4th Industrial Revolution (C4IR)"],
      description: "A central hub for organizing and accessing agriculture and animal resources data produced by MINAGRI and its institutions. The platform also serves as the content management system powering TUNGA AI — a Kinyarwanda conversational voicebot and chatbot.",
      whatWeDo: [
        "Centralized data integration across RAB, NAEB, and MINAGRI departments.",
        "Content Management System for voice and text conversational AI datasets.",
        "Kinyarwanda natural language processing integration for rural farmer accessibility."
      ],
      impact: [
        "Instant agricultural insight for farmers across Rwanda",
        "Native Kinyarwanda conversational voicebot interface",
        "Unified knowledge repository for national food security decisions"
      ]
    },
    {
      id: "palliative-care",
      title: "Digitization of Rwanda National Palliative Care Register",
      category: "Digital Health Infrastructure",
      image: networkNodes,
      partners: ["Ministry of Health (MoH)", "Rwanda Biomedical Centre (RBC)", "ACREOL Global"],
      description: "A secure, mobile-first Palliative Care Management Application to support healthcare providers delivering dignified, data-driven care to patients with life-limiting illnesses. Designed in collaboration with medical teams and palliative care experts.",
      whatWeDo: [
        "Patient Profiles & Clinical Documentation: Functional status score, personal & medical histories.",
        "Care Pathway & Medication Tracking: Real-time tracking of treatment intent, dosages, and symptom relief.",
        "Follow-Up Scheduling & Patient Mapping: Automated reminders, district/sector village geographic mapping, and movement tracking."
      ],
      impact: [
        "Improves continuity of care across hospitals, clinics, and home-based services",
        "Reduces paper errors and eliminates lost medical records",
        "Enables timely medical interventions through real-time symptom tracking",
        "Supports national palliative care scaling aligned with Universal Health Coverage (UHC) goals"
      ]
    },
    {
      id: "road-safety",
      title: "6-Nation Road Crash Interoperable Regional Data Platform",
      category: "Cross-Border Regional Protocol",
      image: serverInfra,
      partners: ["Northern Corridor Transit & Transport Coordination Authority (NCTTCA)", "East African Community (EAC)"],
      nations: ["Burundi", "DR Congo", "Kenya", "Rwanda", "South Sudan", "Uganda"],
      description: "Design and implementation of national and multi-stakeholder platforms for road crash data collection, analytics, and cross-border data exchange across all Northern Corridor member states.",
      whatWeDo: [
        "Harmonized cross-border data protocol for crash incident reporting.",
        "Multi-stakeholder analytics dashboard for transport authorities and law enforcement.",
        "Regional interoperability rails connecting 6 sovereign East African nations."
      ],
      impact: [
        "Full data interoperability across 6 sovereign nations",
        "Evidence-based regional road safety policy and infrastructure planning",
        "Real-time corridor crash monitoring and emergency response coordination"
      ]
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
              PROVEN IMPLEMENTATIONS — OFFICIAL PORTFOLIO
            </p>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Projects Portfolio
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
              Azul Tech has engineered key cross-sector implementations across national identity digitization, agricultural conversational AI, digital healthcare registers, and 6-nation cross-border data interoperability platforms.
            </p>
          </motion.div>
        </div>

        {/* Detailed Projects Portfolio Grid */}
        <section className="container-editorial pt-8 border-t border-white/10 mt-12">
          <div className="mb-16">
            <span className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold block mb-2">CASE STUDIES</span>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white">Highlighted National Deployments</h2>
          </div>

          <div className="space-y-24">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 overflow-hidden hover:border-brand-blue/40 transition-colors grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left: Project Image */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[450px]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040D14] via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-6 left-6 bg-brand-blue text-brand-midnight text-[9px] font-technical font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                    {proj.category}
                  </div>
                </div>

                {/* Right: Project Information */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4 leading-tight">{proj.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{proj.description}</p>

                    {/* Partners & Logos */}
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <span className="text-[10px] font-technical text-brand-blue uppercase tracking-widest block mb-3 font-bold">In Partnership With:</span>
                      
                      {proj.partnerLogos ? (
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                          {proj.partnerLogos.map(pl => (
                            <div key={pl.name} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-white/20 shadow-md">
                              <img src={pl.logo} alt={pl.name} className="h-10 w-auto object-contain" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {proj.partners.map(partner => (
                            <span key={partner} className="text-xs bg-white/10 text-white/90 px-3 py-1 rounded border border-white/10 font-serif">
                              {partner}
                            </span>
                          ))}
                        </div>
                      )}

                      {proj.nations && (
                        <div className="mt-4">
                          <span className="text-[10px] font-technical text-emerald-400 uppercase tracking-widest block mb-2 font-bold">Participating Member States (6 Nations):</span>
                          <div className="flex flex-wrap gap-2">
                            {proj.nations.map(nat => (
                              <span key={nat} className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded border border-emerald-500/30 font-serif font-bold">
                                🌐 {nat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* What We Do & Impact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-technical text-white uppercase tracking-widest font-bold mb-3">What We Delivered:</h4>
                        <ul className="space-y-2 text-xs text-white/60">
                          {proj.whatWeDo.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-brand-blue font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-technical text-emerald-400 uppercase tracking-widest font-bold mb-3">Measured Impact:</h4>
                        <ul className="space-y-2 text-xs text-white/80">
                          {proj.impact.map((imp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
