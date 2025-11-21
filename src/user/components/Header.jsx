import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Header({ onMenuClick }) {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const languageRef = useRef(null)
  const profileRef = useRef(null)
  const menuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
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
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 relative">
        {/* Left side - Hamburger menu */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={onMenuClick}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Logo (Mobile - centered, Desktop - hidden) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
          <Link to="/user/dashboard">
            <img src="/logoequiti.png" alt="Equiti Logo" className="h-12 w-auto" style={{ background: 'transparent' }} />
          </Link>
        </div>

        {/* Right side - Language, Profile, and 3-dots menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Selector - Hidden on mobile */}
          <div className="relative mr-4 hidden lg:block" ref={languageRef}>
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  {languages.map((lang, index) => (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        lang === 'Española' ? 'text-[#00A896]' : 'text-gray-700'
                      }`}
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
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
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
            >
              <span>Rasik Katoch</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  <Link
                    to="/user/documents"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setProfileOpen(false)}
                  >
                    My Documents
                  </Link>
                  <Link
                    to="/user/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setProfileOpen(false)}
                  >
                    My Settings
                  </Link>
                  <Link
                    to="/user/support"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setProfileOpen(false)}
                  >
                    Equiti Support
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    className="block w-full text-left px-4 py-2 text-[#00A896] hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setProfileOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3-dots Menu Button (Mobile and Desktop) */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  <Link
                    to="/user/documents"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    My Documents
                  </Link>
                  <Link
                    to="/user/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    My Settings
                  </Link>
                  <Link
                    to="/user/support"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Equiti Support
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    className="block w-full text-left px-4 py-2 text-[#00A896] hover:bg-gray-50"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deposit Banner */}
      <div className="bg-yellow-100 border-b border-yellow-200">
        <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3 flex-1">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-800 text-sm sm:text-base" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
              You can deposit up to USD 2,000. Complete full verification to make deposits without limitations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/user/deposits"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-4 sm:px-6 py-2 rounded transition-colors text-center text-sm sm:text-base"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
            >
              DEPOSIT NOW
            </Link>
            <Link
              to="/user/verification"
              className="text-gray-800 underline hover:text-gray-900 text-center sm:text-left text-sm sm:text-base"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
            >
              Complete verification
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

