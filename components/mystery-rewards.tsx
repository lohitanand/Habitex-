"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RewardBoxAnimation } from "./reward-box-animation"
import { getUserStats, updateUserStats, addInventoryItem } from "@/lib/local-storage"
import type { Item } from "@/lib/types"

// Mystery box rewards
const mysteryRewards: Item[] = [
  {
    id: "health-potion",
    name: "Health Potion",
    description: "Restores 20 health points",
    type: "powerup",
    effect: {
      stat: "health",
      value: 20,
    },
    quantity: 1,
    imageUrl: "/glowing-health-elixir.png",
  },
  {
    id: "strength-elixir",
    name: "Strength Elixir",
    description: "Increases strength by 5 points",
    type: "powerup",
    effect: {
      stat: "strength",
      value: 5,
    },
    quantity: 1,
    imageUrl: "/mystical-strength-brew.png",
  },
  {
    id: "intelligence-scroll",
    name: "Intelligence Scroll",
    description: "Increases intelligence by 5 points",
    type: "powerup",
    effect: {
      stat: "intelligence",
      value: 5,
    },
    quantity: 1,
    imageUrl: "/ancient-wisdom-unfurled.png",
  },
  {
    id: "charisma-charm",
    name: "Charisma Charm",
    description: "Increases charisma by 5 points",
    type: "powerup",
    effect: {
      stat: "charisma",
      value: 5,
    },
    quantity: 1,
    imageUrl: "/captivating-aura.png",
  },
  {
    id: "pixel-hat",
    name: "Pixel Hat",
    description: "A stylish pixel art hat for your character",
    type: "cosmetic",
    quantity: 1,
    imageUrl: "/colorful-pixel-art-hat.png",
  },
  {
    id: "pixel-sword",
    name: "Pixel Sword",
    description: "A cool pixel art sword for your character",
    type: "cosmetic",
    quantity: 1,
    imageUrl: "/pixelated-blade.png",
  },
]

export function MysteryRewards() {
  const [isOpening, setIsOpening] = useState(false)
  const [reward, setReward] = useState<Item | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleOpenBox = () => {
    const stats = getUserStats()

    // Check if user has enough gold
    if (stats.gold < 50) {
      setError("Not enough gold! You need 50 gold to open a mystery box.")
      setTimeout(() => setError(null), 3000)
      return
    }

    // Deduct gold
    updateUserStats({ gold: stats.gold - 50 })

    // Start animation
    setIsOpening(true)

    // Select random reward after animation delay
    setTimeout(() => {
      const randomReward = mysteryRewards[Math.floor(Math.random() * mysteryRewards.length)]
      setReward(randomReward)

      // Add reward to inventory
      addInventoryItem(randomReward)

      // Reset after showing reward
      setTimeout(() => {
        setIsOpening(false)
        setReward(null)
      }, 3000)
    }, 2000)
  }

  return (
    <Card className="w-full border-4 border-purple-700 bg-purple-100 shadow-lg">
      <CardHeader className="bg-purple-700 text-white">
        <CardTitle className="text-2xl font-pixel">Mystery Box</CardTitle>
        <CardDescription className="text-purple-200 font-pixel">
          Spend 50 gold for a chance at rare items!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center">
        {error && (
          <div className="mb-4 p-2 bg-red-100 border-2 border-red-500 rounded-md text-red-700 font-pixel">{error}</div>
        )}

        {isOpening ? (
          <div className="flex flex-col items-center">
            <RewardBoxAnimation />
            {reward && (
              <div className="mt-4 p-3 bg-purple-200 border-2 border-purple-500 rounded-md text-center">
                <h3 className="text-xl font-pixel text-purple-800 mb-2">You got:</h3>
                <p className="text-lg font-pixel text-purple-700">{reward.name}!</p>
                <p className="text-sm font-pixel text-purple-600">{reward.description}</p>
                <p className="text-sm font-pixel text-green-600 mt-2">Added to your inventory!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-purple-300 border-4 border-purple-500 rounded-md flex items-center justify-center mb-4">
              <span className="text-5xl">🎁</span>
            </div>
            <p className="text-purple-700 font-pixel mb-4 text-center">
              Open a mystery box to receive a random item or power-up!
            </p>
            <Button onClick={handleOpenBox} className="bg-purple-600 hover:bg-purple-700 text-white font-pixel">
              Open Box (50 Gold)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
