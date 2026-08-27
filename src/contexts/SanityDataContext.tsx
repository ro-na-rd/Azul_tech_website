import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getHeroData, getHomePageData } from '../services/sanity';
import { useLanguage } from './LanguageContext';

import officeLounge from '../assets/azul_office_lounge.png';
import bookMockup from '../assets/azul_book_mockup_1776857228483.png';
import networkNodes from '../assets/azul_network_nodes_1776857276664.png';
import serverInfra from '../assets/azul_server_infrastructure.png';
import ceoInterview from '../assets/azul_ceo_interview_1776857294654.png';
import discussionImg from '../assets/azul_discussion_1776857260684.png';
import teamKigali from '../assets/azul_team_kigali.png';
import manifestoCore from '../assets/manifesto-core.png';

interface SanityDataState {
  hero: any;
  layers: any[];
  layersLabel?: string;
  layersHeading?: any;
  layersDescription?: string;
  discussions: any[];
  discussionsLabel?: string;
  discussionsTitle?: any;
  discussionsSubtitle?: string;
  sovereign: any;
  approach: any;
  careers: any[];
  careersLabel?: string;
  careersHeading?: any;
  contact: any;
  footer: any;
  navbar: any;
  loading: boolean;
  error: Error | null;
}

const defaultEn = {
  hero: {
    title: "Building the rails of tomorrow's governments.",
    subtitle: "Azul Tech designs and builds the foundational systems that power e-Government and Digital Public Infrastructure across Africa and the Global South.",
    ctaText: "Contact Us",
    ctaLink: "contact",
    bentoCards: [
      {
        type: "Implementation",
        title: "Rwanda National Civil Records Digitization.",
        image: officeLounge,
        isTall: false
      },
      {
        type: "Health Protocol",
        title: "Yego Yacu — National Youth Health Platform",
        image: bookMockup,
        link: "https://app.ubuntuhealth.africa/",
        isTall: true
      },
      {
        type: "The Azul Stack",
        title: "Identity, Payments, Data, Intelligence: 5 Sovereign Layers",
        image: networkNodes,
        isTall: true
      },
      {
        type: "Regional Protocol",
        title: "6-Nation Road Safety Data Platform: Cross-border interoperability",
        image: serverInfra,
        isTall: false
      }
    ],
    interviewCard: {
      category: "Policy Analysis",
      title: "If the problem is structural, we want to hear it.",
      image: ceoInterview,
      series: "four"
    }
  },
  layers: [
    {
      title: "We Design",
      description: "Through Protocol Lab — an institution of Azul Tech — we design the reference architectures that governments adopt.",
      image: manifestoCore
    },
    {
      title: "We Build",
      description: "We are building a reputation as the legion that makes things happen. Tested architectures built for Africa and the Global South.",
      image: officeLounge
    },
    {
      title: "We Scale",
      description: "Infrastructure designed for one nation becomes the blueprint for many.",
      image: teamKigali
    },
    {
      title: "We Standardize",
      description: "What Azul Tech builds becomes protocol across Africa and beyond.",
      image: networkNodes
    }
  ],
  layersLabel: "WHAT WE DO",
  layersHeading: "We design. We build.",
  layersDescription: "Beyond theory. We are the legion that makes things happen — architects who build and builders who architect.",
  discussions: [
    {
      title: "Digital Public Infrastructure",
      category: "Policy Analysis",
      description: "The sovereign rails that governments put in place and orchestrate for digital transformation.",
      duration: "0.40",
      isFeatured: true,
      image: discussionImg,
      motionGraphic: "dpi"
    },
    {
      title: "e-Government & Civil Services",
      category: "Implementation",
      description: "The core service layer built above DPIs that connects citizens directly to digital governance.",
      duration: "10",
      isFeatured: false,
      image: officeLounge,
      link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
    },
    {
      title: "Kigali, Rwanda → The World",
      category: "Regional Protocol",
      description: "Born in Africa, built for the Global South. Our solutions are architected with the context of emerging markets at their core — not as an afterthought.",
      duration: "0.35",
      isFeatured: false,
      image: teamKigali,
      motionGraphic: "global-south"
    }
  ],
  discussionsLabel: "WHO WE ARE",
  discussionsTitle: "The architects of digital Africa.",
  discussionsSubtitle: "We are the builders who don't wait for the world to catch up. Azul Tech designs and constructs foundational infrastructure.\n\nWe are a sovereign digital public infrastructure firm.\nArchitecting and orchestrating the systems, standards, and AI that let governments own their data, their identity layer, and their institutional memory.\n\nSovereign systems. Trusted data. Citizen-centric services.\n\nLet's build the future together.",
  sovereign: {
    label: "Sovereign by Design",
    heading: "Designed for the continent, not just for markets.",
    description: "Every deployment becomes a reference architecture. Every engagement compounds the capability of an entire sector.",
    conventionalTitle: "\"Does the system work?\"",
    conventionalFeatures: [
      "Features shipped. Architecture assumed.",
      "Bespoke delivery. No compounding value.",
      "Security reviewed after launch.",
      "Developers who think in features.",
      "Value ends when the contract does."
    ],
    approachTitle: "\"Can another team build on this specification?\"",
    approachFeatures: [
      "Protocol-first design from the first commit",
      "Every deployment becomes a reference architecture",
      "Sovereign-grade security built in, not bolted on",
      "Architects who think in systems and standards",
      "Infrastructure that outlives any engagement"
    ],
    stats: [
      { icon: "Shield", label: "Sovereign Deployments", value: "47", suffix: "+" },
      { icon: "Network", label: "Reference Architectures", value: "Sovereign", suffix: "" },
      { icon: "TrendingUp", label: "Compounding Value", value: "100", suffix: "%" },
      { icon: "FileCheck", label: "Audit-Ready", value: "Always", suffix: "" }
    ],
    partnersLabel: "TRUSTED BY NATIONS",
    partnersDescription: "We partner with global leaders in infrastructure and security.",
    partners: ["ISO 27001", "AWS", "Microsoft", "Google Cloud"],
    ctaText: "Start the conversation!",
    ctaLink: "#contact"
  },
  approach: {
    label: "OUR APPROACH",
    heading: "Building for the Continent.",
    items: [
      { title: "Protocol-First", description: "Every line of code is written to scale across nations.", image: manifestoCore },
      { title: "Sovereign Security", description: "Built with national data sovereignty at the foundation.", image: networkNodes }
    ]
  },
  careers: [
    {
      title: "Join Azul Tech",
      label: "CAREERS",
      description: "Build the digital public infrastructure that powers Africa.",
      link: "#contact",
      image: teamKigali
    }
  ],
  careersLabel: "CAREERS",
  careersHeading: "Build the future of digital government with us.",
  contact: {
    label: "GET IN TOUCH",
    heading: "Let's build sovereign infrastructure together.",
    description: "Reach out to discuss reference architectures, deployments, or partnerships.",
    emails: ["hello@azultech.rw", "info@azultech.rw"],
    phones: ["+250 79 195 6617", "+250 78 856 1509"],
    locations: [{ name: "Kigali, Rwanda", address: "KG 17 Ave - KU Building 2nd Floor\nP.O Box 0040785150 - Kigali" }],
    services: [
      "Systems Architecture & Systems Integration",
      "National & Cross-border Digital Public Infrastructure",
      "Data Systems & AI",
      "Cybersecurity & Data Privacy Compliance",
      "Digitization & Automation"
    ],
    website: "www.azultech.africa"
  },
  footer: {
    description: "Azul Tech — Building Africa's Digital Infrastructure",
    navGroups: [
      { title: "Architecture", links: [{ label: "The Azul Stack", url: "#layers" }] },
      { title: "Company", links: [{ label: "Work", url: "#work" }, { label: "Contact", url: "#contact" }] }
    ],
    socials: { linkedin: "https://www.linkedin.com/company/azul-tech", twitter: "https://twitter.com/azul_tech", github: "#" },
    bottomLinks: [{ label: "Privacy Policy", url: "#" }, { label: "Terms of Service", url: "#" }]
  },
  navbar: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "#about-dropdown" },
      { label: "Architecture", href: "/architecture" },
      { label: "Work", href: "/work" },
      { label: "Events & News", href: "/events-news" },
      { label: "Approach", href: "/approach" },
      { label: "Contact", href: "/contact" }
    ]
  }
};

const defaultFr = {
  ...defaultEn,
  hero: {
    ...defaultEn.hero,
    title: "Nous élaborons les plans sur lesquels les nations bâtissent.",
    subtitle: "Une architecture de référence est la spécification à laquelle toute implémentation ultérieure doit se conformer.",
    ctaText: "Explorer la pile Azul"
  },
  layersLabel: "CE QUE NOUS FAISONS",
  layersHeading: "Nous concevons. Nous construisons.",
  layersDescription: "Au-delà de la théorie. Nous sommes la légion qui fait advenir les choses.",
  discussionsLabel: "DISCUSSIONS SOUVERAINES",
  discussionsTitle: "Les architectes de l'Afrique numérique.",
  careersLabel: "CARRIÈRES",
  careersHeading: "Construisez l'avenir du gouvernement numérique avec nous."
};

const initialState: SanityDataState = {
  hero: defaultEn.hero,
  layers: defaultEn.layers,
  layersLabel: defaultEn.layersLabel,
  layersHeading: defaultEn.layersHeading,
  layersDescription: defaultEn.layersDescription,
  discussions: defaultEn.discussions,
  discussionsLabel: defaultEn.discussionsLabel,
  discussionsTitle: defaultEn.discussionsTitle,
  discussionsSubtitle: defaultEn.discussionsSubtitle,
  sovereign: defaultEn.sovereign,
  approach: defaultEn.approach,
  careers: defaultEn.careers,
  careersLabel: defaultEn.careersLabel,
  careersHeading: defaultEn.careersHeading,
  contact: defaultEn.contact,
  footer: defaultEn.footer,
  navbar: defaultEn.navbar,
  loading: false,
  error: null,
};

const SanityDataContext = createContext<SanityDataState>(initialState);

export function SanityDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SanityDataState>(initialState);
  const { language } = useLanguage();

  const fetchAll = useCallback(async (lang: string) => {
    const fallback = lang === 'fr' ? defaultFr : defaultEn;
    try {
      const [hero, home] = await Promise.all([
        getHeroData(lang).catch(() => null),
        getHomePageData(lang).catch(() => null),
      ]);

      setState({
        hero: hero || fallback.hero,
        layers: (home?.layers?.layers && home.layers.layers.length > 0) ? home.layers.layers : fallback.layers,
        layersLabel: home?.layers?.layersLabel || fallback.layersLabel,
        layersHeading: home?.layers?.layersHeading || fallback.layersHeading,
        layersDescription: home?.layers?.layersDescription || fallback.layersDescription,
        discussions: (home?.discussions?.discussions && home.discussions.discussions.length > 0) ? home.discussions.discussions : fallback.discussions,
        discussionsLabel: home?.discussions?.discussionsLabel || fallback.discussionsLabel,
        discussionsTitle: home?.discussions?.discussionsTitle || fallback.discussionsTitle,
        discussionsSubtitle: home?.discussions?.discussionsSubtitle || fallback.discussionsSubtitle,
        sovereign: home?.sovereign || fallback.sovereign,
        approach: home?.approach || fallback.approach,
        careers: (home?.careers?.slides && home.careers.slides.length > 0) ? home.careers.slides : fallback.careers,
        careersLabel: home?.careers?.label || fallback.careersLabel,
        careersHeading: home?.careers?.heading || fallback.careersHeading,
        contact: home?.contact || fallback.contact,
        footer: home?.footer || fallback.footer,
        navbar: home?.navbar || fallback.navbar,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        ...fallback,
        loading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch data'),
      });
    }
  }, []);

  useEffect(() => {
    fetchAll(language);
  }, [language, fetchAll]);

  return (
    <SanityDataContext.Provider value={state}>
      {children}
    </SanityDataContext.Provider>
  );
}

export function useSanityData() {
  return useContext(SanityDataContext);
}
