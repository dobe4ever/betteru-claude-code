"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HabitCard } from "./HabitCard"
import { AddMenu } from "./AddMenu"
import { DateNavigation } from "./DateNavigation"

interface HabitCard {
  id: string
  title: string
  completed: boolean
}

interface HabitsListProps {
  cards: HabitCard[]
  onAddCard: (title: string) => void
}

export function HabitsList({ cards, onAddCard }: HabitsListProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isVisible, setIsVisible] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState("")

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(newCardTitle)
      setNewCardTitle("")
      setIsAdding(false)
    }
  }

  const handleMenuSelect = (option: string) => {
    setIsAdding(true)
  }

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
          {isVisible && cards.map((card) => (
            <HabitCard key={card.id} title={card.title} />
          ))}
          {isAdding && (
            <div className="m-2">
              <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
                placeholder="Enter card title..."
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
        <AddMenu />
      </div>
      <div>
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(!isVisible)} 
            className="p-1"
          >
            {isVisible ? (
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

