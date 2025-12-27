import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FilterIcon } from "@/components/ui/water-icons"
import { X } from 'lucide-react'
interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  resultCount?: number
}

export function SearchBar({ searchQuery, setSearchQuery, resultCount }: SearchBarProps) {
  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="search" className="text-sm font-medium text-dark-gray">
          Search Customers
        </label>
        {resultCount !== undefined && (
          <Badge variant="accent">
            {resultCount} customer{resultCount !== 1 ? 's' : ''}
          </Badge>
        )}
      </div>
      
      <div className="relative">
        <input
          id="search"
          type="text"
          className="w-full px-4 py-3 pl-12 text-base border-2 border-gray/50 rounded-xl bg-white/95 transition-all duration-200 focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10 placeholder:text-dark-gray/60"
          placeholder="Search by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-gray/60">
          <FilterIcon className="w-5 h-5" />
        </div>
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-gray hover:text-primary-blue"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}