"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronRight, Palette, Shirt, User } from "lucide-react"

interface CharacterPart {
  id: string
  name: string
  type: "head" | "body" | "accessory" | "color"
  image?: string
  color?: string
  locked?: boolean
}

const CHARACTER_PARTS: Record<string, CharacterPart[]> = {
  head: [
    { id: "head-1", name: "Default", type: "head", image: "default" },
    { id: "head-2", name: "Warrior", type: "head", image: "warrior" },
    { id: "head-3", name: "Mage", type: "head", image: "mage" },
    { id: "head-4", name: "Rogue", type: "head", image: "rogue", locked: true },
    { id: "head-5", name: "Knight", type: "head", image: "knight", locked: true },
  ],
  body: [
    { id: "body-1", name: "Default", type: "body", image: "default" },
    { id: "body-2", name: "Armor", type: "body", image: "armor" },
    { id: "body-3", name: "Robe", type: "body", image: "robe" },
    { id: "body-4", name: "Leather", type: "body", image: "leather", locked: true },
    { id: "body-5", name: "Royal", type: "body", image: "royal", locked: true },
  ],
  accessory: [
    { id: "accessory-1", name: "None", type: "accessory", image: "none" },
    { id: "accessory-2", name: "Sword", type: "accessory", image: "sword" },
    { id: "accessory-3", name: "Staff", type: "accessory", image: "staff" },
    { id: "accessory-4", name: "Bow", type: "accessory", image: "bow", locked: true },
    { id: "accessory-5", name: "Shield", type: "accessory", image: "shield", locked: true },
  ],
  color: [
    { id: "color-1", name: "Purple", type: "color", color: "bg-purple-500" },
    { id: "color-2", name: "Blue", type: "color", color: "bg-blue-500" },
    { id: "color-3", name: "Green", type: "color", color: "bg-green-500" },
    { id: "color-4", name: "Red", type: "color", color: "bg-red-500" },
    { id: "color-5", name: "Gold", type: "color", color: "bg-amber-500", locked: true },
  ],
}

export default function CharacterCustomizer() {
  const [activeTab, setActiveTab] = useState("head")
  const [selectedParts, setSelectedParts] = useState({
    head: "head-1",
    body: "body-1",
    accessory: "accessory-1",
    color: "color-1",
  })

  const handleSelectPart = (partId: string) => {
    const part = Object.values(CHARACTER_PARTS)
      .flat()
      .find((p) => p.id === partId)
    if (part && !part.locked) {
      setSelectedParts((prev) => ({
        ...prev,
        [part.type]: partId,
      }))
    }
  }

  const getPartImage = (type: string, partId: string) => {
    const part = CHARACTER_PARTS[type]?.find((p) => p.id === partId)
    return part?.image || "default"
  }

  const getPartColor = (colorId: string) => {
    const color = CHARACTER_PARTS.color?.find((p) => p.id === colorId)
    return color?.color || "bg-purple-500"
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="font-pixel text-xl text-pixel-primary">Character Customizer</CardTitle>
        <CardDescription>Personalize your character's appearance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Character Preview */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative w-48 h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
              {/* Character color background */}
              <div className={`absolute inset-0 ${getPartColor(selectedParts.color)}`}></div>

              {/* Character parts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 pixel-character relative">
                  <div className="pixel-character-face">
                    <div className="eyes">
                      <div className="eye"></div>
                      <div className="eye"></div>
                    </div>
                    <div className="mouth"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-pixel text-lg text-pixel-primary mb-1">Pixel Warrior</h3>
              <p className="text-sm text-gray-500 mb-4">Level 5 Adventurer</p>

              <Button variant="pixel" size="sm">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="head" className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Head</span>
                </TabsTrigger>
                <TabsTrigger value="body" className="flex items-center justify-center gap-2">
                  <Shirt className="w-4 h-4" />
                  <span className="hidden sm:inline">Body</span>
                </TabsTrigger>
                <TabsTrigger value="accessory" className="flex items-center justify-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span className="hidden sm:inline">Accessory</span>
                </TabsTrigger>
                <TabsTrigger value="color" className="flex items-center justify-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Color</span>
                </TabsTrigger>
              </TabsList>

              {Object.entries(CHARACTER_PARTS).map(([type, parts]) => (
                <TabsContent key={type} value={type} className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {parts.map((part) => (
                      <CharacterPartCard
                        key={part.id}
                        part={part}
                        isSelected={selectedParts[part.type as keyof typeof selectedParts] === part.id}
                        onSelect={() => handleSelectPart(part.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CharacterPartCard({
  part,
  isSelected,
  onSelect,
}: {
  part: CharacterPart
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <div
      className={`
        border-2 rounded-lg p-3 cursor-pointer transition-colors
        ${isSelected ? "border-pixel-primary bg-blue-50" : "border-gray-200 bg-white"}
        ${part.locked ? "opacity-50" : "hover:border-pixel-border"}
      `}
      onClick={part.locked ? undefined : onSelect}
    >
      <div className="flex items-center gap-3">
        {part.type === "color" ? (
          <div className={`w-10 h-10 rounded-full ${part.color}`}></div>
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-pixel">
            {part.image}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{part.name}</h4>
            {isSelected && (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {part.locked && <p className="text-xs text-gray-500">Unlock with rewards</p>}
        </div>
      </div>
    </div>
  )
}
