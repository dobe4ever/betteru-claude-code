// components/widegets-grid/habits/ChallengeCard.tsx

"use client"

// ChallengeCard.tsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SetChallenge } from "./SetChallenge"

interface ChallengeCardProps {
  onStart?: (settings: { intensity: number; duration: number }) => void
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ onStart }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [intensity, setIntensity] = useState(25)
  const [duration, setDuration] = useState(1)

  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <motion.div
      layout
      className="w-full my-2 mx-auto bg-white rounded-3xl border shadow-md overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Collapsed State - Challenge Button */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div
            key="challenge-button"
            className="cursor-pointer"
            onClick={() => setIsExpanded(true)}
            exit={{ opacity: 0 }}
          >
            <div className="p-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    <span className="text-2xl">🔥</span>
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-title-orange">Start a Challenge!</h3>
                  <p className="text-gray-600">Push your limits, level up your game</p>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="w-12 h-12 rounded-full flex items-center justify-center"
              >
                <span className="text-2xl">🔥</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Expanded State - Challenge Setup */}
        {isExpanded && (
          <motion.div
            key="challenge-setup"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            

              <SetChallenge/>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ChallengeCard

