"use client"

import { Star } from "lucide-react"
import { motion } from "@/components/landing/motion-wrapper"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export default function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <motion.div
      className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6"
      whileHover={{ y: -10 }}
    >
      <div className="mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`inline-block w-5 h-5 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
          {author.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-bold text-gray-800 dark:text-white">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
