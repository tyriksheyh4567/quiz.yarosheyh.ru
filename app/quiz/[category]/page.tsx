"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MainNav } from "@/components/main-nav"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Mock quiz data
const quizData = {
  "science-tech": {
    name: "Science & Technology",
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Au", "Ag", "Gd"],
        correctAnswer: "Au",
        explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'.",
      },
      {
        id: 2,
        question: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctAnswer: "Saturn",
        explanation: "Saturn has 83 confirmed moons, surpassing Jupiter's 79 moons.",
      },
      {
        id: 3,
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Utility",
          "Central Processor Unlimited",
        ],
        correctAnswer: "Central Processing Unit",
        explanation:
          "The CPU (Central Processing Unit) is the primary component of a computer that performs most of the processing.",
      },
      {
        id: 4,
        question: "Which of these is NOT a programming language?",
        options: ["Java", "Python", "Cobra", "Leopard"],
        correctAnswer: "Leopard",
        explanation: "While Java, Python, and Cobra are programming languages, Leopard is not.",
      },
      {
        id: 5,
        question: "What is the speed of light in a vacuum?",
        options: ["299,792 km/s", "300,000 km/s", "199,792 km/s", "350,000 km/s"],
        correctAnswer: "299,792 km/s",
        explanation: "The speed of light in a vacuum is approximately 299,792 kilometers per second.",
      },
    ],
  },
  "history-culture": {
    name: "History & Culture",
    questions: [
      {
        id: 1,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945",
        explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September.",
      },
      {
        id: 2,
        question: "Which ancient civilization built the Machu Picchu?",
        options: ["Aztecs", "Incas", "Mayans", "Olmecs"],
        correctAnswer: "Incas",
        explanation: "Machu Picchu was built by the Incas in the 15th century.",
      },
      {
        id: 3,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci",
        explanation: "The Mona Lisa was painted by Leonardo da Vinci in the early 16th century.",
      },
      {
        id: 4,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Thailand", "South Korea", "Japan"],
        correctAnswer: "Japan",
        explanation:
          "Japan is known as the Land of the Rising Sun because from China, it appears that the sun rises from the direction of Japan.",
      },
      {
        id: 5,
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Dorothy Hodgkin"],
        correctAnswer: "Marie Curie",
        explanation:
          "Marie Curie was the first woman to win a Nobel Prize, winning the Physics Prize in 1903 and the Chemistry Prize in 1911.",
      },
    ],
  },
  // Add more categories as needed
}

export default function QuizPage({ params }: { params: { category: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const category = params.category

  const quiz = quizData[category as keyof typeof quizData]
  const categoryExists = !!quiz

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

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const totalQuestions = quiz.questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (!isAnswered && !quizCompleted) {
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
  }, [isAnswered, quizCompleted])

  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(20)
    setQuestionStartTime(Date.now())
  }, [currentQuestionIndex])

  const handleTimeout = () => {
    setIsAnswered(true)

    // Add to results
    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: "No answer",
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: false,
      },
    ])

    toast({
      title: "Time's up!",
      description: "You didn't answer in time.",
      variant: "destructive",
    })
  }

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return

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
      title: isCorrect ? "Correct!" : "Incorrect!",
      description: isCorrect
        ? `+${questionScore} points (including ${Math.round(timeBonus)} time bonus)`
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

        // Add animation to the stylesheet
        const style = document.createElement("style")
        style.innerHTML = `
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100%) rotate(0deg);
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
            }
          }
        `
        document.head.appendChild(style)

        // Remove confetti after animation
        setTimeout(() => {
          document.body.removeChild(confettiContainer)
        }, 5000)
      }
      const totalTime = Math.round((Date.now() - startTime) / 1000) // in seconds

      // Show completion toast
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score} points in ${totalTime} seconds.`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        {!quizCompleted ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{quiz.name}</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
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
                  {timeLeft}s
                </span>
              </div>
            </div>

            <Progress value={progress} className="h-2 mb-8" />

            <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion.options.map((option) => (
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
                <div className="text-lg font-bold">Score: {score}</div>
                {isAnswered && (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8 animate-slide-up">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-pulse-slow">
                    {score} points
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    You answered {results.filter((r) => r.isCorrect).length} out of {totalQuestions} questions
                    correctly.
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  <h3 className="text-lg font-bold">Question Summary</h3>
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
                            Your answer:{" "}
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
                              Correct answer:{" "}
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
                  Try Again
                </Button>
                <Button
                  onClick={() => router.push("/leaderboard")}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  View Leaderboard
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
