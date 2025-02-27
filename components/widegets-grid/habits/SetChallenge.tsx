import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomSlider } from "@/components/ui/custom-components/custom-slider"
import { CircleButton } from "@/components/ui/custom-components/custom-buttons"


// Simulated backend data
const mockHabits = [
  { id: 1, name: "Morning Meditation" },
  { id: 2, name: "Daily Exercise" },
  { id: 3, name: "Reading" },
  { id: 4, name: "Healthy Breakfast" },
  { id: 5, name: "Journal Writing" }
]

const WEEK_IN_DAYS = 7
const MIN_WEEKS = 1
const MAX_WEEKS = 12

export function SetChallenge({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [duration, setDuration] = useState(WEEK_IN_DAYS) // Start with 1 week
  const [habitPercentage, setHabitPercentage] = useState(60) // Start with 60%

  const formatDuration = (days: number) => {
    const weeks = Math.floor(days / 7)
    if (weeks === 1) return "1 week"
    if (weeks < 4) return `${weeks} weeks`
    const months = Math.floor(weeks / 4)
    return `${months} ${months === 1 ? 'month' : 'months'}`
  }

  const handleStartChallenge = () => {
    const challengeConfig = {
      duration,
      minimumHabits: Math.ceil((habitPercentage / 100) * mockHabits.length),
      totalHabits: mockHabits.length
    }
    console.log("Starting challenge with config:", challengeConfig)
  }

  return (
    <div className={cn("flex flex-col gap-10", className)} {...props}>
      <Card className="w-full px-6">
        <CardHeader>
          <CardTitle className="text-title-orange">
            Challenge Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-10 w-full">
          <div className="flex justify-between items-center w-full">
            <CardDescription className="text-title-card">
              Duration:
            </CardDescription>
            <CardDescription className="text-title-card">
              {formatDuration(duration)}
            </CardDescription>
          </div>

          <CustomSlider 
            min={MIN_WEEKS * WEEK_IN_DAYS}
            max={MAX_WEEKS * WEEK_IN_DAYS}
            step={WEEK_IN_DAYS}
            value={[duration]}
            onValueChange={(value) => setDuration(value[0])}
            className="w-full"
          />

          <div className="flex justify-between items-center w-full">
            <CardDescription className="text-title-card">
              Minimum number of daily habits:
            </CardDescription>
            <CardDescription className="text-title-card">
              {habitPercentage}%
            </CardDescription>
          </div>

          <CustomSlider 
            min={20}
            max={100}
            step={10}
            value={[habitPercentage]}
            onValueChange={(value) => setHabitPercentage(value[0])}
            className="w-full"
          />
        </CardContent>

        <CardFooter className="w-full flex justify-center gap-6 py-6">
          <CircleButton
            variant="cancel"
            onClick={() => console.log("Cancelled")}
            aria-label="Cancel"
          />
          <CircleButton
            variant="confirm"
            onClick={handleStartChallenge}
            aria-label="Confirm"
          />
        </CardFooter>
      </Card>
    </div>
  )
}

