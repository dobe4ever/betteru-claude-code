// components/widegets-grid/habits/DateNavigation.tsx

"use client"


import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DateNavigation({
  selectedDate,
  onDateChange,
}: { selectedDate: Date; onDateChange: (date: Date) => void }) {
  const [dates, setDates] = useState<Date[]>([])

  useEffect(() => {
    const today = new Date()
    const newDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      return date
    }).reverse()
    setDates(newDates)
  }, [])

  const navigateDate = (direction: "prev" | "next") => {
    const currentIndex = dates.findIndex((date) => date.toDateString() === selectedDate.toDateString())
    if (direction === "prev" && currentIndex > 0) {
      onDateChange(dates[currentIndex - 1])
    } else if (direction === "next" && currentIndex < dates.length - 1) {
      onDateChange(dates[currentIndex + 1])
    }
  }

  return (
    <div className="flex flex-col text-title items-center space-y-2 border-b p-3 pb-6 rounded-t-2xl">
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateDate("prev")}
          disabled={selectedDate.toDateString() === dates[0]?.toDateString()}
        >
          <ChevronRight className=" rotate-180" />
        </Button>
        <span className="text-title-card font-bold">
          {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateDate("next")}
          disabled={selectedDate.toDateString() === dates[dates.length - 1]?.toDateString()}
        >
          <ChevronRight className="" />
        </Button>
      </div>
      <div className="flex space-x-3">
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            className={`size-3 rounded-full transition-colors ${
              date.toDateString() === selectedDate.toDateString() ? "bg-orange-500" : "bg-gray-300"
            }`}
            onClick={() => onDateChange(date)}
            aria-label={date.toLocaleDateString()}
          />
        ))}
      </div>
            
      
    </div>
  )
}

