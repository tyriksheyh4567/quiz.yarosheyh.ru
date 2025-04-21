"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("relative w-full", className)} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

export const ChartHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4", className)} {...props} />
  },
)
ChartHeader.displayName = "ChartHeader"

export const ChartTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  },
)
ChartTitle.displayName = "ChartTitle"

export const ChartDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  },
)
ChartDescription.displayName = "ChartDescription"

export const ChartLegend = React.forwardRef<
  HTMLDivElement,
  { categories: { name: string; color: string }[] } & React.HTMLAttributes<HTMLDivElement>
>(({ className, categories, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center space-x-2", className)} {...props}>
      {categories.map((category) => (
        <div key={category.name} className="flex items-center space-x-1">
          <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />
          <span className="text-sm text-muted-foreground">{category.name}</span>
        </div>
      ))}
    </div>
  )
})
ChartLegend.displayName = "ChartLegend"

export const ChartBars = React.forwardRef<
  SVGSVGElement,
  {
    data: any[]
    xAxis: (d: any) => string
    yAxis: (d: any) => number
    categories: {
      name: string
      getValue: (d: any) => number
      color: string
    }[]
  } & React.SVGAttributes<SVGSVGElement>
>(({ className, data, xAxis, yAxis, categories, children, ...props }, ref) => {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const [tooltip, setTooltip] = React.useState<{
    x: number
    y: number
    content: string
  } | null>(null)

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return

    const rect = svg.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setTooltip({
      x,
      y,
      content: `X: ${x}, Y: ${y}`,
    })
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  return (
    <svg
      ref={ref || svgRef}
      viewBox={`0 0 100 100`}
      className={cn("w-full h-full", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {data.map((item, index) => (
        <React.Fragment key={index}>
          {categories.map((category, categoryIndex) => {
            const value = category.getValue(item)
            const barHeight = (value / yAxis(item)) * 100
            const xPos = (index / data.length) * 100 + categoryIndex * (100 / data.length / categories.length)
            const barWidth = 100 / data.length / categories.length

            const childElement = React.Children.toArray(children)[0]
            if (!React.isValidElement(childElement)) return null
            return React.cloneElement(childElement, {
              x: xPos,
              y: 100 - barHeight,
              width: barWidth,
              height: barHeight,
              fill: category.color,
              data: item,
              xAxis: xAxis(item),
              yAxis: value,
              key: `${index}-${categoryIndex}`,
            })
          })}
        </React.Fragment>
      ))}
      {tooltip && (
        <foreignObject x={tooltip.x} y={tooltip.y} width="100" height="50">
          <div className="bg-white border border-gray-200 rounded-md shadow-md p-2">{tooltip.content}</div>
        </foreignObject>
      )}
    </svg>
  )
})
ChartBars.displayName = "ChartBars"

export const ChartBar = React.forwardRef<
  SVGRectElement,
  React.SVGAttributes<SVGRectElement> & {
    x: number
    y: number
    width: number
    height: number
    fill: string
    data: any
    xAxis: string
    yAxis: number
  }
>(({ className, x, y, width, height, fill, ...props }, ref) => {
  return <rect ref={ref} x={x} y={y} width={width} height={height} fill={fill} {...props} />
})
ChartBar.displayName = "ChartBar"

export const ChartTooltip = () => null
