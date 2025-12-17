import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import Ticker from './Ticker'
import { AiOutlineInfoCircle } from "react-icons/ai";
import authService from '../../services/auth.js'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Route to title mapping
const routeTitles = {
  '/user/dashboard': 'Dashboard',
  '/user/verification': 'Verification',
  '/user/create-account': 'Create Account',
  '/user/deposits': 'Deposits',
  '/user/deposits/google-pay': 'Google Pay',
  '/user/deposits/apple-pay': 'Apple Pay',
  '/user/deposits/debit-card': 'Debit Card Deposit',
  '/user/deposits/usdt-trc20': 'USDT TRC20',
  '/user/deposits/bitcoin': 'Bitcoin',
  '/user/deposits/usdt-erc20': 'USDT ERC20',
  '/user/deposits/usdt-bep20': 'USDT BEP20',
  '/user/deposits/ethereum': 'Ethereum',
  '/user/deposits/bank-transfer': 'Bank Transfer',
  '/user/deposits/other-crypto': 'Other Crypto',
  '/user/withdrawals': 'Withdrawals',
  '/user/withdrawals/crypto': 'Crypto Withdrawal',
  '/user/transfers': 'Transfers',
  '/user/reports': 'Reports',
  '/user/analysis/signal-centre': 'Signal Centre',
  '/user/analysis/assets-overview': 'Assets Overview',
  '/user/analysis/market-news': 'Market News',
  '/user/analysis/market-calendar': 'Market Calendar',
  '/user/analysis/research-terminal': 'Research Terminal',
  '/user/platforms': 'Platforms',
  '/user/refer-a-friend': "Partner's Cabinet",
  '/user/legal': 'Legal Terms'
};

function UserLayout() {
  const location = useLocation();

  // Open sidebar by default on small screens, closed on desktop
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024
    }
    return false
  })
  const [kycStatus, setKycStatus] = useState(null)
  const [topTickers, setTopTickers] = useState([])
  const [middleTickers, setMiddleTickers] = useState([])
  const [dismissedTickers, setDismissedTickers] = useState(new Set())

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

  // Update page title based on current route
  useEffect(() => {
    const pathname = location.pathname;
    const pageTitle = routeTitles[pathname] || 'Dashboard';
    document.title = `Solitaire : ${pageTitle}`;
  }, [location.pathname]);

  // Check KYC status on mount
  useEffect(() => {
    const checkKYCStatus = async () => {
      try {
        const token = authService.getToken()
        if (!token) return

        const response = await fetch(`${API_BASE_URL}/kyc/status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setKycStatus(data.data.status)
          }
        }
      } catch (err) {
        console.error('Error checking KYC status:', err)
      }
    }

    checkKYCStatus()
  }, [])

  // Fetch active tickers on mount
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        // Fetch all active tickers (both positions)
        const response = await fetch(`${API_BASE_URL}/tickers?is_active=true`)
        const data = await response.json()
        
        console.log('Tickers API response:', data)
        
        if (data.success && Array.isArray(data.data)) {
          // Separate by position and sort by priority
          const top = data.data
            .filter(t => t.position === 'top')
            .sort((a, b) => (b.priority || 0) - (a.priority || 0))
          const middle = data.data
            .filter(t => t.position === 'middle')
            .sort((a, b) => (b.priority || 0) - (a.priority || 0))
          
          console.log('Top tickers:', top)
          console.log('Middle tickers:', middle)
          
          setTopTickers(top)
          setMiddleTickers(middle)
        } else {
          console.error('Tickers API error:', data)
        }
      } catch (err) {
        console.error('Error fetching tickers:', err)
      }
    }

    fetchTickers()
  }, [])

  const handleTickerClose = (tickerId) => {
    setDismissedTickers(prev => new Set([...prev, tickerId]))
  }

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
        className="flex-1 overflow-x-hidden w-full lg:ml-[324px] relative z-10 transition-all duration-300 flex flex-col min-h-screen"
        onClick={() => {
          // Close sidebar when clicking on main content area on mobile
          if (typeof window !== 'undefined' && window.innerWidth < 1024 && sidebarOpen) {
            setSidebarOpen(false)
          }
        }}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Tickers - Display directly below navbar */}
        <div className="mt-[64px] md:mt-[77px]">
          {/* Middle Position Tickers - Between navbar and content */}
          {middleTickers
            .filter(ticker => !dismissedTickers.has(ticker.id))
            .map(ticker => (
              <Ticker
                key={ticker.id}
                ticker={ticker}
                onClose={() => handleTickerClose(ticker.id)}
              />
            ))}

          {/* Top Position Tickers - Above verification banner */}
          {topTickers
            .filter(ticker => !dismissedTickers.has(ticker.id))
            .map(ticker => (
              <Ticker
                key={ticker.id}
                ticker={ticker}
                onClose={() => handleTickerClose(ticker.id)}
              />
            ))}
        </div>

        <main className="overflow-x-hidden flex-1">

          {/* Deposit Banner - Hide when KYC is approved */}
          {kycStatus !== 'approved' && (
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
                <button className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base text-sm py-3 rounded-md font-semibold transition">
                  DEPOSIT NOW
                </button>

                {/* Verification Link */}
                <Link to="/user/verification" className="text-black underline text-sm mx-auto hover:text-gray-700 transition">
                  Complete verification
                </Link>
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
                  <button className="bg-brand-500 hover:bg-brand-600 text-dark-base text-sm md:text-base px-6 py-2 rounded-md font-medium transition">
                    DEPOSIT NOW
                  </button>

                  <Link to="/user/verification" className="text-black underline text-sm md:text-base hover:text-gray-700 transition">
                    Complete verification
                  </Link>
                </div>
              </div>
            </div>
          )}

          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default UserLayout

