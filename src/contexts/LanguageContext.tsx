import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr" | "rw" | "sw";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initial load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("azul-language") as Language;
      return saved === "fr" || saved === "en" || saved === "rw" || saved === "sw" ? saved : "en";
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("azul-language", lang);
  };

  const toggleLanguage = () => {
    const langs: Language[] = ["en", "fr", "rw", "sw"];
    const idx = langs.indexOf(language);
    const newLang = langs[(idx + 1) % langs.length];
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
