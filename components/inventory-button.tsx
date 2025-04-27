"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { getUserData } from "@/lib/local-storage"
import { InventoryModal } from "./inventory/inventory-modal"

export default function InventoryButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const updateItemCount = () => {
      const inventory = getUserData()?.inventory || []
      const count = inventory.reduce((total, item) => total + item.quantity, 0)
      setItemCount(count)
    }

    updateItemCount()

    // Listen for inventory updates
    window.addEventListener("inventoryUpdated", updateItemCount)

    return () => {
      window.removeEventListener("inventoryUpdated", updateItemCount)
    }
  }, [])

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 rounded-full p-3 shadow-lg"
        aria-label="Open Inventory"
      >
        <ShoppingBag className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      <InventoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
