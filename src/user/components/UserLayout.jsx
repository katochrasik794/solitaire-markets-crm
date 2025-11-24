import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { AiOutlineInfoCircle } from "react-icons/ai";

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
          {/* Deposit Banner */}
          <div className="w-full bg-[#FFF9E6] border-t border-[#f3e7b5] px-4 md:px-6 py-4">
            {/* MOBILE LAYOUT */}
            <div className="flex flex-col gap-3 md:hidden">
              {/* Icon + Text */}
              <div className="flex items-start gap-3">
                <AiOutlineInfoCircle className="w-5 h-5 text-black mt-1" />

                <p className="text-sm text-black leading-snug">
                  You can deposit up to USD 2,000. Complete full verification to
                  make deposits without limitations.
                </p>
              </div>

              {/* Deposit Button */}
              <button className="w-full bg-[#FFB933] hover:bg-[#f0c21d] text-black text-sm py-3 rounded-md font-semibold transition">
                DEPOSIT NOW
              </button>

              {/* Verification Link */}
              <button className="text-black underline text-sm mx-auto hover:text-gray-700 transition">
                Complete verification
              </button>
            </div>

            {/* DESKTOP LAYOUT */}
            <div className="hidden md:flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-start md:items-center gap-3 text-black leading-snug">
                <AiOutlineInfoCircle className="w-6 h-6 text-black" />

                <p className="text-sm md:text-base m-0">
                  You can deposit up to USD 2,000. Complete full verification to
                  make deposits without limitations.
                </p>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                <button className="bg-[#FFB933] hover:bg-[#f0c21d] text-black text-sm md:text-base px-6 py-2 rounded-md font-medium transition">
                  DEPOSIT NOW
                </button>

                <button className="text-black underline text-sm md:text-base hover:text-gray-700 transition">
                  Complete verification
                </button>
              </div>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default UserLayout

