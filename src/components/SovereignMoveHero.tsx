import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Search, Menu, X, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Layers } from 'lucide-react';
import Logo from './Logo';
import SubscriptionModal from './SubscriptionModal';
import IntroMotionGraphic, { RUNTIME_MS as INTRO_MS } from './IntroMotionGraphic';
import { formatRuntime } from './MotionGraphicPlayer';
import { useLanguage } from '../contexts/LanguageContext';
import officeLounge from '../assets/azul_office_lounge.png';
import ceoInterview from '../assets/azul_ceo_interview_1776857294654.png';

const moveTranslations: Record<string, any> = {
  en: {
    firmLabel: "SOVEREIGN DIGITAL INFRASTRUCTURE FIRM",
    heroLine1: "What's your next",
    heroLine2: "sovereign move?",
    watchVideo: "Watch Video",
    footerLabel: "AZUL TECH • SYSTEM ARCHITECTURE & INTEGRATION",
    mckinseyDesc: "Game-changing work. Sovereign systems and AI powering growth. At Azul Tech, we help you think bigger, build stronger, and expand opportunity for all.",
    execBriefing: "EXECUTIVE BRIEFING",
    execTitle: "Digital Public Infrastructure: The Sovereign Rails",
    nationalDeploy: "NATIONAL DEPLOYMENT",
    nationalTitle: "Civil Registration Archives & AI Indexing",
    insightsLabel: "INSIGHTS & RESEARCH",
    insightsTitle: "Lessons from our alliances: What national DPI deployments can teach CEOs about rewiring for AI",
    insightsDesc: "How governments across Africa are combining sovereign data rails, open API specifications, and conversational AI to transform public service delivery.",
    readReport: "Read Report →",
    roadmapLabel: "ENGAGEMENT ROADMAP",
    roadmapTitle: "Scheduled Infrastructure Workflow",
    roadmapDesc: "Our structured, 4-phase deployment methodology guarantees secure, audit-ready digital public infrastructure delivered on clear institutional schedules.",
    deliverables: "Scheduled Deliverables:",
    searchPlaceholder: "Search Azul Tech architectures, projects, dispatches...",
    searchNoResults: "No matching results found.",
    phases: [
      { phase: "PHASE 01", title: "Discovery & System Architecture", timeline: "Weeks 1 — 4", tag: "Strategic Assessment", description: "In-depth audit of existing national registries, legacy databases, data protection compliance, and inter-agency workflows.", deliverables: ["National DPI Audit & Gap Analysis", "Target Reference Architecture (5 Sovereign Layers)", "Data Sovereignty & Security Compliance Matrix"] },
      { phase: "PHASE 02", title: "Protocol Lab Reference Blueprinting", timeline: "Weeks 5 — 10", tag: "Specification Design", description: "Engineering open, auditable, zero-trust protocols for identity, payments, entitlements, and cross-border interoperability.", deliverables: ["Sovereign Stack Reference Codebase", "API Contracts & Data Rail Interoperability Spec", "Sandbox Environment for Agency Testing"] },
      { phase: "PHASE 03", title: "Core System Integration & Data Rails", timeline: "Weeks 11 — 20", tag: "Engineered Integration", description: "Deploying high-availability infrastructure across ministries, digitizing archives via AI, and establishing real-time data exchange.", deliverables: ["Civil Record Digitization & AI Indexing Engine", "Encrypted Cross-Ministry Data Exchange Rails", "Hardware-Backed Security & HSM Key Management"] },
      { phase: "PHASE 04", title: "Nation-Scale Deployment & AI Governance", timeline: "Weeks 21 — 32", tag: "Institutional Handover", description: "Full production launch, training national engineers, enabling AI conversational voicebots, and operationalizing 24/7 oversight.", deliverables: ["Live Production Rollout across All Administrative Sectors", "Conversational AI Voicebot / Chatbot Integration (TUNGA AI)", "Continuous Audit & Executive Decision Dashboards"] },
    ],
    searchResults: [
      { title: "Civil Registration Archives Digitization", category: "Project Portfolio", link: "/work" },
      { title: "The Azul Stack — 5 Sovereign Layers", category: "Architecture", link: "/architecture" },
      { title: "MINAGRI Knowledge Hub & TUNGA AI", category: "Data Systems & AI", link: "/work" },
      { title: "6-Nation Road Safety Data Network", category: "Regional Protocol", link: "/work" },
      { title: "Company Profile & Firm Leadership", category: "About Us", link: "/leadership" },
    ],
  },
  fr: {
    firmLabel: "ENTREPRISE D'INFRASTRUCTURE NUMÉRIQUE SOUVERAINE",
    heroLine1: "Quel est votre prochain",
    heroLine2: "mouvement souverain?",
    watchVideo: "Regarder la vidéo",
    footerLabel: "AZUL TECH • ARCHITECTURE SYSTÈME & INTÉGRATION",
    mckinseyDesc: "Un travail révolutionnaire. Systèmes souverains et IA alimentant la croissance. Chez Azul Tech, nous vous aidons à penser plus grand, construire plus fort et élargir les opportunités pour tous.",
    execBriefing: "BRIEFING EXÉCUTIF",
    execTitle: "Infrastructure Publique Numérique: Les Rails Souverains",
    nationalDeploy: "DÉPLOIEMENT NATIONAL",
    nationalTitle: "Archives d'État Civil & Indexation IA",
    insightsLabel: "ANALYSES & RECHERCHE",
    insightsTitle: "Leçons de nos alliances: ce que les déploiements DPI nationaux peuvent enseigner aux PDG sur la refonte pour l'IA",
    insightsDesc: "Comment les gouvernements à travers l'Afrique combinent rails de données souverains, spécifications API ouvertes et IA conversationnelle pour transformer la prestation de services publics.",
    readReport: "Lire le rapport →",
    roadmapLabel: "FEUILLE DE ROUTE D'ENGAGEMENT",
    roadmapTitle: "Flux de Travail d'Infrastructure Planifié",
    roadmapDesc: "Notre méthodologie de déploiement structurée en 4 phases garantit une infrastructure publique numérique sécurisée et prête pour l'audit, livrée selon des calendriers institutionnels clairs.",
    deliverables: "Livrables planifiés:",
    searchPlaceholder: "Rechercher architectures, projets, dispatches Azul Tech...",
    searchNoResults: "Aucun résultat correspondant trouvé.",
    phases: [
      { phase: "PHASE 01", title: "Découverte & Architecture Système", timeline: "Semaines 1 — 4", tag: "Évaluation Stratégique", description: "Audit approfondi des registres nationaux existants, bases de données héritées, conformité à la protection des données et flux de travail inter-agences.", deliverables: ["Audit DPI National & Analyse des Lacunes", "Architecture de Référence Cible (5 Couches Souveraines)", "Matrice de Conformité Souveraineté des Données & Sécurité"] },
      { phase: "PHASE 02", title: "Blueprinting de Référence Protocol Lab", timeline: "Semaines 5 — 10", tag: "Conception de Spécifications", description: "Ingénierie de protocoles ouverts, auditables, à confiance zéro pour l'identité, les paiements, les droits et l'interopérabilité transfrontalière.", deliverables: ["Code de Référence Sovereign Stack", "Spécifications de Contrats API & Interopérabilité Data Rail", "Environnement Sandbox pour Tests Agence"] },
      { phase: "PHASE 03", title: "Intégration Système Central & Data Rails", timeline: "Semaines 11 — 20", tag: "Intégration Ingénierisée", description: "Déploiement d'infrastructure haute disponibilité across les ministères, numérisation des archives via IA, et établissement d'échange de données en temps réel.", deliverables: ["Numérisation d'État Civil & Moteur d'Indexation IA", "Rails d'Échange de Données Inter-Ministères Chiffrés", "Sécurité Matérialisée & Gestion de Clés HSM"] },
      { phase: "PHASE 04", title: "Déploiement à l'Échelle Nationale & Gouvernance IA", timeline: "Semaines 21 — 32", tag: "Transfert Institutionnel", description: "Lancement en production complète, formation des ingénieurs nationaux, activation de voicebots conversationnels IA, et opérationnalisation de supervision 24/7.", deliverables: ["Déploiement en Production dans Tous les Secteurs Administratifs", "Intégration Voicebot / Chatbot IA Conversationnel (TUNGA AI)", "Tableaux de Bord d'Audit Continu & de Décision Exécutive"] },
    ],
    searchResults: [
      { title: "Numérisation des Archives d'État Civil", category: "Portefeuille Projets", link: "/work" },
      { title: "La Pile Azul — 5 Couches Souveraines", category: "Architecture", link: "/architecture" },
      { title: "Centre de Connaissances MINAGRI & TUNGA AI", category: "Systèmes de Données & IA", link: "/work" },
      { title: "Réseau de Données Sécurité Routière à 6 Nations", category: "Protocole Régional", link: "/work" },
      { title: "Profil d'Entreprise & Direction", category: "À propos", link: "/leadership" },
    ],
  },
  rw: {
    firmLabel: "ISHURI RY'UBUKORIKORE BWA DIGITAL",
    heroLine1: "Ni iki gikorwa",
    heroLine2: "gikurikira?",
    watchVideo: "Reba video",
    footerLabel: "AZUL TECH • UBUKORIKORE BWA SISTEMU N'IBYIZA",
    mckinseyDesc: "Akazi gakoroha. Sisteme z'ubuyobozi n'ubwenge bihuza ukwiyegera. Ku Azul Tech, dutegereza gukura, gukomeza, no kwagura amahirwe ku bose.",
    execBriefing: "AMABWIRIZA Y'ABAYOBOZI",
    execTitle: "Ubukorikore bw'Imibanire y'Abaturage: Inzira z'Ubuyobozi",
    nationalDeploy: "GUSHYIRA MU BIKORWA",
    nationalTitle: "Amateka y'Ibikorwa n'Iyandika rya AI",
    insightsLabel: "ISESENGURA N'UBURYO",
    insightsTitle: "Amateka y'ubufatanye: Ibyo ibikorwa bya DPI mu bihugu bigenewe abayobozi bishobora kubwigisha",
    insightsDesc: "Uburyho abuyobozi bw'Afrika buhuza inzira z'amakuru z'ubuyobozi, amategeko y'IPI, n'ubwenge bw'ikoranabuhanga mu guhindura ubwitange bw'ibikorwa by'abaturage.",
    readReport: "Soma raporo →",
    roadmapLabel: "INZIRA Y'IBIKORWA",
    roadmapTitle: "Ibikorwa by'Imbanire Bwigengewe",
    roadmapDesc: "Uburyo bwacu bwa gatatu bw'ibikorwa bushyira mu bikorwa bushimangira imibanire y'ibintu irinda kandi igezwa mu bikorwa by'ingenzi mu bihe byerekejwe.",
    deliverables: "Ibintu bisabwa:",
    searchPlaceholder: "Rondera ubukorikore, ibikorwa, amakuru ya Azul Tech...",
    searchNoResults: "Nta bintu bihambaye birabonetse.",
    phases: [
      { phase: "PHASE 01", title: "Kumenya n'Ubukorikore bwa Sistemu", timeline: "Ibiciro 1 — 4", tag: "Isesengura ry'Intumbero", description: "Isesengura ry'ibikorwa by'ibanze, amateka y'ibintu, n'uburango bw'ibintu by'abanyamuryango.", deliverables: ["Isesengura ry'DPI y'Igihugu", "Ubukorikore bw'Ibintu (Ibice 5)", "Uburyo bw'Ibanga n'Ubwenge"] },
      { phase: "PHASE 02", title: "Kubaka Inzira y'Itegeko", timeline: "Ibiciro 5 — 10", tag: "Kubaka Amategeko", description: "Kubaka protocole zifunguye, zishobora kwiperera, zidafite icyizere kuri identite, ubwishyu, ubwisungane, n'ubufatanye.", deliverables: ["Inzira y'Ibintu", "Amategeko y'IPI n'Ubufatanye", "Ahantu h'ibigereranyo"] },
      { phase: "PHASE 03", title: "Kwiza Sistemu n'Inzira z'Amakuru", timeline: "Ibiciro 11 — 20", tag: "Kwiza mu Bintu", description: "Gushyira imibanire y'ibintu mu mahutiro yose, gukora amateka mu bwenge, no gukora amakuru mu gihe nyawo.", deliverables: ["Kubika Amateka n'Igicaro cya AI", "Inzira z'Amakuru z'Uburyo", "Ubukorikore bw'Ibanga n'Amabanga"] },
      { phase: "PHASE 04", title: "Gushyira mu Bikorwa no Kubuyoboza AI", timeline: "Ibiciro 21 — 32", tag: "Gutanga mu Bintu", description: "Gutangira ibikorwa byose, guhugura abakoresha, gukoresha AI, no gukora ubuyobozi bw'igihe cose.", deliverables: ["Gushyira mu Bikorwa mu Mishinga Yose", "Guhuza AI (TUNGA AI)", "Amategeko y'Igiciro n'Ibintu"] },
    ],
    searchResults: [
      { title: "Kubika Amateka y'Ibikorwa", category: "Ibikorwa", link: "/work" },
      { title: "Ibice by'Azul — Ibice 5", category: "Ubukorikore", link: "/architecture" },
      { title: "Ikigo cya MINAGRI & TUNGA AI", category: "Amakuru n'AI", link: "/work" },
      { title: "Urubuga rw'Amahugurwa y'Imodoka mu Bihugu 6", category: "Protocole y'Akarunga", link: "/work" },
      { title: "Umwirondoro w'Ikigo n'Ubuyobozi", category: "Tweekize", link: "/leadership" },
    ],
  },
  sw: {
    firmLabel: "TAASISI YA MIUNDOMBINU YA KIDIJITALI YA KITAIFA",
    heroLine1: "Ni nini hatua yako",
    heroLine2: "ya kitaifa?",
    watchVideo: "Tazama video",
    footerLabel: "AZUL TECH • MIUNDOMBINU YA MFUMO NA UJUMUISHAJI",
    mckinseyDesc: "Kazi inayobadilisha. Mifumo ya kitaifa na akili inayowezesha ukuaji. Katika Azul Tech, tunakusaidia kufikiri kwa ukubwa, kujenga kwa nguvu, na kupanua fursa kwa wote.",
    execBriefing: "TAARIFA KWA VIONGOZI",
    execTitle: "Miundombinu ya Umma ya Kidijitali: Njia za Kitaifa",
    nationalDeploy: "UTEKELEZAJI WA KITAIFA",
    nationalTitle: "Hifadhi za Usajili wa Raia & Uwekeshaji wa AI",
    insightsLabel: "UCHAMBUZI NA UTAFITI",
    insightsTitle: "Mafunzo kutoka ushirikiano wetu: kinachoweza kufundisha CEO kuhusu mabadiliko ya AI",
    insightsDesc: "Jinsi viongozi wa Afrika wanavyochanganya njia za data za kitaifa, viwango vya API wazi, na AI ya mazungumzo kubadilisha utoaji wa huduma za umma.",
    readReport: "Soma ripoti →",
    roadmapLabel: "RAMANI YA UPATIKANAJI",
    roadmapTitle: "Mtindo wa Kazi wa Miundombinu Ilipangwa",
    roadmapDesc: "Mbinu yetu iliyopangwa ya hatua 4 ya utekelezaji inahakikisha miundombinu ya umma ya kidijitali salama na tayari kukaguliwa, inayotolewa kulingana na ratiba za taasisi wazi.",
    deliverables: "Vitu vilivyopangwa:",
    searchPlaceholder: "Tafuta miundombinu, miradi, taarifa za Azul Tech...",
    searchNoResults: "Hakuna matokeo yanayolingana.",
    phases: [
      { phase: "PHASE 01", title: "Ugunduzi na Miundombinu ya Mfumo", timeline: "Wiki 1 — 4", tag: "Tathmini ya Kimkakati", description: "Uchambuzi wa kina wa orodha za kitaifa zilizo poa, hifadhidata za urithi, ubora wa ulinzi wa data, na mitindo ya kazi ya kati ya mashirika.", deliverables: ["Uchambuzi wa DPI ya Kitaifa na Uchambuzi wa Mapengo", "Miundombinu ya Malengo (Tabaka 5 za Kitaifa)", "Jedwali la Ulinganifu wa Ulinzi wa Data na Usalama"] },
      { phase: "PHASE 02", title: "Uchoraji ramani wa Malengo ya Protocol Lab", timeline: "Wiki 5 — 10", tag: "Usanidi wa Viwango", description: "Uhandisi wa itifaa wazi, zinazoweza kukaguliwa, zenye sifuri ya kujiamini kwa utambulisho, malipo, haki, na uwezeshaji wa kikanda.", deliverables: ["Msingi wa Marejeo ya Sovereign Stack", "Mikataba ya API na Uwezeshaji wa Data Rail", "Mazingira ya Sandbox kwa Majaribio ya Wakala"] },
      { phase: "PHASE 03", title: "Ujumishaji wa Mfumo Mkuu na Data Rails", timeline: "Wiki 11 — 20", tag: "Ujumishaji wa Uhandisi", description: "Kutenga miundombinu ya upatikanaji mkubwa katika wizara, kuhifadhi kwa AI, na kuanzisha ubadilishaji wa data wakati halisi.", deliverables: ["Ureheshaji wa Rekodi za Raia na injini ya Uwekeshaji wa AI", "Data Rails za Ubadilishaji wa Wizara Kati zilizosimbwa", "Ulinzi Unaotegemea Vifaa na Usimamizi wa Ufunguo wa HSM"] },
      { phase: "PHASE 04", title: "Utekelezaji wa Kiwango cha Taifa na Uongozi wa AI", timeline: "Wiki 21 — 32", tag: "Ukabidhani wa Taasisi", description: "Kuzinduliwa kamili kwa uzalishaji, kufundisha waendeshaji wa kitaifa, kuwezesha voicebots za AI za mazungumzo, na kuendesha uangalizi wa masaa 24/7.", deliverables: ["Kutekelezwa kwa Uzalishaji Katika Sekta Zote za Utawala", "Ujumuishaji wa Voicebot / Chatbot ya AI (TUNGA AI)", "Dashibodi za Uchambuzi Endelevu na Maamuzi ya Uongozi"] },
    ],
    searchResults: [
      { title: "Ureheshaji wa Hifadhi za Usajili wa Raia", category: "Projekti", link: "/work" },
      { title: "Mfumo wa Azul — Tabaka 5 za Kitaifa", category: "Miundombinu", link: "/architecture" },
      { title: "Kituo cha Maarifa cha MINAGRI & TUNGA AI", category: "Data na AI", link: "/work" },
      { title: "Mtandao wa Data ya Usalama wa Barabara za Nchi 6", category: "Itifaa ya Kikanda", link: "/work" },
      { title: "Wasifu wa Kampuni na Uongozi", category: "Kuhusu Sisi", link: "/leadership" },
    ],
  },
};

