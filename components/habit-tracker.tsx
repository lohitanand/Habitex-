"use client"

import { useState, useEffect } from "react"
import { Check, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLocalStorage, setLocalStorage, generateId } from "@/lib/local-storage"

// Sample habit data
const INITIAL_HABITS = [
  {
    id: "1",
    name: "Morning Meditation",
    description: "10 minutes of mindfulness to start the day",
    category: "wellness",
    frequency: "daily",
    points: 15,
    streak: 7,
    completed: false,
    timeOfDay: "morning",
    difficulty: "easy",
  },
  {
    id: "2",
    name: "Workout Session",
    description: "30 minutes of strength training or cardio",
    category: "fitness",
    frequency: "daily",
    points: 25,
    streak: 3,
    completed: false,
    timeOfDay: "evening",
    difficulty: "medium",
  },
  {
    id: "3",
    name: "Read a Book",
    description: "Read at least 20 pages",
    category: "learning",
    frequency: "daily",
    points: 20,
    streak: 5,
    completed: false,
    timeOfDay: "evening",
    difficulty: "easy",
  },
  {
    id: "4",
    name: "Drink 8 Glasses of Water",
    description: "Stay hydrated throughout the day",
    category: "wellness",
    frequency: "daily",
    points: 15,
    streak: 10,
    completed: false,
    timeOfDay: "all-day",
    difficulty: "easy",
  },
  {
    id: "5",
    name: "Practice Coding",
    description: "Work on a personal project for 1 hour",
    category: "learning",
    frequency: "daily",
    points: 30,
    streak: 2,
    completed: false,
    timeOfDay: "evening",
    difficulty: "hard",
  },
]

