"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import type { Reward } from "@/lib/types"

interface LootBoxAnimationProps {
  boxType: "common" | "rare" | "epic"
  onClose: () => void
  reward: Reward
}

export const LootBoxAnimation: React.FC<LootBoxAnimationProps> = ({ boxType, onClose, reward }) => {
  const [animationStage, setAnimationStage] = useState<"closed" | "opening" | "opened">("closed")
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  const boxColors = {
    common: "from-gray-400 to-gray-300",
    rare: "from-blue-500 to-purple-500",
    epic: "from-yellow-400 to-orange-500",
  }

  const boxShadows = {
    common: "shadow-gray-400/50",
    rare: "shadow-blue-500/50",
    epic: "shadow-yellow-500/50",
  }

  const rarityGlow = {
    common: "box-glow-gray",
    rare: "box-glow-blue",
    epic: "box-glow-gold",
  }

  const triggerConfetti = () => {
    if (confettiCanvasRef.current) {
      const myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      })

      const colors =
        boxType === "common"
          ? ["#A0AEC0", "#CBD5E0"]
          : boxType === "rare"
            ? ["#3182CE", "#805AD5"]
            : ["#F6AD55", "#F6E05E"]

      const intensity = boxType === "common" ? 0.5 : boxType === "rare" ? 0.7 : 1

      myConfetti({
        particleCount: 100 * intensity,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      })
    }
  }

  const handleOpenBox = () => {
    setAnimationStage("opening")

    setTimeout(() => {
      setAnimationStage("opened")
      triggerConfetti()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-50" />

      <div className="relative w-full max-w-md p-6">
        <AnimatePresence>
          {animationStage === "closed" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative w-64 h-64 mx-auto ${rarityGlow[boxType]}`}
            >
              <div
                className={`w-full h-full rounded-lg bg-gradient-to-br ${boxColors[boxType]} shadow-lg ${boxShadows[boxType]} flex flex-col items-center justify-center p-6 cursor-pointer`}
                onClick={handleOpenBox}
              >
                <div className="absolute w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-t-4 border-l-4 border-white/30 absolute top-6 left-6"></div>
                    <div className="w-16 h-16 border-t-4 border-r-4 border-white/30 absolute top-6 right-6"></div>
                    <div className="w-16 h-16 border-b-4 border-l-4 border-white/30 absolute bottom-6 left-6"></div>
                    <div className="w-16 h-16 border-b-4 border-r-4 border-white/30 absolute bottom-6 right-6"></div>
                  </div>
                </div>

                <div className="text-white text-center z-10">
                  <div className="text-5xl mb-4">🎁</div>
                  <h3 className="text-xl font-bold mb-2 capitalize">{boxType} Box</h3>
                  <p className="text-sm opacity-80">Click to open</p>
                </div>
              </div>
            </motion.div>
          )}

          {animationStage === "opening" && (
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              transition={{ duration: 1.5 }}
              className="w-64 h-64 mx-auto"
            >
              <div
                className={`w-full h-full rounded-lg bg-gradient-to-br ${boxColors[boxType]} shadow-lg ${boxShadows[boxType]} flex items-center justify-center`}
              >
                <div className="text-white text-center">
                  <div className="text-5xl animate-bounce">✨</div>
                </div>
              </div>
            </motion.div>
          )}

          {animationStage === "opened" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-6 text-center max-w-sm mx-auto shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">You got a reward!</h3>

              <div className="mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                  {reward.imageUrl ? (
                    <img
                      src={reward.imageUrl || "/placeholder.svg"}
                      alt={reward.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      {reward.type === "powerup" && <span className="text-4xl">⚡</span>}
                      {reward.type === "cosmetic" && <span className="text-4xl">👕</span>}
                      {reward.type === "currency" && <span className="text-4xl">💰</span>}
                    </div>
                  )}
                </div>

                <h4 className="text-xl font-semibold">{reward.name}</h4>
                <p className="text-gray-600 mt-2">{reward.description}</p>

                {reward.type === "currency" && (
                  <p className="text-lg font-bold mt-2 text-yellow-500">+{reward.value} Coins</p>
                )}
              </div>

              <Button onClick={onClose} className="w-full">
                Awesome!
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
