import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuizWhizLogo } from "@/components/quiz-whiz-logo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - QuizWhiz",
  description: "The page you're looking for doesn't exist",
}

// Separate viewport export as per Next.js documentation
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-24 h-24 mb-8">
        <QuizWhizLogo />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">404 - Page Not Found</h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
