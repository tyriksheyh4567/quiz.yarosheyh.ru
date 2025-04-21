"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuizWhizLogo } from "@/components/quiz-whiz-logo"
import { MainNav } from "@/components/main-nav"
import { Trophy, Clock, Users, Brain, ChevronDown, Sparkles, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/lib/i18n/language-context"

// Dynamically import client components
const HeroSection = dynamic(() => import("@/components/landing/hero-section"), { ssr: false })
const FeatureCard = dynamic(() => import("@/components/landing/feature-card"), { ssr: false })
const CategoryCard = dynamic(() => import("@/components/landing/category-card"), { ssr: false })
const TestimonialCard = dynamic(() => import("@/components/landing/testimonial-card"), { ssr: false })
const StatsCounter = dynamic(() => import("@/components/landing/stats-counter"), { ssr: false })
const ParticleBackground = dynamic(() => import("@/components/landing/particle-background"), { ssr: false })
const ScrollReveal = dynamic(() => import("@/components/landing/scroll-reveal"), { ssr: false })

export default function DynamicHome() {
  const { t, language } = useLanguage()

  const features = [
    {
      icon: Clock,
      title: t.home.features.timeScoring.title,
      description: t.home.features.timeScoring.description,
      color: "purple",
    },
    {
      icon: Trophy,
      title: t.home.features.leaderboards.title,
      description: t.home.features.leaderboards.description,
      color: "blue",
    },
    {
      icon: Users,
      title: t.home.features.multiplayer.title,
      description: t.home.features.multiplayer.description,
      color: "pink",
    },
    {
      icon: Brain,
      title: t.home.features.adaptive.title,
      description: t.home.features.adaptive.description,
      color: "green",
    },
  ]

  const categories = [
    {
      icon: Brain,
      title: language === "ru" ? "Наука и технологии" : "Science & Technology",
      description:
        language === "ru"
          ? "Проверьте свои знания научных открытий и технологических инноваций."
          : "Test your knowledge of scientific discoveries and technological innovations.",
      count: 250,
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Clock,
      title: language === "ru" ? "История и культура" : "History & Culture",
      description:
        language === "ru"
          ? "Исследуйте прошлое и культурные явления со всего мира."
          : "Explore the past and cultural phenomena from around the world.",
      count: 180,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: language === "ru" ? "Развлечения" : "Entertainment",
      description:
        language === "ru"
          ? "Проверьте себя вопросами о фильмах, музыке и поп-культуре."
          : "Challenge yourself with questions about movies, music, and pop culture.",
      count: 320,
      color: "from-pink-500 to-purple-500",
    },
  ]

  const testimonials = [
    {
      quote:
        language === "ru"
          ? "QuizWhiz изменил мой подход к обучению. Система подсчета очков на основе времени держит меня в тонусе и помогает лучше запоминать информацию!"
          : "QuizWhiz has transformed how I study. The time-based scoring keeps me engaged and helps me retain information better!",
      author: language === "ru" ? "Сара Чен" : "Sarah Chen",
      role: language === "ru" ? "Студент" : "Student",
      rating: 5,
    },
    {
      quote:
        language === "ru"
          ? "Я использую QuizWhiz со своими учениками, и им это нравится! Соревновательный аспект делает обучение увлекательным и интересным."
          : "I use QuizWhiz with my students and they love it! The competitive aspect makes learning fun and engaging.",
      author: language === "ru" ? "Михаил Браун" : "Michael Brown",
      role: language === "ru" ? "Учитель" : "Teacher",
      rating: 5,
    },
    {
      quote:
        language === "ru"
          ? "Разнообразие категорий заставляет меня возвращаться. Я многому научился, развлекаясь и соревнуясь с друзьями."
          : "The variety of categories keeps me coming back. I've learned so much while having fun competing with friends.",
      author: language === "ru" ? "Алекс Джонсон" : "Alex Johnson",
      role: language === "ru" ? "Любитель викторин" : "Quiz Enthusiast",
      rating: 4,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <MainNav />

      {/* Hero Section with Animated Background */}
      <HeroSection />

      {/* Scroll Indicator */}
      <div className="flex justify-center">
        <a
          href="#features"
          className="animate-bounce-slow flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        >
          <span className="text-sm mb-2">
            {language === "ru" ? "Прокрутите, чтобы узнать больше" : "Scroll to explore"}
          </span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              {t.home.features.title}{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.common.appName}
              </span>
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
              {t.home.features.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color as any}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 relative">
        <div className="absolute inset-0 overflow-hidden">
          <ParticleBackground />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal>
              <StatsCounter end={10000} suffix="+" label={t.home.stats.activeUsers} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <StatsCounter end={5000} suffix="+" label={t.home.stats.quizzesCompleted} />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <StatsCounter end={25} suffix="+" label={t.home.stats.categories} />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <StatsCounter end={98} suffix="%" label={t.home.stats.satisfactionRate} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              {t.home.categories.title}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
              {t.home.categories.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  count={category.count}
                  color={category.color}
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <ScrollReveal>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-lg px-8 py-6 h-auto transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Link href="/quiz-categories">
                  {t.home.categories.viewAll}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              {t.home.testimonials.title}
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
              {t.home.testimonials.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  rating={testimonial.rating}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">{t.home.cta.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">{t.home.cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-lg px-8 py-6 h-auto transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <Link href="/quiz-categories">
                    {t.home.cta.startQuizzing}
                    <Sparkles className="ml-2 w-5 h-5 animate-pulse-slow" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-lg px-8 py-6 h-auto transition-all duration-300 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-500 active:scale-95"
                >
                  <Link href="/leaderboard">
                    {t.home.cta.viewLeaderboards}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
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
              © {new Date().getFullYear()} {t.common.appName}. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
