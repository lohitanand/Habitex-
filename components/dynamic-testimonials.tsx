"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getTestimonials } from "@/lib/local-storage"
import type { Testimonial } from "@/lib/local-storage"

export default function DynamicTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Get testimonials from local storage
    const allTestimonials = getTestimonials()
    setTestimonials(allTestimonials)

    // Set up auto-rotation
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative py-10">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex-shrink-0">
              {/* This would be an actual image in production */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {currentTestimonial.name.charAt(0)}
              </div>
            </div>
            <div>
              <blockquote className="text-lg italic mb-4">"{currentTestimonial.quote}"</blockquote>
              <div className="font-medium">{currentTestimonial.name}</div>
              <div className="text-sm text-gray-500">{currentTestimonial.title}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            } transition-colors`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
