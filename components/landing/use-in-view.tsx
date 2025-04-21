"use client"

import { useState, useEffect, type RefObject } from "react"

interface UseInViewOptions {
  once?: boolean
  amount?: number
}

export function useInView(ref: RefObject<Element>, options: UseInViewOptions = { once: false, amount: 0.1 }): boolean {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)

        if (entry.isIntersecting && options.once) {
          observer.unobserve(element)
        }
      },
      {
        threshold: options.amount,
        rootMargin: "0px",
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [ref, options.once, options.amount])

  return isInView
}
