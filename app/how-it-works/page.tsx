import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import DynamicTestimonials from "@/components/dynamic-testimonials"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--pixel-light))] flex flex-col">
      <header className="border-b border-pixel-border bg-[hsl(var(--pixel-primary))] px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[hsl(var(--pixel-accent))] pixel-art"></div>
            <span className="font-pixel text-xl text-white">LifeQuest Balance</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="pixel" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="pixel-accent" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-[hsl(var(--pixel-primary))] mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="font-pixel text-3xl md:text-4xl text-[hsl(var(--pixel-primary))] mb-6">How LifeQuest Works</h1>

        <div className="space-y-12">
          {/* Section 1: Introduction */}
          <section className="bg-white rounded-lg border-2 border-pixel-border p-6 pixel-card">
            <h2 className="font-pixel text-2xl text-[hsl(var(--pixel-primary))] mb-4">
              Transform Your Habits Into Adventures
            </h2>
            <p className="text-gray-700 mb-4">
              LifeQuest Balance turns your daily habits and routines into an immersive RPG experience. By gamifying your
              personal development, we make building positive habits fun, engaging, and sustainable.
            </p>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-[hsl(var(--pixel-accent))] pixel-character"></div>
              </div>
            </div>
          </section>

          {/* Section 2: Core Features */}
          <section className="space-y-6">
            <h2 className="font-pixel text-2xl text-[hsl(var(--pixel-primary))]">Core Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="Habit Tracking"
                description="Track daily habits and build streaks to earn points and level up your character. The longer your streak, the more rewards you earn."
                icon="calendar"
              />
              <FeatureCard
                title="Quest System"
                description="Complete themed quests that combine multiple habits into meaningful journeys with special rewards and achievements."
                icon="map"
              />
              <FeatureCard
                title="Character Development"
                description="Customize and level up your character as you progress. Unlock new abilities, appearances, and stats that reflect your real-world growth."
                icon="user"
              />
              <FeatureCard
                title="Reward Marketplace"
                description="Spend earned points on digital rewards, power-ups, and real-world treats that reinforce your positive behaviors."
                icon="gift"
              />
            </div>
          </section>

          {/* Section 3: The Science */}
          <section className="bg-white rounded-lg border-2 border-pixel-border p-6 pixel-card">
            <h2 className="font-pixel text-2xl text-[hsl(var(--pixel-primary))] mb-4">The Science Behind LifeQuest</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                LifeQuest Balance is built on proven behavioral psychology principles that make habit formation more
                effective and sustainable:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong>Variable Rewards</strong> - Our reward system uses unpredictable reinforcement schedules that
                  are proven to strengthen habit formation.
                </li>
                <li>
                  <strong>Implementation Intentions</strong> - We help you plan exactly when, where, and how you'll
                  perform habits, dramatically increasing follow-through.
                </li>
                <li>
                  <strong>Loss Aversion</strong> - Strategic "streak" mechanics leverage your natural desire to avoid
                  losing progress.
                </li>
                <li>
                  <strong>Social Accountability</strong> - Optional guild features provide social support and positive
                  peer pressure.
                </li>
                <li>
                  <strong>Flow State Design</strong> - Challenges adapt to your skill level to keep you engaged without
                  becoming overwhelmed or bored.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: How to Get Started */}
          <section className="space-y-6">
            <h2 className="font-pixel text-2xl text-[hsl(var(--pixel-primary))]">How to Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StepCard
                number={1}
                title="Create Your Account"
                description="Sign up and create your character. Choose your starting attributes and appearance."
              />
              <StepCard
                number={2}
                title="Add Your Habits"
                description="Add the habits you want to build or break. Set frequency, difficulty, and reminders."
              />
              <StepCard
                number={3}
                title="Begin Your Journey"
                description="Start completing habits, earning rewards, and watching your character grow alongside you."
              />
            </div>

            <div className="mt-8 text-center">
              <Link href="/signup">
                <Button variant="pixel-accent" size="lg" className="px-8">
                  Start Your Adventure Today
                </Button>
              </Link>
            </div>
          </section>

          {/* Section 5: Testimonials */}
          <DynamicTestimonials />
        </div>
      </main>

      <footer className="bg-[hsl(var(--pixel-primary))] text-white px-4 py-8 border-t border-pixel-border mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-pixel text-lg">LifeQuest Balance</span>
              <p className="text-sm mt-1 text-[hsl(var(--pixel-light))]">
                Transform your habits into an epic adventure
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-[hsl(var(--pixel-light))] hover:text-white transition">
                About
              </Link>
              <Link href="/privacy" className="text-[hsl(var(--pixel-light))] hover:text-white transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-[hsl(var(--pixel-light))] hover:text-white transition">
                Terms
              </Link>
              <Link href="/contact" className="text-[hsl(var(--pixel-light))] hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-[hsl(var(--pixel-light))]">
            © {new Date().getFullYear()} LifeQuest Balance. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-pixel-border pixel-card">
      <div className="mb-4">
        <div className="w-10 h-10 bg-[hsl(var(--pixel-accent))] pixel-art"></div>
      </div>
      <h3 className="font-pixel text-xl mb-2 text-[hsl(var(--pixel-primary))]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-pixel-border pixel-card">
      <div className="w-12 h-12 rounded-full bg-[hsl(var(--pixel-primary))] text-white flex items-center justify-center font-pixel text-xl mb-4">
        {number}
      </div>
      <h3 className="font-pixel text-xl mb-2 text-[hsl(var(--pixel-primary))]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
