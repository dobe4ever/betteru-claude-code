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
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow transition-all duration-200">
        <div className="flex items-center w-full gap-3">
          {/* Left Column - Checkmark */}
          <div className="flex-none">
            <button
              onClick={handleToggleCompleted}
              className={cn(
                "group flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300",
                habit.completed 
                  ? "border-orange-500 text-orange-500 bg-orange-50" 
                  : "border-gray-200 text-gray-200 hover:border-gray-300 hover:text-gray-300"
              )}
              aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <Check
                className={cn(
                  "w-6 h-6 transition-transform duration-300",
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
                "text-base font-medium truncate transition-colors duration-300",
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
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center -ml-1.5 space-x-1">
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleTogglePin}
              className={cn(
                "h-8 w-8 p-1 rounded-full",
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
                "h-8 w-8 p-1 rounded-full",
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
                "h-8 w-8 p-1 rounded-full",
                getIconColor(habit.repeating || false)
              )}
              aria-label={habit.repeating ? "Make non-repeating" : "Make repeating"}
            >
              <Repeat className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-1 rounded-full text-gray-300 hover:text-gray-500"
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
              className="h-8 w-8 p-1 rounded-full text-gray-400 hover:text-gray-600"
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
          <div className="border-t border-gray-100 mt-3 pt-3">
            <div className="space-y-3 px-1">
              {habit.hasAlarm && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-sm font-medium">Reminder Time</span>
                  <span className="text-sm bg-gray-50 px-3 py-1 rounded-full">
                    {habit.time || "Not set"}
                  </span>
                </div>
              )}
              
              {habit.repeating && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-sm font-medium">Repeats On</span>
                  <span className="text-sm bg-gray-50 px-3 py-1 rounded-full">
                    {habit.days?.join(", ") || "Every day"}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm font-medium">Current Streak</span>
                <span className="text-sm font-medium bg-orange-50 text-orange-600 px-3 py-1 rounded-full">
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