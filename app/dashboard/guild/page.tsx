"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuildPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
          <h1 className="font-pixel text-2xl md:text-3xl text-[hsl(var(--pixel-primary))] mb-2">Guild Hall</h1>
          <p className="text-gray-600">Join forces with others to achieve your goals together</p>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Your Guild</CardTitle>
              <Button variant="pixel" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Create Guild
              </Button>
            </div>
            <CardDescription>You are not currently a member of any guild</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">Join a Guild Today</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Guilds are groups of like-minded individuals who support each other in building better habits and
                achieving goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pixel">Browse Guilds</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Popular Guilds</CardTitle>
            <CardDescription>Discover active communities to join</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GuildCard
                name="Morning Risers"
                description="For early birds committed to productive morning routines"
                members={128}
                challenges={5}
                tags={["Productivity", "Morning Routine", "Early Risers"]}
              />
              <GuildCard
                name="Fitness Warriors"
                description="Supporting each other in fitness goals and healthy habits"
                members={256}
                challenges={8}
                tags={["Fitness", "Health", "Exercise"]}
              />
              <GuildCard
                name="Mindfulness Masters"
                description="Building meditation and mindfulness practices together"
                members={94}
                challenges={3}
                tags={["Meditation", "Mindfulness", "Mental Health"]}
              />
              <GuildCard
                name="Creative Coders"
                description="Learning to code and building creative projects"
                members={172}
                challenges={6}
                tags={["Coding", "Learning", "Creativity"]}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function GuildCard({
  name,
  description,
  members,
  challenges,
  tags,
}: {
  name: string
  description: string
  members: number
  challenges: number
  tags: string[]
}) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[hsl(var(--pixel-primary))] rounded-lg pixel-art flex-shrink-0"></div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {members}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {challenges} Challenges
              </span>
            </div>
            <Button variant="pixel" size="sm">
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
