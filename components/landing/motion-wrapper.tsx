"use client"

import { type ReactNode, forwardRef } from "react"

type MotionProps = {
  children?: ReactNode
  className?: string
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  variants?: any
  whileHover?: any
  whileTap?: any
  whileFocus?: any
  whileDrag?: any
  whileInView?: any
  viewport?: any
  onHoverStart?: () => void
  onHoverEnd?: () => void
  style?: any
  [key: string]: any
}

// Simple motion component that applies CSS transitions
export const motion = {
  div: forwardRef<HTMLDivElement, MotionProps>(
    (
      { children, className, initial, animate, transition, whileHover, onHoverStart, onHoverEnd, style, ...props },
      ref,
    ) => {
      const combinedStyle = {
        ...style,
        transition: transition ? `all ${transition.duration || 0.3}s ${transition.ease || "ease"}` : undefined,
        transform: animate?.y !== undefined ? `translateY(${animate.y}px)` : undefined,
        opacity: animate?.opacity,
      }

      return (
        <div
          ref={ref}
          className={className}
          style={combinedStyle}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          {...props}
        >
          {children}
        </div>
      )
    },
  ),
}
