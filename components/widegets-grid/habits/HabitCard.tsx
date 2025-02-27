"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Check, Flame, Pin, AlarmClock, Repeat, Star, ChevronDown, Pen, Trash2, Settings, X, Clock } from "lucide-react"
import { HabitSettingsModal } from "./HabitSettingsModal"
import { CircleButton } from "@/components/ui/custom-components/custom-buttons"
import { StrikeCounter } from "@/components/ui/strike-counter"


interface HabitCardProps {
  title: string
  key: string
}

export function HabitCard({ title }: HabitCardProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [strikeCount, setStrikeCount] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleCompleted = () => setIsCompleted((prev) => !prev)
  const incrementStrike = () => setStrikeCount((prev) => prev + 1)

  return (
    <>
      <div className="w-full mx-auto relative">

        <div className="bg-white rounded-2xl p-3 border shadow-md mb-2">

          <div className="flex flex-row items-center w-full">

            {/* Left Column - Checkmark */}
            <div className="flex items-center">
              <button
                onClick={toggleCompleted}
                className={`group flex items-center justify-center w-[40px] h-[40px] stroke-[4] rounded-full border transition-all duration-300 
                  ${
                    isCompleted ? "border text-orange-500" : "border text-gray-100"
                  }`}
              >
                <Check
                  className={`w-10 h-10 transition-transform duration-300 ${isCompleted ? "scale-100" : "scale-50 text-gray-100 group-hover:scale-90"}`}
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
                  <span className={`text-title-card transition-all duration-300 ${isCompleted ? "text-gray-300" : "text-gray-800"}`}>
                    {title}
                  </span>

                  {/* Pen & trash -> row */}
                  <div className="flex-row gap-2">
                   
                  </div>

                </div>
              </div>

              {/* Action Icons -> row */}
              <div className="flex-row gap-2 text-gray-300">
                <Button variant="icon">
                  <Pin />
                </Button>
                <Button variant="icon">
                  <AlarmClock />
                </Button>
                <Button variant="icon">
                  <Repeat />
                </Button>
                <Button variant="icon">
                  <Star />
                </Button>

                <Button
                  onClick={() => setIsSettingsOpen(true)}
                  variant="icon"
                >
                  <Settings />
                </Button>

                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant="icon"
                >
                  <ChevronDown
                    variant="icon"
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </Button>

              </div>
            </div>

            {/* Right Column - Strike Counter */}
            <div>
              <StrikeCounter/>
            </div>
          </div>

          {/* Expandable Content */}
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 mt-6" : "max-h-0"}`}>
            <div className="border-t border-gray-100 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-sm">Due Date</span>
                  <span className="text-sm font-medium">Tomorrow, 2:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-sm">Priority</span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-3xl text-sm font-medium">High</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-sm">Status</span>
                  <span className="text-sm font-medium">In Progress</span>
                </div>
                <p className="text-sm text-gray-600">
                  Review the latest design changes for the dashboard interface. Prepare feedback and suggestions for
                  improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Settings Modal */}
      <HabitSettingsModal 
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </>
  )
}

