import "../styles/SearchBar.css"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="search-section">
      <input
        type="text"
        className="search-input"
        placeholder="Search for customer by name or address..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className="clear-btn" onClick={() => setSearchQuery("")} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  )
}
