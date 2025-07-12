import Header from "@/components/Header"
import UserCard from "@/components/UserCard"
import SearchFilters from "@/components/SearchFilters"
import { Button } from "@/components/ui/button"

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Marc Demo",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 3.9,
    totalRatings: 165,
    description: "Full-stack developer passionate about teaching and learning new technologies.",
    skillsOffered: ["Python", "C++", "Javascript", "MongoDB", "Figma"],
    skillsWanted: ["React", "UI/UX Design", "Machine Learning"],
    availability: ["Weekends", "Evenings"],
    isPublic: true,
    responseTime: "2 hours",
    completedSwaps: 23,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.5,
    totalRatings: 89,
    description: "UX Designer with 5+ years experience, looking to learn development skills.",
    skillsOffered: ["Figma", "Photoshop", "UI/UX Design", "Sketch"],
    skillsWanted: ["React", "Node.js", "TypeScript"],
    availability: ["Weekends"],
    isPublic: true,
    responseTime: "1 hour",
    completedSwaps: 15,
  },
  {
    id: "3",
    name: "Alex Chen",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.2,
    totalRatings: 234,
    description: "Backend engineer specializing in cloud technologies and DevOps.",
    skillsOffered: ["React", "Node.js", "Python", "AWS", "Docker"],
    skillsWanted: ["Machine Learning", "Data Science", "TensorFlow"],
    availability: ["Evenings", "Weekends"],
    isPublic: true,
    responseTime: "3 hours",
    completedSwaps: 41,
  },
  {
    id: "4",
    name: "Emma Wilson",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    totalRatings: 156,
    description: "Digital marketing expert transitioning into tech, eager to learn coding.",
    skillsOffered: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    skillsWanted: ["HTML/CSS", "Javascript", "WordPress", "Python"],
    availability: ["Evenings"],
    isPublic: true,
    responseTime: "30 minutes",
    completedSwaps: 8,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFEE7]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchFilters />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {mockUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-12">
          <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
            Previous
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className={page === 1 ? "bg-[#FF3C1E] text-white" : "border-gray-300"}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
            Next
          </Button>
        </div>
      </main>
    </div>
  )
}
