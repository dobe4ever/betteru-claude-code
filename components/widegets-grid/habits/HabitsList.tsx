// components/widegets-grid/habits/HabitsList.tsx

"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HabitCard } from "./HabitCard"
import { AddMenu } from "./AddMenu"
import { DateNavigation } from "./DateNavigation"
import { useHabits } from "./HabitsContext"

export function HabitsList() {
  const { habits, addHabit } = useHabits()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCompleted, setShowCompleted] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState("")
  
  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addHabit(newCardTitle)
      setNewCardTitle("")
      setIsAdding(false)
    }
  }

  const handleMenuSelect = (option: string) => {
    setIsAdding(true)
  }
  
  // Filter habits based on the showCompleted state
  const filteredHabits = showCompleted 
    ? habits // Show all habits
    : habits.filter(habit => !habit.completed) // Show only incomplete habits

  return (
    <div className="flex flex-col h-full bg-white border rounded-3xl">
      {/* Header */}
      <div className="flex-none p-3 space-y-2 rounded-t-3xl">
        <DateNavigation 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate}
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-2">
          {filteredHabits.map((habit) => (
            <HabitCard 
              key={habit.id}
              habit={habit}
            />
          ))}
          {isAdding && (
            <div className="m-2">
              <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
                placeholder="Enter habit title..."
                className="w-full p-2 rounded focus:ring-blue-500"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-row justify-between items-center bg-white">
        <div>
          <AddMenu onSelect={handleMenuSelect} />
        </div>
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowCompleted(!showCompleted)} 
            className="p-1"
            title={showCompleted ? "Hide completed habits" : "Show completed habits"}
          >
            {showCompleted ? (
              <Eye className="h-5 w-5 text-gray-600" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

