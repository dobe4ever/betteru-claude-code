// components/widegets-grid/habits/HabitsModal.tsx

"use client"

import type React from "react"
import { ChallengeCard } from "./ChallengeCard"
import { HabitsList } from "./HabitsList"
import { HabitsProvider } from "./HabitsContext"

export const HabitsModal: React.FC = () => {
  return (
    <HabitsProvider>
      <div className="flex flex-col h-full">
        {/* Challenge Card */}
        <div className="flex-none p-3">
          <ChallengeCard />
        </div>
        
        {/* Habits List - takes remaining height */}
        <div className="flex-1 min-h-0">
          <HabitsList />
        </div>
      </div>
    </HabitsProvider>
  )
}