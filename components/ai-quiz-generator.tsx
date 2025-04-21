"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function AIQuizGenerator() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { value: "science", label: language === "ru" ? "Наука и технологии" : "Science & Technology" },
    { value: "history", label: language === "ru" ? "История и культура" : "History & Culture" },
    { value: "entertainment", label: language === "ru" ? "Развлечения" : "Entertainment" },
    { value: "geography", label: language === "ru" ? "География" : "Geography" },
    { value: "sports", label: language === "ru" ? "Спорт" : "Sports" },
    { value: "art", label: language === "ru" ? "Искусство и литература" : "Art & Literature" },
  ]

  const difficulties = [
    { value: "easy", label: t.common.easy },
    { value: "medium", label: t.common.medium },
    { value: "hard", label: t.common.hard },
  ]

  const handleGenerateQuiz = async () => {
    if (!category || !difficulty) {
      toast({
        title: language === "ru" ? "Ошибка" : "Error",
        description:
          language === "ru" ? "Пожалуйста, выберите категорию и сложность" : "Please select a category and difficulty",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: categories.find((c) => c.value === category)?.label,
          difficulty: difficulties.find((d) => d.value === difficulty)?.label,
          language, // Pass the current language to the API
        }),
      })

      if (!response.ok) {
        throw new Error(language === "ru" ? "Не удалось сгенерировать вопросы" : "Failed to generate questions")
      }

      const data = await response.json()

      // Validate the response data
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error(language === "ru" ? "Получены некорректные данные" : "Received invalid data")
      }

      // Validate each question has the required properties
      const validQuestions = data.questions.filter(
        (q) => q.question && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer && q.explanation,
      )

      if (validQuestions.length < data.questions.length) {
        console.warn("Some questions were filtered out due to invalid format", data.questions)
      }

      if (validQuestions.length === 0) {
        throw new Error(
          language === "ru" ? "Не удалось создать корректные вопросы" : "Failed to create valid questions",
        )
      }

      // Store the generated questions in sessionStorage
      sessionStorage.setItem(
        "aiGeneratedQuiz",
        JSON.stringify({
          name: categories.find((c) => c.value === category)?.label,
          questions: validQuestions,
          isAIGenerated: true,
          language, // Store the language used for generation
        }),
      )

      // Navigate to the AI quiz page
      router.push("/quiz/ai-generated")
    } catch (error) {
      console.error("Error generating quiz:", error)
      toast({
        title: language === "ru" ? "Ошибка" : "Error",
        description:
          error instanceof Error
            ? error.message
            : language === "ru"
              ? "Не удалось сгенерировать вопросы"
              : "Failed to generate questions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          {t.quiz.aiGenerated}
        </CardTitle>
        <CardDescription>
          {language === "ru"
            ? "Создавайте уникальные викторины с помощью искусственного интеллекта"
            : "Create unique quizzes powered by artificial intelligence"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.common.category}</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder={language === "ru" ? "Выберите категорию" : "Select a category"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.common.difficulty}</label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder={language === "ru" ? "Выберите сложность" : "Select difficulty"} />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((diff) => (
                <SelectItem key={diff.value} value={diff.value}>
                  {diff.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerateQuiz}
          disabled={isLoading || !category || !difficulty}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === "ru" ? "Генерация..." : "Generating..."}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {t.quiz.generateNewQuestions}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
