// components/widegets-grid/habits/HabitCard.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Pin, AlarmClock, Repeat, ChevronDown, Settings } from "lucide-react"
import { HabitSettingsDialog } from "./HabitSettingsDialog"
import { cn } from "@/lib/utils"
import { Habit } from "./HabitsList"

interface HabitCardProps {
  habit: Habit
  onToggleCompleted: () => void
  onUpdateHabit: (updates: Partial<Habit>) => void
}

export function HabitCard({ habit, onToggleCompleted, onUpdateHabit }: HabitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // More compact design with minimal height
  return (
    <div className="w-full mx-auto mb-2 last:mb-0">
      <div className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center w-full gap-3">
          {/* Left - Checkmark */}
          <div className="flex-none">
            <button
              onClick={onToggleCompleted}
              className={cn(
                "group flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 touch-target",
                habit.completed 
                  ? "border-orange-500 text-orange-500 bg-orange-50" 
                  : "border-gray-200 text-gray-200 hover:border-gray-300 hover:text-gray-300"
              )}
              aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <Check
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  habit.completed 
                    ? "scale-100" 
                    : "scale-75 group-hover:scale-90"
                )}
              />
            </button>
          </div>

          {/* Middle - Title and Icons for active features */}
          <div className="flex-grow flex flex-col justify-center min-w-0">
            <h3 
              className={cn(
                "text-sm font-medium truncate transition-colors duration-300",
                habit.completed ? "text-gray-400" : "text-gray-800"
              )}
            >
              {habit.title}
            </h3>
            
            {/* Small visual indicators for active features */}
            <div className="flex items-center space-x-1 mt-0.5">
              {habit.pinned && (
                <Pin className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
              )}
              {habit.hasAlarm && (
                <AlarmClock className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
              )}
              {habit.repeating && (
                <Repeat className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
              )}
              {(habit.pinned || habit.hasAlarm || habit.repeating) && (
                <span className="text-xs text-gray-500 truncate flex-grow">
                  {habit.time && habit.hasAlarm ? habit.time : ''}
                </span>
              )}
            </div>
          </div>

          {/* Right - Controls and Streak */}
          <div className="flex items-center gap-1">
            {/* Streak counter */}
            <div className="flex items-center mr-0.5">
              <span className={cn(
                "text-sm font-bold",
                (habit.streak || 0) >= 30 ? "text-red-500" : 
                (habit.streak || 0) >= 15 ? "text-orange-500" : 
                (habit.streak || 0) >= 7 ? "text-amber-500" : "text-gray-400"
              )}>
                {habit.streak || 0}
              </span>
              <span className="ml-0.5 text-sm">🔥</span>
            </div>
            
            {/* Settings button */}
            <HabitSettingsDialog 
              habit={habit}
              onUpdateHabit={onUpdateHabit}
            />
            
            {/* Expand button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600 touch-target"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Expandable Content */}
        <div 
          className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="border-t border-gray-100 mt-2 pt-2">
            <div className="space-y-2 px-1">
              {habit.hasAlarm && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-xs font-medium">Reminder Time</span>
                  <span className="text-xs bg-gray-50 px-2 py-1 rounded-full">
                    {habit.time || "Not set"}
                  </span>
                </div>
              )}
              
              {habit.repeating && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-xs font-medium">Repeats On</span>
                  <span className="text-xs bg-gray-50 px-2 py-1 rounded-full truncate max-w-[150px]">
                    {habit.days?.join(", ") || "Every day"}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-xs font-medium">Current Streak</span>
                <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
                  {habit.streak || 0} days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}