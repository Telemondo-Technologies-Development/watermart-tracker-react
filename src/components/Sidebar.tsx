import { Link, useNavigate } from '@tanstack/react-router'
import { Home, BarChart3, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  isVisible: boolean
  onClose: () => void
}

export function Sidebar({ isVisible, onClose }: SidebarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    onClose()
    navigate({ to: '/login' })
  }

  const username = localStorage.getItem('username') || 'Admin'

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

        {/* User Info */}
        <div className="p-4 border-b border-gray/30 bg-light-blue/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-accent-cyan flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-very-dark text-sm">Welcome!</p>
              <p className="text-xs text-dark-gray">{username}</p>
            </div>
          </div>
        </div>

        <nav className="p-2 flex flex-col gap-1 flex-1">
          <Link
            to="/"
            className="flex items-center gap-3 p-4 transition-all text-dark-gray text-base text-left w-full border-l-4 border-transparent hover:bg-light-blue hover:text-primary-blue rounded-r-lg [&.active]:border-primary-blue [&.active]:bg-light-blue [&.active]:text-primary-blue [&.active]:font-semibold"
            activeOptions={{ exact: true }}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
  
          <Link
            to="/sales-report"
            className="flex items-center gap-3 p-4 transition-all text-dark-gray text-base text-left w-full border-l-4 border-transparent hover:bg-light-blue hover:text-primary-blue rounded-r-lg [&.active]:border-primary-blue [&.active]:bg-light-blue [&.active]:text-primary-blue [&.active]:font-semibold"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Sales Report</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray/30">
          <Button
            variant="destructive"
            className="w-full"
            leftIcon={<LogOut className="w-4 h-4" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}