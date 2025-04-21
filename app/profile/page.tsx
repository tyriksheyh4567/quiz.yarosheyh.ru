import type { Metadata } from "next"
import ProfileClientPage from "./ProfileClientPage"

export const metadata: Metadata = {
  title: "Profile - QuizWhiz",
  description: "View your quiz statistics, achievements, and activity",
}

// Separate viewport export as per Next.js documentation
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function ProfilePage() {
  return <ProfileClientPage />
}
