import { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth.js'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Header with Logo */}
        <div className="w-full flex flex-col items-center mb-6">
          {/* Logo - Centered */}
          <div className="mb-4">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-14 w-auto mx-auto"
              style={{ filter: 'none' }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-lg">
          {/* Title */}
          <h1 className="text-2xl font-bold text-dark-base text-center mb-2 font-heading">
            Forgot Password?
          </h1>

          {/* Description */}
          <p className="text-sm text-dark-base/60 text-center mb-6 font-sans">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-sans">
                {message}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-sans">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 w-full">
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
                disabled={loading || !!message}
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-sans text-sm transition-colors disabled:bg-gray-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !!message}
              className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base border border-brand-500 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link 
              to="/login" 
              className="text-sm text-brand-700 hover:text-brand-800 font-sans"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Footer - Wider than form */}
        <div className="w-full max-w-4xl mt-8 px-4">
          <div className="border-t border-gray-200 pt-6">
            <div className="text-xs text-dark-base/50 space-y-2 font-sans">
              <p className="font-semibold mb-2">Risk Statement:</p>
              <p>
                A trading amount in derivatives may mean Trader may lose an amount even greater than their original trading amount. Anyone wishing to Trade in any of the products mentioned in www.solitaireprime.com should seek their own financial or professional advice. Trading of securities, forex, stock market, commodities, options and futures may not be suitable for everyone and involves the risk of losing part or all of your money. Trading in the financial markets has large potential rewards, but also large potential risk. You must be aware of the risks and be willing to accept them in order to Trade in the markets. Don't trade with money which you can't afford to lose. Forex Trading are not allowed in some countries, before trading your money, make sure whether your country is allowing this or not. You are strongly advised to obtain independent financial, legal and tax advice before proceeding with any currency or spot metals trade. Nothing in this site should be read or construed as constituting advice on the part of Solitaire Prime Limited. or any of its affiliates, directors, officers or employees.
              </p>
              <p className="font-semibold mt-3 mb-2">Restricted Regions:</p>
              <p>
                Solitaire Prime Limited. does not provide services for citizens/residents of the United States, Cuba, Iraq, Myanmar, North Korea, Sudan. The services of Solitaire Prime Limited. are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.
              </p>
              <p className="mt-3">
                Solitaire Prime Limited. Registration Number: 2025-00567. Registered Address: Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia. Our dedicated team of experts is always ready to assist you with any questions or concerns you may have. Whether you need support or have inquiries, we're just a message away. Email: support@solitaireprime.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
