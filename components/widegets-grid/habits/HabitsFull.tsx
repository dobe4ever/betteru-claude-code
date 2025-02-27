// components/widegets-grid/habits/HabitsFull.tsx

"use client"

import type React from "react"
import { useState } from "react"
import { ChallengeCard } from "./ChallengeCard"
import { HabitsList } from "./HabitsList"

interface HabitCard {
  id: string
  title: string
  completed: boolean
}

export const HabitsFull: React.FC = () => {
  const [cards, setCards] = useState<HabitCard[]>([
    { id: "1", title: "Morning Meditation", completed: false },
    { id: "2", title: "Read for 30 minutes", completed: true },
    { id: "3", title: "Exercise", completed: false },
    { id: "4", title: "Write in journal", completed: false },
    { id: "5", title: "Drink 8 glasses of water", completed: true },
    { id: "6", title: "Morning Meditation", completed: false },
    { id: "7", title: "Read for 30 minutes", completed: true },
    { id: "8", title: "Exercise", completed: false },
    { id: "9", title: "Write in journal", completed: false },
    { id: "10", title: "Drink 8 glasses of water", completed: true },
  ])

   const handleAddCard = (title: string) => {
    setCards([...cards, { id: String(Date.now()), title, completed: false }])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <div className="flex-none text-title-white pl-4">Habits</div>
      
      {/* Challenge Card */}
      <div className="flex-none p-3">
        <ChallengeCard />
      </div>
      
      {/* Habits List - takes remaining height */}
      <div className="flex-1 min-h-0">
        <HabitsList cards={cards} onAddCard={handleAddCard} />
      </div>
    </div>
  )
}

