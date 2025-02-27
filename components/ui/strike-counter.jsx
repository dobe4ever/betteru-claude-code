import { useState } from 'react'
import { Flame } from 'lucide-react'

export function StrikeCounter() {
  const [strikes, setStrikes] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleIncrement = () => {
    setStrikes(prev => prev + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div 
      className="relative aspect-square w-20 cursor-pointer"
      onClick={handleIncrement}
    >
      <div className="absolute inset-0">
        <div 
          className="h-full w-full flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-title-orange">🔥{strikes}</span>
          </div>
          
          {isAnimating && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-ping opacity-75 text-sm"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      animationDuration: '1s'
                    }}
                  >
                    🔥
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

