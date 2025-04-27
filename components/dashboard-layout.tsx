"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Award,
  Calendar,
  ChevronRight,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Trophy,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import InventoryButton from "@/components/inventory-button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex h-screen bg-[hsl(var(--pixel-dark))]">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-[hsl(var(--pixel-dark))] text-white border-r-2 border-pixel-border">
        {/* Logo */}
        <div className="p-4 border-b border-[hsl(var(--pixel-dark))/50] flex items-center">
          <div className="w-10 h-10 bg-[hsl(var(--pixel-accent))] mr-3 pixel-art"></div>
          <Link href="/dashboard" className="text-white font-pixel text-xl">
            LifeQuest
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-[hsl(var(--pixel-dark))/50]">
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 bg-[hsl(var(--pixel-accent))] mr-3 pixel-character">
              <div className="pixel-character-face">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="mouth"></div>
              </div>
            </div>
            <div>
              <div className="font-pixel">Pixel Warrior</div>
              <div className="flex items-center">
                <span className="text-yellow-300 mr-1">★</span>
                <span>Level 5</span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>XP: 450/1000</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-[hsl(var(--pixel-dark))/50] h-2 rounded-full overflow-hidden">
              <div className="bg-[hsl(var(--pixel-accent))] h-full rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="mb-2 text-sm font-medium text-[hsl(var(--pixel-light))]">MAIN</div>
            <nav className="space-y-1 mb-6">
              <Link
                href="/dashboard"
                className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                  pathname === "/dashboard"
                    ? "bg-[hsl(var(--pixel-primary))]"
                    : "hover:bg-[hsl(var(--pixel-primary))]/50"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/habits"
                className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                  pathname === "/dashboard/habits"
                    ? "bg-[hsl(var(--pixel-primary))]"
                    : "hover:bg-[hsl(var(--pixel-primary))]/50"
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Habits
              </Link>
              <Link
                href="/dashboard/quests"
                className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                  pathname === "/dashboard/quests"
                    ? "bg-[hsl(var(--pixel-primary))]"
                    : "hover:bg-[hsl(var(--pixel-primary))]/50"
                }`}
              >
                <ChevronRight className="mr-3 h-5 w-5" />
                Quests
              </Link>
              <Link
                href="/dashboard/rewards"
                className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                  pathname === "/dashboard/rewards"
                    ? "bg-[hsl(var(--pixel-primary))]"
                    : "hover:bg-[hsl(var(--pixel-primary))]/50"
                }`}
              >
                <Award className="mr-3 h-5 w-5" />
                Rewards
              </Link>
            </nav>

            <div className="mb-2 text-sm font-medium text-[hsl(var(--pixel-light))]">SOCIAL</div>
            <nav className="space-y-1 mb-6">
              <Link
                href="/dashboard/guild"
                className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                  pathname === "/dashboard/guild"
                    ? "bg-[hsl(var(--pixel-primary))]"
                    : "hover:bg-[hsl(var(--pixel-primary))]/50"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Guild
              </Link>
              <Link
                href="/dashboard/achievements"
                className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                  pathname === "/dashboard/achievements"
                    ? "bg-[hsl(var(--pixel-primary))]"
                    : "hover:bg-[hsl(var(--pixel-primary))]/50"
                }`}
              >
                <Trophy className="mr-3 h-5 w-5" />
                Achievements
              </Link>
            </nav>

            <div className="mb-2 text-sm font-medium text-[hsl(var(--pixel-light))]">SETTINGS</div>
            <nav className="space-y-1">
              <Link
                href="/dashboard/settings"
                className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                  pathname === "/dashboard/settings"
                    ? "bg-[hsl(var(--pixel-primary))]"
                    : "hover:bg-[hsl(var(--pixel-primary))]/50"
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <Link
                href="/"
                className="flex items-center px-3 py-2 rounded-md hover:bg-[hsl(var(--pixel-primary))]/50 font-pixel"
              >
                <Home className="mr-3 h-5 w-5" />
                Home
              </Link>
              <Link
                href="/login"
                className="flex items-center px-3 py-2 rounded-md hover:bg-[hsl(var(--pixel-primary))]/50 font-pixel"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex flex-col w-full">
        <header className="md:hidden bg-[hsl(var(--pixel-primary))] text-white p-4 flex items-center justify-between border-b-2 border-pixel-border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[hsl(var(--pixel-accent))] mr-2 pixel-art"></div>
            <span className="font-pixel">LifeQuest</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[hsl(var(--pixel-dark))] text-white">
            <div className="p-4 border-b border-[hsl(var(--pixel-dark))]/50">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-[hsl(var(--pixel-accent))] mr-3 pixel-character">
                  <div className="pixel-character-face">
                    <div className="eyes">
                      <div className="eye"></div>
                      <div className="eye"></div>
                    </div>
                    <div className="mouth"></div>
                  </div>
                </div>
                <div>
                  <div className="font-pixel">Pixel Warrior</div>
                  <div className="flex items-center">
                    <span className="text-yellow-300 mr-1">★</span>
                    <span>Level 5</span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>XP: 450/1000</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-[hsl(var(--pixel-dark))]/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-[hsl(var(--pixel-accent))] h-full rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2 text-sm font-medium text-[hsl(var(--pixel-light))]">MAIN</div>
              <nav className="space-y-1 mb-6">
                <Link
                  href="/dashboard"
                  className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                    pathname === "/dashboard"
                      ? "bg-[hsl(var(--pixel-primary))]"
                      : "hover:bg-[hsl(var(--pixel-primary))]/50"
                  }`}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/habits"
                  className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                    pathname === "/dashboard/habits"
                      ? "bg-[hsl(var(--pixel-primary))]"
                      : "hover:bg-[hsl(var(--pixel-primary))]/50"
                  }`}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Habits
                </Link>
                <Link
                  href="/dashboard/quests"
                  className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                    pathname === "/dashboard/quests"
                      ? "bg-[hsl(var(--pixel-primary))]"
                      : "hover:bg-[hsl(var(--pixel-primary))]/50"
                  }`}
                >
                  <ChevronRight className="mr-3 h-5 w-5" />
                  Quests
                </Link>
                <Link
                  href="/dashboard/rewards"
                  className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                    pathname === "/dashboard/rewards"
                      ? "bg-[hsl(var(--pixel-primary))]"
                      : "hover:bg-[hsl(var(--pixel-primary))]/50"
                  }`}
                >
                  <Award className="mr-3 h-5 w-5" />
                  Rewards
                </Link>
              </nav>

              <div className="mb-2 text-sm font-medium text-[hsl(var(--pixel-light))]">SOCIAL</div>
              <nav className="space-y-1 mb-6">
                <Link
                  href="/dashboard/guild"
                  className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                    pathname === "/dashboard/guild"
                      ? "bg-[hsl(var(--pixel-primary))]"
                      : "hover:bg-[hsl(var(--pixel-primary))]/50"
                  }`}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Guild
                </Link>
                <Link
                  href="/dashboard/achievements"
                  className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                    pathname === "/dashboard/achievements"
                      ? "bg-[hsl(var(--pixel-primary))]"
                      : "hover:bg-[hsl(var(--pixel-primary))]/50"
                  }`}
                >
                  <Trophy className="mr-3 h-5 w-5" />
                  Achievements
                </Link>
              </nav>

              <div className="mb-2 text-sm font-medium text-[hsl(var(--pixel-light))]">SETTINGS</div>
              <nav className="space-y-1">
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center px-3 py-2 rounded-md font-pixel ${
                    pathname === "/dashboard/settings"
                      ? "bg-[hsl(var(--pixel-primary))]"
                      : "hover:bg-[hsl(var(--pixel-primary))]/50"
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 rounded-md hover:bg-[hsl(var(--pixel-primary))]/50 font-pixel"
                >
                  <Home className="mr-3 h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="/login"
                  className="flex items-center px-3 py-2 rounded-md hover:bg-[hsl(var(--pixel-primary))]/50 font-pixel"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-[hsl(var(--pixel-light))] overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Inventory Button */}
      <InventoryButton />
    </div>
  )
}
