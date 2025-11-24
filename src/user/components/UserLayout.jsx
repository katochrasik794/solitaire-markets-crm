import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function UserLayout() {
  // Open sidebar by default on small screens, closed on desktop
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024
    }
    return false
  })

  // Update sidebar state on resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, sidebar is always visible (not controlled by state)
        setSidebarOpen(false)
      }
    }
    
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div 
        className="flex-1 overflow-x-hidden w-full lg:ml-[324px] relative z-10 transition-all duration-300"
        onClick={() => {
          // Close sidebar when clicking on main content area on mobile
          if (typeof window !== 'undefined' && window.innerWidth < 1024 && sidebarOpen) {
            setSidebarOpen(false)
          }
        }}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="overflow-x-hidden min-h-screen pt-[77px] sm:pt-[77px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default UserLayout

