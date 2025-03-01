// app/page.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header/Header"
import { StickyTop } from "@/components/sticky-top/StickyTop"
import { WidgetsGrid } from "@/components/widegets-grid/WidgetsGrid"
import { ModalFull } from "@/components/ui/modal/ModalFull"
import { HabitsModal } from "@/components/widegets-grid/habits/HabitsModal"
import { HabitsProvider } from "@/components/widegets-grid/habits/HabitsContext"
import { TodosModal } from "@/components/widegets-grid/todos/TodosModal"
import { CheckinModal } from "@/components/widegets-grid/checkin/CheckinModal"
import { AnalyticsModal } from "@/components/widegets-grid/analytics/AnalyticsModal"
import { BadgesModal } from "@/components/widegets-grid/badges/BadgesModal"
import { ShopModal } from "@/components/widegets-grid/shop/ShopModal"
import { CoursesModal } from "@/components/widegets-grid/courses/CoursesModal"
import { WheelModal } from "@/components/widegets-grid/wheel/WheelModal"
import { CircleButton } from "@/components/ui/custom-components/custom-buttons"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ChatbotDrawer } from "@/components/floating-btn/ChatbotDrawer"

const modalTitles: Record<string, string> = {
  habits: "Habits",
  todos: "To-do List",
  checkin: "Check-in",
  analytics: "Analytics",
  wheel: "Rewards Wheel",
  badges: "Badges",
  shop: "Shop",
  courses: "Courses",
  chatbot: "Chat Assistant"
}

export default function Home() {
  const [fadePercentage, setFadePercentage] = useState(0)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY
        const headerHeight = headerRef.current.offsetHeight
        const newFadePercentage = Math.max(0, Math.min(100, (scrollPosition / headerHeight) * 100))
        setFadePercentage(newFadePercentage)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(() => {
    const handleCloseModal = () => {
      setActiveModal(null)
    }
    
    window.addEventListener('close-modal', handleCloseModal)
    return () => {
      window.removeEventListener('close-modal', handleCloseModal)
    }
  }, [])

  const openModal = (modalName: string) => {
    setActiveModal(modalName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const renderModalContent = () => {
    switch (activeModal) {
      case "habits":
        return <HabitsModal />
      case "todos":
        return <TodosModal />
      case "checkin":
        return <CheckinModal />
      case "analytics":
        return <AnalyticsModal />
      case "wheel":
        return <WheelModal />
      case "badges":
        return <BadgesModal />
      case "shop":
        return <ShopModal />
      case "courses":
        return <CoursesModal />
      default:
        return null
    }
  }

  return (
    <AuthProvider>
      <HabitsProvider>
        {/* Self-contained ChatbotDrawer with its own trigger button */}
        <ChatbotDrawer />

        <div className="relative max-h-screen w-full bg-gradient-orange">
          <div ref={headerRef} className="relative z-10">
            <Header />
            <div
              className="absolute top-0 w-full h-[450px] bg-white pointer-events-none"
              style={{ opacity: fadePercentage / 100, zIndex: 20 }}
            />
          </div>

          <div className="sticky top-0 z-30">
            <StickyTop />
          </div>

          <div className="relative z-20">
            <WidgetsGrid
              onHabitsClick={() => openModal("habits")}
              onTodosClick={() => openModal("todos")}
              onCheckinClick={() => openModal("checkin")}
              onAnalyticsClick={() => openModal("analytics")}
              onWheelClick={() => openModal("wheel")}
              onBadgesClick={() => openModal("badges")}
              onAdsClick={() => openModal("ads")}
              onShopClick={() => openModal("shop")}
              onCoursesClick={() => openModal("courses")}
            />
          </div>

          <ModalFull 
            isOpen={activeModal !== null} 
            onClose={closeModal}
            title={activeModal ? modalTitles[activeModal] : undefined}
          >
            {renderModalContent()}
          </ModalFull>

        </div>
      </HabitsProvider>
    </AuthProvider>
  )
}