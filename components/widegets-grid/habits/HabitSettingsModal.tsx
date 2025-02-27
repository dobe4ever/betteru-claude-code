// components/widegets-grid/habits/HabitSettingsModal.tsx

"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Check, Flame, Pin, AlarmClock, Repeat, Star, ChevronDown, Pen, Trash2, Settings, X, Clock } from "lucide-react"

interface HabitSettingsModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function HabitSettingsModal({ isOpen = false, onOpenChange }: HabitSettingsModalProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(isOpen)
  const [isDaily, setIsDaily] = useState(true)
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false,
    }
  )
  
  const handleDayToggle = (day: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }
  // Use the props if provided, otherwise use local state
  const dialogOpen = onOpenChange ? isOpen : isSettingsOpen;
  
  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setIsSettingsOpen(open);
    }
  };
  
  return (
    <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
          <div className="bg-orange-50 p-4">
            <div className="flex justify-between items-center">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold text-gray-900">Edit Habit</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogCancel className="border-0 hover:bg-orange-100">
                <X className="w-5 h-5" />
              </AlertDialogCancel>
            </div>
          </div>

          <div className="p-4 space-y-6">
            {/* Habit Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Habit Name</label>
              <input
                type="text"
                placeholder="e.g., Morning Meditation"
                className="w-full px-3 py-2 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                defaultValue={''}
              />
            </div>

            {/* Daily Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Daily Habit</p>
                <p className="text-sm text-gray-500">Repeat this habit every day</p>
              </div>
              <Switch checked={isDaily} onCheckedChange={setIsDaily} className="data-[state=checked]:bg-orange-500" />
            </div>

            {/* Weekly Schedule */}
            {!isDaily && (
              <div className="space-y-3">
                <p className="font-medium text-gray-900">Weekly Schedule</p>
                <div className="flex gap-2">
                  {Object.entries(selectedDays).map(([day, isSelected]) => (
                    <Button
                      key={day}
                      onClick={() => handleDayToggle(day as keyof typeof selectedDays)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-colors
                        ${isSelected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                    >
                      {day.charAt(0).toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Time Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Reminder Time</label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  defaultValue="06:00"
                />
                <Clock className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                placeholder="Add any notes or tips to help you with this habit..."
              />
            </div>
          </div>

          {/* Footer */}
          <AlertDialogFooter>
            <Button
              onClick={() => handleOpenChange(false)}
              type="submit"
              className="w-full"
            >
              <Check/>
              Save Changes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}

