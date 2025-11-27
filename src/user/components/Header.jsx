import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/auth.js'

function Header({ onMenuClick }) {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [userName, setUserName] = useState('User')
  const languageRef = useRef(null)
  const profileRef = useRef(null)
  const navigate = useNavigate()

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Try to get from localStorage first
        const userData = authService.getUserData()
        if (userData && userData.firstName) {
          const name = userData.lastName 
            ? `${userData.firstName} ${userData.lastName}`
            : userData.firstName
          setUserName(name)
        } else {
          // If not in localStorage, verify token to get fresh data
          const result = await authService.verifyToken()
          if (result.success && result.data && result.data.user) {
            const user = result.data.user
            const name = user.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user.firstName
            setUserName(name)
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        // Keep default "User" if fetch fails
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = () => {
    // Clear authentication token
    authService.logout()
    // Close dropdown
    setProfileOpen(false)
    // Redirect to login page
    navigate('/login')
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const languages = [
    'عربي',
    'Española',
    'Português',
    'ไทย',
    'Tagalog',
    '한국인',
    '中文简体',
    'Tiếng Việt'
  ]

  return (
    <>
      {/* Header Bar - Fixed */}
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-6 py-7 relative">
          {/* Left side - Hamburger menu (Mobile only) */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={onMenuClick}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Logo (Mobile - centered, Desktop - hidden) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
            <Link to="/user/dashboard">
              <img src="/logo.svg" alt="Solitaire Logo" className="h-20 w-auto" style={{ background: 'transparent' }} />
            </Link>
          </div>

          {/* Right side - Language, Profile, and 3-dots menu */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Language Selector - Hidden on mobile */}
            <div className="relative hidden lg:flex items-center" ref={languageRef}>
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>English</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {languageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {languages.map((lang, index) => (
                      <button
                        key={index}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                          lang === 'Española' ? 'text-[#00A896]' : 'text-gray-700'
                        }`}
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                        onClick={() => setLanguageOpen(false)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile - Hidden on mobile */}
            <div className="relative hidden lg:block" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
              >
                <span>Welcome {userName}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <Link
                      to="/user/documents"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                      onClick={() => setProfileOpen(false)}
                    >
                      My Documents
                    </Link>
                    <Link
                      to="/user/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                      onClick={() => setProfileOpen(false)}
                    >
                      My Settings
                    </Link>
                    <Link
                      to="/user/support"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                      onClick={() => setProfileOpen(false)}
                    >
                      Solitaire Support
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      className="block w-full text-left px-4 py-2 text-[#00A896] hover:bg-gray-50"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Banner - Light yellow badge */}
      {/* <div className="bg-[#FDF8E7]">
        <div className="px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
           
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold" style={{ fontFamily: 'Roboto, sans-serif' }}>i</span>
            </div>
            <p className="text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
              You can deposit up to USD 2,000. Complete full verification to make deposits without limitations.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/user/deposits"
              className="bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 px-4 py-1.5 rounded transition-colors whitespace-nowrap"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
            >
              DEPOSIT NOW
            </Link>
            <Link
              to="/user/verification"
              className="text-gray-800 underline hover:text-gray-900 whitespace-nowrap"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
            >
              Complete verification
            </Link>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Header

