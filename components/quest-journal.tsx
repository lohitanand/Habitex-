"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage"

const INITIAL_QUESTS = [
  {
    id: 1,
    title: "Morning Routine Master",
    description: "Complete your morning routine for 7 consecutive days",
    progress: 5,
    total: 7,
    reward: "50 XP + Rare Loot Box",
    category: "daily",
    completed: false,
  },
  {
    id: 2,
    title: "Fitness Enthusiast",
    description: "Complete 10 workout sessions",
    progress: 3,
    total: 10,
    reward: "100 XP + Epic Loot Box",
    category: "challenge",
    completed: false,
  },
  {
    id: 3,
    title: "Bookworm",
    description: "Read for at least 30 minutes for 5 days",
    progress: 2,
    total: 5,
    reward: "75 XP + Uncommon Loot Box",
    category: "weekly",
    completed: false,
  },
]

export default function QuestJournal({ updateStats }) {
  const [quests, setQuests] = useState(INITIAL_QUESTS)
  const [activeCategory, setActiveCategory] = useState("all")

  // Load quests from local storage on initial render
  useEffect(() => {
    const savedQuests = getLocalStorage("quests")
    if (savedQuests) {
      setQuests(savedQuests)
    } else {
      setLocalStorage("quests", INITIAL_QUESTS)
    }
  }, [])

  const filteredQuests = quests.filter((quest) => activeCategory === "all" || quest.category === activeCategory)

  const progressQuest = (id) => {
    const updatedQuests = quests.map((quest) => {
      if (quest.id === id && !quest.completed) {
        const newProgress = quest.progress + 1
        const isCompleted = newProgress >= quest.total

        // If quest is completed, update stats
        if (isCompleted && !quest.completed) {
          // Extract XP from reward text (e.g., "50 XP + Rare Loot Box")
          const xpMatch = quest.reward.match(/(\d+) XP/)
          const xpGained = xpMatch ? Number.parseInt(xpMatch[1]) : 0

          // Update user stats - using a callback to avoid dependency on stats
          updateStats((prevStats) => ({
            points: prevStats.points + xpGained,
            pointsGain: prevStats.pointsGain + Math.floor(xpGained / 10),
          }))
        }

        return {
          ...quest,
          progress: newProgress,
          completed: isCompleted,
        }
      }
      return quest
    })

    setQuests(updatedQuests)
    setLocalStorage("quests", updatedQuests)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-pixel-border bg-[hsl(var(--pixel-light))]">
        <CardHeader>
          <CardTitle className="font-pixel text-[hsl(var(--pixel-primary))]">Quest Journal</CardTitle>
          <CardDescription>Complete quests to earn rewards and level up</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <CategoryButton
              label="All Quests"
              category="all"
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <CategoryButton
              label="Daily"
              category="daily"
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <CategoryButton
              label="Weekly"
              category="weekly"
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <CategoryButton
              label="Challenges"
              category="challenge"
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          <div className="space-y-4">
            {filteredQuests.map((quest) => (
              <QuestItem key={quest.id} quest={quest} onProgress={() => progressQuest(quest.id)} />
            ))}

            {filteredQuests.length === 0 && (
              <div className="text-center py-8 text-gray-500">No quests available in this category</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CategoryButton({ label, category, activeCategory, setActiveCategory }) {
  const isActive = category === activeCategory

  return (
    <button
      onClick={() => setActiveCategory(category)}
      className={`
        px-4 py-2 rounded-md whitespace-nowrap font-pixel
        ${isActive ? "bg-[hsl(var(--pixel-primary))] text-white" : "bg-[hsl(var(--pixel-dark))] text-[hsl(var(--pixel-light))] hover:bg-[hsl(var(--pixel-primary))]/70"}
        transition-colors border-b-2 border-r-2 border-black/20 active:border-0 active:border-t-2 active:border-l-2
      `}
    >
      {label}
    </button>
  )
}

function QuestItem({ quest, onProgress }) {
  const progressPercentage = Math.round((quest.progress / quest.total) * 100)

  return (
    <div
      className={`border-2 border-pixel-border rounded-lg p-4 ${quest.completed ? "bg-[hsl(var(--pixel-light))]/50" : "bg-white"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-pixel ${quest.completed ? "text-gray-500" : "text-[hsl(var(--pixel-primary))]"}`}>
          {quest.title}
        </h3>
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{quest.category}</span>
      </div>
      <p className="text-sm text-gray-500 mb-3">{quest.description}</p>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-pixel">Progress</span>
          <span>
            {quest.progress}/{quest.total}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-[hsl(var(--pixel-dark))]" />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Reward:</span>{" "}
          <span className="text-[hsl(var(--pixel-accent))]">{quest.reward}</span>
        </div>

        {quest.completed ? (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
        ) : (
          <Button variant="pixel" size="sm" onClick={onProgress}>
            Progress
          </Button>
        )}
      </div>
    </div>
  )
}
