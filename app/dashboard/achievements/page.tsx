"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function AchievementsPage() {
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
          <h1 className="font-pixel text-2xl md:text-3xl text-[hsl(var(--pixel-primary))] mb-2">Achievements</h1>
          <p className="text-gray-600">Track your progress and unlock special rewards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Achievements" value="12/48" description="25% Complete" />
          <StatCard title="Achievement Points" value="1,250" description="+150 this month" />
          <StatCard title="Rarest Achievement" value="Night Owl" description="Only 5% of users have this" />
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Daily Habits</CardTitle>
            <CardDescription>Achievements related to your daily habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AchievementCard
                name="Early Riser"
                description="Wake up before 7 AM for 7 days in a row"
                unlocked={true}
                category="habits"
              />
              <AchievementCard
                name="Bookworm"
                description="Read for 30 minutes every day for 10 days"
                unlocked={true}
                category="habits"
              />
              <AchievementCard
                name="Fitness Fanatic"
                description="Complete 20 workouts"
                unlocked={true}
                category="habits"
              />
              <AchievementCard
                name="Meditation Master"
                description="Meditate for 100 days total"
                unlocked={false}
                progress={65}
                category="habits"
              />
              <AchievementCard
                name="Water Champion"
                description="Drink 8 glasses of water for 30 days"
                unlocked={false}
                progress={40}
                category="habits"
              />
              <AchievementCard
                name="Journaling Guru"
                description="Write in your journal for 14 consecutive days"
                unlocked={false}
                progress={10}
                category="habits"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Quests</CardTitle>
            <CardDescription>Achievements related to completing quests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AchievementCard
                name="Quest Novice"
                description="Complete your first quest"
                unlocked={true}
                category="quests"
              />
              <AchievementCard
                name="Quest Apprentice"
                description="Complete 5 quests"
                unlocked={true}
                category="quests"
              />
              <AchievementCard
                name="Quest Adept"
                description="Complete 10 quests"
                unlocked={false}
                progress={70}
                category="quests"
              />
              <AchievementCard
                name="Quest Master"
                description="Complete 25 quests"
                unlocked={false}
                progress={28}
                category="quests"
              />
              <AchievementCard
                name="Perfect Quester"
                description="Complete a quest with 100% of all tasks done"
                unlocked={true}
                category="quests"
              />
              <AchievementCard
                name="Quest Legend"
                description="Complete all quests in a category"
                unlocked={false}
                progress={15}
                category="quests"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Special</CardTitle>
            <CardDescription>Rare and unique achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AchievementCard
                name="Night Owl"
                description="Complete 10 habits after 10 PM"
                unlocked={true}
                category="special"
              />
              <AchievementCard
                name="Comeback Kid"
                description="Resume a broken streak after 3+ days"
                unlocked={false}
                progress={0}
                category="special"
              />
              <AchievementCard
                name="Habit Hacker"
                description="Create and maintain 10 custom habits"
                unlocked={false}
                progress={50}
                category="special"
              />
              <AchievementCard
                name="Social Butterfly"
                description="Join a guild and complete 5 group challenges"
                unlocked={false}
                progress={0}
                category="special"
              />
              <AchievementCard
                name="Reward Collector"
                description="Unlock 15 different rewards"
                unlocked={false}
                progress={33}
                category="special"
              />
              <AchievementCard
                name="Pixel Perfect"
                description="Reach level 10 with your character"
                unlocked={false}
                progress={50}
                category="special"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="bg-white p-4 rounded-lg border-2 border-pixel-border">
      <h3 className="font-medium text-gray-500 text-sm">{title}</h3>
      <p className="font-pixel text-2xl text-[hsl(var(--pixel-primary))] my-1">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}

function AchievementCard({
  name,
  description,
  unlocked,
  progress = 100,
  category,
}: {
  name: string
  description: string
  unlocked: boolean
  progress?: number
  category: string
}) {
  const categoryColors: Record<string, string> = {
    habits: "yellow",
    quests: "blue",
    special: "purple",
  }

  const color = categoryColors[category] || "yellow"

  return (
    <div
      className={`
      p-3 border-2 rounded-lg
      ${unlocked ? `border-${color}-300 bg-${color}-50` : "border-gray-200 bg-white"}
    `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          w-8 h-8 flex-shrink-0 rounded-full
          ${unlocked ? `bg-${color}-400` : "bg-gray-200"}
          pixel-art
        `}
        ></div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-gray-600 mb-1">{description}</p>
          {!unlocked && (
            <>
              <div className="flex justify-between text-xs text-gray-500 mb-0.5">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
