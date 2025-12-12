import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FilterIcon, RefreshIcon } from "@/components/ui/water-icons"

type SortOption = "name-asc" | "name-desc" | "orders-asc" | "orders-desc" | "recent"

interface CustomerFiltersProps {
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
  onRefresh: () => void
}

export function CustomerFilters({ sortBy, onSortChange, onRefresh }: CustomerFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FilterIcon className="w-4 h-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            aria-label="Refresh"
          >
            <RefreshIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-gray">Sort by:</span>
          <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="orders-asc">Orders (Low-High)</SelectItem>
              <SelectItem value="orders-desc">Orders (High-Low)</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-light-blue/20 rounded-lg border border-gray/30 animate-fade-in">
          <p className="text-sm text-dark-gray mb-3">Advanced filters coming soon...</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Active Customers
            </Button>
            <Button variant="outline" size="sm" disabled>
              Recent Orders
            </Button>
            <Button variant="outline" size="sm" disabled>
              Bulk Orders
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}