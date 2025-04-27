"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateId, saveUser, setOnboarded, STARTER_QUESTS, STARTER_ACHIEVEMENTS } from "@/lib/local-storage"
import type { User, Quest, Achievement } from "@/lib/local-storage"

export default function OnboardingFlow({ user }: { user: User }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState<User>(user)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof User, value: any) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAttributeChange = (attribute: keyof User["attributes"], value: number) => {
    setUserData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: value,
      },
    }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleComplete = async () => {
    setLoading(true)

    try {
      // Save the updated user data
      saveUser(userData)

      // Create starter quests for the user
      STARTER_QUESTS.forEach((quest) => {
        const newQuest: Quest = {
          ...quest,
          id: generateId(),
          userId: userData.id,
        }
        // Save quest to local storage
        // This would be implemented in the local-storage.ts file
      })

      // Create starter achievements for the user
      STARTER_ACHIEVEMENTS.forEach((achievement) => {
        const newAchievement: Achievement = {
          ...achievement,
          id: `${userData.id}-${generateId()}`,
        }
        // Save achievement to local storage
        // This would be implemented in the local-storage.ts file
      })

      // Mark onboarding as complete
      setOnboarded(true)

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="font-pixel text-2xl text-center text-[hsl(var(--pixel-primary))]">
          {step === 1 && "Welcome to LifeQuest Balance"}
          {step === 2 && "Customize Your Character"}
          {step === 3 && "Set Your Goals"}
        </CardTitle>
        <CardDescription className="text-center">
          {step === 1 && "Let's get you set up with your new adventure"}
          {step === 2 && "Choose how your character will look and their starting attributes"}
          {step === 3 && "What do you want to achieve with LifeQuest?"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">What should we call you?</Label>
              <Input
                id="displayName"
                value={userData.displayName}
                onChange={(e) => handleChange("displayName", e.target.value)}
                placeholder="Your display name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="characterType">Choose your character type</Label>
              <Select value={userData.characterType} onValueChange={(value) => handleChange("characterType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select character type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warrior">Warrior</SelectItem>
                  <SelectItem value="mage">Mage</SelectItem>
                  <SelectItem value="ranger">Ranger</SelectItem>
                  <SelectItem value="rogue">Rogue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-[hsl(var(--pixel-accent))] pixel-art-character"></div>
            </div>

            <div className="space-y-4">
              <AttributeSlider
                name="Physical"
                value={userData.attributes.physical}
                onChange={(value) => handleAttributeChange("physical", value)}
              />
              <AttributeSlider
                name="Mental"
                value={userData.attributes.mental}
                onChange={(value) => handleAttributeChange("mental", value)}
              />
              <AttributeSlider
                name="Emotional"
                value={userData.attributes.emotional}
                onChange={(value) => handleAttributeChange("emotional", value)}
              />
              <AttributeSlider
                name="Social"
                value={userData.attributes.social}
                onChange={(value) => handleAttributeChange("social", value)}
              />
              <AttributeSlider
                name="Creativity"
                value={userData.attributes.creativity}
                onChange={(value) => handleAttributeChange("creativity", value)}
              />
            </div>

            <p className="text-sm text-gray-500 text-center">
              Distribute your attribute points based on what you want to focus on
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-[hsl(var(--pixel-light))] rounded-lg">
              <h3 className="font-medium mb-2">Your Starting Quests</h3>
              <ul className="space-y-2">
                {STARTER_QUESTS.map((quest, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-1 bg-[hsl(var(--pixel-accent))] rounded-sm"></div>
                    <div>
                      <p className="font-medium">{quest.title}</p>
                      <p className="text-sm text-gray-600">{quest.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                These starter quests will help you begin your journey. You can add more habits and quests later.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <Button variant="pixel" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="pixel-accent" onClick={handleComplete} disabled={loading}>
            {loading ? "Setting Up..." : "Begin Your Journey"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function AttributeSlider({
  name,
  value,
  onChange,
}: {
  name: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{name}</Label>
        <span>{value}</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
