// components/widegets-grid/habits/HabitsContext.tsx

"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

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

interface HabitsContextType {
  habits: Habit[]
  todayCompletedCount: number
  todayTotalCount: number
  completionPercentage: number
  addHabit: (title: string) => void
  toggleCompleted: (id: string) => void
  updateHabit: (id: string, updates: Partial<Habit>) => void
  deleteHabit: (id: string) => void
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined)

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

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits)
  const [todayCompletedCount, setTodayCompletedCount] = useState(0)
  const [todayTotalCount, setTodayTotalCount] = useState(0)
  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    // Calculate completion stats
    const total = habits.length
    const completed = habits.filter(habit => habit.completed).length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    
    setTodayCompletedCount(completed)
    setTodayTotalCount(total)
    setCompletionPercentage(percentage)
  }, [habits])

  const addHabit = (title: string) => {
    const newHabit: Habit = {
      id: String(Date.now()),
      title,
      completed: false,
      streak: 0
    }
    setHabits(prev => [...prev, newHabit])
  }

  const toggleCompleted = (id: string) => {
    setHabits(prev => 
      prev.map(habit => 
        habit.id === id
          ? { 
              ...habit, 
              completed: !habit.completed,
              // Update streak if completed
              streak: !habit.completed ? (habit.streak || 0) + 1 : habit.streak
            }
          : habit
      )
    )
  }

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => 
      prev.map(habit => 
        habit.id === id
          ? { ...habit, ...updates }
          : habit
      )
    )
  }

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id))
  }

  return (
    <HabitsContext.Provider
      value={{
        habits,
        todayCompletedCount,
        todayTotalCount,
        completionPercentage,
        addHabit,
        toggleCompleted,
        updateHabit,
        deleteHabit
      }}
    >
      {children}
    </HabitsContext.Provider>
  )
}

export const useHabits = () => {
  const context = useContext(HabitsContext)
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitsProvider")
  }
  return context
}