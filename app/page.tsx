import ClientWrapper from "./client-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "QuizWhiz - Interactive Quiz App",
  description: "Test your knowledge with timed quizzes and compete on leaderboards",
}

// Separate viewport export as per Next.js documentation
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function Home() {
  return <ClientWrapper />
}
