// components/widgets-grid/habits/habit-settings-dialog.tsx

"use client"

import { useState, useEffect } from "react"
import { Check, X, Settings, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useHabits, type Habit } from "./habits-context"

interface HabitSettingsDialogProps {
  habit?: Habit
}

export function HabitSettingsDialog({ habit }: HabitSettingsDialogProps) {
  const { updateHabit, deleteHabit } = useHabits()
  
  const [habitTitle, setHabitTitle] = useState(habit?.title || "")
  const [isDaily, setIsDaily] = useState(true)
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false,
  })
  const [timeValue, setTimeValue] = useState(habit?.time || "06:00")
  const [notes, setNotes] = useState("")
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Update form when habit changes
  useEffect(() => {
    if (habit) {
      setHabitTitle(habit.title)
      setTimeValue(habit.time || "06:00")
      setIsDaily(!habit.days || habit.days.length === 0)
      
      // If we have specific days, update the selectedDays state
      if (habit.days && habit.days.length > 0) {
        const newDaysState = { ...selectedDays }
        Object.keys(newDaysState).forEach(day => {
          newDaysState[day as keyof typeof selectedDays] = habit.days!.includes(day)
        })
        setSelectedDays(newDaysState)
      }
    }
  }, [habit, isDialogOpen])
  
  const handleDayToggle = (day: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }
  
  const handleSave = () => {
    if (!habit) return
    
    // Get the selected days as an array
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day)
    
    updateHabit(habit.id, {
      title: habitTitle,
      time: timeValue,
      days: isDaily ? [] : selectedDaysArray
    })
    
    setIsDialogOpen(false)
  }
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 rounded-full text-gray-300 hover:text-gray-500 touch-target"
          aria-label="Edit habit settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="bg-white rounded-3xl border-none shadow-lg w-[95%] max-w-sm mx-auto p-4 sm:p-5 [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="mb-1">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-orange-500">Edit Habit</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsDialogOpen(false)}
              className="h-9 w-9 touch-target rounded-full hover:bg-orange-50 hover:text-orange-500"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form className="space-y-4 sm:space-y-5 mt-1 sm:mt-2" onSubmit={(e) => e.preventDefault()}>
          {/* Habit Name Input */}
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-gray-700 font-medium text-sm sm:text-base">Habit Name</Label>
              {habit && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 h-9 w-9 p-0 touch-target rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    if (habit && window.confirm("Are you sure you want to delete this habit?")) {
                      deleteHabit(habit.id);
                      setIsDialogOpen(false);
                    }
                  }}
                  aria-label="Delete habit"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Input
              placeholder="e.g., Morning Meditation"
              className="rounded-xl border-gray-200 focus-visible:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              value={habitTitle}
              onChange={(e) => setHabitTitle(e.target.value)}
            />
          </div>

          {/* Daily Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-700 font-medium text-sm sm:text-base">Daily Habit</Label>
              <p className="text-gray-500 text-xs sm:text-sm">Repeat this habit every day</p>
            </div>
            <Switch 
              checked={isDaily} 
              onCheckedChange={setIsDaily}
              className="data-[state=checked]:bg-orange-500" 
            />
          </div>

          {/* Weekly Schedule */}
          {!isDaily && (
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-gray-700 font-medium text-sm sm:text-base">Weekly Schedule</Label>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {Object.entries(selectedDays).map(([day, isSelected]) => (
                  <Button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day as keyof typeof selectedDays)}
                    className={cn(
                      "rounded-full text-xs sm:text-sm font-medium transition-colors min-w-[34px] sm:min-w-[38px] h-9 sm:h-10 touch-target",
                      isSelected 
                        ? "bg-orange-500 text-white hover:bg-orange-600" 
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    )}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Time Picker */}
          <div className="space-y-1 sm:space-y-2">
            <Label className="text-gray-700 font-medium text-sm sm:text-base">Reminder Time</Label>
            <Input
              type="time"
              className="rounded-xl border-gray-200 focus-visible:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-1 sm:space-y-2">
            <Label className="text-gray-700 font-medium text-sm sm:text-base">Notes</Label>
            <Textarea
              placeholder="Add any notes or tips to help you with this habit..."
              className="rounded-xl border-gray-200 min-h-[60px] sm:min-h-[80px] focus-visible:ring-orange-500 text-sm sm:text-base"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="pt-1 sm:pt-2">
            <Button
              type="button"
              className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl py-2 sm:py-3 h-auto touch-target text-sm sm:text-base"
              onClick={handleSave}
            >
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}