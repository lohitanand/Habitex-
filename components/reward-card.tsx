"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserData, updateUserData } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import type { Reward } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

interface RewardCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  type: "powerup" | "cosmetic" | "lootbox" | "currency"
}

export const RewardCard: React.FC<RewardCardProps> = ({ id, name, description, price, imageUrl, type }) => {
  const { toast } = useToast()

  const handlePurchase = () => {
    const userData = getUserData()

    if (!userData) {
      toast({
        title: "Error",
        description: "User data not found. Please log in again.",
        variant: "destructive",
      })
      return
    }

    if ((userData.currency || 0) < price) {
      toast({
        title: "Not enough coins",
        description: `You need ${price} coins to purchase this reward.`,
        variant: "destructive",
      })
      return
    }

    // Deduct the price from user's currency
    userData.currency = (userData.currency || 0) - price

    // Create the reward object with a unique ID
    const reward: Reward = {
      id: uuidv4(),
      name,
      description,
      type,
      imageUrl,
      value: type === "powerup" ? 1 : undefined,
      duration: type === "powerup" ? 1 : undefined,
    }

    // Add the reward to user's inventory
    if (!userData.inventory) {
      userData.inventory = []
    }
    userData.inventory.push(reward)

    // Update user data
    updateUserData(userData)

    toast({
      title: "Purchase successful!",
      description: `${name} has been added to your inventory.`,
    })
  }

  // Determine icon based on reward type
  const getRewardIcon = () => {
    switch (type) {
      case "powerup":
        return "⚡"
      case "cosmetic":
        return "👕"
      case "lootbox":
        return "🎁"
      case "currency":
        return "🪙"
      default:
        return "🎁"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img src={imageUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100">
            <span className="text-5xl">{getRewardIcon()}</span>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold text-yellow-500 flex items-center">
          <span className="mr-1">🪙</span> {price}
        </div>

        <Button
          onClick={handlePurchase}
          size="sm"
          variant="outline"
          className="border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white"
        >
          Purchase
        </Button>
      </CardFooter>
    </Card>
  )
}
