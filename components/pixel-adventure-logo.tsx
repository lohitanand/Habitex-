"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function PixelAdventureLogo() {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden rounded-lg"
      style={{
        background: "linear-gradient(180deg, #0a4da2 0%, #31a7ff 100%)",
      }}
    >
      {/* Pixel art mountains in the background */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 z-10">
        <div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-[#051f40]"
          style={{
            clipPath:
              "polygon(0 70%, 5% 75%, 10% 65%, 15% 80%, 20% 70%, 25% 75%, 30% 60%, 35% 65%, 40% 55%, 45% 70%, 50% 60%, 55% 65%, 60% 55%, 65% 70%, 70% 60%, 75% 65%, 80% 55%, 85% 70%, 90% 65%, 95% 75%, 100% 60%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a2e59]"
          style={{
            clipPath:
              "polygon(0 80%, 5% 85%, 10% 75%, 15% 90%, 20% 80%, 25% 85%, 30% 70%, 35% 75%, 40% 65%, 45% 80%, 50% 70%, 55% 75%, 60% 65%, 65% 80%, 70% 70%, 75% 75%, 80% 65%, 85% 80%, 90% 75%, 95% 85%, 100% 70%, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>

      {/* Pixel clouds */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-16 h-8 bg-white opacity-80"
        style={{
          clipPath: "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)",
          filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))",
        }}
        animate={{ x: [0, 10, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[25%] right-[15%] w-20 h-10 bg-white opacity-70"
        style={{
          clipPath: "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)",
          filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))",
        }}
        animate={{ x: [0, -15, 0], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2"
        >
          <div className="text-white font-pixel text-sm md:text-base tracking-widest">START YOUR</div>
        </motion.div>

        {/* Main title with pixel shadow effect */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl text-[#FFD700] tracking-wide">LifeQuest</h1>
          </motion.div>

          {/* Shadow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute -bottom-1 -right-1 z-0"
          >
            <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl text-[#B8860B] tracking-wide opacity-90">
              LifeQuest
            </h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-white text-center max-w-xs"
        >
          <p className="text-sm">Transform your habits into an epic adventure ^-^</p>
        </motion.div>
      </div>

      {/* Pixel character */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute bottom-4 right-4 z-30"
      >
        <div className="w-12 h-12 bg-[#FFD700] relative pixel-art">
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-6 grid-rows-6">
            {/* Pixel character face - simplified for performance */}
            <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-black"></div>
            <div className="col-start-5 col-end-6 row-start-2 row-end-3 bg-black"></div>
            <div className="col-start-3 col-end-5 row-start-4 row-end-5 bg-black"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
