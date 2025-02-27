// components/ui/modal/ModalFull.tsx

import type React from "react"
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
  onClose: () => void
  children: React.ReactNode
}

export const ModalFull: React.FC<ModalFullProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 items-center bg-gradient-orange border z-50">
      <div className="fixed right-3 top-3">
        <CrossBtn onClick={onClose} />
      </div>

      <div className="fixed top-6 right-0 left-0 bottom-0">{children}</div>
    </div>
  )
}

