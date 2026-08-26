import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import SovereignSection from '../components/SovereignSection';

export default function SovereignPage() {
  return (
    <div className="min-h-screen bg-[#040D14] text-white flex flex-col justify-between">
      <CustomCursor />
      <Header />
      
      <main className="pt-32 flex-1">
        <div className="container-editorial mb-8">
          <p className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold mb-4">
            DIGITAL PUBLIC INFRASTRUCTURE
          </p>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
            Infrastructure by Design
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
            Every deployment becomes a reference architecture. Every engagement compounds the capability of an entire sector, building national digital resilience from the first commit.
          </p>
        </div>

        <SovereignSection />
      </main>

      <Footer />
    </div>
  );
}
