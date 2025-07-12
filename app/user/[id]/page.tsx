"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin, Clock, ArrowLeftRight, MessageCircle, Calendar } from "lucide-react"

// Mock user data - in real app this would come from API
const mockUser = {
  id: "1",
  name: "Marc Demo",
  location: "San Francisco, CA",
  avatar: "/placeholder.svg?height=120&width=120",
  rating: 3.9,
  totalRatings: 165,
  joinedDate: "March 2023",
  bio: "Passionate full-stack developer with 5+ years of experience. I love teaching and learning new technologies. Currently working at a tech startup and looking to expand my design skills while sharing my programming knowledge.",
  skillsOffered: ["Python", "C++", "Javascript", "MongoDB", "Node.js", "React"],
  skillsWanted: ["Figma", "UI/UX Design", "Photoshop", "Illustrator"],
  availability: ["Weekends", "Evenings"],
  completedSwaps: 23,
  responseTime: "Usually responds within 2 hours",
  languages: ["English", "Spanish"],
  reviews: [
    {
      id: "1",
      reviewer: "Sarah Johnson",
      rating: 5,
      comment: "Marc is an excellent teacher! He explained Python concepts very clearly and was very patient.",
      date: "2 weeks ago",
      skillTaught: "Python",
    },
    {
      id: "2",
      reviewer: "Alex Chen",
      rating: 4,
      comment: "Great session on JavaScript. Marc provided practical examples and helpful resources.",
      date: "1 month ago",
      skillTaught: "JavaScript",
    },
  ],
}

export default function UserProfilePage() {
  const params = useParams()
  const [requestMessage, setRequestMessage] = useState("")
  const [selectedSkillOffered, setSelectedSkillOffered] = useState("")
  const [selectedSkillWanted, setSelectedSkillWanted] = useState("")

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-[#FF3C1E] text-[#FF3C1E]" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-[#FFFEE7]">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                      <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockUser.name}</h1>
                        <div className="flex items-center space-x-4 text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{mockUser.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Joined {mockUser.joinedDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-2xl font-bold text-[#FF3C1E]">{mockUser.rating}</span>
                          <div className="flex space-x-1">{renderStars(mockUser.rating)}</div>
                          <span className="text-gray-500">({mockUser.totalRatings} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{mockUser.bio}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FF3C1E]">{mockUser.completedSwaps}</div>
                    <div className="text-sm text-gray-600">Completed Swaps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FF3C1E]">{mockUser.skillsOffered.length}</div>
                    <div className="text-sm text-gray-600">Skills Offered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FF3C1E]">{mockUser.skillsWanted.length}</div>
                    <div className="text-sm text-gray-600">Skills Wanted</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Skills Exchange</h2>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Skills Offered */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-[#FF3C1E] rounded-full mr-2"></span>
                      Skills Offered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.skillsOffered.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className={`cursor-pointer transition-colors ${
                            selectedSkillWanted === skill
                              ? "bg-[#FF3C1E] text-white"
                              : "bg-white border border-[#FF3C1E] text-[#FF3C1E] hover:bg-[#FF3C1E] hover:text-white"
                          }`}
                          onClick={() => setSelectedSkillWanted(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center py-4">
                    <ArrowLeftRight className="h-8 w-8 text-gray-400" />
                  </div>

                  {/* Skills Wanted */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                      Skills Wanted
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.skillsWanted.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className={`cursor-pointer transition-colors ${
                            selectedSkillOffered === skill
                              ? "bg-[#FF3C1E] text-white border-[#FF3C1E]"
                              : "border-[#FF3C1E] text-[#FF3C1E] hover:bg-[#FF3C1E] hover:text-white"
                          }`}
                          onClick={() => setSelectedSkillOffered(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews & Feedback</h2>
                <div className="space-y-4">
                  {mockUser.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.reviewer}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-500">• {review.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {review.skillTaught}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Swap Card */}
            <Card className="bg-white sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Request Skill Swap</h3>

                {/* Selected Skills Display */}
                {(selectedSkillOffered || selectedSkillWanted) && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Proposed Exchange:</div>
                    <div className="flex items-center space-x-2 text-sm">
                      {selectedSkillOffered && (
                        <Badge className="bg-[#FF3C1E] text-white">{selectedSkillOffered}</Badge>
                      )}
                      {selectedSkillOffered && selectedSkillWanted && (
                        <ArrowLeftRight className="h-3 w-3 text-gray-400" />
                      )}
                      {selectedSkillWanted && (
                        <Badge variant="outline" className="border-[#FF3C1E] text-[#FF3C1E]">
                          {selectedSkillWanted}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      placeholder="Introduce yourself and explain what you'd like to learn and teach..."
                      rows={4}
                      className="border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
                    />
                  </div>
                  <Button className="w-full bg-[#FF3C1E] hover:bg-[#e6351a] text-white">Send Swap Request</Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Info</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{mockUser.responseTime}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Availability:</div>
                    <div className="flex flex-wrap gap-1">
                      {mockUser.availability.map((time) => (
                        <Badge key={time} variant="secondary" className="text-xs">
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Languages:</div>
                    <div className="flex flex-wrap gap-1">
                      {mockUser.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
