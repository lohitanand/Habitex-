"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InventoryModal } from "./inventory-modal"
import { Backpack } from "lucide-react"
import Link from "next/link"

export const InventoryButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-end space-y-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full w-12 h-12 bg-emerald-600 hover:bg-emerald-700 shadow-lg flex items-center justify-center"
            aria-label="Open inventory"
          >
            <Backpack className="h-6 w-6" />
          </Button>

          <div className="bg-white rounded-lg shadow-lg p-2 text-xs font-medium">
            <Link href="/dashboard/inventory" className="text-emerald-600 hover:text-emerald-700">
              Full Inventory
            </Link>
          </div>
        </div>
      </div>

      <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
