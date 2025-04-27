"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Coins, Gift, Star, X } from "lucide-react"
import { getUserData, updateUserData } from "@/lib/local-storage"
import { v4 as uuidv4 } from "uuid"

export interface RewardItem {
  id: string
  name: string
  description: string
  type: "powerup" | "cosmetic" | "currency" | "lootbox"
  rarity: "common" | "rare" | "epic" | "legendary"
  image: string
  quantity?: number
}

interface RewardBoxAnimationProps {
  isOpen: boolean
  onClose: () => void
  boxType: "common" | "rare" | "epic" | "legendary"
  rewards: RewardItem[]
}

export default function RewardBoxAnimation({ isOpen, onClose, boxType, rewards }: RewardBoxAnimationProps) {
  const [animationStage, setAnimationStage] = useState<"closed" | "shaking" | "opening" | "revealed">("closed")
  const [showRewards, setShowRewards] = useState(false)

  // Reset animation state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setAnimationStage("closed")
      setShowRewards(false)

      // Start the animation sequence
      setTimeout(() => setAnimationStage("shaking"), 500)
    }
  }, [isOpen])

  // Handle the box opening animation
  const handleOpenBox = () => {
    setAnimationStage("opening")

    // Trigger confetti based on box type
    if (boxType === "legendary" || boxType === "epic") {
      triggerConfetti()
    }

    // Show rewards after the box opens
    setTimeout(() => {
      setAnimationStage("revealed")
      setShowRewards(true)
    }, 1000)
  }

  // Trigger confetti effect
  const triggerConfetti = () => {
    const intensity = boxType === "legendary" ? 2 : 1

    confetti({
      particleCount: 100 * intensity,
      spread: 70,
      origin: { y: 0.6 },
    })

    // For legendary boxes, add a second burst of confetti
    if (boxType === "legendary") {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })
      }, 200)
    }
  }

  // Add rewards to inventory
  const addRewardsToInventory = () => {
    const userData = getUserData()
    if (!userData) return

    // Initialize inventory if it doesn't exist
    if (!userData.inventory) {
      userData.inventory = []
    }

    // Process each reward
    rewards.forEach((reward) => {
      // Generate a unique ID for the reward
      const rewardWithId = {
        ...reward,
        id: uuidv4(),
      }

      // If it's currency, add to user's currency
      if (reward.type === "currency") {
        userData.currency = (userData.currency || 0) + (reward.quantity || 0)
      } else {
        // Otherwise add to inventory
        userData.inventory.push(rewardWithId)
      }
    })

    // Update user data
    updateUserData(userData)

    // Close the dialog
    onClose()
  }

  // Get box color based on type
  const getBoxColor = () => {
    switch (boxType) {
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
    switch (boxType) {
      case "common":
        return ""
      case "rare":
        return "shadow-[0_0_15px_rgba(59,130,246,0.7)]"
      case "epic":
        return "shadow-[0_0_20px_rgba(147,51,234,0.7)]"
      case "legendary":
        return "shadow-[0_0_25px_rgba(245,158,11,0.8)]"
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-[hsl(var(--pixel-dark))] border-none p-0 overflow-hidden">
        <div className="relative h-[500px] w-full flex flex-col items-center justify-center">
          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
            <X className="h-6 w-6" />
          </button>

          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="pixel-grid"></div>
            </div>
            {boxType === "legendary" && (
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)]"></div>
            )}
            {boxType === "epic" && (
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(147,51,234,0.15)_0%,transparent_70%)]"></div>
            )}
          </div>

          {/* Box title */}
          <h2 className="font-pixel text-2xl text-white mb-6 relative z-10">
            {boxType.charAt(0).toUpperCase() + boxType.slice(1)} Loot Box
          </h2>

          {/* Box animation container */}
          <div className="relative z-10 mb-6">
            <AnimatePresence>
              {animationStage !== "revealed" && (
                <motion.div
                  className={`w-40 h-40 ${getBoxColor()} ${getBoxGlow()} rounded-lg pixel-art-reward relative`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: animationStage === "shaking" ? [0.95, 1.05, 0.95, 1.05, 0.95] : 1,
                    opacity: 1,
                    rotate: animationStage === "shaking" ? [-2, 2, -2, 2, 0] : 0,
                    y: animationStage === "opening" ? [0, -20, 100] : 0,
                  }}
                  transition={{
                    duration: animationStage === "shaking" ? 1.5 : 0.5,
                    repeat: animationStage === "shaking" ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "loop",
                  }}
                  exit={{
                    scale: 1.2,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gift className="w-16 h-16 text-white" />
                  </div>

                  {/* Box lid */}
                  <motion.div
                    className={`absolute inset-x-0 top-0 h-10 ${getBoxColor()} rounded-t-lg border-b-4 border-black/20`}
                    animate={{
                      rotateX: animationStage === "opening" ? -180 : 0,
                      y: animationStage === "opening" ? -10 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "top" }}
                  />

                  {/* Box glow effect */}
                  {(boxType === "epic" || boxType === "legendary") && (
                    <div className="absolute inset-0 animate-pulse opacity-70">
                      <div className={`absolute inset-0 ${getBoxGlow()} rounded-lg`}></div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reward reveal animation */}
            <AnimatePresence>
              {showRewards && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.2,
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className={`w-48 h-48 rounded-full ${getBoxGlow()} opacity-30`}></div>
                    </div>
                    <div className={`w-16 h-16 ${getBoxColor()} rounded-full flex items-center justify-center`}>
                      <Star className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Open button or rewards display */}
          {animationStage === "shaking" ? (
            <Button variant="pixel-accent" size="lg" onClick={handleOpenBox} className="relative z-10">
              Open Box
            </Button>
          ) : (
            animationStage === "revealed" && (
              <div className="relative z-10 w-full px-6">
                <h3 className="font-pixel text-xl text-white text-center mb-4">Rewards Received!</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[200px] overflow-y-auto p-2">
                  {rewards.map((reward) => (
                    <RewardCard key={reward.id} reward={reward} />
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="pixel" onClick={addRewardsToInventory}>
                    Add to Inventory
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RewardCard({ reward }: { reward: RewardItem }) {
  // Get color based on rarity
  const getRarityColor = () => {
    switch (reward.rarity) {
      case "common":
        return "border-gray-300 bg-gray-100"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-amber-300 bg-amber-50"
      default:
        return "border-gray-300 bg-gray-100"
    }
  }

  // Get icon based on type
  const getTypeIcon = () => {
    switch (reward.type) {
      case "powerup":
        return <div className="w-10 h-10 bg-green-400 pixel-art-reward"></div>
      case "cosmetic":
        return <div className="w-10 h-10 bg-pink-400 pixel-art-reward"></div>
      case "currency":
        return <Coins className="w-10 h-10 text-amber-500" />
      case "lootbox":
        return <div className="w-10 h-10 bg-blue-400 pixel-art-reward"></div>
      default:
        return <div className="w-10 h-10 bg-gray-400 pixel-art-reward"></div>
    }
  }

  return (
    <motion.div
      className={`p-3 rounded-lg border-2 ${getRarityColor()} flex items-center gap-3`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {getTypeIcon()}
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-900">{reward.name}</h4>
          {reward.quantity && reward.quantity > 1 && (
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">x{reward.quantity}</span>
          )}
        </div>
        <p className="text-xs text-gray-600">{reward.description}</p>
      </div>
    </motion.div>
  )
}
