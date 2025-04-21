"use client"

import { useState, useEffect } from "react"
import { QuizWhizLogo } from "@/components/quiz-whiz-logo"
import { useLanguage } from "@/lib/i18n/language-context"

export default function Loading() {
  const { t, language } = useLanguage()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        // Random increment between 5 and 15
        const increment = Math.floor(Math.random() * 10) + 5
        return Math.min(prevProgress + increment, 100)
      })
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-24 h-24 mb-8">
        <QuizWhizLogo />
      </div>
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
        {language === "ru" ? "Загрузка" : "Loading"}{" "}
        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          {t.common.appName}
        </span>
      </h1>

      {/* Loading bar */}
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-[progress-shine_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300">
        {language === "ru" ? "Пожалуйста, подождите..." : "Please wait..."}
      </p>
    </div>
  )
}
