"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import QuestJournal from "@/components/quest-journal"

export default function QuestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

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
          <h1 className="font-pixel text-2xl md:text-3xl text-[hsl(var(--pixel-primary))] mb-2">Quest Journal</h1>
          <p className="text-gray-600">Complete quests to earn special rewards and level up faster</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search quests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeFilter === "all" ? "pixel" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All Quests
            </Button>
            <Button
              variant={activeFilter === "active" ? "pixel" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={activeFilter === "completed" ? "pixel" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>

        <QuestJournal />

        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Available Quests</CardTitle>
            <CardDescription>Discover new quests to embark on your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AvailableQuest
                title="Mindfulness Master"
                description="Develop a consistent meditation practice"
                difficulty="Medium"
                duration="3 weeks"
                rewards="200 XP, 75 Coins, Mindfulness Badge"
              />
              <AvailableQuest
                title="Bookworm Challenge"
                description="Read for 30 minutes every day"
                difficulty="Easy"
                duration="2 weeks"
                rewards="150 XP, 50 Coins, Reading Badge"
              />
              <AvailableQuest
                title="Fitness Fundamentals"
                description="Establish a regular exercise routine"
                difficulty="Hard"
                duration="4 weeks"
                rewards="300 XP, 100 Coins, Fitness Badge"
              />
              <AvailableQuest
                title="Hydration Hero"
                description="Drink 8 glasses of water daily"
                difficulty="Easy"
                duration="2 weeks"
                rewards="120 XP, 40 Coins, Hydration Badge"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function AvailableQuest({
  title,
  description,
  difficulty,
  duration,
  rewards,
}: {
  title: string
  description: string
  difficulty: string
  duration: string
  rewards: string
}) {
  const difficultyColor =
    difficulty === "Easy"
      ? "bg-green-100 text-green-800"
      : difficulty === "Medium"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800"

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[hsl(var(--pixel-accent))] pixel-art flex-shrink-0"></div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium">{title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor}`}>{difficulty}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {duration}
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {rewards}
            </span>
          </div>
          <Button variant="pixel" size="sm">
            Start Quest
          </Button>
        </div>
      </div>
    </div>
  )
}
