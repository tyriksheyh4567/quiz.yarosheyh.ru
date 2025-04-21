"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { motion } from "@/components/landing/motion-wrapper"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: "purple" | "blue" | "pink" | "green"
}

export default function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getGradient = () => {
    switch (color) {
      case "purple":
        return "from-purple-500 to-purple-600"
      case "blue":
        return "from-blue-500 to-blue-600"
      case "pink":
        return "from-pink-500 to-pink-600"
      case "green":
        return "from-green-500 to-green-600"
      default:
        return "from-purple-500 to-purple-600"
    }
  }

  const getBgColor = () => {
    switch (color) {
      case "purple":
        return "bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50"
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50"
      case "pink":
        return "bg-pink-100 dark:bg-pink-900/30 group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50"
      case "green":
        return "bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/50"
      default:
        return "bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50"
    }
  }

  const getTextColor = () => {
    switch (color) {
      case "purple":
        return "text-purple-600 dark:text-purple-400"
      case "blue":
        return "text-blue-600 dark:text-blue-400"
      case "pink":
        return "text-pink-600 dark:text-pink-400"
      case "green":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-purple-600 dark:text-purple-400"
    }
  }

  return (
    <motion.div
      className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="p-6">
        <div
          className={`w-16 h-16 rounded-full ${getBgColor()} flex items-center justify-center mb-6 transition-all duration-300`}
        >
          <Icon className={`w-8 h-8 ${getTextColor()} transition-transform duration-300 group-hover:scale-125`} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      <div
        className={`h-1 w-full bg-gradient-to-r ${getGradient()} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      ></div>
    </motion.div>
  )
}
