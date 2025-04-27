// Type definitions for our data structures
export interface User {
  id: string
  username: string
  email: string
  password: string // In a real app, this would be hashed
  displayName: string
  level: number
  xp: number
  maxXp: number
  createdAt: string
  lastLogin: string
  characterType: string
  coins: number
  attributes: {
    physical: number
    mental: number
    emotional: number
    social: number
    creativity: number
  }
  inventory?: Reward[]
  activePowerups?: Reward[]
  equippedCosmetics?: Record<string, Reward>
  currency: number
}

export interface Quest {
  id: string
  userId: string
  title: string
  description: string
  category: string
  difficulty: string
  progress: number
  steps: {
    id: number
    name: string
    completed: boolean
  }[]
  rewards: {
    xp: number
    coins: number
    items: string[]
  }
  deadline: string | null
  timeEstimate: string
  createdAt: string
  active: boolean
}

export interface Reward {
  id: string
  name: string
  description: string
  category?: string
  cost?: number
  limited?: boolean
  available?: boolean
  timeLimit?: string | null
  image?: string
  purchased?: boolean
  used?: boolean
  quantity?: number
  type: "powerup" | "cosmetic" | "currency" | "lootbox"
  value?: number
  duration?: number
  imageUrl?: string
  rarity?: "common" | "rare" | "epic" | "legendary"
}

export interface Achievement {
  id: string
  name: string
  description: string
  category: string
  unlocked: boolean
  progress: number
  maxProgress: number
  image: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  image: string
}

export type UserStats = {
  health: number
  experience: number
  level: number
  gold: number
  strength: number
  intelligence: number
  charisma: number
  dailyStreak: number
  questsCompleted: number
  habitsCompleted: number
}

export type Item = {
  id: string
  name: string
  description: string
  type: string // 'powerup', 'cosmetic', 'lootbox'
  price?: number
  effect?: {
    stat: string
    value: number
  }
  quantity: number
  imageUrl?: string
}

export type Habit = {
  id: string
  name: string
  description: string
  frequency: string
  streak: number
  completed: boolean
  lastCompleted?: string
}

// Helper functions for local storage
const STORAGE_KEYS = {
  USER: "lifequest-user",
  HABITS: "lifequest-habits",
  QUESTS: "lifequest-quests",
  REWARDS: "lifequest-rewards",
  ACHIEVEMENTS: "lifequest-achievements",
  TESTIMONIALS: "lifequest-testimonials",
  ONBOARDED: "lifequest-onboarded",
  USER_STATS: "lifequest-user-stats",
  INVENTORY: "lifequest-inventory",
}

// Generic function to get data from localStorage
export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  if (typeof window === "undefined") return defaultValue || null

  const stored = localStorage.getItem(key)
  if (!stored) return defaultValue || null

  try {
    return JSON.parse(stored) as T
  } catch (error) {
    console.error(`Error parsing data from localStorage for key ${key}:`, error)
    return defaultValue || null
  }
}

