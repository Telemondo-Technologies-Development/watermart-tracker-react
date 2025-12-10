interface SidebarProps {
  isVisible: boolean
  onClose: () => void
}

export function Sidebar({ isVisible, onClose }: SidebarProps) {
  if (!isVisible) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray z-50 shadow-xl animate-slide-in flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray">
          <h3 className="text-lg text-very-dark font-semibold">Menu</h3>
          <button 
            className="bg-transparent border-none text-xl text-dark-gray cursor-pointer w-8 h-8 flex items-center justify-center transition-all hover:bg-light-blue hover:text-primary-blue rounded-sm hover:scale-110"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="p-2 flex flex-col gap-1 flex-1">
          <button className="flex items-center gap-4 p-4 bg-transparent border-none cursor-pointer transition-all text-dark-gray text-base text-left w-full border-l-3 border-primary-blue hover:bg-light-blue hover:text-primary-blue bg-light-blue text-primary-blue font-semibold">
            <span className="text-2xl">🏠</span>
            <span>Home</span>
          </button>
          
          <button className="flex items-center gap-4 p-4 bg-transparent border-none cursor-pointer transition-all text-dark-gray text-base text-left w-full border-l-3 border-transparent hover:bg-light-blue hover:text-primary-blue">
            <span className="text-2xl">📊</span>
            <span>Sales Report</span>
          </button>
          
          <button className="flex items-center gap-4 p-4 bg-transparent border-none cursor-pointer transition-all text-dark-gray text-base text-left w-full border-l-3 border-transparent hover:bg-light-blue hover:text-primary-blue">
            <span className="text-2xl">⚙️</span>
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </>
  )
}