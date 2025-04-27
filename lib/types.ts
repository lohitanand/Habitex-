export interface Reward {
  id: string
  name: string
  description: string
  type: "powerup" | "cosmetic" | "currency" | "lootbox"
  value?: number
  duration?: number
  imageUrl?: string
  rarity?: "common" | "rare" | "epic" | "legendary"
  image?: string
  quantity?: number
}

export interface Item {
  id: string
  name: string
  description: string
  type: string
  price?: number
  effect?: {
    stat: string
    value: number
  }
  quantity: number
  imageUrl?: string
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
