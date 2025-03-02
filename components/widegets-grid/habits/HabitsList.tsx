// components/widegets-grid/habits/HabitsList.tsx

"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HabitCard } from "./HabitCard"
import { DateNavigation } from "./DateNavigation"
import { CircleButton } from "@/components/ui/custom-components/custom-buttons"

// Define Habit type
export interface Habit {
  id: string
  title: string
  completed: boolean
  pinned?: boolean
  hasAlarm?: boolean
  repeating?: boolean
  streak?: number
  days?: string[] // Days of week for repeating habits
  time?: string // Time for alarm
}

// Mock initial data
const initialHabits: Habit[] = [
  { id: "1", title: "Morning Meditation", completed: false, streak: 3, pinned: true },
  { id: "2", title: "Read for 30 minutes", completed: true, streak: 7 },
  { id: "3", title: "Exercise", completed: false, streak: 0, hasAlarm: true, time: "07:00" },
  { id: "4", title: "Write in journal", completed: false, streak: 1 },
  { id: "5", title: "Drink 8 glasses of water", completed: true, streak: 12, repeating: true },
  { id: "6", title: "Practice coding", completed: false, streak: 5 },
  { id: "7", title: "Yoga practice", completed: true, streak: 2 },
  { id: "8", title: "Call a friend", completed: false, streak: 0 },
  { id: "9", title: "Plan tomorrow", completed: false, streak: 4 },
  { id: "10", title: "Take vitamins", completed: true, streak: 20, pinned: true },
]

// Create a global variable to store habits state across components
// Using a global object is simpler than context for this case
export const habitsData = {
  habits: [...initialHabits],
  todayCompletedCount: initialHabits.filter(h => h.completed).length,
  todayTotalCount: initialHabits.length,
  completionPercentage: Math.round((initialHabits.filter(h => h.completed).length / initialHabits.length) * 100),
  
  // Methods to manipulate habits
  addHabit: (title: string) => {
    const newHabit: Habit = {
      id: String(Date.now()),
      title,
      completed: false,
      streak: 0
    }
    habitsData.habits.push(newHabit)
    habitsData.updateStats()
    return newHabit
  },
  
  toggleCompleted: (id: string) => {
    const habit = habitsData.habits.find(h => h.id === id)
    if (habit) {
      habit.completed = !habit.completed
      // Update streak if completed
      if (habit.completed) {
        habit.streak = (habit.streak || 0) + 1
      }
      habitsData.updateStats()
    }
  },
  
  updateHabit: (id: string, updates: Partial<Habit>) => {
    const habit = habitsData.habits.find(h => h.id === id)
    if (habit) {
      Object.assign(habit, updates)
      habitsData.updateStats()
    }
  },
  
  deleteHabit: (id: string) => {
    const index = habitsData.habits.findIndex(h => h.id === id)
    if (index !== -1) {
      habitsData.habits.splice(index, 1)
      habitsData.updateStats()
    }
  },
  
  updateStats: () => {
    const total = habitsData.habits.length
    const completed = habitsData.habits.filter(habit => habit.completed).length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    
    habitsData.todayCompletedCount = completed
    habitsData.todayTotalCount = total
    habitsData.completionPercentage = percentage
  }
}

export function HabitsList() {
  const [habits, setHabits] = useState<Habit[]>(habitsData.habits)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCompleted, setShowCompleted] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState("")
  
  // Force re-render when habits change
  useEffect(() => {
    setHabits([...habitsData.habits])
  }, [habitsData.habits.length])
  
  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      habitsData.addHabit(newCardTitle)
      setHabits([...habitsData.habits])
      setNewCardTitle("")
      setIsAdding(false)
    }
  }

  const handleMenuSelect = () => {
    setIsAdding(true)
  }
  
  // Filter habits based on the showCompleted state
  const filteredHabits = showCompleted 
    ? habits // Show all habits
    : habits.filter(habit => !habit.completed) // Show only incomplete habits

  return (
    // Habits list container
    <div className="flex flex-col h-full bg-white border rounded-2xl">
      <CircleButton
        variant="plus"
        onClick={handleMenuSelect}>
      </CircleButton>

      {/* Header */}
      <div className="flex-none p-3 space-y-2 rounded-t-3xl">
        <DateNavigation 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate}
        />
      </div>

      {/* Scrollable content */}
      <div className="mb-4 flex-1 overflow-y-auto min-h-0">
        <div className="p-2">
          {filteredHabits.map((habit) => (
            <HabitCard 
              key={habit.id}
              habit={habit}
              onToggleCompleted={() => {
                habitsData.toggleCompleted(habit.id)
                setHabits([...habitsData.habits])
              }}
              onUpdateHabit={(updates) => {
                habitsData.updateHabit(habit.id, updates)
                setHabits([...habitsData.habits])
              }}
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
      <div className="flex flex-row justify-between items-center p-3">
        <div>
          {/* Add Menu Placeholder */}
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