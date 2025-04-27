"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getInventoryItems, useInventoryItem } from "@/lib/local-storage"
import type { Item } from "@/lib/types"

export function InventorySystem() {
  const [inventory, setInventory] = useState<Item[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [itemToUse, setItemToUse] = useState<Item | null>(null)
  const [useItemResult, setUseItemResult] = useState<{ success: boolean; message?: string } | null>(null)

  // Load inventory from localStorage on component mount
  useEffect(() => {
    const loadInventory = () => {
      const items = getInventoryItems()
      setInventory(items)
    }

    loadInventory()

    // Set up event listener for inventory updates
    window.addEventListener("inventoryUpdated", loadInventory)

    return () => {
      window.removeEventListener("inventoryUpdated", loadInventory)
    }
  }, [])

  // Call useInventoryItem hook when itemToUse changes
  const handleUseItemEffect = useCallback(() => {
    if (itemToUse) {
      const result = useInventoryItem(itemToUse.id)
      setUseItemResult(result)
      setItemToUse(null) // Reset itemToUse immediately after calling the hook
    } else {
      setUseItemResult(null)
    }
  }, [itemToUse])

  useEffect(() => {
    handleUseItemEffect()
  }, [handleUseItemEffect])

  useEffect(() => {
    if (useItemResult) {
      if (useItemResult.success) {
        setMessage(`Used ${selectedItem?.name}! ${useItemResult.message || ""}`)

        // Refresh inventory
        setInventory(getInventoryItems())

        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      } else {
        setMessage(`Failed to use ${selectedItem?.name}. ${useItemResult.message || ""}`)

        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    }
  }, [useItemResult, selectedItem])

  const handleUseItem = (item: Item) => {
    setSelectedItem(item)
    setItemToUse(item)
  }

  const filteredItems =
    activeTab === "all" ? inventory : inventory.filter((item) => item.type.toLowerCase() === activeTab)

  return (
    <Card className="w-full border-4 border-purple-700 bg-purple-100 shadow-lg">
      <CardHeader className="bg-purple-700 text-white">
        <CardTitle className="text-2xl font-pixel">Inventory</CardTitle>
        <CardDescription className="text-purple-200 font-pixel">Manage and use your items</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-purple-200">
            <TabsTrigger value="all" className="font-pixel">
              All Items
            </TabsTrigger>
            <TabsTrigger value="powerup" className="font-pixel">
              Power-Ups
            </TabsTrigger>
            <TabsTrigger value="cosmetic" className="font-pixel">
              Cosmetics
            </TabsTrigger>
            <TabsTrigger value="lootbox" className="font-pixel">
              Loot Boxes
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {message && (
              <div className="mb-4 p-2 bg-purple-200 border-2 border-purple-500 rounded-md text-purple-800 font-pixel">
                {message}
              </div>
            )}

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="border-2 border-purple-500 bg-white">
                    <CardHeader className="p-3 bg-purple-200">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-pixel text-purple-800">{item.name}</CardTitle>
                        <Badge className="bg-purple-600 font-pixel">{item.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3">
                      <p className="text-sm font-pixel mb-2">{item.description}</p>
                      {item.quantity > 1 && (
                        <Badge className="bg-purple-300 text-purple-800 font-pixel">Quantity: {item.quantity}</Badge>
                      )}
                    </CardContent>
                    <CardFooter className="p-3 bg-purple-100 flex justify-end">
                      <Button
                        onClick={() => handleUseItem(item)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-pixel"
                      >
                        Use Item
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed border-purple-300 rounded-md">
                <p className="text-purple-700 font-pixel mb-2">Your inventory is empty.</p>
                <p className="text-purple-600 font-pixel">Purchase items from the Reward Marketplace.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
