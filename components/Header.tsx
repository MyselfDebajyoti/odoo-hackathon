import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Bell } from "lucide-react"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-[#FFFEE7] border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="SkillSwap Logo" width={64} height={32} className="w-8 h-8" />
          </Link>

          {/* Search and Filters */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="border-[#FF3C1E] text-[#FF3C1E] hover:bg-[#FF3C1E] hover:text-white bg-transparent"
              >
                Availability ▼
              </Button>
            </div>
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search your skills"
                className="pr-10 border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#FF3C1E] hover:bg-[#e6351a] text-white px-4"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#FF3C1E]">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#FF3C1E]">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button className="bg-[#FF3C1E] hover:bg-[#e6351a] text-white px-6 py-2 rounded-full">Login</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
