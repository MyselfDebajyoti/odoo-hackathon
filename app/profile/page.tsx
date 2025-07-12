"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Camera } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Marc Demo",
    location: "San Francisco, CA",
    bio: "Passionate developer and designer looking to expand my skills while helping others grow.",
    avatar: "/placeholder.svg?height=120&width=120",
    isPublic: true,
    availability: ["Weekends", "Evenings"],
  })

  const [skillsOffered, setSkillsOffered] = useState(["Python", "C++", "Javascript", "MongoDB", "Figma"])
  const [skillsWanted, setSkillsWanted] = useState(["React", "Node.js", "Machine Learning"])
  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")

  const addSkill = (type: "offered" | "wanted") => {
    if (type === "offered" && newSkillOffered.trim()) {
      setSkillsOffered([...skillsOffered, newSkillOffered.trim()])
      setNewSkillOffered("")
    } else if (type === "wanted" && newSkillWanted.trim()) {
      setSkillsWanted([...skillsWanted, newSkillWanted.trim()])
      setNewSkillWanted("")
    }
  }

  const removeSkill = (skill: string, type: "offered" | "wanted") => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((s) => s !== skill))
    } else {
      setSkillsWanted(skillsWanted.filter((s) => s !== skill))
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFEE7]">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your profile information and skills</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={profile.avatar || "/placeholder.svg"}
                      alt="Profile"
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-gray-200"
                    />
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full bg-[#FF3C1E] hover:bg-[#e6351a] text-white p-2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Profile Photo</h3>
                    <p className="text-sm text-gray-500">Upload a clear photo of yourself</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, State/Country"
                    className="border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell others about yourself and what you're looking to learn or teach..."
                    rows={4}
                    className="border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <div className="flex flex-wrap gap-2">
                    {["Weekdays", "Evenings", "Weekends", "Flexible"].map((time) => (
                      <Button
                        key={time}
                        variant={profile.availability.includes(time) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const newAvailability = profile.availability.includes(time)
                            ? profile.availability.filter((a) => a !== time)
                            : [...profile.availability, time]
                          setProfile({ ...profile, availability: newAvailability })
                        }}
                        className={
                          profile.availability.includes(time)
                            ? "bg-[#FF3C1E] hover:bg-[#e6351a] text-white"
                            : "border-[#FF3C1E] text-[#FF3C1E] hover:bg-[#FF3C1E] hover:text-white"
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skills Offered */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Skills I Can Offer</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skillsOffered.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-[#FF3C1E] text-white hover:bg-[#e6351a] px-3 py-1"
                      >
                        {skill}
                        <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => removeSkill(skill, "offered")} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkillOffered}
                      onChange={(e) => setNewSkillOffered(e.target.value)}
                      placeholder="Add a skill you can teach"
                      className="border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
                      onKeyPress={(e) => e.key === "Enter" && addSkill("offered")}
                    />
                    <Button onClick={() => addSkill("offered")} className="bg-[#FF3C1E] hover:bg-[#e6351a] text-white">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Skills Wanted */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Skills I Want to Learn</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skillsWanted.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-[#FF3C1E] text-[#FF3C1E] hover:bg-[#FF3C1E] hover:text-white px-3 py-1"
                      >
                        {skill}
                        <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => removeSkill(skill, "wanted")} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkillWanted}
                      onChange={(e) => setNewSkillWanted(e.target.value)}
                      placeholder="Add a skill you want to learn"
                      className="border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
                      onKeyPress={(e) => e.key === "Enter" && addSkill("wanted")}
                    />
                    <Button
                      onClick={() => addSkill("wanted")}
                      variant="outline"
                      className="border-[#FF3C1E] text-[#FF3C1E] hover:bg-[#FF3C1E] hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Public Profile</h4>
                    <p className="text-sm text-gray-500">Allow others to find and contact you</p>
                  </div>
                  <Switch
                    checked={profile.isPublic}
                    onCheckedChange={(checked) => setProfile({ ...profile, isPublic: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-[#FF3C1E] hover:bg-[#e6351a] text-white">Save Changes</Button>
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 bg-transparent">
                Preview Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
