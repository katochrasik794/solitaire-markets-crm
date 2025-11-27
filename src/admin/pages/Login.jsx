import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthLoader from '../../components/AuthLoader.jsx'

const BASE = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login, admin, loading: authLoading } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && admin) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [admin, authLoading, navigate])

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't show login form if already logged in
  if (admin) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      // Minimum 3 seconds loading time for beautiful animation
      // Ensure BASE includes /api
      let apiBase = BASE;
      if (!apiBase.endsWith('/api')) {
        apiBase = apiBase.endsWith('/') ? `${apiBase}api` : `${apiBase}/api`;
      }
      
      const loginUrl = `${apiBase}/admin/login`;
      console.log('Admin login URL:', loginUrl); // Debug log
      
      const [response] = await Promise.all([
        fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }),
        new Promise(resolve => setTimeout(resolve, 3000))
      ])
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Server error: ${response.status}` }));
        setError(errorData.message || `Login failed: ${response.status}`)
        setLoading(false)
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        // Store admin token and info
        login(data.data.admin || data.data, data.data.token)
        navigate('/admin/dashboard')
      } else {
        setError(data.message || 'Login failed. Please check your credentials.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.message || 'Login failed. Please check your credentials and ensure the backend is running.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Loading Animation */}
      {loading && <AuthLoader message="Logging in..." />}
      
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-20 w-auto mr-10"
                style={{ filter: 'none' }}
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-normal text-gray-900 text-center mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Admin Login
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Access the admin panel to manage users, accounts, and platform settings.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent disabled:bg-gray-100"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent pr-10 disabled:bg-gray-100"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#ffd700] border-gray-300 rounded focus:ring-[#ffd700]"
                  />
                  <span className="ml-2 text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Remember me
                  </span>
                </label>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
              >
                {loading ? 'Logging in...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

