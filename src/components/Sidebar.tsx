import "../styles/Sidebar.css"

interface SidebarProps {
  isVisible: boolean
  onClose: () => void
}

export function Sidebar({ isVisible, onClose }: SidebarProps) {
  if (!isVisible) return null

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-item active">
            <span className="icon">🏠</span>
            <span className="label">Home</span>
          </button>
          
          <button className="sidebar-item">
            <span className="icon">📊</span>
            <span className="label">Sales Report</span>
          </button>
          
          <button className="sidebar-item">
            <span className="icon">⚙️</span>
            <span className="label">Settings</span>
          </button>
        </nav>
      </div>
    </>
  )
}