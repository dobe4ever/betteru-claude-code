// components/ui/modal/ModalFull.tsx
"use client"

import { ReactNode } from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

interface ModalFullProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export const ModalFull = ({ isOpen, onClose, children, title }: ModalFullProps) => {
  // Custom implementation to avoid double X button and background issues
  return (
    <SheetPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <SheetPrimitive.Portal>
        {/* Transparent overlay that fades in/out */}
        <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Modal content that slides from bottom - with slower animation */}
        <SheetPrimitive.Content 
          className="fixed inset-x-0 bottom-0 z-50 h-[100dvh] overflow-auto bg-gradient-orange 
            data-[state=open]:animate-in data-[state=closed]:animate-out 
            data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom
            data-[state=closed]:duration-300 data-[state=open]:duration-400
            border-0 p-0 shadow-lg"
        >
          {/* Fixed header */}
          <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-3 py-2 z-10">
            {title && (
              <h2 className="text-title-white text-lg font-semibold m-0 p-0">
                {title}
              </h2>
            )}
            
            {/* Custom close button without the default one */}
            <button 
              className="text-white outline-none focus:outline-none hover:opacity-80 p-0"
              onClick={() => onClose()}
            >
              <X className="h-5 w-5" strokeWidth={3} />
              <span className="sr-only">Close</span>
            </button>
          </div>
          
          {/* Content with padding to account for the fixed header */}
          <div className="pt-10 h-full">
            {children}
          </div>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  )
}

// Export CrossBtn for backward compatibility if needed
interface CrossBtnProps {
  onClick: () => void
}

export function CrossBtn({ onClick }: CrossBtnProps) {
  return (
    <button 
      className="text-white outline-none hover:opacity-80 p-0"
      onClick={onClick}
    >
      <X className="h-5 w-5" strokeWidth={3} />
    </button>
  )
}

