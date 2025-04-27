"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HabitTracker from "@/components/habit-tracker"
import QuestJournal from "@/components/quest-journal"
import CharacterStats from "@/components/character-stats"
import RewardMarketplace from "@/components/reward-marketplace"
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("habits")
  const [stats, setStats] = useState({
    points: 120,
    pointsGain: 15,
    streak: 7,
    streakGain: 1,
    completed: 5,
    total: 8,
    percentage: 62,
    dailyCompleted: 2,
    dailyTotal: 5,
    dailyPercentage: 40,
  })

  // Load stats from local storage on initial render
  useEffect(() => {
    const savedStats = getLocalStorage("lifequest-user-stats")
    if (savedStats) {
      setStats(savedStats)
    }
  }, [])

  // Update stats when habits are completed - using useCallback to prevent infinite loops
  const updateStats = useCallback((newStats) => {
    if (typeof newStats === "function") {
      setStats((prevStats) => {
        const updatedStats = { ...prevStats, ...newStats(prevStats) }
        setLocalStorage("lifequest-user-stats", updatedStats)
        return updatedStats
      })
    } else {
      setStats((prevStats) => {
        const updatedStats = { ...prevStats, ...newStats }
        setLocalStorage("lifequest-user-stats", updatedStats)
        return updatedStats
      })
    }
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-pixel text-[hsl(var(--pixel-primary))] mb-2">Welcome back, Adventurer!</h1>
        <p className="text-gray-600">Continue your journey to build better habits and level up your life.</p>
      </div>

      {/* Update the stats cards to use the new purple theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[hsl(var(--pixel-dark))] p-6 rounded-lg border-2 border-pixel-border shadow-md pixel-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[hsl(var(--pixel-accent))] rounded-md mr-4 pixel-art">
              <div className="pixel-character-face">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="mouth"></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-[hsl(var(--pixel-light))]">Today's Points</div>
              <div className="text-2xl font-pixel text-white">{stats.points}</div>
              <div className="text-green-400 text-sm">+{stats.pointsGain}</div>
            </div>
          </div>
        </div>

        <div className="bg-[hsl(var(--pixel-dark))] p-6 rounded-lg border-2 border-pixel-border shadow-md pixel-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[hsl(var(--pixel-accent))] rounded-md mr-4 pixel-art">
              <div className="pixel-character-face">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="mouth"></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-[hsl(var(--pixel-light))]">Current Streak</div>
              <div className="text-2xl font-pixel text-white">{stats.streak} days</div>
              <div className="text-green-400 text-sm">+{stats.streakGain}</div>
            </div>
          </div>
        </div>

        <div className="bg-[hsl(var(--pixel-dark))] p-6 rounded-lg border-2 border-pixel-border shadow-md pixel-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[hsl(var(--pixel-accent))] rounded-md mr-4 pixel-art">
              <div className="pixel-character-face">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="mouth"></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-[hsl(var(--pixel-light))]">Completed Habits</div>
              <div className="text-2xl font-pixel text-white">
                {stats.completed}/{stats.total}
              </div>
              <div className="text-[hsl(var(--pixel-light))] text-sm">{stats.percentage}%</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4 bg-[hsl(var(--pixel-dark))] border-2 border-pixel-border p-1">
          <TabsTrigger
            value="habits"
            className="font-pixel data-[state=active]:bg-[hsl(var(--pixel-accent))] data-[state=active]:text-white"
          >
            Habits & Tasks
          </TabsTrigger>
          <TabsTrigger
            value="quests"
            className="font-pixel data-[state=active]:bg-[hsl(var(--pixel-accent))] data-[state=active]:text-white"
          >
            Quest Journal
          </TabsTrigger>
          <TabsTrigger
            value="character"
            className="font-pixel data-[state=active]:bg-[hsl(var(--pixel-accent))] data-[state=active]:text-white"
          >
            Character Stats
          </TabsTrigger>
          <TabsTrigger
            value="rewards"
            className="font-pixel data-[state=active]:bg-[hsl(var(--pixel-accent))] data-[state=active]:text-white"
          >
            Reward Marketplace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="habits">
          <div className="bg-[hsl(var(--pixel-light))] p-6 rounded-lg border-2 border-pixel-border shadow-md pixel-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-pixel text-[hsl(var(--pixel-primary))]">Today's Habits</h2>
              <Button variant="pixel" onClick={() => document.getElementById("add-habit-dialog")?.showModal()}>
                <span className="mr-1">+</span> Add Habit
              </Button>
            </div>
            <p className="text-gray-600 mb-4">Complete your daily habits to earn points and level up</p>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-pixel">Daily Progress</div>
                <div>
                  {stats.dailyCompleted}/{stats.dailyTotal} ({stats.dailyPercentage}%)
                </div>
              </div>
              <Progress value={stats.dailyPercentage} className="h-2 bg-[hsl(var(--pixel-dark))]" />
            </div>

            <HabitTracker updateStats={updateStats} />
          </div>
        </TabsContent>

        <TabsContent value="quests">
          <QuestJournal updateStats={updateStats} />
        </TabsContent>

        <TabsContent value="character">
          <CharacterStats stats={stats} />
        </TabsContent>

        <TabsContent value="rewards">
          <div className="bg-[hsl(var(--pixel-light))] p-6 rounded-lg border-2 border-pixel-border shadow-md pixel-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-pixel text-[hsl(var(--pixel-primary))]">Reward Marketplace</h2>
              <Link href="/dashboard/rewards">
                <Button variant="pixel">Visit Full Marketplace</Button>
              </Link>
            </div>
            <p className="text-gray-600 mb-4">Spend your hard-earned points on rewards</p>

            <RewardMarketplace stats={stats} updateStats={updateStats} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Habit Dialog */}
      <dialog
        id="add-habit-dialog"
        className="modal p-6 rounded-lg shadow-lg bg-[hsl(var(--pixel-light))] max-w-md mx-auto border-2 border-pixel-border"
      >
        <div className="modal-content">
          <h3 className="text-xl font-pixel text-[hsl(var(--pixel-primary))] mb-4">Add New Habit</h3>
          <form method="dialog" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Habit Name</label>
              <input
                type="text"
                className="w-full p-2 border-2 border-pixel-border rounded-md"
                placeholder="e.g., Morning Meditation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                className="w-full p-2 border-2 border-pixel-border rounded-md"
                placeholder="e.g., 10 minutes of mindfulness"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select className="w-full p-2 border-2 border-pixel-border rounded-md">
                  <option>Wellness</option>
                  <option>Fitness</option>
                  <option>Learning</option>
                  <option>Productivity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select className="w-full p-2 border-2 border-pixel-border rounded-md">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border-2 border-pixel-border rounded-md"
                onClick={() => document.getElementById("add-habit-dialog")?.close()}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[hsl(var(--pixel-accent))] text-white rounded-md font-pixel border-b-2 border-r-2 border-black/20 active:border-0 active:border-t-2 active:border-l-2 transition-all duration-100"
                onClick={() => {
                  // Add habit logic would go here
                  document.getElementById("add-habit-dialog")?.close()

                  // Update stats for demo purposes
                  updateStats({
                    dailyTotal: stats.dailyTotal + 1,
                  })
                }}
              >
                Add Habit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}
