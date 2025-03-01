// components/widgets-grid/habits/habits-card.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Pin, AlarmClock, Repeat, Star, ChevronDown, Settings } from "lucide-react"
import { HabitSettingsDialog } from "./habit-settings-dialog"
import { StrikeCounter } from "@/components/ui/strike-counter"
import { useHabits, type Habit } from "./habits-context"
import { cn } from "@/lib/utils"

interface HabitCardProps {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  const { toggleCompleted, updateHabit } = useHabits()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleCompleted = () => {
    toggleCompleted(habit.id)
  }
  
  const handleTogglePin = () => {
    updateHabit(habit.id, { pinned: !habit.pinned })
  }
  
  const handleToggleAlarm = () => {
    updateHabit(habit.id, { hasAlarm: !habit.hasAlarm })
  }
  
  const handleToggleRepeat = () => {
    updateHabit(habit.id, { repeating: !habit.repeating })
  }

  const getIconColor = (isActive: boolean) => 
    isActive ? "text-orange-500" : "text-gray-300 hover:text-gray-500"

  return (
    <div className="w-full mx-auto mb-3">
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm hover:shadow transition-all duration-200">
        <div className="flex items-center w-full gap-2 sm:gap-3">
          {/* Left Column - Checkmark */}
          <div className="flex-none">
            <button
              onClick={handleToggleCompleted}
              className={cn(
                "group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-all duration-300 touch-target",
                habit.completed 
                  ? "border-orange-500 text-orange-500 bg-orange-50" 
                  : "border-gray-200 text-gray-200 hover:border-gray-300 hover:text-gray-300"
              )}
              aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <Check
                className={cn(
                  "w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300",
                  habit.completed 
                    ? "scale-100" 
                    : "scale-75 group-hover:scale-90"
                )}
              />
            </button>
          </div>

          {/* Middle Column - Title */}
          <div className="flex-grow min-w-0">
            <h3 
              className={cn(
                "text-sm sm:text-base font-medium truncate transition-colors duration-300",
                habit.completed ? "text-gray-400" : "text-gray-800"
              )}
            >
              {habit.title}
            </h3>
          </div>

          {/* Right Column - Strike Counter */}
          <div className="flex-none">
            <StrikeCounter count={habit.streak || 0} />
          </div>
        </div>

        {/* Action Icons Row */}
        <div className="flex flex-wrap items-center justify-between mt-2 sm:mt-3">
          <div className="flex flex-wrap items-center space-x-1 sm:space-x-2">
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleTogglePin}
              className={cn(
                "h-9 w-9 p-0 rounded-full touch-target",
                getIconColor(habit.pinned || false)
              )}
              aria-label={habit.pinned ? "Unpin habit" : "Pin habit"}
            >
              <Pin className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleToggleAlarm}
              className={cn(
                "h-9 w-9 p-0 rounded-full touch-target",
                getIconColor(habit.hasAlarm || false)
              )}
              aria-label={habit.hasAlarm ? "Remove alarm" : "Set alarm"}
            >
              <AlarmClock className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleToggleRepeat}
              className={cn(
                "h-9 w-9 p-0 rounded-full touch-target",
                getIconColor(habit.repeating || false)
              )}
              aria-label={habit.repeating ? "Make non-repeating" : "Make repeating"}
            >
              <Repeat className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="h-9 w-9 p-0 rounded-full text-gray-300 hover:text-gray-500 touch-target"
              aria-label="Add to favorites"
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <HabitSettingsDialog habit={habit} />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-9 w-9 p-0 rounded-full text-gray-400 hover:text-gray-600 touch-target"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
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
          <div className="border-t border-gray-100 mt-2 sm:mt-3 pt-2 sm:pt-3">
            <div className="space-y-2 sm:space-y-3 px-1">
              {habit.hasAlarm && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-xs sm:text-sm font-medium">Reminder Time</span>
                  <span className="text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 rounded-full">
                    {habit.time || "Not set"}
                  </span>
                </div>
              )}
              
              {habit.repeating && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-xs sm:text-sm font-medium">Repeats On</span>
                  <span className="text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 rounded-full truncate max-w-[150px] sm:max-w-none">
                    {habit.days?.join(", ") || "Every day"}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-xs sm:text-sm font-medium">Current Streak</span>
                <span className="text-xs sm:text-sm font-medium bg-orange-50 text-orange-600 px-2 sm:px-3 py-1 rounded-full">
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