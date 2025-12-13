import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/auth.js'
import AuthLoader from '../components/AuthLoader.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const languages = [
    'عربي',
    'Española',
    'Português',
    'ไทย',
    'Tagalog',
    '한국인',
    '中文简体',
    'Tiếng Việt',
    'English'
  ]

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
      const [result] = await Promise.all([
        authService.login(email, password),
        new Promise(resolve => setTimeout(resolve, 3000))
      ])

      if (result.success) {
        navigate('/user/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Loading Animation */}
      {loading && <AuthLoader message="Logging in..." />}
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        <div className="w-32"></div> {/* Spacer for centering */}

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="flex items-center gap-2 text-dark-base/70 hover:text-dark-base font-sans text-sm font-normal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>ENGLISH</span>
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
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-100 font-sans text-sm font-normal ${lang === 'English' ? 'text-brand-600' : 'text-dark-base/70'
                      }`}
                    onClick={() => setLanguageOpen(false)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
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
            <h1 className="text-2xl font-normal text-dark-base text-center mb-2 font-heading">
              Login to Your Account
            </h1>

            {/* Description */}
            <p className="text-sm text-dark-base/60 text-center mb-6 font-sans">
              Manage your accounts and access insightful reports and technical analysis among many more features.
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
                <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:bg-gray-100 font-sans text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent pr-10 disabled:bg-gray-100 font-sans text-sm"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <span className="ml-2 text-sm text-dark-base/70 font-sans">
                    Remember me
                  </span>
                </label>
                <Link to="/forgot-password" className="text-sm text-brand-700 hover:text-brand-800 font-sans">
                  Forgot password?
                </Link>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base border border-brand-500 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
              >
                {loading ? 'Logging in...' : 'Continue'}
              </button>

              {/* Sign in with different account */}
              <div className="text-center">
                <a href="#" className="text-sm text-brand-700 hover:text-brand-800 font-sans">
                  Sign in with different account
                </a>
              </div>
            </form>
          </div>

          {/* Create Account Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-dark-base/70 font-sans">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-700 hover:text-brand-800 font-medium font-sans">
                Create Live Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

