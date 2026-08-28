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
      image: teamKigali
    },
    {
      title: "We Build",
      description: "We are building a reputation as the legion that makes things happen. Tested architectures built for Africa and the Global South.",
      image: serverInfra
    },
    {
      title: "We Scale",
      description: "Infrastructure designed for one nation becomes the blueprint for many.",
      image: networkNodes
    },
    {
      title: "We Standardize",
      description: "What Azul Tech builds becomes protocol across Africa and beyond.",
      image: manifestoCore
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
      duration: "1.10",
      isFeatured: false,
      image: officeLounge,
      motionGraphic: "egov"
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
      { title: "Protocol-First", description: "Every line of code is written to scale across nations.", image: teamKigali },
      { title: "Sovereign Security", description: "Built with national data sovereignty at the foundation.", image: serverInfra },
      { title: "Sovereign Culture", description: "A mission-driven environment where architects and policy experts collaborate.", image: discussionImg }
    ]
  },
  careers: [
    {
      title: "Engineering Excellence",
      label: "KIGALI TECH HUB",
      description: "Engineering high-throughput protocols and mission-critical systems that power the digital sovereignty of nations.",
      link: "#contact",
      image: teamKigali
    },
    {
      title: "Digital Backbone",
      label: "INFRASTRUCTURE",
      description: "Designing the secure, interoperable reference architectures that serve as the foundation for the continent's digital growth.",
      link: "#contact",
      image: discussionImg
    },
    {
      title: "Sovereign Culture",
      label: "OFFICE LIFE",
      description: "A mission-driven environment where architects and policy experts collaborate to build the future of African infrastructure.",
      link: "#contact",
      image: officeLounge
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

const defaultRw = {
  ...defaultEn,
  hero: {
    ...defaultEn.hero,
    title: "Dukora ibikorwa by'ubuyobozi bwa mr",
    subtitle: "Azul Tech yakora kandi yubake ibintu by'ibanze bibangikanya e-Government n'Ubukorikoringa bw'Imibanire y'Abaturage mu Bwenge bw'Igihugu ku Isi yose.",
    ctaText: "Tuvugishe",
    bentoCards: [
      { type: "Ikoreshwa", title: "Kubika amateka y'abaturage bo mu Rwanda.", image: officeLounge, isTall: false },
      { type: "Protocole y'Ubuzima", title: "Yego Yacu — Urubuga rw'Ubuzima bw'Abarongora", image: bookMockup, link: "https://app.ubuntuhealth.africa/", isTall: true },
      { type: "Ibice by'Azul", title: "Umwirondoro, Ubwishyu, Amakuru, Ubwenge: Ibice 5", image: networkNodes, isTall: true },
      { type: "Protocole y'Akarunga", title: "Urubuga rwa Amahugurwa y'Imodoka mu Bihugu 6", image: serverInfra, isTall: false }
    ],
    interviewCard: {
      category: "Isesengura ry'Amategeko",
      title: "Niba ikibazo gihambaye, tuzi gutega.",
      image: ceoInterview,
      series: "four"
    }
  },
  layers: [
    { title: "Dukora", description: "Twerkisha imiterere y'ibintu abuyobozi bwemera.", image: teamKigali },
    { title: "Twubaka", description: "Twubaka ubwisungane bw'ibikorwa by'emewe mu Bwenge bw'Igihugu n'Isi yose.", image: serverInfra },
    { title: "Dukwiza", description: "Imibanire yakozwe y'igihugu kimwe igira inzira y'ibihugu byinshi.", image: networkNodes },
    { title: "Dutegeka", description: "Ibyo Azul Tech yakora bigira protocole mu Bwenge bw'Igihugu no hanze.", image: manifestoCore }
  ],
  layersLabel: "IBIKO NIHO",
  layersHeading: "Dukora. Twubaka.",
  layersDescription: "Hejuru y'ibitekerezo. Twamwe mu gukorera aho ibintu bigenda.",
  discussions: [
    { title: "Ubukorikoringa bw'Imibanire y'Abaturage", category: "Isesengura ry'Amategeko", description: "Inzira z'ubuyobozi abuyobozi bwemerera kugira ngo bahindure ubwenge bw'ibikorwa.", duration: "0.40", isFeatured: true, image: discussionImg, motionGraphic: "dpi" },
    { title: "E-Government n'Ibikorwa by'Abaronzi", category: "Ikoreshwa", description: "Urwego rw'ibikorwa rukoreshwa hejuru y'DPI ruhuza abaturage n'ubuyobozi bw'ibikorwa.", duration: "1.10", isFeatured: false, image: officeLounge, motionGraphic: "egov" },
    { title: "Kigali, Rwanda → Isi yose", category: "Protocole y'Akarunga", description: "Yavuye mu Bwenge bw'Afrika, yakozwe y'Isi yose. Solutions zacu zubahirizwa mu bufatanye bw'amahugurwa.", duration: "0.35", isFeatured: false, image: teamKigali, motionGraphic: "global-south" }
  ],
  discussionsLabel: "TWE LENO",
  discussionsTitle: "Abakorabasha b'Afrika y'Itegeko.",
  discussionsSubtitle: "Turi abakorabasha bategereje ishuri ry'isi. Azul Tech yakora kandi yubake imibanire y'ibanze.\n\nTuri ikigo rishinzwe ubukorikoringa bw'Imibanire y'Abaturage.\nUbukororikoringa, amategeko, n'ubwenge bituma abuyobozi bashinga amakuru yawe, umwirondoro wawe, n'ibikorwa byawe.\n\nSisteme z'ubuyobozi. Amakuru yemewe. Ibikorwa by'abaturage.\n\nTwubake ejo hazaho hamwe.",
  sovereign: {
    label: "Ubukorikoringa bw'Ibanga",
    heading: "Yakozwe y'Afrika, atari y'amahugurwa gusa.",
    description: "Igisubizo gikoroha kiragenda gikubaya. Igihe cose twakorana bituma ingamba z'igice zongera.",
    conventionalTitle: "\"Sisteme igenda neza?\"",
    conventionalFeatures: ["Ibintu byoherejwe. Ubukorikoringa bwemewe.", "Igisubizo gihari. Nta nkindi kibaho.", "Ubukorikoringa buzerekeje nyuma yo gutangira.", "Abakoresha batekereza mu bikorwa.", "Agaciro gakomeza igihe amasezerano arangira."],
    approachTitle: "\"Ikindi kigo gishobora kubaka kuri iyi protocole?\"",
    approachFeatures: ["Ubukorikoringa bwa protocole bwambere", "Igisubizo gikoroha gira inzira y'ibintu", "Ubukorikoringa bw'ibanga bwa leta butangirwako", "Abakorabasha batekereza mu sisteme n'amategeko", "Imibanire irenga igihe cose twakorana"],
    stats: [
      { icon: "Shield", label: "Igisubizo cy'Ubuyobozi", value: "47", suffix: "+" },
      { icon: "Network", label: "Ubukorikoringa bw'Ibintu", value: "Ubukorikoringa", suffix: "" },
      { icon: "TrendingUp", label: "Agaciro Gakomeza", value: "100", suffix: "%" },
      { icon: "FileCheck", label: "Ishyirwa mu bikorwa", value: "Buri gihe", suffix: "" }
    ],
    partnersLabel: "BYEMEREYE NABO",
    partnersDescription: "Twakorana nabayobozi b'isi mu mikorere n'ubukorikoringa.",
    partners: ["ISO 27001", "AWS", "Microsoft", "Google Cloud"],
    ctaText: "Tangura ijambo!",
    ctaLink: "#contact"
  },
  approach: {
    label: "UBURYO BWACU",
    heading: "Kubaka y'Afrika.",
    items: [
      { title: "Protocole mbere", description: "Umwandiko wose ushyirwa mu bikorwa ukagorana mu bihugu.", image: teamKigali },
      { title: "Ubukorikoringa bw'Ibanga", description: "Yakozwe n'ubwenge bw'ibanga bw'igihugu mu mbere.", image: serverInfra },
      { title: "Isosiyete y'Ibanga", description: "Ahantu hakorohewe aho abakorabasha n'abategeka bakorana.", image: discussionImg }
    ]
  },
  careers: [
    { title: "Ubumenyi bw'Imishinga", label: "ISHURI RYA KIGALI", description: "Kubaka protocole zihungabanya ibintu n'sisteme z'ingenzi zishimangira ubwenge bw'ubuyobozi bw'igihugu.", link: "#contact", image: teamKigali },
    { title: "Inzira y'Ikoranabuhanga", label: "IMBANIRE", description: "Kubaka imiterere y'ibintu yemewe irinda kandi igezwa mu bubatise bw'ubwenge bw'Afrika.", link: "#contact", image: discussionImg },
    { title: "Isosiyete y'Ibanga", label: "UBUZIMA BWO MU KIGO", description: "Ahantu hakorohewe aho abakorabasha n'abategeka bakorana bakwira ejo hazaho h'imbere y'Afrika.", link: "#contact", image: officeLounge }
  ],
  careersLabel: "AKAZI",
  careersHeading: "Korera hamwe no guhindura ubuyobozi bw'amategeko bw'ikoranabuhanga.",
  contact: {
    label: "TUVUGISHE",
    heading: "Twubake imibanire y'ubuyobozi hamwe.",
    description: "Tuvugishe kugira ngo dutegereze imiterere y'ibintu, ibikorwa cyangwa ubufatanye.",
    emails: ["hello@azultech.rw", "info@azultech.rw"],
    phones: ["+250 79 195 6617", "+250 78 856 1509"],
    locations: [{ name: "Kigali, Rwanda", address: "KG 17 Ave - KU Building 2nd Floor\nP.O Box 0040785150 - Kigali" }],
    services: ["Ubukorikoringa bw'Ibintu n'Ubukorikoringa", "Ubukorikoringa bw'Imibanire y'Abaturage mu Bihugu n'Hanze", "Sisteme z'Amakuru n'Ubwenge", "Kwiza mu Bukorikoringa n'Ibanga ry'Amakuru", "Gukorera mu Bwenge n'Ikoranabuhanga"],
    website: "www.azultech.africa"
  },
  footer: {
    description: "Azul Tech — Kubaka Ubukorikoringa bw'Afrika",
    navGroups: [
      { title: "Ubukorikoringa", links: [{ label: "Ibice by'Azul", url: "#layers" }] },
      { title: "Ikigo", links: [{ label: "Akazi", url: "#work" }, { label: "Tuvugishe", url: "#contact" }] }
    ],
    socials: { linkedin: "https://www.linkedin.com/company/azul-tech", twitter: "https://twitter.com/azul_tech", github: "#" },
    bottomLinks: [{ label: "Amabwiriza y'Ibanga", url: "#" }, { label: "Amategeko y'Ikorana", url: "#" }]
  },
  navbar: {
    navItems: [
      { label: "Ahabanza", href: "/" },
      { label: "Tweekize", href: "#about-dropdown" },
      { label: "Ubukorikoringa", href: "/architecture" },
      { label: "Akazi", href: "/work" },
      { label: "Amakuru n'Ikiganiro", href: "/events-news" },
      { label: "Uburyo", href: "/approach" },
      { label: "Tuvugishe", href: "/contact" }
    ]
  }
};

const defaultSw = {
  ...defaultEn,
  hero: {
    ...defaultEn.hero,
    title: "Tunaunda miundo mizigo ya uongozi wa kesho.",
    subtitle: "Azul Tech inatengeneza na kujenga miundo msingi inayowezesha e-Utawala na Miundombinu ya Umma ya Kidijitali katika Afrika na Kusini mwa Dunia.",
    ctaText: "Wasiliana Nasi",
    bentoCards: [
      { type: "Matumizi", title: "Ureheshaji wa Kihistoria wa Raia wa Rwanda.", image: officeLounge, isTall: false },
      { type: "Itifaa ya Afya", title: "Yego Yacu — Jukwaa la Afya ya Vijana", image: bookMockup, link: "https://app.ubuntuhealth.africa/", isTall: true },
      { type: "Mfumo wa Azul", title: "Utambulisho, Malipo, Data, Akili: Tabaka 5", image: networkNodes, isTall: true },
      { type: "Itifaa ya Kikanda", title: "Jukwaa la Data ya Usalama wa Barabara za Nchi 6", image: serverInfra, isTall: false }
    ],
    interviewCard: {
      category: "Uchambuzi wa Sera",
      title: "Ikiwa kuna tatizo la muundo, tunataka kusikia.",
      image: ceoInterview,
      series: "four"
    }
  },
  layers: [
    { title: "Tunatengeneza", description: "Tunaunda miundo mizigo ambayo viongozi wanakubali.", image: teamKigali },
    { title: "Tunajenga", description: "Tunajenga miundo mingi ya kazi inayotambulika katika Afrika na Kusini mwa Dunia.", image: serverInfra },
    { title: "Tunaenea", description: "Miundombinu iliyoundwa kwa nchi moja inakuwa ramani kwa nyingi.", image: networkNodes },
    { title: "Tunaweka Viwango", description: "Yale Azul Tech yanayojenga yana kuwa itifaa katika Afrika na zaidi.", image: manifestoCore }
  ],
  layersLabel: "TUNAFANYA NINI",
  layersHeading: "Tunatengeneza. Tunajenga.",
  layersDescription: "Zaidi ya nadharia. Sisi ni askari ambao tunafanya mambo kutokea.",
  discussions: [
    { title: "Miundombinu ya Umma ya Kidijitali", category: "Uchambuzi wa Sera", description: "Njia za uongozi ambazo viongozi wanaweka ili kuleta mabadiliko ya kidijitali.", duration: "0.40", isFeatured: true, image: discussionImg, motionGraphic: "dpi" },
    { title: "e-Utawala na Huduma za Raia", category: "Matumizi", description: "Tabaka la huduma za msingi linalojengwa juu ya DPI linalounganisha raia moja kwa moja na utawala wa kidijitali.", duration: "1.10", isFeatured: false, image: officeLounge, motionGraphic: "egov" },
    { title: "Kigali, Rwanda → Dunia", category: "Itifaa ya Kikanda", description: "Imeundwa Afrika, imejengwa kwa Dunia Kusini. Suluhisho letu linaundwa na muktadha wa masoko yanayokua.", duration: "0.35", isFeatured: false, image: teamKigali, motionGraphic: "global-south" }
  ],
  discussionsLabel: "SISI NI NANI",
  discussionsTitle: "Wakandarasi wa Afrika ya kidijitali.",
  discussionsSubtitle: "Sisi ni wale ambao hatungoi dunia isifikie. Azul Tech inatengeneza na kujenga miundombinu ya msingi.\n\nSisi ni taasisi ya miundombinu ya umma ya kidijitali ya kitaifa.\nKuunda na kusimamia mifumo, viwango, na akili inayowezesha viongozi kumiliki data yao, tabaka la utambulisho, na kumbukumbu ya taasisi.\n\nMifumo ya kitaifa. Data inayotegemewa. Huduma zinazozingatia raia.\n\nTujenge mustakabali pamoja.",
  sovereign: {
    label: "Kitaifa kwa Muundo",
    heading: "Imeundwa kwa bara, si kwa masoko tu.",
    description: "Kila utoaji unakuwa mfano wa muundo. Kila ushirikiano unaongeza uwezo wa sekta nzima.",
    conventionalTitle: "\"Je, mfumo unafanya kazi?\"",
    conventionalFeatures: ["Vipengele vilivyotumwa. Muundo umekubaliwa.", "Utoaji maalum. Hakuna thamani inayokua.", "Usalama ukaguliwa baada ya kuzinduliwa.", "Wasanidi programu wanaofikiria kwa vipengele.", "Thamani inaisha pale mkataba unapoisha."],
    approachTitle: "\"Je, timu nyingine inaweza kujenga kwenye sampuli hii?\"",
    approachFeatures: ["Muundo wa itifaa kwanza", "Kila utoaji unakuwa mfano wa muundo", "Usalama wa kitaifa umekwisha kujengwa, si kuunglishwa", "Wakandarasi wanaofikiria kwa mifumo na viwango", "Miundombinu ambayo inadumu zaidi ya ushirikiano"],
    stats: [
      { icon: "Shield", label: "Utoaji wa Kitaifa", value: "47", suffix: "+" },
      { icon: "Network", label: "Miundo ya Kuigwa", value: "Kitaifa", suffix: "" },
      { icon: "TrendingUp", label: "Thamani Inayokua", value: "100", suffix: "%" },
      { icon: "FileCheck", label: "Tayari Kukaguliwa", value: "Daima", suffix: "" }
    ],
    partnersLabel: "INATEGEMEWA NA MATAIFA",
    partnersDescription: "Tunashirikiana na viongozi wa dunia katika miundombinu na usalama.",
    partners: ["ISO 27001", "AWS", "Microsoft", "Google Cloud"],
    ctaText: "Anzisha mazungumzo!",
    ctaLink: "#contact"
  },
  approach: {
    label: "MBINU YETU",
    heading: "Kujenga kwa Bara.",
    items: [
      { title: "Itifaa Kwanza", description: "Kila mstari wa msimbo unaandikwa ili kuenea katika nchi.", image: teamKigali },
      { title: "Ulinzi wa Kitaifa", description: "Umejengwa na uhuru wa data wa kitaifa kama msingi.", image: serverInfra },
      { title: "Utamaduni wa Kitaifa", description: "Mazingira ya kazi yanayozingatia malengo ambapo wakandarasi na wataalamu wa sera wanafanya kazi pamoja.", image: discussionImg }
    ]
  },
  careers: [
    { title: "Ustadi wa Uhandisi", label: "KITUO CHA KIGALI", description: "Kujenga viwango vya hali ya juu na mifumo ya muhimu inayowezesha uhuru wa kidijitali wa mataifa.", link: "#contact", image: teamKigali },
    { title: "Mfumo wa Msingi", label: "MIUNDOMBINU", description: "Kubuni miundo mizigo salama inayoweza kushirikiana ambayo inatumika kama msingi wa ukuaji wa kidijitali wa bara.", link: "#contact", image: discussionImg },
    { title: "Utamaduni wa Kitaifa", label: "MAISHA YA OFISI", description: "Mazingira ya kazi yanayozingatia malengo ambapo wakandarasi na wataalamu wa sera wanajenga mustakabali wa miundombinu ya Afrika.", link: "#contact", image: officeLounge }
  ],
  careersLabel: "AJIRA",
  careersHeading: "Jenga mustakabali wa utawala wa kidijitali pamoja nasi.",
  contact: {
    label: "WASILIANA NASI",
    heading: "Tujenge miundombinu ya kitaifa pamoja.",
    description: "Wasiliana nasi kujadili miundo mizigo, utoaji, au ushirikiano.",
    emails: ["hello@azultech.rw", "info@azultech.rw"],
    phones: ["+250 79 195 6617", "+250 78 856 1509"],
    locations: [{ name: "Kigali, Rwanda", address: "KG 17 Ave - KU Building 2nd Floor\nP.O Box 0040785150 - Kigali" }],
    services: ["Miundo ya Mifumo na Usanidi", "Miundombinu ya Umma ya Kidijitali ya Kitaifa na ya Kikanda", "Mifumo ya Data na Akili", "Ulinzi wa Usalama na Faragha ya Data", "Ureheshaji na Otomatisha"],
    website: "www.azultech.africa"
  },
  footer: {
    description: "Azul Tech — Kujenga Miundombinu ya Afrika",
    navGroups: [
      { title: "Miundombinu", links: [{ label: "Mfumo wa Azul", url: "#layers" }] },
      { title: "Taasisi", links: [{ label: "Kazi", url: "#work" }, { label: "Wasiliana", url: "#contact" }] }
    ],
    socials: { linkedin: "https://www.linkedin.com/company/azul-tech", twitter: "https://twitter.com/azul_tech", github: "#" },
    bottomLinks: [{ label: "Sera ya Faragha", url: "#" }, { label: "Masharti ya Huduma", url: "#" }]
  },
  navbar: {
    navItems: [
      { label: "Nyumbani", href: "/" },
      { label: "Kuhusu Sisi", href: "#about-dropdown" },
      { label: "Miundombinu", href: "/architecture" },
      { label: "Kazi", href: "/work" },
      { label: "Matukio na Habari", href: "/events-news" },
      { label: "Mbinu", href: "/approach" },
      { label: "Wasiliana", href: "/contact" }
    ]
  }
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
    const fallback = lang === 'fr' ? defaultFr : lang === 'rw' ? defaultRw : lang === 'sw' ? defaultSw : defaultEn;
    try {
      const [hero, home] = await Promise.all([
        getHeroData(lang).catch(() => null),
        getHomePageData(lang).catch(() => null),
      ]);

      const isLocalOnly = lang === 'rw' || lang === 'sw';

      setState({
        hero: (() => {
          const base = isLocalOnly ? fallback.hero : (hero || fallback.hero);
          return {
            ...base,
            bentoCards: (base.bentoCards || []).map((card: any, i: number) => ({
              ...card,
              image: fallback.hero.bentoCards[i]?.image || card.image,
            })),
            interviewCard: {
              ...(base.interviewCard || {}),
              image: fallback.hero.interviewCard?.image || base.interviewCard?.image,
            },
          };
        })(),
        layers: isLocalOnly ? fallback.layers : ((home?.layers?.layers && home.layers.layers.length > 0)
          ? home.layers.layers.map((layer: any, i: number) => ({
              ...layer,
              image: fallback.layers[i]?.image || layer.image,
            }))
          : fallback.layers),
        layersLabel: isLocalOnly ? fallback.layersLabel : (home?.layers?.layersLabel || fallback.layersLabel),
        layersHeading: isLocalOnly ? fallback.layersHeading : (home?.layers?.layersHeading || fallback.layersHeading),
        layersDescription: isLocalOnly ? fallback.layersDescription : (home?.layers?.layersDescription || fallback.layersDescription),
        discussions: isLocalOnly ? fallback.discussions : ((home?.discussions?.discussions && home.discussions.discussions.length > 0) ? home.discussions.discussions : fallback.discussions),
        discussionsLabel: isLocalOnly ? fallback.discussionsLabel : (home?.discussions?.discussionsLabel || fallback.discussionsLabel),
        discussionsTitle: isLocalOnly ? fallback.discussionsTitle : (home?.discussions?.discussionsTitle || fallback.discussionsTitle),
        discussionsSubtitle: isLocalOnly ? fallback.discussionsSubtitle : (home?.discussions?.discussionsSubtitle || fallback.discussionsSubtitle),
        sovereign: isLocalOnly ? fallback.sovereign : (home?.sovereign || fallback.sovereign),
        approach: isLocalOnly ? fallback.approach : (home?.approach ? {
          ...home.approach,
          items: (home.approach.items || []).map((item: any, i: number) => ({
            title: item.title,
            description: item.description,
            image: fallback.approach.items[Math.min(i, fallback.approach.items.length - 1)]?.image || '',
          })),
        } : fallback.approach),
        careers: isLocalOnly ? fallback.careers : ((home?.careers?.slides && home.careers.slides.length > 0)
          ? home.careers.slides.map((slide: any, i: number) => ({
              ...slide,
              image: fallback.careers[Math.min(i, fallback.careers.length - 1)]?.image || fallback.careers[0]?.image || '',
            }))
          : fallback.careers),
        careersLabel: isLocalOnly ? fallback.careersLabel : (home?.careers?.label || fallback.careersLabel),
        careersHeading: isLocalOnly ? fallback.careersHeading : (home?.careers?.heading || fallback.careersHeading),
        contact: isLocalOnly ? fallback.contact : (home?.contact || fallback.contact),
        footer: isLocalOnly ? fallback.footer : (home?.footer || fallback.footer),
        navbar: isLocalOnly ? fallback.navbar : (home?.navbar || fallback.navbar),
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
