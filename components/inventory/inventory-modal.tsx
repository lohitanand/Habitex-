"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserData, updateUserData } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import type { Reward } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Shirt, Package } from "lucide-react"

interface InventoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, onClose }) => {
  const [inventory, setInventory] = useState<Reward[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [activePowerups, setActivePowerups] = useState<Reward[]>([])
  const [equippedCosmetics, setEquippedCosmetics] = useState<Record<string, Reward>>({})
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      loadInventoryData()
    }
  }, [isOpen])

  const loadInventoryData = () => {
    const userData = getUserData()
    if (userData) {
      // Ensure inventory exists
      if (!userData.inventory) {
        userData.inventory = []
      }

      setInventory(userData.inventory)

      // Get active powerups
      if (userData.activePowerups) {
        setActivePowerups(userData.activePowerups)
      }

      // Get equipped cosmetics
      if (userData.equippedCosmetics) {
        setEquippedCosmetics(userData.equippedCosmetics)
      }
    }
  }

  const handleUsePowerup = (powerup: Reward) => {
    const userData = getUserData()
    if (!userData) return

    // Add to active powerups
    if (!userData.activePowerups) {
      userData.activePowerups = []
    }

    userData.activePowerups.push(powerup)

    // Remove from inventory
    userData.inventory = userData.inventory.filter((item) => item.id !== powerup.id)

    // Update user data
    updateUserData(userData)

    // Update state
    loadInventoryData()

    toast({
      title: "Powerup activated!",
      description: `${powerup.name} has been activated.`,
    })
  }

  const handleEquipCosmetic = (cosmetic: Reward) => {
    const userData = getUserData()
    if (!userData) return

    // Initialize equipped cosmetics if not exists
    if (!userData.equippedCosmetics) {
      userData.equippedCosmetics = {}
    }

    // Determine cosmetic type (simple approach - could be more sophisticated)
    let cosmeticType = "background"
    if (cosmetic.name.toLowerCase().includes("frame")) {
      cosmeticType = "frame"
    } else if (cosmetic.name.toLowerCase().includes("skin")) {
      cosmeticType = "skin"
    }

    // Equip the cosmetic
    userData.equippedCosmetics[cosmeticType] = cosmetic

    // Update user data
    updateUserData(userData)

    // Update state
    loadInventoryData()

    toast({
      title: "Cosmetic equipped!",
      description: `${cosmetic.name} has been equipped.`,
    })
  }

  const handleUnequipCosmetic = (type: string) => {
    const userData = getUserData()
    if (!userData || !userData.equippedCosmetics) return

    // Unequip the cosmetic
    delete userData.equippedCosmetics[type]

    // Update user data
    updateUserData(userData)

    // Update state
    loadInventoryData()

    toast({
      title: "Cosmetic unequipped",
      description: `Item has been unequipped.`,
    })
  }

  const getPowerups = () => {
    return inventory.filter((item) => item.type === "powerup")
  }

  const getCosmetics = () => {
    return inventory.filter((item) => item.type === "cosmetic")
  }

  const getLootBoxes = () => {
    return inventory.filter((item) => item.type === "lootbox")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Inventory</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              All Items
            </TabsTrigger>
            <TabsTrigger value="powerups" className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Power-Ups
            </TabsTrigger>
            <TabsTrigger value="cosmetics" className="flex items-center">
              <Shirt className="w-4 h-4 mr-2" />
              Cosmetics
            </TabsTrigger>
            <TabsTrigger value="lootboxes">Loot Boxes</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {inventory.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {inventory.map((item) => (
                  <InventoryItem
                    key={item.id}
                    item={item}
                    onUse={item.type === "powerup" ? () => handleUsePowerup(item) : undefined}
                    onEquip={item.type === "cosmetic" ? () => handleEquipCosmetic(item) : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Your inventory is empty. Purchase items from the Reward Marketplace.
              </div>
            )}
          </TabsContent>

          <TabsContent value="powerups" className="space-y-4">
            {activePowerups.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Active Powerups</h3>
                <div className="grid grid-cols-1 gap-2">
                  {activePowerups.map((powerup) => (
                    <div
                      key={`active-${powerup.id}`}
                      className="bg-emerald-50 border border-emerald-200 rounded-md p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-md bg-emerald-100 flex items-center justify-center mr-3">
                          <Zap className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{powerup.name}</p>
                          <p className="text-xs text-gray-500">{powerup.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-sm font-medium mb-2">Available Powerups</h3>
            {getPowerups().length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {getPowerups().map((item) => (
                  <InventoryItem key={item.id} item={item} onUse={() => handleUsePowerup(item)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                You don't have any power-ups yet. Visit the Reward Marketplace to purchase some!
              </div>
            )}
          </TabsContent>

          <TabsContent value="cosmetics" className="space-y-4">
            {Object.keys(equippedCosmetics).length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Equipped Cosmetics</h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(equippedCosmetics).map(([type, cosmetic]) => (
                    <div
                      key={`equipped-${cosmetic.id}`}
                      className="bg-purple-50 border border-purple-200 rounded-md p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center mr-3">
                          <Shirt className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{cosmetic.name}</p>
                          <p className="text-xs text-gray-500">{cosmetic.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleUnequipCosmetic(type)}>
                        Unequip
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-sm font-medium mb-2">Available Cosmetics</h3>
            {getCosmetics().length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {getCosmetics().map((item) => (
                  <InventoryItem key={item.id} item={item} onEquip={() => handleEquipCosmetic(item)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                You don't have any cosmetic items yet. Visit the Reward Marketplace to purchase some!
              </div>
            )}
          </TabsContent>

          <TabsContent value="lootboxes" className="space-y-4">
            <h3 className="text-sm font-medium mb-2">Available Loot Boxes</h3>
            {getLootBoxes().length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {getLootBoxes().map((item) => (
                  <InventoryItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                You don't have any loot boxes yet. Visit the Reward Marketplace to purchase some!
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard/rewards")}>
            Visit Reward Marketplace
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface InventoryItemProps {
  item: Reward
  onUse?: () => void
  onEquip?: () => void
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onUse, onEquip }) => {
  return (
    <div className="border rounded-md p-3 flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-md ${item.type === "powerup" ? "bg-blue-100" : item.type === "cosmetic" ? "bg-purple-100" : "bg-amber-100"} flex items-center justify-center mr-3`}
        >
          {item.type === "powerup" && <Zap className="w-4 h-4 text-blue-600" />}
          {item.type === "cosmetic" && <Shirt className="w-4 h-4 text-purple-600" />}
          {item.type === "lootbox" && <Package className="w-4 h-4 text-amber-600" />}
        </div>
        <div>
          <p className="font-medium text-sm">{item.name}</p>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {onUse && (
          <Button variant="outline" size="sm" onClick={onUse}>
            Use
          </Button>
        )}
        {onEquip && (
          <Button variant="outline" size="sm" onClick={onEquip}>
            Equip
          </Button>
        )}
      </div>
    </div>
  )
}
