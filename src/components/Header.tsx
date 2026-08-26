import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, User, Mail } from "lucide-react";
import Logo from "./Logo";
import { useSanityData } from "../contexts/SanityDataContext";
import { optimizedUrl } from "../services/sanity";
import { useLanguage } from "../contexts/LanguageContext";
import Flag from "react-world-flags";
import { motion, AnimatePresence } from "framer-motion";
import SubscriptionModal from "./SubscriptionModal";

const languages = [
  { code: "en", label: "English", flag: "GB" },
  { code: "fr", label: "Français", flag: "FR" },
] as const;

// ─── Nav item with roll-text hover ────────────────────────────────────────────

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        className="group relative block overflow-hidden h-[1.6em] text-[11px] font-bold uppercase tracking-widest"
      >
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-full text-slate-700">
          {label}
        </span>
        <span className="absolute inset-0 translate-y-full text-brand-blue transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0">
          {label}
        </span>
      </a>
    </li>
  );
}

// ─── About Us Dropdown Menu ────────────────────────────────────────────

function AboutUsDropdown({ label, language }: { label: string; language: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const subItems = language === 'fr'
    ? [
        { label: "Notre Direction", href: "/leadership" },
        { label: "Raison d'être, Mission & Valeurs", href: "/mission-values" },
        { label: "Notre Histoire", href: "/history" },
        { label: "Nos Aspirations", href: "/aspiration" },
        { label: "Notre Gouvernance", href: "/governance" },
      ]
    : [
        { label: "Firm Leadership", href: "/leadership" },
        { label: "Purpose, Mission & Values", href: "/mission-values" },
        { label: "Our History", href: "/history" },
        { label: "Our Aspiration", href: "/aspiration" },
        { label: "Our Governance", href: "/governance" },
      ];

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors py-1 ${
          open
            ? "text-brand-blue border-b-2 border-brand-blue"
            : "text-slate-700 hover:text-brand-blue"
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180 text-brand-blue" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-72 bg-[#061521] border border-white/15 rounded-sm shadow-2xl overflow-hidden py-3 z-50 text-white"
          >
            <div className="px-6 py-1.5 border-b border-white/10 mb-2">
              <span className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold">
                {language === 'fr' ? 'À propos d\'Azul Tech' : 'About Azul Tech'}
              </span>
            </div>
            {subItems.map((subItem) => (
              <a
                key={subItem.label}
                href={subItem.href}
                className="block px-6 py-2.5 text-sm font-serif text-white/80 hover:text-brand-blue hover:bg-white/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                {subItem.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAboutOpen, setDrawerAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { navbar } = useSanityData();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoUrl = navbar?.logo ? optimizedUrl(navbar.logo, { width: 220, quality: 90 }) : null;
  const currentLang = languages.find(l => l.code === language) || languages[0];

  const defaultNavItems = language === 'fr'
    ? [
        { label: "Accueil", href: "/" },
        { label: "À propos", href: "#about-dropdown" },
        { label: "Architecture", href: "/architecture" },
        { label: "Réalisations", href: "/work" },
        { label: "Événements & Actualités", href: "/events-news" },
        { label: "Approche", href: "/approach" },
        { label: "Contact", href: "/contact" }
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "#about-dropdown" },
        { label: "Architecture", href: "/architecture" },
        { label: "Work", href: "/work" },
        { label: "Events & News", href: "/events-news" },
        { label: "Approach", href: "/approach" },
        { label: "Contact", href: "/contact" }
      ];

  const navItems = defaultNavItems;

  const aboutSubItems = language === 'fr'
    ? [
        { label: "Notre Direction", href: "/leadership" },
        { label: "Raison d'être, Mission & Valeurs", href: "/mission-values" },
        { label: "Notre Histoire", href: "/history" },
        { label: "Nos Aspirations", href: "/aspiration" },
        { label: "Notre Gouvernance", href: "/governance" },
      ]
    : [
        { label: "Firm Leadership", href: "/leadership" },
        { label: "Purpose, Mission & Values", href: "/mission-values" },
        { label: "Our History", href: "/history" },
        { label: "Our Aspiration", href: "/aspiration" },
        { label: "Our Governance", href: "/governance" },
      ];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-100 shadow-sm py-4"
      >
        <div className="container-editorial">
          <nav className="flex items-center justify-between" aria-label="Main navigation">

            {/* Left: Hamburger menu button + Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 border-r border-slate-200 pr-4 mr-4 text-slate-800 hover:text-brand-blue transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Open sidebar menu"
              >
                <Menu size={22} />
              </button>

              <motion.a
                href="/"
                className="flex items-center flex-shrink-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                {logoUrl ? (
                  <img src={logoUrl} alt="Azul Tech" className="w-28 h-auto" loading="eager" decoding="async" />
                ) : (
                  <Logo className="w-28 h-auto text-slate-900" />
                )}
              </motion.a>
            </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item: any) => {
              const isAbout = item.href === "#about-dropdown" || item.label.toLowerCase().includes("about") || item.label.toLowerCase().includes("à propos");
              if (isAbout) {
                return <AboutUsDropdown key={item.label} label={item.label} language={language} />;
              }
              return <NavItem key={item.label} label={item.label} href={item.href} />;
            })}
          </ul>

          {/* Language selector */}
          <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-700 hover:text-brand-blue transition-colors"
              >
                <Flag code={currentLang.flag} className="w-4 h-auto rounded-sm" />
                {currentLang.code.toUpperCase()}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden py-1"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangDropdownOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                          language === lang.code
                            ? "bg-slate-50 text-brand-blue font-bold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue"
                        }`}
                      >
                        <Flag code={lang.flag} className="w-4 h-auto rounded-sm" />
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 w-full bg-white text-slate-900 shadow-2xl border-t border-slate-100 overflow-hidden"
          >
            <div className="container-editorial py-10 flex flex-col gap-4">
              {navItems.map((item: any, i: number) => {
                const isAbout = item.href === "/about" || item.label.toLowerCase().includes("about") || item.label.toLowerCase().includes("à propos");
                
                if (isAbout) {
                  return (
                    <div key={item.label} className="flex flex-col">
                      <button
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                        className="flex items-center justify-between text-lg font-serif font-bold text-slate-900 hover:text-brand-blue px-4 py-2"
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={18} className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileAboutOpen && (
                        <div className="pl-8 flex flex-col gap-2 py-2 border-l-2 border-brand-blue/30 ml-4 my-1">
                          {aboutSubItems.map(sub => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              className="text-sm font-serif text-slate-600 hover:text-brand-blue py-1"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="text-lg font-serif font-bold text-slate-900 hover:text-brand-blue transition-colors px-4 py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between px-4">
                <span className="text-[10px] font-technical uppercase tracking-widest text-slate-400">Language</span>
                <div className="flex gap-4">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                      className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${
                        language === lang.code ? "text-brand-blue" : "text-slate-600"
                      }`}
                    >
                      <Flag code={lang.flag} className="w-4 h-auto rounded-sm shadow-sm" />
                      {lang.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.header>

      {/* Left Sidebar Drawer Panel */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#061521] text-white shadow-2xl z-[101] flex flex-col justify-between overflow-y-auto border-r border-white/10"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                  <Logo className="w-24 h-auto text-white" />
                </div>

                {/* Items */}
                <div className="py-2 flex flex-col">
                  <a
                    href="/architecture"
                    className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors border-b border-white/5"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Architecture & Layers</span>
                    <ChevronRight size={16} className="text-white/40" />
                  </a>

                  <a
                    href="/#layers"
                    className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors border-b border-white/5"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Capabilities & Stack</span>
                    <ChevronRight size={16} className="text-white/40" />
                  </a>

                  <a
                    href="/#layers"
                    className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors border-b border-white/5"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Tech & AI</span>
                  </a>

                  <a
                    href="/events-news"
                    className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors border-b border-white/5"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Our Insights & Media</span>
                    <ChevronRight size={16} className="text-white/40" />
                  </a>

                  <a
                    href="/#careers"
                    className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors border-b border-white/5"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Careers</span>
                    <ChevronRight size={16} className="text-white/40" />
                  </a>

                  <div className="flex flex-col border-b border-white/5">
                    <button
                      onClick={() => setDrawerAboutOpen(!drawerAboutOpen)}
                      className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors text-left w-full cursor-pointer"
                    >
                      <span>About Us</span>
                      <ChevronRight
                        size={16}
                        className={`text-white/40 transition-transform ${drawerAboutOpen ? "rotate-90 text-brand-blue" : ""}`}
                      />
                    </button>
                    {drawerAboutOpen && (
                      <div className="bg-white/5 py-2 pl-10 pr-6 flex flex-col gap-2">
                        <a href="/leadership" className="text-sm font-serif text-white/70 hover:text-brand-blue py-1" onClick={() => setDrawerOpen(false)}>Firm Leadership</a>
                        <a href="/mission-values" className="text-sm font-serif text-white/70 hover:text-brand-blue py-1" onClick={() => setDrawerOpen(false)}>Purpose, Mission & Values</a>
                        <a href="/history" className="text-sm font-serif text-white/70 hover:text-brand-blue py-1" onClick={() => setDrawerOpen(false)}>Our History</a>
                        <a href="/aspiration" className="text-sm font-serif text-white/70 hover:text-brand-blue py-1" onClick={() => setDrawerOpen(false)}>Our Aspiration</a>
                        <a href="/governance" className="text-sm font-serif text-white/70 hover:text-brand-blue py-1" onClick={() => setDrawerOpen(false)}>Our Governance</a>
                      </div>
                    )}
                  </div>

                  <a
                    href="/events-news"
                    className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors border-b border-white/5"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Azul Tech Dispatch</span>
                  </a>

                  <a
                    href="/sovereign"
                    className="flex items-center justify-between px-6 py-4 text-base font-serif font-bold text-white/90 hover:text-brand-blue hover:bg-white/5 transition-colors bg-white/5"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span className="underline font-bold text-brand-blue">Sovereign Systems</span>
                    <ChevronRight size={16} className="text-brand-blue" />
                  </a>
                </div>
              </div>

              {/* Footer Links */}
              <div className="p-6 border-t border-white/10 space-y-4 bg-[#040D14]">
                <button
                  onClick={() => { setDrawerOpen(false); setSubModalOpen(true); }}
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-brand-blue transition-colors w-full text-left cursor-pointer"
                >
                  <User size={18} className="text-brand-blue" />
                  <span>Partner Sign In</span>
                </button>

                <button
                  onClick={() => { setDrawerOpen(false); setSubModalOpen(true); }}
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-brand-blue transition-colors w-full text-left cursor-pointer"
                >
                  <Mail size={18} className="text-brand-blue" />
                  <span>Email Subscriptions</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SubscriptionModal
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
      />
    </>
  );
}