interface SovereignMoveHeroProps {
  onOpenDrawer?: () => void;
}

export default function SovereignMoveHero({ onOpenDrawer }: SovereignMoveHeroProps) {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [watchModalOpen, setWatchModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhase, setActivePhase] = useState(0);
  const { language } = useLanguage();
  const t = moveTranslations[language] || moveTranslations.en;

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.play();
        setIsVideoPaused(false);
      } else {
        videoRef.current.pause();
        setIsVideoPaused(true);
      }
    }
  };

  const handleArrowClick = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setWatchModalOpen(true);
    }
  };

  const workflowPhases = t.phases;

  const searchResults = t.searchResults.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="relative bg-[#040D14] text-white">
      {/* ── CINEMATIC FULLSCREEN HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden">
        {/* Background Video Stream with Fallback Gradient */}
        <div className="absolute inset-0 z-0 bg-[#040D14]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover opacity-50 filter brightness-75 contrast-110"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-data-center-server-racks-41525-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040D14] via-[#040D14]/40 to-[#040D14]/60" />
        </div>

        {/* Minimal Transparent Top Header Bar (McKinsey Style) */}
        <header className="relative z-20 flex items-center justify-between px-8 lg:px-16 py-8 border-b border-white/10 backdrop-blur-xs">
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenDrawer}
              className="p-2 border-r border-white/20 pr-6 text-white hover:text-brand-blue transition-colors flex items-center gap-2 cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <a href="/">
              <Logo className="w-32 h-auto text-white" />
            </a>
          </div>

          <div className="flex items-center gap-8 text-xs font-technical uppercase tracking-widest text-white/90">
            <button
              onClick={() => setSubModalOpen(true)}
              className="hover:text-brand-blue transition-colors hidden sm:block cursor-pointer font-bold"
            >
              Sign In
            </button>
            <span className="text-white/30 hidden sm:block">|</span>
            <button
              onClick={() => setSubModalOpen(true)}
              className="hover:text-brand-blue transition-colors cursor-pointer font-bold"
            >
              Subscribe
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white hover:text-brand-blue transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </header>

        {/* Center Giant Hero Headline */}
        <div className="relative z-20 container-editorial my-auto text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="text-[11px] font-technical text-brand-blue uppercase tracking-[0.4em] font-bold mb-6">
              {t.firmLabel}
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-10 leading-[1.05] tracking-tight">
              {t.heroLine1} <br />
              <span className="italic font-normal text-gradient-brand">{t.heroLine2}</span>
            </h1>

            {/* Watch Video & Circular Arrow Button Row */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => setWatchModalOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#040D14" }}
                whileTap={{ scale: 0.96 }}
                className="bg-white text-brand-midnight font-technical text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-colors cursor-pointer"
              >
                <span>{t.watchVideo} · {formatRuntime(INTRO_MS)}</span>
                <Play size={14} className="fill-current text-brand-midnight" />
              </motion.button>

              {/* McKinsey Circular Arrow Button ( → ) */}
              <motion.button
                onClick={handleArrowClick}
                whileHover={{ scale: 1.1, backgroundColor: "#0ECFFE", color: "#040D14" }}
                whileTap={{ scale: 0.92 }}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 shadow-2xl transition-all cursor-pointer group"
                aria-label="Scroll down to sovereign deployments & video"
              >
                <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Right Pause / Play Controls */}
        <div className="relative z-20 flex justify-between items-end px-8 lg:px-16 pb-8">
          <div className="text-[10px] font-technical text-white/50 uppercase tracking-widest hidden md:block">
            AZUL TECH • {t.footerLabel}
          </div>
          
          <button
            onClick={toggleVideo}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
            aria-label={isVideoPaused ? "Play background video" : "Pause background video"}
          >
            {isVideoPaused ? <Play size={18} className="fill-current" /> : <Pause size={18} />}
          </button>
        </div>
      </section>

      {/* ── MCKINSEY FEATURE SHOWCASE SECTION (media_1787835629299.png) ────────── */}
      <section id="mckinsey-feature-section" ref={videoSectionRef} className="py-24 bg-[#040D14] border-t border-white/10 relative">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Title, Subtitle, Circular Arrow Button ( → ), Video Cards */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                  {t.heroLine1} <br />
                  <span className="italic font-normal text-gradient-brand">{t.heroLine2}</span>
                </h2>

                <div className="flex items-center gap-6">
                  <p className="text-white/70 text-base md:text-lg max-w-xl font-serif leading-relaxed">
                    {t.mckinseyDesc}
                  </p>

                  {/* McKinsey Circular Arrow Button ( → ) */}
                  <motion.button
                    onClick={() => setWatchModalOpen(true)}
                    whileHover={{ scale: 1.1, backgroundColor: "#0ECFFE", color: "#040D14" }}
                    whileTap={{ scale: 0.92 }}
                    className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 shadow-2xl transition-all cursor-pointer group"
                    aria-label="Launch video modal"
                  >
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  onClick={() => setWatchModalOpen(true)}
                  className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-brand-blue/40 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={ceoInterview}
                      alt="Digital Public Infrastructure"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-blue text-brand-midnight flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={18} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold block mb-1">
                      {t.execBriefing}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white group-hover:text-brand-blue transition-colors">
                      {t.execTitle}
                    </h4>
                  </div>
                </div>

                <div
                  onClick={() => setWatchModalOpen(true)}
                  className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-brand-blue/40 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={officeLounge}
                      alt="Civil Registration Archives"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-blue text-brand-midnight flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={18} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold block mb-1">
                      {t.nationalDeploy}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white group-hover:text-brand-blue transition-colors">
                      {t.nationalTitle}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Featured Blue Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-[#1D4ED8] to-[#1E3A8A] border border-blue-400/30 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px] group hover:border-blue-300/50 transition-all">
                <div>
                  <span className="text-[10px] font-technical text-blue-200 uppercase tracking-widest font-bold block mb-4">
                    {t.insightsLabel}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                    {t.insightsTitle}
                  </h3>
                  <p className="text-blue-100/80 text-sm leading-relaxed font-serif">
                    {t.insightsDesc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-400/20 flex items-center justify-between">
                  <span className="text-xs font-technical text-blue-200 uppercase tracking-wider font-bold">
                    {t.readReport}
                  </span>
                  <Sparkles size={20} className="text-blue-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Chatbot Badge (McKinsey Style) */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button
          onClick={() => setSubModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-brand-blue text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 hover:scale-105 transition-transform cursor-pointer group"
        >
          <Sparkles size={18} className="text-cyan-200 group-hover:rotate-12 transition-transform" />
          <div className="text-left leading-tight">
            <span className="text-[9px] font-technical uppercase tracking-widest block text-cyan-100 font-bold">
              Ask Azul Tech
            </span>
            <span className="text-xs font-serif font-bold">AI CHATBOT</span>
          </div>
        </button>
      </div>

      {/* ── SCHEDULED WORKFLOW ROADMAP SECTION ("Good Scheduled Workflow") ── */}
      <section className="py-28 bg-[#061521] border-t border-white/10 relative overflow-hidden">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] font-bold block mb-4">
                {t.roadmapLabel}
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white leading-tight">
                {t.roadmapTitle}
              </h2>
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed font-serif">
              {t.roadmapDesc}
            </p>
          </div>

          {/* Interactive Phase Timeline Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Scheduled Phase Tabs */}
            <div className="lg:col-span-5 space-y-4">
              {workflowPhases.map((item, idx) => (
                <div
                  key={item.phase}
                  onClick={() => setActivePhase(idx)}
                  className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    activePhase === idx
                      ? 'bg-brand-blue/15 border-brand-blue shadow-xl'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono font-bold ${activePhase === idx ? 'text-brand-blue' : 'text-white/40'}`}>
                      {item.phase}
                    </span>
                    <div>
                      <h4 className="text-base font-serif font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] font-technical text-white/50">{item.timeline}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className={`transition-transform ${activePhase === idx ? 'rotate-90 text-brand-blue' : 'text-white/30'}`} />
                </div>
              ))}
            </div>

            {/* Right Column: Active Phase Detail Card */}
            <div className="lg:col-span-7 bg-white/5 border border-white/15 rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-technical text-brand-blue uppercase tracking-widest font-bold">
                    {workflowPhases[activePhase].phase} • {workflowPhases[activePhase].tag}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mt-1">
                    {workflowPhases[activePhase].title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded border border-white/10 text-brand-blue">
                  {workflowPhases[activePhase].timeline}
                </span>
              </div>

              <p className="text-white/80 text-base leading-relaxed mb-8 font-serif">
                {workflowPhases[activePhase].description}
              </p>

              <div>
                <h5 className="text-xs font-technical text-brand-blue uppercase tracking-widest font-bold mb-4">
                  {t.deliverables}
                </h5>
                <div className="space-y-3">
                  {workflowPhases[activePhase].deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/40 p-4 rounded-lg border border-white/5">
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm font-serif text-white/90">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH MODAL OVERLAY ────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center pt-24 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[#061521] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 p-6 text-white"
            >
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <Search size={22} className="text-brand-blue" />
                <input
                  type="text"
                  autoFocus
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-lg text-white placeholder:text-white/40 focus:outline-none font-serif"
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/50 hover:text-white">
                  <X size={22} />
                </button>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((res) => (
                    <a
                      key={res.title}
                      href={res.link}
                      onClick={() => setSearchOpen(false)}
                      className="block p-4 rounded-lg bg-white/5 hover:bg-brand-blue/15 border border-white/5 hover:border-brand-blue/40 transition-colors"
                    >
                      <span className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold block mb-1">
                        {res.category}
                      </span>
                      <h4 className="text-base font-serif font-bold text-white">{res.title}</h4>
                    </a>
                  ))
                ) : (
                  <p className="text-white/40 text-sm py-8 text-center">{t.searchNoResults}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── WATCH VIDEO OVERLAY MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {watchModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWatchModalOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/20"
            >
              <button
                onClick={() => setWatchModalOpen(false)}
                className="absolute top-4 right-4 z-20 bg-black/60 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <X size={20} />
              </button>

              {watchModalOpen && <IntroMotionGraphic autoPlay />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── SUBSCRIPTION MODAL ──────────────────────────────────────────────── */}
      <SubscriptionModal
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
      />
    </div>
  );
}
