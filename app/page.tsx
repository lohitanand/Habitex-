import Link from "next/link"
import { Button } from "@/components/ui/button"
import DynamicTestimonials from "@/components/dynamic-testimonials"
import PixelAdventureLogo from "@/components/pixel-adventure-logo"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Level Up Your Life with LifeQuest</h1>
              <p className="text-xl mb-8">
                Transform your daily habits into an epic adventure. Build better habits, complete quests, and watch your
                character grow as you improve your real life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium"
                  >
                    Start Your Adventure
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-80 h-80 rounded-lg relative overflow-hidden shadow-xl">
                {/* Replace with new pixel art animation inspired by Codedex */}
                <PixelAdventureLogo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How LifeQuest Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Build Better Habits"
              description="Track daily habits and build streaks. Get rewarded for consistency and watch your character level up."
              icon="📝"
            />
            <FeatureCard
              title="Complete Epic Quests"
              description="Take on challenges that help you achieve your goals. Break big goals into manageable steps."
              icon="🏆"
            />
            <FeatureCard
              title="Earn Rewards"
              description="Unlock power-ups, character customizations, and real-world rewards as you progress."
              icon="🎁"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Adventurers Say</h2>
          <DynamicTestimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who are leveling up their lives one habit at a time.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium border-2 border-yellow-500"
            >
              Create an Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">LifeQuest</h3>
              <p className="text-gray-400">Level up your life</p>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="hover:text-blue-400">
                About
              </Link>
              <Link href="/how-it-works" className="hover:text-blue-400">
                How It Works
              </Link>
              <Link href="/privacy" className="hover:text-blue-400">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-blue-400">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} LifeQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
