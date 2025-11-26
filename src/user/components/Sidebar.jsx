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
      } lg:translate-x-0 lg:!w-[324px]`}
      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', width: '100%', maxWidth: '100%' }}
    >
      {/* Logo with Close Button */}
      <div className="bg-transparent pt-4 pb-6 pl-8 pr-6 flex-shrink-0 flex items-center justify-between">
        <img src="/logo.svg" alt="Solitaire Logo" className="h-11 w-auto" style={{ background: 'transparent' }} />
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
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/dashboard')
                ? 'text-[#e6c200]'
                : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
            }`}
            style={isActive('/dashboard') ? { borderLeft: '4px solid #e6c200' } : {}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/dashboard') ? { color: '#e6c200' } : { color: '#374151' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isActive('/dashboard') ? '#e6c200' : '#374151' }}>Dashboard</span>
          </Link>

          {/* Deposits */}
          <Link
            to="/user/deposits"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/deposits')
                ? 'text-[#e6c200]'
                : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
            }`}
            style={isActive('/deposits') ? { borderLeft: '4px solid #e6c200' } : {}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/deposits') ? { color: '#e6c200' } : { color: '#374151' }}>
              <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0l-3-3m3 3l3-3" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isActive('/deposits') ? '#e6c200' : '#374151' }}>Deposits</span>
          </Link>

          {/* Withdrawals */}
          <div>
            <button
              onClick={() => toggleSubmenu('withdrawals')}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors relative ${
                isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto'])
                  ? 'text-[#e6c200]'
                  : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
              }`}
              style={isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto']) ? { borderLeft: '4px solid #e6c200' } : {}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto']) ? { color: '#e6c200' } : { color: '#374151' }}>
                  <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18V12m0 0l-3 3m3-3l3 3" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto']) ? '#e6c200' : '#374151' }}>Withdrawals</span>
              </div>
              <svg
                className={`w-4 h-4 flex-shrink-0 transition-transform ${openSubmenus.withdrawals ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: isSubmenuActive(['/withdrawals', '/withdrawals/debit-card', '/withdrawals/skrill', '/withdrawals/neteller', '/withdrawals/crypto']) ? '#e6c200' : '#374151' }}
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
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Debit / Credit Card</span>
                </Link>
                <Link
                  to="/user/withdrawals/skrill"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/withdrawals/skrill')
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Skrill</span>
                </Link>
                <Link
                  to="/user/withdrawals/neteller"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/withdrawals/neteller')
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Neteller</span>
                </Link>
                <Link
                  to="/user/withdrawals/crypto"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/withdrawals/crypto')
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Crypto</span>
                </Link>
              </div>
            )}
          </div>

          {/* Transfers */}
          <Link
            to="/user/transfers"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/transfers')
                ? 'text-[#e6c200]'
                : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
            }`}
            style={isActive('/transfers') ? { borderLeft: '4px solid #e6c200' } : {}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/transfers') ? { color: '#e6c200' } : { color: '#374151' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isActive('/transfers') ? '#e6c200' : '#374151' }}>Transfers</span>
          </Link>

          {/* Reports */}
          <Link
            to="/user/reports"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/reports')
                ? 'text-[#e6c200]'
                : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
            }`}
            style={isActive('/reports') ? { borderLeft: '4px solid #e6c200' } : {}}
          >
            <div className="relative w-5 h-5 mr-3 flex-shrink-0">
              <svg className="w-5 h-5 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/reports') ? { color: '#e6c200' } : { color: '#374151' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg className="w-3 h-3 absolute bottom-0 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/reports') ? { color: '#e6c200' } : { color: '#374151' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isActive('/reports') ? '#e6c200' : '#374151' }}>Reports</span>
          </Link>

          {/* Analysis */}
          <div>
            <button
              onClick={() => toggleSubmenu('analysis')}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors relative ${
                isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal'])
                  ? 'text-[#e6c200]'
                  : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
              }`}
              style={isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? { borderLeft: '4px solid #e6c200' } : {}}
            >
              <div className="flex items-center">
                <div className="relative w-5 h-5 mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 absolute bottom-0 left-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? { color: '#e6c200' } : { color: '#374151' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <svg className="w-5 h-5 absolute top-0 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? { color: '#e6c200' } : { color: '#374151' }}>
                    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? '#e6c200' : '#374151' }}>Analysis</span>
              </div>
              <svg
                className={`w-4 h-4 flex-shrink-0 transition-transform ${openSubmenus.analysis ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal']) ? '#e6c200' : '#374151' }}
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
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Signal Centre</span>
                </Link>
                <Link
                  to="/user/analysis/assets-overview"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/assets-overview')
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Assets Overview</span>
                </Link>
                <Link
                  to="/user/analysis/market-news"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/market-news')
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Market News</span>
                </Link>
                <Link
                  to="/user/analysis/market-calendar"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/market-calendar')
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
                  }`}
                >
                  <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Market Calendar</span>
                </Link>
                <Link
                  to="/user/analysis/research-terminal"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/analysis/research-terminal')
                      ? 'bg-yellow-50 text-[#e6c200]'
                      : 'text-gray-600 hover:bg-yellow-50 hover:text-[#ffd700]'
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
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/platforms')
                ? 'text-[#e6c200]'
                : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
            }`}
            style={isActive('/platforms') ? { borderLeft: '4px solid #e6c200' } : {}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/platforms') ? { color: '#e6c200' } : { color: '#374151' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isActive('/platforms') ? '#e6c200' : '#374151' }}>Platforms</span>
          </Link>

          {/* Refer a Friend */}
          <Link
            to="/user/refer-a-friend"
            className={`flex items-center px-4 py-3 transition-colors relative ${
              isActive('/refer-a-friend')
                ? 'text-[#e6c200]'
                : 'text-gray-700 hover:bg-yellow-50 hover:text-[#ffd700]'
            }`}
            style={isActive('/refer-a-friend') ? { borderLeft: '4px solid #e6c200' } : {}}
          >
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={isActive('/refer-a-friend') ? { color: '#e6c200' } : { color: '#374151' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto, sans-serif', color: isActive('/refer-a-friend') ? '#e6c200' : '#374151' }}>Refer a Friend</span>
          </Link>
        </div>
      </nav>

      {/* Legal Terms */}
      <div className="flex-shrink-0 px-4 py-6 border-t border-gray-200 bg-white mt-auto">
        <Link 
          to="/user/legal" 
          className="text-[#ffd700] hover:underline transition-colors" 
          style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
        >
          Legal Terms and Policies
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

