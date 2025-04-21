import type { Metadata } from "next"
import LeaderboardClientPage from "./LeaderboardClientPage"

export const metadata: Metadata = {
  title: "Leaderboard - QuizWhiz",
  description: "See who's topping the charts and challenge yourself to climb the rankings!",
}

// Separate viewport export as per Next.js documentation
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function LeaderboardPage() {
  return <LeaderboardClientPage />
}
