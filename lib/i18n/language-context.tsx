"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Translation, en, ru } from "./translations"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")
  const [translations, setTranslations] = useState<Translation>(en)

  useEffect(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en"
    setLanguage(savedLanguage)

    // Set the document lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = savedLanguage
    }
  }, [])

  useEffect(() => {
    // Update translations when language changes
    if (language === "ru") {
      setTranslations(ru)
    } else {
      setTranslations(en)
    }

    // Save language preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }

    // Update the document lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
