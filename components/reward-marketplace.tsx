"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserStats, purchaseItem } from "@/lib/local-storage"
import type { Item } from "@/lib/types"

// Marketplace items
const marketplaceItems: Omit<Item, "quantity">[] = [
  {
    id: "pixel-crown",
    name: "Pixel Crown",
    description: "A royal pixel crown for your character",
    type: "cosmetic",
    price: 150,
    imageUrl: "/pixelated-royal-crown.png",
  },
  {
    id: "pixel-shield",
    name: "Pixel Shield",
    description: "A defensive pixel shield for your character",
    type: "cosmetic",
    price: 125,
    imageUrl: "/digital-fortress.png",
  },
  {
    id: "mystery-lootbox",
    name: "Mystery Lootbox",
    description: "Contains random rare items",
    type: "lootbox",
    price: 200,
    imageUrl: "/glowing-crate.png",
  },
]

export default function RewardMarketplace() {
  const [userGold, setUserGold] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  // Load user gold on component mount and when stats are updated
  useEffect(() => {
    const updateGold = () => {
      const stats = getUserStats()
      setUserGold(stats.gold)
    }

    updateGold()

    // Set up event listener for stats updates
    window.addEventListener("statsUpdated", updateGold)

    return () => {
      window.removeEventListener("statsUpdated", updateGold)
    }
  }, [])

  const handlePurchase = (item: Omit<Item, "quantity">) => {
    const result = purchaseItem(item)

    if (result.success) {
      setMessage({
        text: `Successfully purchased ${item.name}! Added to your inventory.`,
        type: "success",
      })

      // Update gold display
      const stats = getUserStats()
      setUserGold(stats.gold)
    } else {
      setMessage({
        text: result.message || "Failed to purchase item.",
        type: "error",
      })
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const filteredItems =
    activeTab === "all" ? marketplaceItems : marketplaceItems.filter((item) => item.type.toLowerCase() === activeTab)

  return (
    <Card className="w-full border-4 border-purple-700 bg-purple-100 shadow-lg">
      <CardHeader className="bg-purple-700 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-pixel">Reward Marketplace</CardTitle>
            <CardDescription className="text-purple-200 font-pixel">
              Spend your hard-earned gold on rewards!
            </CardDescription>
          </div>
          <Badge className="bg-yellow-500 text-black font-pixel text-lg px-3 py-1">{userGold} Gold</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {message && (
          <div
            className={`mb-4 p-2 rounded-md font-pixel ${
              message.type === "success"
                ? "bg-green-100 border-2 border-green-500 text-green-700"
                : "bg-red-100 border-2 border-red-500 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-purple-200">
            <TabsTrigger value="all" className="font-pixel">
              All Items
            </TabsTrigger>
            <TabsTrigger value="powerup" className="font-pixel">
              Power-Ups
            </TabsTrigger>
            <TabsTrigger value="cosmetic" className="font-pixel">
              Cosmetics
            </TabsTrigger>
            <TabsTrigger value="lootbox" className="font-pixel">
              Loot Boxes
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="border-2 border-purple-500 bg-white">
                  <CardHeader className="p-3 bg-purple-200">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-pixel text-purple-800">{item.name}</CardTitle>
                      <Badge
                        className={`font-pixel ${
                          item.type === "cosmetic"
                            ? "bg-purple-600"
                            : item.type === "lootbox"
                              ? "bg-pink-600"
                              : "bg-blue-600"
                        }`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-sm font-pixel mb-2">{item.description}</p>
                    <div className="mt-2">
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={userGold < (item.price || 0)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-pixel disabled:bg-gray-400"
                      >
                        Purchase for {item.price} Gold
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