export default function HabitTracker({ updateStats = () => {} }) {
  const [habits, setHabits] = useState(INITIAL_HABITS)
  const [filter, setFilter] = useState("all")
  const [statsUpdated, setStatsUpdated] = useState(false)
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    category: "wellness",
    frequency: "daily",
    points: 15,
    difficulty: "easy",
    timeOfDay: "morning",
  })

  // Load habits from local storage on initial render
  useEffect(() => {
    const savedHabits = getLocalStorage("habits")
    if (savedHabits) {
      setHabits(savedHabits)
    } else {
      setLocalStorage("habits", INITIAL_HABITS)
    }
  }, [])

  // Update stats whenever habits change, but only once after initial load
  useEffect(() => {
    // Skip the first render to avoid infinite loops
    if (!statsUpdated) {
      setStatsUpdated(true)
      return
    }

    const completedCount = habits.filter((habit) => habit.completed).length
    const totalHabits = habits.length
    const completionPercentage = Math.round((completedCount / totalHabits) * 100) || 0

    // Calculate total points earned today
    const pointsEarned = habits.filter((habit) => habit.completed).reduce((total, habit) => total + habit.points, 0)

    updateStats({
      points: pointsEarned,
      pointsGain: pointsEarned > 0 ? Math.floor(pointsEarned / 10) : 0,
      completed: completedCount,
      total: totalHabits,
      percentage: completionPercentage,
      dailyCompleted: completedCount,
      dailyTotal: totalHabits,
      dailyPercentage: completionPercentage,
    })
  }, [habits, updateStats, statsUpdated])

  const filteredHabits = habits.filter((habit) => {
    if (filter === "all") return true
    if (filter === "completed") return habit.completed
    if (filter === "pending") return !habit.completed
    return habit.category === filter
  })

  const toggleHabit = (id) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        // If completing a habit, update streak
        if (!habit.completed) {
          return {
            ...habit,
            completed: true,
            streak: habit.streak + 1,
          }
        }
        // If uncompleting a habit, reduce streak
        return {
          ...habit,
          completed: false,
          streak: Math.max(0, habit.streak - 1),
        }
      }
      return habit
    })

    setHabits(updatedHabits)
    setLocalStorage("habits", updatedHabits)
  }

  const handleAddHabit = () => {
    if (!newHabit.name.trim()) return

    const habit = {
      ...newHabit,
      id: generateId(),
      streak: 0,
      completed: false,
    }

    const updatedHabits = [...habits, habit]
    setHabits(updatedHabits)
    setLocalStorage("habits", updatedHabits)

    // Reset form
    setNewHabit({
      name: "",
      description: "",
      category: "wellness",
      frequency: "daily",
      points: 15,
      difficulty: "easy",
      timeOfDay: "morning",
    })

    setIsAddHabitOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">My Habits</h2>
        <Button variant="pixel" size="sm" onClick={() => setIsAddHabitOpen(true)} className="flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Habit
        </Button>
      </div>

      <Card className="border-2 border-pixel-border bg-[hsl(var(--pixel-light))]">
        <CardContent className="pt-6">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <FilterButton label="All" value="all" currentFilter={filter} setFilter={setFilter} />
            <FilterButton label="Pending" value="pending" currentFilter={filter} setFilter={setFilter} />
            <FilterButton label="Completed" value="completed" currentFilter={filter} setFilter={setFilter} />
            <FilterButton label="Wellness" value="wellness" currentFilter={filter} setFilter={setFilter} />
            <FilterButton label="Fitness" value="fitness" currentFilter={filter} setFilter={setFilter} />
            <FilterButton label="Learning" value="learning" currentFilter={filter} setFilter={setFilter} />
          </div>

          <div className="space-y-3">
            {filteredHabits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} onToggle={() => toggleHabit(habit.id)} />
            ))}

            {filteredHabits.length === 0 && (
              <div className="text-center py-6 text-gray-500">No habits found for this filter</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Habit Dialog */}
      <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-pixel text-[hsl(var(--pixel-primary))]">Add New Habit</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                placeholder="e.g., Morning Meditation"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newHabit.description}
                onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                placeholder="e.g., 10 minutes of mindfulness"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newHabit.category}
                  onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wellness">Wellness</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={newHabit.difficulty}
                  onValueChange={(value) => setNewHabit({ ...newHabit, difficulty: value })}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={newHabit.frequency}
                  onValueChange={(value) => setNewHabit({ ...newHabit, frequency: value })}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="points">Points</Label>
                <Select
                  value={String(newHabit.points)}
                  onValueChange={(value) => setNewHabit({ ...newHabit, points: Number(value) })}
                >
                  <SelectTrigger id="points">
                    <SelectValue placeholder="Select points" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 (Easy)</SelectItem>
                    <SelectItem value="15">15 (Normal)</SelectItem>
                    <SelectItem value="25">25 (Medium)</SelectItem>
                    <SelectItem value="40">40 (Hard)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeOfDay">Time of Day</Label>
              <Select
                value={newHabit.timeOfDay}
                onValueChange={(value) => setNewHabit({ ...newHabit, timeOfDay: value })}
              >
                <SelectTrigger id="timeOfDay">
                  <SelectValue placeholder="Select time of day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="all-day">All Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddHabitOpen(false)}>
              Cancel
            </Button>
            <Button variant="pixel" onClick={handleAddHabit}>
              Add Habit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FilterButton({
  label,
  value,
  currentFilter,
  setFilter,
}: {
  label: string
  value: string
  currentFilter: string
  setFilter: (value: string) => void
}) {
  const isActive = currentFilter === value

  return (
    <button
      onClick={() => setFilter(value)}
      className={`
        px-3 py-1 text-sm rounded-md whitespace-nowrap font-pixel
        ${isActive ? "bg-[hsl(var(--pixel-primary))] text-white" : "bg-[hsl(var(--pixel-dark))] text-[hsl(var(--pixel-light))] hover:bg-[hsl(var(--pixel-primary))]/70"}
        transition-colors border-b-2 border-r-2 border-black/20 active:border-0 active:border-t-2 active:border-l-2
      `}
    >
      {label}
    </button>
  )
}

function HabitItem({
  habit,
  onToggle,
}: {
  habit: any
  onToggle: () => void
}) {
  const categoryColors: Record<string, string> = {
    wellness: "bg-green-100 text-green-800",
    fitness: "bg-blue-100 text-blue-800",
    learning: "bg-purple-100 text-purple-800",
    productivity: "bg-amber-100 text-amber-800",
  }

  const difficultyColors: Record<string, string> = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  }

  return (
    <div
      className={`
      p-3 rounded-lg border-2 border-pixel-border
      ${habit.completed ? "bg-[hsl(var(--pixel-light))]/50" : "bg-white"}
      transition-colors
    `}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`
            w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0
            ${
              habit.completed
                ? "bg-[hsl(var(--pixel-accent))] text-white"
                : "border-2 border-pixel-border text-transparent hover:border-[hsl(var(--pixel-primary))]"
            }
            transition-colors
          `}
        >
          {habit.completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={`font-pixel ${habit.completed ? "line-through text-gray-500" : "text-[hsl(var(--pixel-primary))]"}`}
            >
              {habit.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[habit.category]}`}>
              {habit.category}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[habit.difficulty]}`}>
              {habit.difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate">{habit.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xs text-gray-500">Streak</div>
            <div className="font-pixel">{habit.streak}🔥</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500">Points</div>
            <div className="font-pixel">{habit.points}✨</div>
          </div>
        </div>
      </div>
    </div>
  )
}
