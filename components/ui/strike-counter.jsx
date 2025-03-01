// components/ui/strike-counter.jsx
"use client"

import { cn } from '@/lib/utils'

export function StrikeCounter({ count = 0, className, onClick }) {
  // Removed animation and other features you don't want

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
        "flex items-center",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : "presentation"}
      aria-label={onClick ? `Streak counter: ${count}` : undefined}
    >
      <span className={cn("text-sm sm:text-lg font-bold", getColor())}>
        {count}
      </span>
      <span className="ml-1 text-sm sm:text-base">🔥</span>
    </div>
  )
}