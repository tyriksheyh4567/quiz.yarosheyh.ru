"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MainNav } from "@/components/main-nav"
import { Clock, CheckCircle, XCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AIQuizPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t, language: currentLanguage } = useLanguage()

  const [quiz, setQuiz] = useState<any>(null)
  const [quizLanguage, setQuizLanguage] = useState<string>("en") // Language the quiz was generated in
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20) // 20 seconds per question
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [results, setResults] = useState<
    Array<{ question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }>
  >([])
  const [startTime, setStartTime] = useState(Date.now())
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get the quiz data from sessionStorage
    try {
      const quizData = sessionStorage.getItem("aiGeneratedQuiz")

      if (quizData) {
        const parsedQuiz = JSON.parse(quizData)

        // Store the language the quiz was generated in
        if (parsedQuiz.language) {
          setQuizLanguage(parsedQuiz.language)
        }

        // Validate that the quiz has questions before setting it
        if (parsedQuiz && Array.isArray(parsedQuiz.questions) && parsedQuiz.questions.length > 0) {
          setQuiz(parsedQuiz)
        } else {
          // If quiz data exists but is invalid, show error
          setError(currentLanguage === "ru" ? "Ошибка загрузки вопросов" : "Error loading questions")
          console.error("Invalid quiz data:", parsedQuiz)
        }
      } else {
        // If no quiz data, redirect to categories page
        router.push("/quiz-categories")
      }
    } catch (err) {
      console.error("Error parsing quiz data:", err)
      setError(currentLanguage === "ru" ? "Ошибка при загрузке викторины" : "Error loading quiz")
    } finally {
      setLoading(false)
    }
  }, [router, currentLanguage])

  // Only access currentQuestion if quiz and quiz.questions exist
  const currentQuestion = quiz?.questions?.[currentQuestionIndex]
  const totalQuestions = quiz?.questions?.length || 0
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (!isAnswered && !quizCompleted && !loading && currentQuestion) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!)
            handleTimeout()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isAnswered, quizCompleted, loading, currentQuestion])

  // Reset timer when moving to next question
  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(20)
      setQuestionStartTime(Date.now())
    }
  }, [currentQuestionIndex, currentQuestion])

  const handleTimeout = () => {
    if (!currentQuestion) return

    setIsAnswered(true)

    // Add to results
    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: t.quiz.noAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: false,
      },
    ])

    toast({
      title: t.quiz.timesUp,
      description: currentLanguage === "ru" ? "Вы не ответили вовремя." : "You didn't answer in time.",
      variant: "destructive",
    })
  }

  const handleOptionSelect = (option: string) => {
    if (isAnswered || !currentQuestion) return

    setSelectedOption(option)
    setIsAnswered(true)

    const isCorrect = option === currentQuestion.correctAnswer

    // Calculate time-based score
    const timeSpent = (Date.now() - questionStartTime) / 1000 // in seconds
    const timeBonus = Math.max(0, 20 - timeSpent) // bonus points for quick answers
    const questionScore = isCorrect ? Math.round(10 + timeBonus) : 0

    setScore((prev) => prev + questionScore)

    // Add to results
    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ])

    // Show toast notification
    toast({
      title: isCorrect ? t.common.correct : t.common.incorrect,
      description: isCorrect
        ? `+${questionScore} ${t.common.points} (${currentLanguage === "ru" ? "включая" : "including"} ${Math.round(
            timeBonus,
          )} ${currentLanguage === "ru" ? "бонус за время" : "time bonus"})`
        : currentQuestion.explanation,
      variant: isCorrect ? "default" : "destructive",
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      // Quiz completed
      setQuizCompleted(true)
      if (currentQuestionIndex === totalQuestions - 1) {
        // Add confetti effect
        const confettiContainer = document.createElement("div")
        confettiContainer.style.position = "fixed"
        confettiContainer.style.top = "0"
        confettiContainer.style.left = "0"
        confettiContainer.style.width = "100%"
        confettiContainer.style.height = "100%"
        confettiContainer.style.pointerEvents = "none"
        confettiContainer.style.zIndex = "9999"
        document.body.appendChild(confettiContainer)

        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
          const confetti = document.createElement("div")
          confetti.style.position = "absolute"
          confetti.style.width = "10px"
          confetti.style.height = "10px"
          confetti.style.backgroundColor = ["#8B5CF6", "#3B82F6", "#EC4899", "#10B981", "#F59E0B"][
            Math.floor(Math.random() * 5)
          ]
          confetti.style.borderRadius = "50%"
          confetti.style.top = "0"
          confetti.style.left = Math.random() * 100 + "vw"
          confetti.style.transform = "translateY(-100%)"
          confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`
          confettiContainer.appendChild(confetti)
        }

        // Remove confetti after animation
        setTimeout(() => {
          document.body.removeChild(confettiContainer)
        }, 5000)
      }
      const totalTime = Math.round((Date.now() - startTime) / 1000) // in seconds

      // Show completion toast
      toast({
        title: currentLanguage === "ru" ? "Викторина завершена!" : "Quiz Completed!",
        description: `${currentLanguage === "ru" ? "Вы набрали" : "You scored"} ${score} ${t.common.points} ${
          currentLanguage === "ru" ? "за" : "in"
        } ${totalTime} ${currentLanguage === "ru" ? "секунд" : "seconds"}.`,
      })
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setTimeLeft(20)
    setQuizCompleted(false)
    setResults([])
    setStartTime(Date.now())
    setQuestionStartTime(Date.now())
  }

  const generateNewQuiz = () => {
    // Clear the current quiz from sessionStorage
    sessionStorage.removeItem("aiGeneratedQuiz")
    // Redirect to categories page
    router.push("/quiz-categories")
  }

  // Show language mismatch warning if the quiz language doesn't match the current UI language
  const showLanguageMismatch = quizLanguage !== currentLanguage && quiz

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <MainNav />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
            <h2 className="text-xl font-semibold">{t.common.loading}...</h2>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <MainNav />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[80vh]">
          <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-red-500">{t.common.error}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">{error}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={() => router.push("/quiz-categories")}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                {currentLanguage === "ru" ? "Вернуться к категориям" : "Return to Categories"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        {showLanguageMismatch && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 text-yellow-800 dark:text-yellow-200">
              <p>
                {currentLanguage === "ru"
                  ? "Внимание: Эта викторина была создана на другом языке. Для лучшего опыта, создайте новую викторину на текущем языке."
                  : "Note: This quiz was created in a different language. For the best experience, generate a new quiz in your current language."}
              </p>
            </div>
          </div>
        )}

        {!quizCompleted ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{quiz?.name}</h1>
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.quiz.questionOf} {currentQuestionIndex + 1} {t.common.of} {totalQuestions}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock
                  className={cn(
                    "w-5 h-5",
                    timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-500 dark:text-gray-400",
                  )}
                />
                <span
                  className={cn(
                    "font-mono font-bold",
                    timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-700 dark:text-gray-300",
                  )}
                >
                  {timeLeft}
                  {t.common.seconds}
                </span>
              </div>
            </div>

            <Progress value={progress} className="h-2 mb-8" />

            {currentQuestion && (
              <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentQuestion.options.map((option: string) => (
                    <Button
                      key={option}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-auto py-4 px-6 text-base font-normal transition-all duration-300",
                        !isAnswered &&
                          "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md",
                        selectedOption === option &&
                          isAnswered &&
                          option === currentQuestion.correctAnswer &&
                          "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500 animate-fade-in",
                        selectedOption === option &&
                          isAnswered &&
                          option !== currentQuestion.correctAnswer &&
                          "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500 animate-shake",
                        option === currentQuestion.correctAnswer &&
                          isAnswered &&
                          "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500 animate-fade-in",
                      )}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="flex-1">{option}</span>
                        {isAnswered && option === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-500 animate-fade-in" />
                        )}
                        {isAnswered && selectedOption === option && option !== currentQuestion.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-500 animate-fade-in" />
                        )}
                      </div>
                    </Button>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-lg font-bold">
                    {t.common.score}: {score}
                  </div>
                  {isAnswered && (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 relative overflow-hidden group"
                    >
                      <span className="relative z-10">
                        {currentQuestionIndex < totalQuestions - 1 ? t.quiz.nextQuestion : t.quiz.seeResults}
                      </span>
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t.quiz.quizResults}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8 animate-slide-up">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-pulse-slow">
                    {score} {t.quiz.yourScore}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t.quiz.correctAnswers} {results.filter((r) => r.isCorrect).length} {t.common.of} {totalQuestions}{" "}
                    {currentLanguage === "ru" ? "вопросов правильно" : "questions correctly"}.
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  <h3 className="text-lg font-bold">{t.quiz.questionSummary}</h3>
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-md animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-2">
                        {result.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium">{result.question}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {t.quiz.yourAnswer}:{" "}
                            <span
                              className={
                                result.isCorrect
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }
                            >
                              {result.userAnswer}
                            </span>
                          </p>
                          {!result.isCorrect && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {t.quiz.correctAnswer}:{" "}
                              <span className="text-green-600 dark:text-green-400">{result.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={restartQuiz}
                  variant="outline"
                  className="transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md active:scale-95"
                >
                  {t.quiz.tryAgain}
                </Button>
                <Button
                  onClick={generateNewQuiz}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t.quiz.generateNewQuestions}
                </Button>
                <Button
                  onClick={() => router.push("/leaderboard")}
                  variant="outline"
                  className="transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md active:scale-95"
                >
                  {t.quiz.viewLeaderboard}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
