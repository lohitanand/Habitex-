import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative bg-[hsl(var(--pixel-dark))] py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="pixel-grid"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-pixel text-4xl md:text-5xl text-white leading-tight mb-4">
              Transform Your Habits Into An Epic Adventure
            </h1>
            <p className="text-[hsl(var(--pixel-light))] text-lg mb-8 max-w-lg">
              LifeQuest Balance turns your daily habits into an immersive RPG experience with real psychological
              benefits for lasting behavior change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button variant="pixel-accent" size="lg" className="w-full">
                  Start Your Quest
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 pixel-character">
                <div className="pixel-character-face">
                  <div className="eyes">
                    <div className="eye"></div>
                    <div className="eye"></div>
                  </div>
                  <div className="mouth"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/20 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
