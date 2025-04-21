"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "@/components/landing/use-in-view"
import { motion } from "@/components/landing/motion-wrapper"

interface StatsCounterProps {
  end: number
  suffix?: string
  label: string
}

export default function StatsCounter({ end, suffix = "", label }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      let startTime: number
      let animationFrame: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / 2000, 1)

        setCount(Math.floor(progress * end))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        }
      }

      animationFrame = requestAnimationFrame(step)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, hasAnimated])

  return (
    <motion.div
      ref={ref}
      className="text-center text-white p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-lg opacity-80">{label}</div>
    </motion.div>
  )
}
