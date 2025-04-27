"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Gift, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RewardBoxAnimation, { type RewardItem } from "@/components/reward-box-animation"
import { getUserData, updateUserData } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import { RewardCard } from "@/components/reward-card"

export default function RewardsPage() {
  const [isBoxOpen, setIsBoxOpen] = useState(false)
  const [currentBoxType, setCurrentBoxType] = useState<"common" | "rare" | "epic" | "legendary">("common")
  const [rewards, setRewards] = useState<RewardItem[]>([])
  const [userCurrency, setUserCurrency] = useState(0)
  const { toast } = useToast()

  // Load user currency on mount
  useEffect(() => {
    const userData = getUserData()
    if (userData) {
      setUserCurrency(userData.currency || 0)
    }
  }, [])

  // Function to open a reward box
  const openRewardBox = (boxType: "common" | "rare" | "epic" | "legendary", price: number) => {
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
        description: `You need ${price} coins to open this ${boxType} box.`,
        variant: "destructive",
      })
      return
    }

    // Deduct the price from user's currency
    userData.currency = (userData.currency || 0) - price
    updateUserData(userData)
    setUserCurrency(userData.currency)

    setCurrentBoxType(boxType)

    // Generate random rewards based on box type
    const generatedRewards = generateRandomRewards(boxType)
    setRewards(generatedRewards)

    // Open the reward box animation
    setIsBoxOpen(true)
  }

  // Function to handle closing the reward box and adding rewards to inventory
  const handleCloseRewardBox = () => {
    const userData = getUserData()
    if (!userData) return

    // Initialize inventory if it doesn't exist
    if (!userData.inventory) {
      userData.inventory = []
    }

    // Add rewards to inventory
    rewards.forEach((reward) => {
      // Convert RewardItem to Reward
      const newReward = {
        id: reward.id,
        name: reward.name,
        description: reward.description,
        type: reward.type === "power-up" ? "powerup" : reward.type === "cosmetic" ? "cosmetic" : reward.type,
        value: reward.quantity || 1,
        imageUrl: `/placeholder.svg?height=100&width=100&query=${reward.image}`,
      }

      // If it's currency, add to user's currency instead of inventory
      if (reward.type === "currency") {
        userData.currency = (userData.currency || 0) + (reward.quantity || 0)
        setUserCurrency(userData.currency)
      } else {
        // Otherwise add to inventory
        userData.inventory.push(newReward)
      }
    })

    // Update user data
    updateUserData(userData)

    // Close the box
    setIsBoxOpen(false)

    toast({
      title: "Rewards added to inventory!",
      description: "Check your inventory to see your new items.",
    })
  }

  // Function to generate random rewards based on box type
  const generateRandomRewards = (boxType: "common" | "rare" | "epic" | "legendary"): RewardItem[] => {
    // Number of rewards based on box type
    const rewardCount = boxType === "common" ? 1 : boxType === "rare" ? 2 : boxType === "epic" ? 3 : 4

    // Possible rewards by rarity
    const possibleRewards: Record<string, RewardItem[]> = {
      common: [
        {
          id: `c1-${Date.now()}`,
          name: "Energy Boost",
          description: "Skip one daily habit without breaking your streak",
          type: "powerup",
          rarity: "common",
          image: "energy",
        },
        {
          id: `c2-${Date.now()}`,
          name: "Small Coin Pouch",
          description: "Gain 50 coins",
          type: "currency",
          rarity: "common",
          image: "coins",
          quantity: 50,
        },
        {
          id: `c3-${Date.now()}`,
          name: "Basic Character Frame",
          description: "A simple frame for your character",
          type: "cosmetic",
          rarity: "common",
          image: "frame",
        },
      ],
      rare: [
        {
          id: `r1-${Date.now()}`,
          name: "Double Points",
          description: "Earn double points for all habits for 24 hours",
          type: "powerup",
          rarity: "rare",
          image: "double",
        },
        {
          id: `r2-${Date.now()}`,
          name: "Medium Coin Pouch",
          description: "Gain 150 coins",
          type: "currency",
          rarity: "rare",
          image: "coins",
          quantity: 150,
        },
        {
          id: `r3-${Date.now()}`,
          name: "Streak Shield",
          description: "Protect your streaks for 48 hours if you miss habits",
          type: "powerup",
          rarity: "rare",
          image: "shield",
        },
        {
          id: `r4-${Date.now()}`,
          name: "Animated Character Frame",
          description: "An animated frame for your character",
          type: "cosmetic",
          rarity: "rare",
          image: "frame-animated",
        },
      ],
      epic: [
        {
          id: `e1-${Date.now()}`,
          name: "Triple Points",
          description: "Earn triple points for all habits for 24 hours",
          type: "powerup",
          rarity: "epic",
          image: "triple",
        },
        {
          id: `e2-${Date.now()}`,
          name: "Large Coin Pouch",
          description: "Gain 300 coins",
          type: "currency",
          rarity: "epic",
          image: "coins",
          quantity: 300,
        },
        {
          id: `e3-${Date.now()}`,
          name: "Epic Character Skin",
          description: "A special appearance for your character",
          type: "cosmetic",
          rarity: "epic",
          image: "skin",
        },
        {
          id: `e4-${Date.now()}`,
          name: "Custom Background",
          description: "A special background for your profile",
          type: "cosmetic",
          rarity: "epic",
          image: "background",
        },
      ],
      legendary: [
        {
          id: `l1-${Date.now()}`,
          name: "Legendary Character Skin",
          description: "A legendary appearance for your character",
          type: "cosmetic",
          rarity: "legendary",
          image: "skin-legendary",
        },
        {
          id: `l2-${Date.now()}`,
          name: "Treasure Chest",
          description: "Gain 500 coins",
          type: "currency",
          rarity: "legendary",
          image: "coins",
          quantity: 500,
        },
        {
          id: `l3-${Date.now()}`,
          name: "Ultimate Shield",
          description: "Protect all your streaks for 7 days",
          type: "powerup",
          rarity: "legendary",
          image: "shield-ultimate",
        },
        {
          id: `l4-${Date.now()}`,
          name: "Legendary Background",
          description: "A legendary background for your profile",
          type: "cosmetic",
          rarity: "legendary",
          image: "background-legendary",
        },
      ],
    }

    // Determine which reward pools to draw from based on box type
    let rewardPools: string[] = []

    switch (boxType) {
      case "common":
        rewardPools = ["common"]
        break
      case "rare":
        rewardPools = ["common", "rare"]
        break
      case "epic":
        rewardPools = ["common", "rare", "epic"]
        break
      case "legendary":
        rewardPools = ["common", "rare", "epic", "legendary"]
        break
    }

    // Generate rewards
    const selectedRewards: RewardItem[] = []

    for (let i = 0; i < rewardCount; i++) {
      // Determine rarity of this reward
      let rarityPool: string

      if (boxType === "legendary" && i === 0) {
        // Guarantee at least one legendary item for legendary boxes
        rarityPool = "legendary"
      } else if (boxType === "epic" && i === 0) {
        // Guarantee at least one epic item for epic boxes
        rarityPool = "epic"
      } else if (boxType === "rare" && i === 0) {
        // Guarantee at least one rare item for rare boxes
        rarityPool = "rare"
      } else {
        // Randomly select a rarity pool based on box type
        const randomIndex = Math.floor(Math.random() * rewardPools.length)
        rarityPool = rewardPools[randomIndex]
      }

      // Select a random reward from the chosen rarity pool
      const poolRewards = possibleRewards[rarityPool]
      const randomRewardIndex = Math.floor(Math.random() * poolRewards.length)
      const selectedReward = { ...poolRewards[randomRewardIndex] }

      // Add a unique ID to prevent duplicates
      selectedReward.id = `${selectedReward.id}-${Date.now()}-${i}`

      selectedRewards.push(selectedReward)
    }

    return selectedRewards
  }

  // Available marketplace items
  const marketplaceItems = [
    {
      id: "mp1",
      name: "Energy Boost",
      description: "Skip one daily habit without breaking your streak",
      price: 100,
      type: "powerup",
      imageUrl: "/placeholder.svg?key=6x17w",
    },
    {
      id: "mp2",
      name: "Streak Shield",
      description: "Protect your streaks for 48 hours if you miss habits",
      price: 200,
      type: "powerup",
      imageUrl: "/placeholder.svg?key=njfg3",
    },
    {
      id: "mp3",
      name: "Premium Character Skin",
      description: "A special appearance for your character",
      price: 300,
      type: "cosmetic",
      imageUrl: "/placeholder.svg?key=rj53c",
    },
    {
      id: "mp4",
      name: "Custom Background",
      description: "A special background for your profile",
      price: 250,
      type: "cosmetic",
      imageUrl: "/placeholder.svg?key=8kkzp",
    },
    {
      id: "mp5",
      name: "Double XP",
      description: "Earn double XP for 24 hours",
      price: 150,
      type: "powerup",
      imageUrl: "/placeholder.svg?key=qgtc2",
    },
    {
      id: "mp6",
      name: "Animated Profile Frame",
      description: "An animated frame for your profile",
      price: 200,
      type: "cosmetic",
      imageUrl: "/placeholder.svg?key=459x1",
    },
  ]

  return (
    <div className="min-h-screen bg-[hsl(var(--pixel-light))]">
      <header className="bg-[hsl(var(--pixel-primary))] px-4 py-3 border-b border-pixel-border">
        <div className="container mx-auto flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="font-pixel text-2xl md:text-3xl text-[hsl(var(--pixel-primary))] mb-2">Rewards</h1>
          <p className="text-gray-600">Earn rewards and open loot boxes to get special items</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Your Coins: 🪙 {userCurrency}</div>
        </div>

        <Tabs defaultValue="loot-boxes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="loot-boxes" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>Loot Boxes</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Marketplace</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loot-boxes">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-pixel text-xl text-pixel-primary">Mystery Loot Boxes</CardTitle>
                <CardDescription>Open boxes to receive random rewards and items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <LootBoxCard
                    type="common"
                    name="Common Box"
                    description="Contains common rewards and a small chance for rare items"
                    price={50}
                    onOpen={() => openRewardBox("common", 50)}
                  />
                  <LootBoxCard
                    type="rare"
                    name="Rare Box"
                    description="Contains rare rewards and a small chance for epic items"
                    price={150}
                    onOpen={() => openRewardBox("rare", 150)}
                  />
                  <LootBoxCard
                    type="epic"
                    name="Epic Box"
                    description="Contains epic rewards and exclusive items"
                    price={300}
                    onOpen={() => openRewardBox("epic", 300)}
                  />
                  <LootBoxCard
                    type="legendary"
                    name="Legendary Box"
                    description="Contains legendary rewards and guaranteed exclusive items"
                    price={500}
                    onOpen={() => openRewardBox("legendary", 500)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-pixel text-xl text-pixel-primary">Reward Marketplace</CardTitle>
                <CardDescription>Spend your coins on guaranteed rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketplaceItems.map((item) => (
                    <RewardCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      type={item.type as "powerup" | "cosmetic" | "lootbox" | "currency"}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Reward Box Animation */}
      <RewardBoxAnimation
        isOpen={isBoxOpen}
        onClose={handleCloseRewardBox}
        boxType={currentBoxType}
        rewards={rewards}
      />
    </div>
  )
}

interface LootBoxCardProps {
  type: "common" | "rare" | "epic" | "legendary"
  name: string
  description: string
  price: number
  onOpen: () => void
}

function LootBoxCard({ type, name, description, price, onOpen }: LootBoxCardProps) {
  // Get box color based on type
  const getBoxColor = () => {
    switch (type) {
      case "common":
        return "bg-gray-400"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-600"
      case "legendary":
        return "bg-amber-500"
      default:
        return "bg-gray-400"
    }
  }

  // Get box glow based on type
  const getBoxGlow = () => {
    switch (type) {
      case "common":
        return ""
      case "rare":
        return "shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      case "epic":
        return "shadow-[0_0_20px_rgba(147,51,234,0.5)]"
      case "legendary":
        return "shadow-[0_0_25px_rgba(245,158,11,0.6)]"
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-full aspect-square rounded-lg ${getBoxColor()} ${getBoxGlow()} flex flex-col items-center justify-center p-6 mb-4 relative overflow-hidden group cursor-pointer`}
        onClick={onOpen}
      >
        <div className="absolute w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-t-2 border-l-2 border-white/30 absolute top-4 left-4"></div>
            <div className="w-12 h-12 border-t-2 border-r-2 border-white/30 absolute top-4 right-4"></div>
            <div className="w-12 h-12 border-b-2 border-l-2 border-white/30 absolute bottom-4 left-4"></div>
            <div className="w-12 h-12 border-b-2 border-r-2 border-white/30 absolute bottom-4 right-4"></div>
          </div>
        </div>

        {/* Box shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="loot-box-shine"></div>
        </div>

        <div className="text-white text-center z-10">
          <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">🎁</div>
          <h3 className="text-lg font-bold mb-1">{name}</h3>
        </div>
      </div>

      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="font-bold text-yellow-500 flex items-center justify-center">
          <span className="mr-1">🪙</span> {price}
        </p>
      </div>

      <Button
        onClick={onOpen}
        variant="outline"
        className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors"
      >
        Open Box
      </Button>
    </div>
  )
}
