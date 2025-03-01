// components/widegets-grid/habits/HabitsModal.tsx

"use client"

import type React from "react"
import { ChallengeCard } from "./ChallengeCard"
import { HabitsList } from "./HabitsList"
// Removed HabitsProvider import - we'll use the one from the parent component

export const HabitsModal: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Challenge Card */}
      <div className="flex-none px-2">
        <ChallengeCard />
      </div>
      
      {/* Habits List - takes remaining height */}
      <div className="flex-1 min-h-0">
        <HabitsList />
      </div>
    </div>
  )
}