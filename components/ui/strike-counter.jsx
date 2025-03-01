// components/ui/strike-counter.jsx
"use client"

import { useState, useEffect } from 'react'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StrikeCounter({ count = 0, className, onClick }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayCount, setDisplayCount] = useState(count)

  // Update display count when prop count changes
  useEffect(() => {
    // If increasing, trigger animation
    if (count > displayCount) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }
    setDisplayCount(count)
  }, [count, displayCount])

  const handleClick = () => {
    if (onClick) {
      onClick()
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }

  // Determine color based on streak count
  const getColor = () => {
    if (count >= 30) return "text-red-500"
    if (count >= 15) return "text-orange-500"
    if (count >= 7) return "text-amber-500" 
    return "text-gray-400"
  }

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center",
        onClick && "cursor-pointer touch-target",
        className
      )}
      onClick={handleClick}
      role={onClick ? "button" : "presentation"}
      aria-label={onClick ? `Streak counter: ${displayCount}` : undefined}
    >
      <div className="flex items-center">
        <span className={cn("text-sm sm:text-lg font-bold", getColor())}>
          {displayCount}
        </span>
        <Flame className={cn("h-4 w-4 sm:h-5 sm:w-5 ml-0.5", getColor())} />
      </div>
      
      {isAnimating && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "animate-ping opacity-75 text-xs sm:text-sm",
                  getColor()
                )}
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1s'
                }}
              >
                🔥
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}