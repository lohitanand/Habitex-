"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import HabitTracker from "@/components/habit-tracker"
import { setLocalStorage } from "@/lib/local-storage"

export default function HabitsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day")

  // Add stats state and updateStats function
  const [stats, setStats] = useState({
    points: 0,
    pointsGain: 0,
    streak: 0,
    streakGain: 0,
    completed: 0,
    total: 0,
    percentage: 0,
    dailyCompleted: 0,
    dailyTotal: 0,
    dailyPercentage: 0,
  })

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }

    setCurrentDate(newDate)
  }

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
          <h1 className="font-pixel text-2xl md:text-3xl text-[hsl(var(--pixel-primary))] mb-2">Habit Tracker</h1>
          <p className="text-gray-600">Track and manage your daily habits to build a better routine</p>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Calendar</CardTitle>
              <div className="flex gap-2">
                <Button variant={viewMode === "day" ? "pixel" : "outline"} size="sm" onClick={() => setViewMode("day")}>
                  Day
                </Button>
                <Button
                  variant={viewMode === "week" ? "pixel" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === "month" ? "pixel" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("month")}
                >
                  Month
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                {viewMode === "day" ? "Previous Day" : viewMode === "week" ? "Previous Week" : "Previous Month"}
              </Button>

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[hsl(var(--pixel-primary))]" />
                <span className="font-medium">{formatDate(currentDate)}</span>
              </div>

              <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                {viewMode === "day" ? "Next Day" : viewMode === "week" ? "Next Week" : "Next Month"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {viewMode === "day" && (
              <div className="bg-white border-2 border-pixel-border rounded-lg p-4 min-h-[200px]">
                <p className="text-center text-gray-500">Your habits for {formatDate(currentDate)}</p>
              </div>
            )}

            {viewMode === "week" && (
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const date = new Date(currentDate)
                  date.setDate(date.getDate() - date.getDay() + i)

                  return (
                    <div key={i} className="border-2 border-pixel-border rounded-lg p-2 text-center">
                      <div className="font-medium mb-1">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className="text-sm">{date.getDate()}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {viewMode === "month" && (
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="text-center font-medium text-sm py-1">
                    {new Date(0, 0, i + 1).toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                ))}

                {Array.from({ length: 35 }).map((_, i) => {
                  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
                  const startOffset = firstDay.getDay()
                  const day = i - startOffset + 1
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

                  const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                  const isToday = new Date().toDateString() === date.toDateString()

                  return (
                    <div
                      key={i}
                      className={`
                        border rounded-lg p-1 text-center min-h-[40px]
                        ${isCurrentMonth ? "border-gray-200" : "border-gray-100 bg-gray-50 text-gray-400"}
                        ${isToday ? "bg-[hsl(var(--pixel-accent))]/10 border-[hsl(var(--pixel-accent))]" : ""}
                      `}
                    >
                      {isCurrentMonth ? date.getDate() : ""}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <HabitTracker updateStats={updateStats} />

        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Habit Statistics</CardTitle>
            <CardDescription>Track your progress and consistency over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Completion Rate" value={`${stats.percentage}%`} description="Last 30 days" />
              <StatCard title="Current Streak" value={`${stats.streak} days`} description="All Habits" />
              <StatCard title="Habits Completed" value={`${stats.completed}/${stats.total}`} description="Today" />
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
