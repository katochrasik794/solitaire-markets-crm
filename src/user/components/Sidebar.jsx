import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import authService from '../../services/auth.js'

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [openSubmenus, setOpenSubmenus] = useState({
    analysis: false
  })

  // Auto-open submenus when on a submenu page
  useEffect(() => {
    if (location.pathname.startsWith('/user/analysis/')) {
      setOpenSubmenus(prev => ({ ...prev, analysis: true }))
    }
  }, [location.pathname])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const toggleSubmenu = (menu) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }))
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === `/user${path}`
  const isSubmenuActive = (paths) => paths.some(path => location.pathname === `/user${path}`)

  return (
    <div
      className={`bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:!w-[324px]`}
      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', width: '100%', maxWidth: '100%' }}
    >
      {/* Logo with Close Button */}
      <div className="bg-transparent pt-4 pb-6 pl-8 pr-6 flex-shrink-0 flex items-center justify-between">
        <img src="/logo.svg" alt="Solitaire Logo" className="h-20 w-auto" style={{ background: 'transparent' }} />
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="px-3 space-y-0.5 pb-4 pt-2">
          {/* Dashboard */}
          <Link
            to="/user/dashboard"
            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/dashboard')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-normal">Dashboard</span>
          </Link>

          {/* Deposits */}
          <Link
            to="/user/deposits"
            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/deposits')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0l-3-3m3 3l3-3" />
            </svg>
            <span className="text-sm font-normal">Deposits</span>
          </Link>

          {/* Withdrawals */}
          <Link
            to="/user/withdrawals"
            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/withdrawals') || isActive('/withdrawals/crypto')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18V12m0 0l-3 3m3-3l3 3" />
            </svg>
            <span className="text-sm font-normal">Withdrawals</span>
          </Link>

          {/* Transfers */}
          <Link
            to="/user/transfers"

            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/transfers')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="text-sm font-normal">Transfers</span>
          </Link>

          {/* Reports */}
          <Link
            to="/user/reports"
            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/reports')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-normal">Reports</span>
          </Link>

          {/* Analysis */}
          <div>
            <button
              onClick={() => toggleSubmenu('analysis')}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors relative ${isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal'])
                ? 'bg-brand-500 text-dark-base'
                : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
                }`}
              style={{}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                </svg>
                <span className="text-sm font-normal">Analysis</span>
              </div>
              <svg
                className={`w-4 h-4 flex-shrink-0 transition-transform ${openSubmenus.analysis ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubmenus.analysis && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  to="/user/analysis/signal-centre"
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/analysis/signal-centre')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span className="text-sm font-normal">Signal Centre</span>
                </Link>
                <Link
                  to="/user/analysis/assets-overview"
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/analysis/assets-overview')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Assets Overview</span>
                </Link>
                <Link
                  to="/user/analysis/market-news"
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/analysis/market-news')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Market News</span>
                </Link>
                <Link
                  to="/user/analysis/market-calendar"
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/analysis/market-calendar')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Market Calendar</span>
                </Link>
                <Link
                  to="/user/analysis/research-terminal"
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/analysis/research-terminal')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Research Terminal</span>
                </Link>
              </div>
            )}
          </div>

          {/* Platforms */}
          <Link
            to="/user/platforms"
            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/platforms')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-normal">Platforms</span>
          </Link>

          {/* Partner's Cabinet */}
          <Link
            to="/user/refer-a-friend"
            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/refer-a-friend')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm font-normal">Partner's Cabinet</span>
          </Link>

          {/* Solitaire Support */}
          <Link
            to="/user/support"
            className={`flex items-center px-4 py-3 transition-colors relative ${isActive('/support')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-sm font-normal">Solitaire Support</span>
          </Link>
        </div>
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '500' }}
        >
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

