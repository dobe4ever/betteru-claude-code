// components/ui/modal/ModalFull.tsx

import { useEffect, useRef, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CrossBtnProps {
  onClick: () => void
}

export function CrossBtn({ onClick }: CrossBtnProps) {
  return (
    <div className="[&_svg]:size-5">
      <Button variant="ghost" size="icon" className="text-white" onClick={onClick}>
        <X strokeWidth={3} />
      </Button>
    </div>
  )
}

interface ModalFullProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export const ModalFull = ({ isOpen, onClose, children, title }: ModalFullProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  // Close when clicking outside content (optional)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed inset-0 bg-gradient-orange" onClick={handleBackdropClick}>
            <div className="fixed right-3 top-3 z-10">
              <CrossBtn onClick={onClose} />
            </div>
            
            {title && (
              <div className="fixed left-4 top-3 z-10">
                <h2 className="text-title-white text-xl font-semibold">{title}</h2>
              </div>
            )}

            <motion.div 
              className="fixed top-0 right-0 left-0 bottom-0 pt-12 overflow-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              ref={contentRef}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

