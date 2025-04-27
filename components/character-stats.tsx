"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getLocalStorage } from "@/lib/local-storage"

export default function CharacterStats({ stats }) {
  const [character, setCharacter] = useState({
    level: 5,
    xp: 450,
    xpToNextLevel: 1000,
    attributes: {
      strength: 8,
      intelligence: 12,
      wisdom: 10,
      dexterity: 7,
      charisma: 9,
      vitality: 11,
    },
    skills: [
      { name: "Meditation", level: 3, xp: 75, xpToNextLevel: 100 },
      { name: "Fitness", level: 2, xp: 50, xpToNextLevel: 100 },
      { name: "Reading", level: 4, xp: 90, xpToNextLevel: 100 },
      { name: "Coding", level: 3, xp: 60, xpToNextLevel: 100 },
      { name: "Nutrition", level: 2, xp: 40, xpToNextLevel: 100 },
    ],
  })

  // Load character data from local storage on initial render
  useEffect(() => {
    const savedCharacter = getLocalStorage("character")
    if (savedCharacter) {
      setCharacter(savedCharacter)
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Character Stats</CardTitle>
          <CardDescription>Your character's level and attributes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-bold text-lg">Pixel Warrior</h3>
                <p className="text-sm text-gray-500">Level {character.level}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">XP to Next Level</p>
                <p className="font-medium">
                  {character.xp}/{character.xpToNextLevel}
                </p>
              </div>
            </div>
            <Progress value={(character.xp / character.xpToNextLevel) * 100} className="h-2" />
          </div>

          <h3 className="font-bold mb-3">Skills</h3>
          <div className="space-y-3">
            {character.skills.map((skill) => (
              <div key={skill.name} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h4 className="font-medium">{skill.name}</h4>
                    <p className="text-xs text-gray-500">Level {skill.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">XP</p>
                    <p className="text-sm">
                      {skill.xp}/{skill.xpToNextLevel}
                    </p>
                  </div>
                </div>
                <Progress value={(skill.xp / skill.xpToNextLevel) * 100} className="h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
