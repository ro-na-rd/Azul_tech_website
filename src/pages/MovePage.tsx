import React from 'react';
import CustomCursor from '../components/CustomCursor';
import SovereignMoveHero from '../components/SovereignMoveHero';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MovePage() {
  return (
    <div className="min-h-screen bg-[#040D14] text-white flex flex-col justify-between">
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <SovereignMoveHero />
      </main>
      <Footer />
    </div>
  );
}
