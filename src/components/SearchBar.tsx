interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        className="w-full px-4 py-3 text-base border-2 border-gray rounded-xl bg-white transition-all duration-200 focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10 placeholder:text-dark-gray"
        placeholder="Search for customer by name or address..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button 
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-dark-gray text-xl cursor-pointer p-0 w-8 h-8 flex items-center justify-center transition-colors hover:text-primary-blue hover:scale-110"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}