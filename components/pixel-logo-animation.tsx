"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function PixelLogoAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  // Animation settings
  const pixelSize = 4
  const colors = ["#b388ff", "#7c4dff", "#651fff", "#6200ea"]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    // Logo data - 1 represents filled pixels
    const logoData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    // Animation variables
    let animationFrame: number
    let step = 0
    const totalSteps = 60

    // Clear canvas
    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    // Draw a single pixel
    const drawPixel = (x: number, y: number, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }

    // Draw the logo with animation
    const drawLogo = (progress: number) => {
      clear()

      // Calculate center offset to center the logo
      const offsetX = Math.floor((canvas.width / pixelSize - logoData[0].length) / 2)
      const offsetY = Math.floor((canvas.height / pixelSize - logoData.length) / 2)

      // Draw each pixel with animation
      for (let y = 0; y < logoData.length; y++) {
        for (let x = 0; x < logoData[y].length; x++) {
          if (logoData[y][x] === 1) {
            // Determine if this pixel should be drawn based on animation progress
            const pixelIndex = y * logoData[y].length + x
            const totalPixels = logoData.flat().filter((p) => p === 1).length
            const pixelThreshold = (pixelIndex / totalPixels) * 0.8

            if (progress > pixelThreshold) {
              // Choose color based on position and time
              const colorIndex = Math.floor((x + y + step / 10) % colors.length)
              drawPixel(x + offsetX, y + offsetY, colors[colorIndex])
            }
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      step = (step + 1) % totalSteps

      // Calculate progress (0 to 1)
      let progress
      if (step < totalSteps / 2) {
        // Building up (0 to 1)
        progress = step / (totalSteps / 2)
      } else {
        // Holding complete
        progress = 1
      }

      drawLogo(progress)

      if (isAnimating) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isAnimating])

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pixel-art"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Pixel grid overlay for effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="pixel-grid w-full h-full"></div>
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-pixel text-white text-5xl opacity-80 pointer-events-none">LQ</h2>
        </div>
      </div>
    </motion.div>
  )
}
