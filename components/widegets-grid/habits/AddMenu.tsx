// components/widegets-grid/habits/AddMenu.tsx

"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, Lightbulb, Plus, Bot } from "lucide-react"
import useDebounce from "@/hooks/use-debounce"
import type React from "react" // Import React

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  short?: string
  end?: string
}

interface SearchResult {
  actions: Action[]
}

const allActions = [
  {
    id: "1",
    label: "Suggested habit",
    icon: <PlusCircle className="h-4 w-4 text-green-500" />,
    description: "",
    short: "",
    end: "Habit",
  },
  {
    id: "2",
    label: "Suggested routine",
    icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
    description: "",
    short: "",
    end: "Routine",
  },
  {
    id: "3",
    label: "Ask AI",
    icon: <Bot className="h-4 w-4 text-blue-500" />,
    description: "",
    short: "",
    end: "Assistant",
  },
]

export function AddMenu({ actions = allActions }: { actions?: Action[] }) {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const debouncedQuery = useDebounce(query, 200)

  useEffect(() => {
    if (!isFocused) {
      setResult(null)
      return
    }

    if (!debouncedQuery) {
      setResult({ actions: allActions })
      return
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim()
    const filteredActions = allActions.filter((action) => {
      const searchableText = action.label.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })

    setResult({ actions: filteredActions })
  }, [debouncedQuery, isFocused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsTyping(true)
  }

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Reset selectedAction when focusing the input
  const handleFocus = () => {
    setSelectedAction(null)
    setIsFocused(true)
  }

  return (
    <div>
      {/* Sticky footer */}
      <div className="sticky bottom-0 left-0 right-0 p-3 bg- border-t rounded-b-3xl border-gray-100 z-50">
        <button
          onClick={() => setIsFocused(true)}
          className="w-full text-left px-3 py-2 text-gray-600 hover:bg- rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="text-title-card font-bold"> Add a card</span>
        </button>
      </div>

      {/* Search menu popup */}
      <AnimatePresence>
        {isFocused && result && !selectedAction && (
          <div className="fixed bottom-16 left-0 right-0 flex justify-center items-center z-50 px-3">
            <motion.div
              className="w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="p-2 border-b border-gray-100">
                <Input
                  type="text"
                  placeholder="Enter a title for this card..."
                  value={query}
                  onChange={handleInputChange}
                  autoFocus
                  className="w-full border-none focus:ring-0 text-sm"
                />
              </div>
              <motion.ul>
                {result.actions.map((action) => (
                  <motion.li
                    key={action.id}
                    className="px-3 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                    variants={item}
                    layout
                    onClick={() => setSelectedAction(action)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{action.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{action.label}</span>
                    </div>
                    <span className="text-xs text-gray-400">{action.end}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="p-2 border-t border-gray-100 flex justify-between items-center">
                <button onClick={() => setIsFocused(false)} className="text-sm text-gray-500 hover:text-gray-700">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

