"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuizWhizLogo } from "@/components/quiz-whiz-logo"
import { MainNav } from "@/components/main-nav"
import { Trophy, Clock, Users, Brain, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function StaticHome() {
  const { t, language } = useLanguage()

  const features = [
    {
      icon: Clock,
      title: t.home.features.timeScoring.title,
      description: t.home.features.timeScoring.description,
    },
    {
      icon: Trophy,
      title: t.home.features.leaderboards.title,
      description: t.home.features.leaderboards.description,
    },
    {
      icon: Users,
      title: t.home.features.multiplayer.title,
      description: t.home.features.multiplayer.description,
    },
    {
      icon: Brain,
      title: t.home.features.adaptive.title,
      description: t.home.features.adaptive.description,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <MainNav />

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                {t.home.hero.title.replace("Mind", "")} <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t.common.mind}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                {t.home.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-lg px-8 py-6 h-auto"
                >
                  <Link href="/quiz-categories">{t.home.hero.startQuiz}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-lg px-8 py-6 h-auto"
                >
                  <Link href="/leaderboard">
                    {t.home.hero.explore}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 flex items-center justify-center">
                  <QuizWhizLogo className="w-48 h-48 md:w-64 md:h-64" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            {t.home.features.title}{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {t.common.appName}
            </span>
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
            {t.home.features.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="h-full border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">{t.home.cta.title.replace("QuizWhiz", "")}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">{t.home.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-lg px-8 py-6 h-auto"
              >
                <Link href="/quiz-categories">{t.home.cta.startQuizzing}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-lg px-8 py-6 h-auto"
              >
                <Link href="/leaderboard">{t.home.cta.viewLeaderboards}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <QuizWhizLogo className="w-10 h-10 mr-3" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.common.appName}
              </span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                {t.footer.aboutUs}
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                {t.footer.contact}
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                {t.footer.terms}
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
            <p>
              {new Date().getFullYear()} {t.common.appName}. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
