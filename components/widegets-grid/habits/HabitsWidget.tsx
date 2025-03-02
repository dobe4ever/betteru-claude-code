// components/widegets-grid/habits/HabitsWidget.tsx

"use client"

import { Widget } from "@/components/widegets-grid/widget"
import { habitsData } from "./HabitsList"
import { useEffect, useState } from "react"

// HabitsWidget component
export function HabitsWidget({ onHabitsClick }: { onHabitsClick: () => void }) {
  const [stats, setStats] = useState({
    todayCompletedCount: habitsData.todayCompletedCount,
    todayTotalCount: habitsData.todayTotalCount,
    completionPercentage: habitsData.completionPercentage
  })
  
  // Update stats when they change
  useEffect(() => {
    // Poll for changes in habitsData
    const interval = setInterval(() => {
      if (stats.todayCompletedCount !== habitsData.todayCompletedCount ||
          stats.todayTotalCount !== habitsData.todayTotalCount ||
          stats.completionPercentage !== habitsData.completionPercentage) {
        setStats({
          todayCompletedCount: habitsData.todayCompletedCount,
          todayTotalCount: habitsData.todayTotalCount,
          completionPercentage: habitsData.completionPercentage
        })
      }
    }, 500)
    
    return () => clearInterval(interval)
  }, [stats])
  
  return (
    <Widget title="Today's Habits" onClick={onHabitsClick} className="z-10">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-description-card">Completed</p>
          <p className="text-xl font-bold">{stats.todayCompletedCount}/{stats.todayTotalCount}</p>
        </div>
        <p className="text-big-percent-number">{stats.completionPercentage}%</p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          style={{ width: `${stats.completionPercentage}%`, transition: "width 1s ease-in-out" }}
        />
      </div>
    </Widget>
  )
}