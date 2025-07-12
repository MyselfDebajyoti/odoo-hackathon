"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Clock, Star, Trash2 } from "lucide-react"

interface SwapRequest {
  id: string
  type: "incoming" | "outgoing"
  status: "pending" | "accepted" | "rejected" | "completed"
  user: {
    name: string
    avatar: string
    rating: number
  }
  skillOffered: string
  skillWanted: string
  message: string
  createdAt: string
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<SwapRequest[]>([
    {
      id: "1",
      type: "incoming",
      status: "pending",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      skillOffered: "UI/UX Design",
      skillWanted: "React",
      message:
        "Hi! I'd love to help you with UI/UX design in exchange for learning React. I have 3 years of design experience.",
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      type: "outgoing",
      status: "pending",
      user: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.2,
      },
      skillOffered: "Python",
      skillWanted: "AWS",
      message: "Hello! I can teach you Python fundamentals and advanced concepts. Would love to learn AWS from you.",
      createdAt: "1 day ago",
    },
    {
      id: "3",
      type: "incoming",
      status: "accepted",
      user: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      skillOffered: "Digital Marketing",
      skillWanted: "JavaScript",
      message: "Great! Looking forward to our skill exchange session.",
      createdAt: "3 days ago",
    },
    {
      id: "4",
      type: "outgoing",
      status: "completed",
      user: {
        name: "Mike Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.1,
      },
      skillOffered: "MongoDB",
      skillWanted: "Figma",
      message: "Thanks for the great Figma session! Hope my MongoDB tutorial was helpful too.",
      createdAt: "1 week ago",
    },
  ])

  const handleRequest = (id: string, action: "accept" | "reject" | "delete") => {
    setRequests(
      requests.map((req) => {
        if (req.id === id) {
          if (action === "delete") {
            return { ...req, status: "rejected" as const }
          }
          return { ...req, status: action === "accept" ? ("accepted" as const) : ("rejected" as const) }
        }
        return req
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-[#FF3C1E] text-[#FF3C1E]" : "text-gray-300"}`}
      />
    ))
  }

  const RequestCard = ({ request }: { request: SwapRequest }) => (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
              <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{request.user.name}</h3>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-[#FF3C1E] font-medium">{request.user.rating}</span>
                <div className="flex space-x-1">{renderStars(request.user.rating)}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(request.status)}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
            <span className="text-sm text-gray-500">{request.createdAt}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Offering:</span>
            <Badge variant="secondary" className="bg-[#FF3C1E] text-white">
              {request.skillOffered}
            </Badge>
            <span className="text-gray-400">for</span>
            <Badge variant="outline" className="border-[#FF3C1E] text-[#FF3C1E]">
              {request.skillWanted}
            </Badge>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{request.message}</p>

        {request.status === "pending" && (
          <div className="flex space-x-2">
            {request.type === "incoming" ? (
              <>
                <Button
                  size="sm"
                  onClick={() => handleRequest(request.id, "accept")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRequest(request.id, "reject")}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Decline
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleRequest(request.id, "delete")}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Cancel Request
              </Button>
            )}
          </div>
        )}

        {request.status === "accepted" && (
          <div className="flex space-x-2">
            <Button size="sm" className="bg-[#FF3C1E] hover:bg-[#e6351a] text-white">
              Schedule Session
            </Button>
            <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 bg-transparent">
              Message
            </Button>
          </div>
        )}

        {request.status === "completed" && (
          <Button size="sm" variant="outline" className="border-[#FF3C1E] text-[#FF3C1E] bg-transparent">
            Leave Feedback
          </Button>
        )}
      </CardContent>
    </Card>
  )

  const incomingRequests = requests.filter((r) => r.type === "incoming")
  const outgoingRequests = requests.filter((r) => r.type === "outgoing")
  const activeSwaps = requests.filter((r) => r.status === "accepted")

  return (
    <div className="min-h-screen bg-[#FFFEE7]">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Swap Requests</h1>
          <p className="text-gray-600">Manage your incoming and outgoing swap requests</p>
        </div>

        <Tabs defaultValue="incoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger value="incoming" className="data-[state=active]:bg-[#FF3C1E] data-[state=active]:text-white">
              Incoming ({incomingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="data-[state=active]:bg-[#FF3C1E] data-[state=active]:text-white">
              Outgoing ({outgoingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-[#FF3C1E] data-[state=active]:text-white">
              Active Swaps ({activeSwaps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-4">
            {incomingRequests.length === 0 ? (
              <Card className="bg-white">
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No incoming requests</h3>
                  <p className="text-gray-500">When others request to swap skills with you, they'll appear here.</p>
                </CardContent>
              </Card>
            ) : (
              incomingRequests.map((request) => <RequestCard key={request.id} request={request} />)
            )}
          </TabsContent>

          <TabsContent value="outgoing" className="space-y-4">
            {outgoingRequests.length === 0 ? (
              <Card className="bg-white">
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No outgoing requests</h3>
                  <p className="text-gray-500">Start browsing profiles and send skill swap requests!</p>
                  <Button className="mt-4 bg-[#FF3C1E] hover:bg-[#e6351a] text-white">Browse Skills</Button>
                </CardContent>
              </Card>
            ) : (
              outgoingRequests.map((request) => <RequestCard key={request.id} request={request} />)
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeSwaps.length === 0 ? (
              <Card className="bg-white">
                <CardContent className="p-8 text-center">
                  <Check className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active swaps</h3>
                  <p className="text-gray-500">Accepted skill swaps will appear here for scheduling and management.</p>
                </CardContent>
              </Card>
            ) : (
              activeSwaps.map((request) => <RequestCard key={request.id} request={request} />)
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
