"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, Lock, Moon, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

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
          <h1 className="font-pixel text-2xl md:text-3xl text-[hsl(var(--pixel-primary))] mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Profile Settings</CardTitle>
                <CardDescription>Manage your public profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-[hsl(var(--pixel-accent))] pixel-art-character mb-4"></div>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" defaultValue="Pixel Warrior" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="pixel_warrior" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell others about yourself..."
                        defaultValue="Level 5 adventurer on a quest to build better habits and level up my life!"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc-8">
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                            <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                            <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button variant="pixel" className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">Account Settings</CardTitle>
                <CardDescription>Manage your account security and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="user@example.com" />
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button variant="pixel">Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">Connected Accounts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          <div>
                            <p className="font-medium">Google</p>
                            <p className="text-sm text-gray-500">Connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.7023 12.6235C16.6595 9.89619 18.9692 8.04891 19.0479 7.99614C17.6332 5.96527 15.4286 5.70483 14.6632 5.68237C12.7741 5.48342 10.9543 6.75397 9.99242 6.75397C9.01079 6.75397 7.53361 5.70483 5.92395 5.74363C3.86395 5.78243 1.9503 6.92005 0.912173 8.67884C-1.21538 12.2355 0.405061 17.4637 2.44549 20.1522C3.46549 21.4681 4.65549 22.9401 6.18549 22.8749C7.67549 22.8048 8.25549 21.8883 10.0503 21.8883C11.8303 21.8883 12.3703 22.8749 13.9303 22.8398C15.5303 22.8048 16.5655 21.4933 17.5555 20.1674C18.7303 18.6505 19.2055 17.1684 19.2255 17.0983C19.1855 17.0832 16.7503 16.1217 16.7023 12.6235Z" />
                            <path d="M13.6326 3.8112C14.4678 2.79119 15.0126 1.37878 14.8526 0C13.6326 0.0539158 12.1526 0.80876 11.2826 1.80631C10.5126 2.68931 9.85257 4.13318 10.0326 5.47705C11.3926 5.57651 12.7626 4.81166 13.6326 3.8112Z" />
                          </svg>
                          <div>
                            <p className="font-medium">Apple</p>
                            <p className="text-sm text-gray-500">Not connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                        <div>
                          <p className="font-medium">Delete Account</p>
                          <p className="text-sm text-gray-600">
                            Permanently delete your account and all associated data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">
                  Notification Settings
                </CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Daily Reminders</p>
                          <p className="text-sm text-gray-500">Receive a daily email reminder for incomplete habits</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Summary</p>
                          <p className="text-sm text-gray-500">Receive a weekly summary of your progress</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Quest Updates</p>
                          <p className="text-sm text-gray-500">Receive updates about your active quests</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Receive news and special offers</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-3">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Habit Reminders</p>
                          <p className="text-sm text-gray-500">Receive reminders for your scheduled habits</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Achievement Unlocked</p>
                          <p className="text-sm text-gray-500">Get notified when you unlock an achievement</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Guild Activity</p>
                          <p className="text-sm text-gray-500">Get notified about activity in your guild</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Streak Warnings</p>
                          <p className="text-sm text-gray-500">Get warned when a streak is about to break</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="pixel" className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="font-pixel text-xl text-[hsl(var(--pixel-primary))]">
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize how LifeQuest looks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Theme</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border-2 border-[hsl(var(--pixel-primary))] rounded-lg p-3 bg-white">
                        <div className="h-20 bg-white border mb-2 rounded"></div>
                        <p className="font-medium text-center">Light</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-20 bg-gray-900 mb-2 rounded"></div>
                        <p className="font-medium text-center">Dark</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-20 bg-gradient-to-b from-white to-gray-900 mb-2 rounded"></div>
                        <p className="font-medium text-center">System</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-3">Color Scheme</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="border-2 border-[hsl(var(--pixel-primary))] rounded-lg p-3 bg-white">
                        <div className="h-12 bg-[hsl(var(--pixel-primary))] mb-2 rounded"></div>
                        <p className="font-medium text-center">Default</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-12 bg-blue-600 mb-2 rounded"></div>
                        <p className="font-medium text-center">Blue</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-12 bg-green-600 mb-2 rounded"></div>
                        <p className="font-medium text-center">Green</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-12 bg-orange-600 mb-2 rounded"></div>
                        <p className="font-medium text-center">Orange</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-3">Character Style</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="border-2 border-[hsl(var(--pixel-primary))] rounded-lg p-3 bg-white">
                        <div className="h-16 w-16 mx-auto bg-[hsl(var(--pixel-accent))] pixel-art-character mb-2"></div>
                        <p className="font-medium text-center">Pixel</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-16 w-16 mx-auto bg-blue-500 rounded-full mb-2"></div>
                        <p className="font-medium text-center">Modern</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-16 w-16 mx-auto bg-yellow-500 rounded-lg mb-2"></div>
                        <p className="font-medium text-center">Retro</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        <div className="h-16 w-16 mx-auto bg-purple-500 rounded-lg mb-2"></div>
                        <p className="font-medium text-center">Fantasy</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="pixel" className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
