// components/widegets-grid/habits/HabitCard.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Pin, AlarmClock, Repeat, Star, ChevronDown } from "lucide-react"
import { HabitSettingsDialog } from "./HabitSettingsDialog"
import { StrikeCounter } from "@/components/ui/strike-counter"
import { useHabits, type Habit } from "./HabitsContext"

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

  return (
    <div className="w-full mx-auto relative">
      <div className="bg-white rounded-2xl p-3 border shadow-md mb-2">
        <div className="flex flex-row items-center w-full">

          {/* Left Column - Checkmark */}
          <div className="flex items-center">
            <button
              onClick={handleToggleCompleted}
              className={`group flex items-center justify-center w-[40px] h-[40px] stroke-[4] rounded-full border transition-all duration-300 
                ${habit.completed ? "border text-orange-500" : "border text-gray-100"}`}
            >
              <Check
                className={`w-10 h-10 transition-transform duration-300 ${habit.completed ? "scale-100" : "scale-50 text-gray-100 group-hover:scale-90"}`}
              />
            </button>
          </div>

          {/* Middle Column - Content */}
          <div className="boxcontent flex-grow py-0 mx-4">
            {/* (Title row) (Action icons row) */}
            <div className="flex flex-col gap-4">
              {/* (Title) (icons pen & trash) -> row */}
              <div className="flex flex-row gap-2 items-center ml-4">
                {/* Title */}
                <span className={`text-title-card transition-all duration-300 ${habit.completed ? "text-gray-300" : "text-gray-800"}`}>
                  {habit.title}
                </span>
              </div>
            </div>

            {/* Action Icons -> row */}
            <div className="flex-row gap-2 text-gray-300">
              <Button 
                variant="icon"
                onClick={handleTogglePin}
                className={habit.pinned ? "text-orange-500" : ""}
              >
                <Pin />
              </Button>
              <Button 
                variant="icon"
                onClick={handleToggleAlarm}
                className={habit.hasAlarm ? "text-orange-500" : ""}
              >
                <AlarmClock />
              </Button>
              <Button 
                variant="icon"
                onClick={handleToggleRepeat}
                className={habit.repeating ? "text-orange-500" : ""}
              >
                <Repeat />
              </Button>
              <Button variant="icon">
                <Star />
              </Button>

              <HabitSettingsDialog habit={habit} />

              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="icon"
              >
                <ChevronDown
                  className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>

          {/* Right Column - Strike Counter */}
          <div>
            <StrikeCounter count={habit.streak || 0} />
          </div>
        </div>

        {/* Expandable Content */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 mt-6" : "max-h-0"}`}>
          <div className="border-t border-gray-100 pt-4">
            <div className="space-y-4">
              {habit.hasAlarm && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-sm">Reminder Time</span>
                  <span className="text-sm font-medium">{habit.time || "Not set"}</span>
                </div>
              )}
              {habit.repeating && (
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-sm">Repeats On</span>
                  <span className="text-sm font-medium">
                    {habit.days?.join(", ") || "Every day"}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm">Current Streak</span>
                <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-3xl text-sm font-medium">
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

