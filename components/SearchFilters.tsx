import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export default function SearchFilters() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search skills (e.g., Python, Photoshop, Marketing)"
            className="pl-10 border-gray-300 focus:border-[#FF3C1E] focus:ring-[#FF3C1E]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-40 border-gray-300 focus:border-[#FF3C1E]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekends">Weekends</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
              <SelectItem value="weekdays">Weekdays</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32 border-gray-300 focus:border-[#FF3C1E]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-[#FF3C1E] hover:bg-[#e6351a] text-white px-6">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  )
}
