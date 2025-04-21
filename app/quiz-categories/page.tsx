"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, Users, Zap, Music, Film, Globe, Book, Code, Palette } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/lib/i18n/language-context"
import { AIQuizGenerator } from "@/components/ai-quiz-generator"

export default function QuizCategories() {
  const { t, language } = useLanguage()

  const categories = [
    {
      name: language === "ru" ? "Наука и технологии" : "Science & Technology",
      description:
        language === "ru"
          ? "Проверьте свои знания научных открытий и технологических инноваций."
          : "Test your knowledge of scientific discoveries and technological innovations.",
      slug: "science-tech",
      icon: Brain,
      timeLimit: 10,
      players: 1243,
      difficulty: language === "ru" ? t.common.medium : "Medium",
    },
    {
      name: language === "ru" ? "История и культура" : "History & Culture",
      description:
        language === "ru"
          ? "Исследуйте прошлое и культурные явления со всего мира."
          : "Explore the past and cultural phenomena from around the world.",
      slug: "history-culture",
      icon: Clock,
      timeLimit: 12,
      players: 987,
      difficulty: language === "ru" ? t.common.hard : "Hard",
    },
    {
      name: language === "ru" ? "Развлечения" : "Entertainment",
      description:
        language === "ru"
          ? "Проверьте себя вопросами о фильмах, музыке и поп-культуре."
          : "Challenge yourself with questions about movies, music, and pop culture.",
      slug: "entertainment",
      icon: Film,
      timeLimit: 8,
      players: 2156,
      difficulty: language === "ru" ? t.common.easy : "Easy",
    },
    {
      name: language === "ru" ? "Музыка" : "Music",
      description:
        language === "ru"
          ? "Проверьте свои знания об исполнителях, песнях и истории музыки."
          : "Test your knowledge of artists, songs, and musical history.",
      slug: "music",
      icon: Music,
      timeLimit: 8,
      players: 1432,
      difficulty: language === "ru" ? t.common.medium : "Medium",
    },
    {
      name: language === "ru" ? "География" : "Geography",
      description:
        language === "ru"
          ? "Проверьте себя вопросами о странах, столицах и достопримечательностях."
          : "Challenge yourself with questions about countries, capitals, and landmarks.",
      slug: "geography",
      icon: Globe,
      timeLimit: 10,
      players: 1089,
      difficulty: language === "ru" ? t.common.medium : "Medium",
    },
    {
      name: language === "ru" ? "Литература" : "Literature",
      description:
        language === "ru"
          ? "Исследуйте мир книг, авторов и литературных произведений."
          : "Explore the world of books, authors, and literary works.",
      slug: "literature",
      icon: Book,
      timeLimit: 12,
      players: 765,
      difficulty: language === "ru" ? t.common.hard : "Hard",
    },
    {
      name: language === "ru" ? "Программирование" : "Programming",
      description:
        language === "ru"
          ? "Проверьте свои знания языков программирования, алгоритмов и технических концепций."
          : "Test your knowledge of coding languages, algorithms, and tech concepts.",
      slug: "programming",
      icon: Code,
      timeLimit: 15,
      players: 876,
      difficulty: language === "ru" ? t.common.hard : "Hard",
    },
    {
      name: language === "ru" ? "Искусство и дизайн" : "Art & Design",
      description:
        language === "ru"
          ? "Проверьте себя вопросами о знаменитых художниках, художественных направлениях и принципах дизайна."
          : "Challenge yourself with questions about famous artists, art movements, and design principles.",
      slug: "art-design",
      icon: Palette,
      timeLimit: 10,
      players: 654,
      difficulty: language === "ru" ? t.common.medium : "Medium",
    },
    {
      name: language === "ru" ? "Случайный микс" : "Random Mix",
      description:
        language === "ru"
          ? "Смесь вопросов из всех категорий для тех, кто любит разнообразие."
          : "A mix of questions from all categories for those who like variety.",
      slug: "random",
      icon: Zap,
      timeLimit: 10,
      players: 1876,
      difficulty: language === "ru" ? t.common.mixed : "Mixed",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.categories.title}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">{t.categories.subtitle}</p>
        </header>

        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-3">
              <AIQuizGenerator />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link href={`/quiz/${category.slug}`} key={category.name}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
                  <div className="h-40 bg-gradient-to-r from-purple-500 to-blue-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <category.icon className="w-16 h-16 text-white opacity-75 group-hover:scale-125 transition-transform duration-500" />
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{category.name}</CardTitle>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        <Clock className="w-4 h-4 group-hover:animate-pulse-slow" />
                        <span>
                          {category.timeLimit} {t.categories.timeLimit}
                        </span>
                      </div>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        <Users className="w-4 h-4" />
                        <span>
                          {category.players} {t.common.players}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        <Brain className="w-4 h-4" />
                        <span>{category.difficulty}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 w-full justify-between transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10">{t.categories.startQuiz}</span>
                      <Zap className="ml-2 w-4 h-4 relative z-10 group-hover:animate-pulse-slow" />
                      <span className="absolute inset-0 w-full h-full bg-purple-100 dark:bg-purple-900/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
