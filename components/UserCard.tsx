import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowLeftRight } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string
  location?: string
  avatar: string
  rating: number
  totalRatings: number
  description: string
  skillsOffered: string[]
  skillsWanted: string[]
  availability: string[]
  isPublic: boolean
  responseTime?: string
  completedSwaps?: number
}

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-[#FF3C1E] text-[#FF3C1E]" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Link href={`/user/${user.id}`}>
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={60}
                height={60}
                className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <div>
              <Link href={`/user/${user.id}`}>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-[#FF3C1E] cursor-pointer transition-colors">
                  {user.name}
                </h3>
              </Link>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-[#FF3C1E] font-medium">{user.rating}</span>
                <div className="flex space-x-1">{renderStars(user.rating)}</div>
                <span className="text-gray-500 text-sm">({user.totalRatings})</span>
              </div>
              {user.location && <p className="text-sm text-gray-500 mt-1">{user.location}</p>}
            </div>
          </div>
          <Link href={`/user/${user.id}`}>
            <Button className="bg-[#FF3C1E] hover:bg-[#e6351a] text-white px-6 py-2 rounded-md">Request</Button>
          </Link>
        </div>

        {/* Quick Stats */}
        {(user.responseTime || user.completedSwaps) && (
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            {user.responseTime && <span>⚡ Responds in {user.responseTime}</span>}
            {user.completedSwaps && <span>✅ {user.completedSwaps} swaps completed</span>}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">{user.description}</p>

        {/* Skills Section */}
        <div className="flex space-x-4">
          {/* Skills Offered */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Skills offered</h4>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-[#FF3C1E] text-[#FF3C1E] text-sm rounded-full hover:bg-[#FF3C1E] hover:text-white transition-colors cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center py-8">
            <ArrowLeftRight className="h-6 w-6 text-gray-400" />
          </div>

          {/* Skills Wanted */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Skills wanted</h4>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-[#FF3C1E] text-[#FF3C1E] text-sm rounded-full hover:bg-[#FF3C1E] hover:text-white transition-colors cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
