import { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth.js'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [languageOpen, setLanguageOpen] = useState(false)

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
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await authService.forgotPassword(email)
      setMessage(result.message || 'If an account with that email exists, a password reset link has been sent.')
    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        <div className="w-32"></div> {/* Spacer for centering */}
        
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
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
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      lang === 'English' ? 'text-[#ffd700]' : 'text-gray-700'
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Forgot Password Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-10 w-auto"
                style={{ filter: 'none' }}
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-normal text-gray-900 text-center mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Forgot Password?
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {/* Success Message */}
            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {message}
                </p>
              </div>
            )}

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
                  disabled={loading || !!message}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent disabled:bg-gray-100"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !!message}
                className="w-full bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link 
                to="/login" 
                className="text-sm text-blue-600 hover:text-blue-800" 
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

