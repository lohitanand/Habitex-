"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Briefcase, Shirt } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InventorySystem from "@/components/inventory-system"
import CharacterCustomizer from "@/components/character-customizer"
import { getCurrentUser } from "@/lib/local-storage"

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("inventory")
  const user = getCurrentUser()

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
          <h1 className="font-pixel text-2xl md:text-3xl text-[hsl(var(--pixel-primary))] mb-2">
            Inventory & Character
          </h1>
          <p className="text-gray-600">Manage your items and customize your character</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="character" className="flex items-center gap-2">
              <Shirt className="w-4 h-4" />
              <span>Character</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <InventorySystem userId={user?.id || ""} />
          </TabsContent>

          <TabsContent value="character">
            <CharacterCustomizer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
