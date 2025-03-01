// components/widegets-grid/habits/HabitSettingsDialog.tsx

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
  DialogTrigger,
  DialogPortal,
  DialogOverlay
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useHabits, type Habit } from "./HabitsContext"

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
  
  // Create a custom Dialog that won't close when clicking inside
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
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
  
  // Helper function to safely control dialog state
  const safelyOpenDialog = (e: { stopPropagation: () => void }) => {
    e.stopPropagation(); // Stop event from bubbling to parent containers
    setIsDialogOpen(true);
  };

  const safelyCloseDialog = () => {
    // Give time for any state changes to complete before closing dialog
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 0);
  };

  return (
    <Dialog 
      open={isDialogOpen} 
      onOpenChange={(open) => {
        if (!open) {
          safelyCloseDialog();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600 touch-target"
          onClick={safelyOpenDialog}
          aria-label="Edit habit settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay 
          className="fixed inset-0 z-[200] bg-black/30" 
          onClick={(e) => {
            // Stop propagation to prevent closing the parent modal
            e.stopPropagation();
          }} 
        />
        <DialogContent 
          className="fixed left-[50%] top-[50%] z-[200] translate-x-[-50%] translate-y-[-50%] bg-white rounded-3xl border shadow-lg p-4 w-[95%] max-w-sm [&>button]:hidden"
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent escape key closing
          onInteractOutside={(e) => {
            e.preventDefault(); // Keep dialog open on outside clicks
            e.stopPropagation(); // Stop propagation to parent modal
          }} 
          onClick={(e) => e.stopPropagation()} // Stop clicks inside dialog from bubbling
        >
        <DialogHeader className="flex flex-row items-center justify-between px-0 space-y-0">
          <DialogTitle className="text-title-orange">Edit Habit</DialogTitle>
          <DialogClose asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="border-0 hover:bg-orange-100 rounded-full h-8 w-8 p-1 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Habit Name Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-title-card">Habit Name</Label>
              {habit && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 p-1 h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (habit && window.confirm("Are you sure you want to delete this habit?")) {
                      deleteHabit(habit.id);
                      safelyCloseDialog();
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Input
              placeholder="e.g., Morning Meditation"
              className="text-description-card border-gray-200 rounded-3xl focus:ring-orange-500"
              value={habitTitle}
              onChange={(e) => setHabitTitle(e.target.value)}
            />
          </div>

          {/* Daily Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-title-card">Daily Habit</Label>
              <p className="text-description-card">Repeat this habit every day</p>
            </div>
            <Switch 
              checked={isDaily} 
              onCheckedChange={setIsDaily}
              className="data-[state=checked]:bg-orange-500" 
            />
          </div>

          {/* Weekly Schedule */}
          {!isDaily && (
            <div className="space-y-3">
              <Label className="text-title-card">Weekly Schedule</Label>
              <div className="flex gap-2">
                {Object.entries(selectedDays).map(([day, isSelected]) => (
                  <Button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day as keyof typeof selectedDays)}
                    className={cn(
                      "w-8 h-8 rounded-full text-description-card transition-colors",
                      isSelected 
                        ? "bg-orange-500 text-white" 
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    )}
                  >
                    {day.charAt(0).toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Time Picker */}
          <div className="space-y-2">
            <Label className="text-title-card">Reminder Time</Label>
            <Input
              type="time"
              className="text-title-card border-gray-200 rounded-3xl focus:ring-orange-500"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-title-card">Notes</Label>
            <Textarea
              placeholder="Add any notes or tips to help you with this habit..."
              className="text-description-card border-gray-200 rounded min-h-[100px] focus:ring-orange-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="sm:justify-center mt-4">
            <Button
              type="button"
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={(e) => {
                e.stopPropagation();
                if (habit) {
                  // Get the selected days as an array
                  const selectedDaysArray = Object.entries(selectedDays)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([day]) => day);
                  
                  updateHabit(habit.id, {
                    title: habitTitle,
                    time: timeValue,
                    days: isDaily ? [] : selectedDaysArray
                  });
                  
                  // Only close the dialog when explicitly saving
                  safelyCloseDialog();
                }
              }}
            >
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

