import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const [openSubmenus, setOpenSubmenus] = useState({
    withdrawals: false,
    analysis: false
  })

  // Auto-open submenus when on a submenu page
  useEffect(() => {
    if (location.pathname.startsWith('/user/withdrawals/')) {
      setOpenSubmenus(prev => ({ ...prev, withdrawals: true }))
    }
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

  const isActive = (path) => location.pathname === `/user${path}`
  const isSubmenuActive = (paths) => paths.some(path => location.pathname === `/user${path}`)

  return (
    <div 
      className={`bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:!w-[360px]`}
      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', width: '100%', maxWidth: '100%' }}
    >
      {/* Logo with Close Button */}
      <div className="bg-transparent pt-2 pb-6 pl-10 pr-6 flex-shrink-0 flex items-center justify-between">
        <img src="/logoequiti.png" alt="Equiti Logo" className="h-12 w-auto" style={{ background: 'transparent' }} />
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
      <nav className="flex-1 overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <div className="px-4 space-y-1 pb-4 pt-2">
          {/* Dashboard */}
          <Link
            to="/user/dashboard"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/dashboard')
                ? 'text-[#00A896]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={isActive('/dashboard') ? { borderLeft: '10px solid #00A896' } : {}}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/dashboard') ? { color: '#00A896' } : {}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-bold" style={{ fontSize: '14px', color: isActive('/dashboard') ? '#00A896' : 'inherit' }}>Dashboard</span>
          </Link>

          {/* Deposits */}
          <Link
            to="/user/deposits"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/deposits')
                ? 'text-[#00A896]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={isActive('/deposits') ? { borderLeft: '10px solid #00A896' } : {}}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/deposits') ? { color: '#00A896' } : {}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-bold" style={{ fontSize: '14px', color: isActive('/deposits') ? '#00A896' : 'inherit' }}>Deposits</span>
          </Link>

          {/* Withdrawals */}
          <div>
            <button
              onClick={() => toggleSubmenu('withdrawals')}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors relative ${
                isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto'])
                  ? 'text-[#00A896]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto']) ? { borderLeft: '10px solid #00A896' } : {}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto']) ? { color: '#00A896' } : {}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-bold" style={{ fontSize: '14px', color: isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto']) ? '#00A896' : 'inherit' }}>Withdrawals</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${openSubmenus.withdrawals ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubmenus.withdrawals && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  to="/user/withdrawals/debit-card"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/withdrawals/debit-card')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Debit / Credit Card</span>
                </Link>
                <Link
                  to="/user/withdrawals/skrill"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/withdrawals/skrill')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Skrill</span>
                </Link>
                <Link
                  to="/user/withdrawals/neteller"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/withdrawals/neteller')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Neteller</span>
                </Link>
                <Link
                  to="/user/withdrawals/crypto"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/withdrawals/crypto')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Crypto</span>
                </Link>
              </div>
            )}
          </div>

          {/* Transfers */}
          <Link
            to="/user/transfers"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/transfers')
                ? 'text-[#00A896]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={isActive('/transfers') ? { borderLeft: '10px solid #00A896' } : {}}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/transfers') ? { color: '#00A896' } : {}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="font-bold" style={{ fontSize: '14px', color: isActive('/transfers') ? '#00A896' : 'inherit' }}>Transfers</span>
          </Link>

          {/* Reports */}
          <Link
            to="/user/reports"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/reports')
                ? 'text-[#00A896]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={isActive('/reports') ? { borderLeft: '10px solid #00A896' } : {}}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/reports') ? { color: '#00A896' } : {}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-bold" style={{ fontSize: '14px', color: isActive('/reports') ? '#00A896' : 'inherit' }}>Reports</span>
          </Link>

          {/* Analysis */}
          <div>
            <button
              onClick={() => toggleSubmenu('analysis')}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors relative ${
                isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal'])
                  ? 'text-[#00A896]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? { borderLeft: '10px solid #00A896' } : {}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? { color: '#00A896' } : {}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-bold" style={{ fontSize: '14px', color: isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? '#00A896' : 'inherit' }}>Analysis</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${openSubmenus.analysis ? 'rotate-180' : ''}`}
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
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/signal-centre')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Signal Centre</span>
                </Link>
                <Link
                  to="/user/analysis/assets-overview"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/assets-overview')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Assets Overview</span>
                </Link>
                <Link
                  to="/user/analysis/market-news"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/market-news')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Market News</span>
                </Link>
                <Link
                  to="/user/analysis/market-calendar"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/market-calendar')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Market Calendar</span>
                </Link>
                <Link
                  to="/user/analysis/research-terminal"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/research-terminal')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontSize: '14px' }}>Research Terminal</span>
                </Link>
              </div>
            )}
          </div>

          {/* Platforms */}
          <Link
            to="/user/platforms"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/platforms')
                ? 'text-[#00A896]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={isActive('/platforms') ? { borderLeft: '10px solid #00A896' } : {}}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/platforms') ? { color: '#00A896' } : {}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-bold" style={{ fontSize: '14px', color: isActive('/platforms') ? '#00A896' : 'inherit' }}>Platforms</span>
          </Link>

          {/* Refer a Friend */}
          <Link
            to="/user/refer-a-friend"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/refer-a-friend')
                ? 'text-[#00A896]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={isActive('/refer-a-friend') ? { borderLeft: '10px solid #00A896' } : {}}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/refer-a-friend') ? { color: '#00A896' } : {}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span className="font-bold" style={{ fontSize: '14px', color: isActive('/refer-a-friend') ? '#00A896' : 'inherit' }}>Refer a Friend</span>
          </Link>
        </div>
      </nav>

      {/* Legal Terms */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
        <Link to="/user/legal" className="text-teal-600 hover:underline" style={{ fontSize: '14px' }}>
          Legal Terms and Policies
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

