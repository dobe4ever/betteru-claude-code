// app/page.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header/Header"
import { StickyTop } from "@/components/sticky-top/StickyTop"
import { WidgetsGrid } from "@/components/widegets-grid/WidgetsGrid"
import { ModalFull } from "@/components/ui/modal/ModalFull"
import { HabitsModal } from "@/components/widegets-grid/habits/HabitsModal"
import { HabitsProvider } from "@/components/widegets-grid/habits/HabitsContext"
import { TodosFull } from "@/components/widegets-grid/todos/TodosFull"
import { CheckinFull } from "@/components/widegets-grid/checkin/CheckinFull"
import { AnalyticsFull } from "@/components/widegets-grid/analytics/AnalyticsFull"
import { BadgesFull } from "@/components/widegets-grid/badges/BadgesFull"
import { ShopFull } from "@/components/widegets-grid/shop/ShopFull"
import { CoursesFull } from "@/components/widegets-grid/courses/CoursesFull"
import { WheelFull } from "@/components/widegets-grid/wheel/WheelFull"
import { ChatbotButton } from "@/components/floating-btn/ChatbotButton"
import { ChatbotFull } from "@/components/floating-btn/ChatbotFull"

import { AuthProvider } from "@/components/auth/AuthProvider"

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
        return <TodosFull />
      case "checkin":
        return <CheckinFull />
      case "analytics":
        return <AnalyticsFull />
      case "wheel":
        return <WheelFull />
      case "badges":
        return <BadgesFull />
      case "shop":
        return <ShopFull />
      case "courses":
        return <CoursesFull />
      case "chatbot":
        return <ChatbotFull />
      default:
        return null
    }
  }

  return (
    <AuthProvider>
      <HabitsProvider>
        <div className="relative max-h-screen w-full bg-gradient-orange">

          <ChatbotButton onClick={() => openModal("chatbot")} />

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
      </HabitsProvider>decided we
    </AuthProvider>
  )
}