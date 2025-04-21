"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import StaticHome from "./static-home"
import { LanguageProvider } from "@/lib/i18n/language-context"

// Dynamically import the animated home page with client-side rendering only
const DynamicHome = dynamic(() => import("./dynamic-home"), {
  ssr: false,
  loading: () => <StaticHome />,
})

export default function ClientWrapper() {
  // Use client-side only rendering
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return <LanguageProvider>{!isMounted ? <StaticHome /> : <DynamicHome />}</LanguageProvider>
}
