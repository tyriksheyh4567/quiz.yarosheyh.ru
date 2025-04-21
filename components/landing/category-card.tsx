"use client"

import { useState } from "react"
import Link from "next/link"
import { type LucideIcon, ArrowRight } from "lucide-react"
import { motion } from "@/components/landing/motion-wrapper"

interface CategoryCardProps {
  icon: LucideIcon
  title: string
  description: string
  count: number
  color: string
}

export default function CategoryCard({ icon: Icon, title, description, count, color }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/quiz/${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <motion.div
        className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -10 }}
      >
        <div className={`h-40 bg-gradient-to-r ${color} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-16 h-16 text-white opacity-75 group-hover:scale-125 transition-transform duration-500" />
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  opacity: isHovered ? 1 : [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{count} quizzes</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          <div className="flex items-center text-sm font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            Start Exploring
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
