import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import authService from '../../services/auth.js'

function Sidebar({ isOpen, onClose, collapsed = false }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [openSubmenus, setOpenSubmenus] = useState({
    analysis: false,
    tradePerformance: false
  })

  // Auto-open submenus when on a submenu page
  useEffect(() => {
    if (location.pathname.startsWith('/user/analysis/')) {
      setOpenSubmenus(prev => ({ ...prev, analysis: true }))
    }
    if (location.pathname.startsWith('/user/trade-performance')) {
      setOpenSubmenus(prev => ({ ...prev, tradePerformance: true }))
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
      className={`bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-50 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${collapsed ? 'lg:!w-[80px]' : 'lg:!w-[240px]'}`}
      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', width: '100%', maxWidth: '100%' }}
    >
      {/* Logo with Close Button */}
      <div className={`bg-transparent pt-4 pb-2 flex-shrink-0 flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between pl-8 pr-6'}`}>
        {collapsed ? (
          <img src="/logo.png" alt="Solitaire Markets" className="h-8 w-8 object-contain" style={{ background: 'transparent' }} />
        ) : (
          <>
            <img src="/logo.png" alt="Solitaire Markets" className="h-14 w-auto " style={{ background: 'transparent' }} />
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Separator Line - Aligned with navbar */}
      {!collapsed && <div className="border-b border-gray-200 mx-6"></div>}

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="px-3 space-y-0.5 pb-4 pt-2">
          {/* Dashboard */}
          <Link
            to="/user/dashboard"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/dashboard')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Dashboard' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Dashboard</span>}
          </Link>

          {/* Deposits */}
          <Link
            to="/user/deposits"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/deposits')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Deposits' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0l-3-3m3 3l3-3" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Deposits</span>}
          </Link>

          {/* Withdrawals */}
          <Link
            to="/user/withdrawals"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/withdrawals') || isActive('/withdrawals/crypto')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Withdrawals' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18V12m0 0l-3 3m3-3l3 3" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Withdrawals</span>}
          </Link>

          {/* Transfers */}
          <Link
            to="/user/transfers"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/transfers')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Transfers' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Transfers</span>}
          </Link>

          {/* Payment Details */}
          <Link
            to="/user/payment-details"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/payment-details')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Payment Details' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Payment Details</span>}
          </Link>

          {/* Reports */}
          <Link
            to="/user/reports"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/reports')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Reports' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            {!collapsed && <span className="text-sm font-normal">Reports</span>}
          </Link>

          {/* Trade Performance */}
          <div>
            <button
              onClick={() => toggleSubmenu('tradePerformance')}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} ${collapsed ? 'px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/trade-performance')
                ? 'bg-brand-500 text-dark-base'
                : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
                }`}
              style={{}}
              title={collapsed ? 'Trade Performance' : undefined}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {!collapsed && <span className="text-sm font-normal">Trade Performance</span>}
              </div>
              {!collapsed && (
                <svg
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${openSubmenus.tradePerformance ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            {openSubmenus.tradePerformance && !collapsed && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  to="/user/trade-performance"
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/trade-performance') && !location.search
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span className="text-sm font-normal">Summary</span>
                </Link>
                <Link
                  to="/user/trade-performance?chart=net-profit"
                  className={`block px-4 py-2 rounded-lg transition-colors ${location.search.includes('chart=net-profit')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span className="text-sm font-normal">Net Profit</span>
                </Link>
                <Link
                  to="/user/trade-performance?chart=closed-orders"
                  className={`block px-4 py-2 rounded-lg transition-colors ${location.search.includes('chart=closed-orders')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span className="text-sm font-normal">Closed Orders</span>
                </Link>
                <Link
                  to="/user/trade-performance?chart=trading-volume"
                  className={`block px-4 py-2 rounded-lg transition-colors ${location.search.includes('chart=trading-volume')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span className="text-sm font-normal">Trading Volume</span>
                </Link>
                <Link
                  to="/user/trade-performance?chart=equity"
                  className={`block px-4 py-2 rounded-lg transition-colors ${location.search.includes('chart=equity')
                    ? 'bg-brand-50 hover:bg-brand-100 text-brand-900 font-medium'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                >
                  <span className="text-sm font-normal">Equity</span>
                </Link>
              </div>
            )}
          </div>

          {/* Analysis */}
          <div>
            <button
              onClick={() => toggleSubmenu('analysis')}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} ${collapsed ? 'px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isSubmenuActive(['/analysis', '/analysis/signal-centre', '/analysis/assets-overview', '/analysis/market-news', '/analysis/market-calendar', '/analysis/research-terminal'])
                ? 'bg-brand-500 text-dark-base'
                : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
                }`}
              style={{}}
              title={collapsed ? 'Analysis' : undefined}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                  </svg>
                {!collapsed && <span className="text-sm font-normal">Analysis</span>}
              </div>
              {!collapsed && (
                <svg
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${openSubmenus.analysis ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            {openSubmenus.analysis && !collapsed && (
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
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/platforms')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Platforms' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Platforms</span>}
          </Link>

          {/* Partner's Cabinet */}
          <Link
            to="/user/refer-a-friend"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/refer-a-friend')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? "Partner's Cabinet" : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Partner's Cabinet</span>}
          </Link>

          {/* Solitaire Support */}
          <Link
            to="/user/support"
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 transition-colors relative rounded-lg ${isActive('/support')
              ? 'bg-brand-500 text-dark-base'
              : 'text-gray-700 hover:bg-brand-50 hover:text-brand-900'
              }`}
            style={{}}
            title={collapsed ? 'Solitaire Support' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={collapsed ? {} : { marginRight: '12px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {!collapsed && <span className="text-sm font-normal">Solitaire Support</span>}
          </Link>
        </div>
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className={`${collapsed ? 'p-2' : 'p-4'} pb-0 flex-shrink-0`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} ${collapsed ? 'px-2' : 'px-4'} py-3 bg-black hover:bg-gray-900 rounded-lg transition-colors`}
          style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '500', color: '#c8f300' }}
          title={collapsed ? 'Logout' : undefined}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#c8f300', ...(collapsed ? {} : { marginRight: '8px' }) }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span style={{ color: '#c8f300' }}>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar

