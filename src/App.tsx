import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import HowWeHelp from './components/HowWeHelp';
import MediaBlock from './components/MediaBlock';
import SocietalImpact from './components/SocietalImpact';
import CareersCTA from './components/CareersCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SovereignSection from './components/SovereignSection';

import LeadershipPage from './pages/LeadershipPage';
import MissionValuesPage from './pages/MissionValuesPage';
import HistoryPage from './pages/HistoryPage';
import AspirationPage from './pages/AspirationPage';
import GovernancePage from './pages/GovernancePage';
import EventsNewsPage from './pages/EventsNewsPage';
import ArchitecturePage from './pages/ArchitecturePage';
import WorkPage from './pages/WorkPage';
import ApproachPage from './pages/ApproachPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SovereignPage from './pages/SovereignPage';
import MovePage from './pages/MovePage';

import { LanguageProvider } from './contexts/LanguageContext';
import { SanityDataProvider } from './contexts/SanityDataContext';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, width: '100%' }}
    />
  );
}

function HomePage() {
  return (
    <div className="min-h-screen lg:cursor-none">
      <ScrollProgressBar />
      <CustomCursor />
      <Header />
      <main id="main-content">
        <Hero />
        <MediaBlock />
        <HowWeHelp />
        <SovereignSection />
        <SocietalImpact />
        <CareersCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <SanityDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/move" element={<MovePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sovereign" element={<SovereignPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/mission-values" element={<MissionValuesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/aspiration" element={<AspirationPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/events-news" element={<EventsNewsPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/approach" element={<ApproachPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </BrowserRouter>
      </SanityDataProvider>
    </LanguageProvider>
  );
}

export default App;