// Generic function to save data to localStorage
export function setLocalStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving data to localStorage for key ${key}:`, error)
  }
}

// User-specific functions
export function getCurrentUser(): User | null {
  return getLocalStorage<User | null>(STORAGE_KEYS.USER, null)
}

export function saveUser(user: User): void {
  setLocalStorage(STORAGE_KEYS.USER, user)
}

export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER)
}

export function getUserData(): User | null {
  // Initialize a default user if none exists
  const defaultUser: User = {
    id: "default-user",
    username: "default",
    email: "user@example.com",
    password: "password",
    displayName: "Pixel Warrior",
    level: 5,
    xp: 450,
    maxXp: 1000,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    characterType: "warrior",
    coins: 100,
    attributes: {
      physical: 10,
      mental: 10,
      emotional: 10,
      social: 10,
      creativity: 10,
    },
    inventory: [],
    activePowerups: [],
    equippedCosmetics: {},
    currency: 500, // Start with some currency
  }

  const userData = getLocalStorage<User | null>(STORAGE_KEYS.USER, defaultUser)
  return userData
}

export function updateUserData(user: User): void {
  setLocalStorage(STORAGE_KEYS.USER, user)

  // Dispatch a custom event to notify other components
  if (typeof window !== "undefined") {
    const event = new CustomEvent("userDataUpdated", { detail: user })
    window.dispatchEvent(event)
  }
}

// Habits functions
export function getUserHabits(userId: string): Habit[] {
  const allHabits = getLocalStorage<Habit[]>(STORAGE_KEYS.HABITS, [])
  return allHabits.filter((habit) => habit.userId === userId)
}

export function saveHabit(habit: Habit): void {
  const allHabits = getLocalStorage<Habit[]>(STORAGE_KEYS.HABITS, [])
  const existingIndex = allHabits.findIndex((h) => h.id === habit.id)

  if (existingIndex >= 0) {
    allHabits[existingIndex] = habit
  } else {
    allHabits.push(habit)
  }

  setLocalStorage(STORAGE_KEYS.HABITS, allHabits)
}

export function deleteHabit(habitId: string): void {
  const allHabits = getLocalStorage<Habit[]>(STORAGE_KEYS.HABITS, [])
  const updatedHabits = allHabits.filter((h) => h.id !== habitId)
  setLocalStorage(STORAGE_KEYS.HABITS, updatedHabits)
}

// Quests functions
export function getUserQuests(userId: string): Quest[] {
  const allQuests = getLocalStorage<Quest[]>(STORAGE_KEYS.QUESTS, [])
  return allQuests.filter((quest) => quest.userId === userId)
}

export function saveQuest(quest: Quest): void {
  const allQuests = getLocalStorage<Quest[]>(STORAGE_KEYS.QUESTS, [])
  const existingIndex = allQuests.findIndex((q) => q.id === quest.id)

  if (existingIndex >= 0) {
    allQuests[existingIndex] = quest
  } else {
    allQuests.push(quest)
  }

  setLocalStorage(STORAGE_KEYS.QUESTS, allQuests)
}

// Rewards functions
export function getUserRewards(userId: string): Reward[] {
  const allRewards = getLocalStorage<Reward[]>(STORAGE_KEYS.REWARDS, [])
  return allRewards.filter((reward) => reward.userId === userId)
}

export function saveReward(reward: Reward): void {
  const allRewards = getLocalStorage<Reward[]>(STORAGE_KEYS.REWARDS, [])
  const existingIndex = allRewards.findIndex((r) => r.id === reward.id)

  if (existingIndex >= 0) {
    allRewards[existingIndex] = reward
  } else {
    allRewards.push(reward)
  }

  setLocalStorage(STORAGE_KEYS.REWARDS, allRewards)
}

// Achievements functions
export function getUserAchievements(userId: string): Achievement[] {
  const allAchievements = getLocalStorage<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, [])
  return allAchievements.filter((achievement) => achievement.id.startsWith(userId))
}

// Testimonials functions
export function getTestimonials(): Testimonial[] {
  return getLocalStorage<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS)
}

// Check if user has completed onboarding
export function isOnboarded(): boolean {
  return getLocalStorage<boolean>(STORAGE_KEYS.ONBOARDED, false)
}

export function setOnboarded(value: boolean): void {
  setLocalStorage(STORAGE_KEYS.ONBOARDED, value)
}

// Generate a unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Default user stats
const DEFAULT_USER_STATS: UserStats = {
  health: 100,
  experience: 0,
  level: 1,
  gold: 500, // Start with some gold
  strength: 10,
  intelligence: 10,
  charisma: 10,
  dailyStreak: 0,
  questsCompleted: 0,
  habitsCompleted: 0,
}

// Default inventory items
const DEFAULT_INVENTORY: Item[] = []

// Default habits
const DEFAULT_HABITS: Habit[] = [
  {
    id: "1",
    name: "Morning Exercise",
    description: "Do 10 minutes of exercise after waking up",
    frequency: "daily",
    streak: 0,
    completed: false,
  },
  {
    id: "2",
    name: "Read a Book",
    description: "Read at least 10 pages of a book",
    frequency: "daily",
    streak: 0,
    completed: false,
  },
  {
    id: "3",
    name: "Drink Water",
    description: "Drink 8 glasses of water throughout the day",
    frequency: "daily",
    streak: 0,
    completed: false,
  },
]

// Get user stats from localStorage
export const getUserStats = (): UserStats => {
  if (typeof window === "undefined") {
    return DEFAULT_USER_STATS
  }

  const stats = localStorage.getItem("userStats")
  return stats ? JSON.parse(stats) : DEFAULT_USER_STATS
}

// Update user stats in localStorage
export const updateUserStats = (stats: Partial<UserStats>): UserStats => {
  if (typeof window === "undefined") {
    return DEFAULT_USER_STATS
  }

  const currentStats = getUserStats()
  const updatedStats = { ...currentStats, ...stats }
  localStorage.setItem("userStats", JSON.stringify(updatedStats))

  // Dispatch a custom event to notify other components
  const event = new CustomEvent("statsUpdated", { detail: updatedStats })
  window.dispatchEvent(event)

  return updatedStats
}

// Get habits from localStorage
export const getHabits = (): Habit[] => {
  if (typeof window === "undefined") {
    return DEFAULT_HABITS
  }

  const habits = localStorage.getItem("habits")
  return habits ? JSON.parse(habits) : DEFAULT_HABITS
}

// Update habits in localStorage
export const updateHabits = (habits: Habit[]): Habit[] => {
  if (typeof window === "undefined") {
    return DEFAULT_HABITS
  }

  localStorage.setItem("habits", JSON.stringify(habits))
  return habits
}

// Update a single habit
export const updateHabit = (habitId: string, updates: Partial<Habit>): Habit[] => {
  const habits = getHabits()
  const updatedHabits = habits.map((habit) => (habit.id === habitId ? { ...habit, ...updates } : habit))

  updateHabits(updatedHabits)
  return updatedHabits
}

// Complete a habit
export const completeHabit = (habitId: string): { habits: Habit[]; rewards: { gold: number; experience: number } } => {
  const habits = getHabits()
  const today = new Date().toISOString().split("T")[0]

  const updatedHabits = habits.map((habit) => {
    if (habit.id === habitId) {
      const wasCompletedToday = habit.lastCompleted === today

      if (!wasCompletedToday) {
        // Calculate new streak
        const streak = habit.lastCompleted
          ? new Date(today).getTime() - new Date(habit.lastCompleted).getTime() <= 86400000
            ? habit.streak + 1
            : 1
          : 1

        return {
          ...habit,
          completed: true,
          streak,
          lastCompleted: today,
        }
      }
      return habit
    }
    return habit
  })

  updateHabits(updatedHabits)

  // Calculate rewards
  const completedHabit = updatedHabits.find((h) => h.id === habitId)
  const streakBonus = completedHabit ? Math.floor(completedHabit.streak / 3) : 0
  const goldReward = 5 + streakBonus
  const expReward = 10 + streakBonus * 2

  // Update user stats
  const currentStats = getUserStats()
  const updatedStats = {
    ...currentStats,
    gold: currentStats.gold + goldReward,
    experience: currentStats.experience + expReward,
    habitsCompleted: currentStats.habitsCompleted + 1,
  }

  // Level up if enough experience
  const expNeeded = currentStats.level * 100
  if (updatedStats.experience >= expNeeded) {
    updatedStats.level += 1
    updatedStats.experience -= expNeeded
    updatedStats.strength += 2
    updatedStats.intelligence += 2
    updatedStats.charisma += 2
  }

  updateUserStats(updatedStats)

  return {
    habits: updatedHabits,
    rewards: {
      gold: goldReward,
      experience: expReward,
    },
  }
}

// Get inventory items from localStorage
export const getInventoryItems = (): Item[] => {
  if (typeof window === "undefined") {
    return DEFAULT_INVENTORY
  }

  const inventory = localStorage.getItem("inventory")
  return inventory ? JSON.parse(inventory) : DEFAULT_INVENTORY
}

// Add the missing getUserInventory function after the getInventoryItems function

// Get user inventory items from localStorage
export const getUserInventory = (): Reward[] => {
  const userData = getUserData()
  if (!userData || !userData.inventory) {
    return []
  }
  return userData.inventory
}

// Add an item to inventory
export const addInventoryItem = (item: Omit<Item, "quantity">): Item[] => {
  if (typeof window === "undefined") {
    return DEFAULT_INVENTORY
  }

  const inventory = getInventoryItems()

  // Check if item already exists in inventory
  const existingItemIndex = inventory.findIndex((i) => i.id === item.id)

  if (existingItemIndex >= 0) {
    // Increment quantity if item exists
    inventory[existingItemIndex].quantity += 1
  } else {
    // Add new item with quantity 1
    inventory.push({ ...item, quantity: 1 })
  }

  localStorage.setItem("inventory", JSON.stringify(inventory))

  // Dispatch a custom event to notify other components
  const event = new CustomEvent("inventoryUpdated", { detail: inventory })
  window.dispatchEvent(event)

  return inventory
}

// Use an item from inventory
export const useInventoryItem = (itemId: string): { success: boolean; message?: string } => {
  if (typeof window === "undefined") {
    return { success: false, message: "Cannot access localStorage" }
  }

  const inventory = getInventoryItems()
  const itemIndex = inventory.findIndex((item) => item.id === itemId)

  if (itemIndex === -1) {
    return { success: false, message: "Item not found in inventory" }
  }

  const item = inventory[itemIndex]

  // Apply item effects
  if (item.effect) {
    const stats = getUserStats()
    const { stat, value } = item.effect

    if (stat in stats) {
      const updatedStats = { ...stats }
      updatedStats[stat as keyof UserStats] = (updatedStats[stat as keyof UserStats] as number) + value
      updateUserStats(updatedStats)
    }
  }

  // Decrease quantity or remove item if quantity is 1
  if (item.quantity > 1) {
    inventory[itemIndex].quantity -= 1
  } else {
    inventory.splice(itemIndex, 1)
  }

  localStorage.setItem("inventory", JSON.stringify(inventory))

  // Dispatch a custom event to notify other components
  const event = new CustomEvent("inventoryUpdated", { detail: inventory })
  window.dispatchEvent(event)

  return {
    success: true,
    message: item.effect ? `Applied +${item.effect.value} to ${item.effect.stat}!` : "Item used successfully!",
  }
}

// Purchase an item from the marketplace
export const purchaseItem = (item: Omit<Item, "quantity">): { success: boolean; message?: string } => {
  if (typeof window === "undefined") {
    return { success: false, message: "Cannot access localStorage" }
  }

  const stats = getUserStats()

  // Check if user has enough gold
  if (!item.price || stats.gold < item.price) {
    return { success: false, message: "Not enough gold!" }
  }

  // Deduct gold
  updateUserStats({ gold: stats.gold - item.price })

  // Add item to inventory
  addInventoryItem(item)

  return { success: true, message: `Purchased ${item.name}!` }
}

// Default testimonials data
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "I've tried dozens of habit trackers, but LifeQuest is the only one that kept me engaged for more than a week. I'm on a 63-day streak now!",
    name: "Alex K.",
    title: "Level 12 Adventurer",
    image: "alex",
  },
  {
    id: "2",
    quote:
      "The quest system makes it fun to tackle bigger goals by breaking them down into manageable steps. I've accomplished things I never thought I could.",
    name: "Sarah M.",
    title: "Level 8 Explorer",
    image: "sarah",
  },
  {
    id: "3",
    quote:
      "As someone who loves RPGs, this app speaks my language. It's like playing a game, but I'm actually improving my real life in the process.",
    name: "Jordan T.",
    title: "Level 15 Warrior",
    image: "jordan",
  },
  {
    id: "4",
    quote:
      "The gamification elements keep me motivated. Seeing my character level up as I build better habits is incredibly satisfying!",
    name: "Emma R.",
    title: "Level 10 Mage",
    image: "emma",
  },
  {
    id: "5",
    quote:
      "I've finally established a consistent meditation practice thanks to LifeQuest. The streak system really works for me.",
    name: "Michael P.",
    title: "Level 7 Monk",
    image: "michael",
  },
  {
    id: "6",
    quote:
      "The reward marketplace gives me something to look forward to. I love saving up coins for both digital and real-world treats.",
    name: "Olivia S.",
    title: "Level 9 Rogue",
    image: "olivia",
  },
  {
    id: "7",
    quote:
      "I've tried many productivity apps, but this is the first one that actually makes me want to complete my tasks. The pixel art style is charming!",
    name: "Daniel L.",
    title: "Level 11 Ranger",
    image: "daniel",
  },
  {
    id: "8",
    quote:
      "My guild keeps me accountable. It's so much easier to stick with habits when you have a supportive community.",
    name: "Sophia W.",
    title: "Level 14 Paladin",
    image: "sophia",
  },
]

// Default starter quests for new users
export const STARTER_QUESTS: Omit<Quest, "id" | "userId">[] = [
  {
    title: "Morning Routine Master",
    description: "Establish a consistent morning routine to start your day with intention",
    category: "Wellness",
    difficulty: "medium",
    progress: 0,
    steps: [
      { id: 1, name: "Wake up at the same time for 5 days", completed: false },
      { id: 2, name: "Drink a glass of water before coffee for 5 days", completed: false },
      { id: 3, name: "Meditate for 5 minutes for 5 days", completed: false },
    ],
    rewards: {
      xp: 100,
      coins: 50,
      items: ["Morning Champion Badge"],
    },
    deadline: null,
    timeEstimate: "2 weeks",
    createdAt: new Date().toISOString(),
    active: true,
  },
  {
    title: "Digital Detox Challenge",
    description: "Reduce screen time and improve your relationship with technology",
    category: "Wellness",
    difficulty: "easy",
    progress: 0,
    steps: [
      { id: 1, name: "No phone for the first hour after waking for 3 days", completed: false },
      { id: 2, name: "Set app time limits for social media", completed: false },
      { id: 3, name: "No screens 1 hour before bed for 3 days", completed: false },
    ],
    rewards: {
      xp: 75,
      coins: 30,
      items: ["Digital Balance Badge"],
    },
    deadline: null,
    timeEstimate: "2 weeks",
    createdAt: new Date().toISOString(),
    active: true,
  },
]

// Default starter achievements for new users
export const STARTER_ACHIEVEMENTS: Omit<Achievement, "id">[] = [
  {
    name: "First Steps",
    description: "Create your first habit",
    category: "habits",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    image: "first-steps",
  },
  {
    name: "Habit Streak",
    description: "Complete the same habit for 7 days in a row",
    category: "habits",
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    image: "habit-streak",
  },
  {
    name: "Quest Novice",
    description: "Complete your first quest",
    category: "quests",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    image: "quest-novice",
  },
]

// Default available rewards for new users
export const AVAILABLE_REWARDS: Omit<Reward, "id" | "userId" | "purchased" | "used" | "quantity">[] = [
  {
    name: "Energy Boost",
    description: "Skip one daily habit without breaking your streak",
    category: "power-up",
    cost: 100,
    limited: false,
    available: true,
    timeLimit: null,
    image: "energy",
    type: "powerup",
  },
  {
    name: "Double Points",
    description: "Earn double points for all habits for 24 hours",
    category: "power-up",
    cost: 200,
    limited: true,
    available: true,
    timeLimit: "3 days",
    image: "double",
    type: "powerup",
  },
  {
    name: "Streak Shield",
    description: "Protect your streaks for 48 hours if you miss habits",
    category: "power-up",
    cost: 300,
    limited: false,
    available: true,
    timeLimit: null,
    image: "shield",
    type: "powerup",
  },
  {
    name: "Movie Night",
    description: "Guilt-free movie night (add to your calendar)",
    category: "real-world",
    cost: 150,
    limited: false,
    available: true,
    timeLimit: null,
    image: "movie",
    type: "powerup",
  },
  {
    name: "Coffee Shop Work",
    description: "Work from your favorite coffee shop for a morning",
    category: "real-world",
    cost: 200,
    limited: false,
    available: true,
    timeLimit: null,
    image: "coffee",
    type: "powerup",
  },
  {
    name: "Epic Character Skin",
    description: "Unlock a special character appearance",
    category: "cosmetic",
    cost: 500,
    limited: true,
    available: true,
    timeLimit: "7 days",
    image: "skin",
    type: "cosmetic",
  },
  {
    name: "Custom Background",
    description: "Unlock a special background for your profile",
    category: "cosmetic",
    cost: 350,
    limited: false,
    available: true,
    timeLimit: null,
    image: "background",
    type: "cosmetic",
  },
]
