import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.js'
import AuthLoader from '../../components/AuthLoader.jsx'
import Toast from '../../components/Toast.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function CreateAccount() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    platform: 'MT5',
    accountType: 'standard',
    currency: 'USD',
    isSwapFree: false,
    isCopyAccount: false,
    reasonForAccount: 'Different trading strategy',
    portalPassword: ''
  })

  const [createdAccount, setCreatedAccount] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = authService.getToken()
      if (!token) {
        navigate('/login')
        return
      }

      // Minimum 3 seconds loading time for beautiful animation
      const [response] = await Promise.all([
        fetch(`${API_BASE_URL}/accounts/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            platform: formData.platform,
            accountType: formData.accountType,
            currency: formData.currency,
            isSwapFree: formData.isSwapFree,
            isCopyAccount: formData.isCopyAccount,
            reasonForAccount: formData.reasonForAccount,
            portalPassword: formData.portalPassword
          })
        }),
        new Promise(resolve => setTimeout(resolve, 3000))
      ])

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account')
      }

      if (data.success) {
        setCreatedAccount(data.data)
        setCurrentStep(2)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      setToast({
        message: err.message || 'Failed to create account. Please try again.',
        type: 'error'
      })
    }
  }

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' }
  ]

  const reasons = [
    'Different trading strategy',
    'Testing new platform',
    'Separate investment goals',
    'Risk management',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {loading && <AuthLoader message="Creating account..." />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => navigate('/user/platforms')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>

        {/* Step 1: Create Account Form */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Create a new live account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Platform
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="platform"
                      value="MT5"
                      checked={formData.platform === 'MT5'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-1 transition-all ${
                      formData.platform === 'MT5'
                        ? 'border-[#e6c200] bg-[#e6c200] bg-opacity-5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-4">
                        <img 
                          src="/mt_5.png" 
                          alt="MetaTrader 5" 
                          className="w-40 h-40 object-contain flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          MetaTrader 5
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Account Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Standard */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="standard"
                      checked={formData.accountType === 'standard'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 transition-all ${
                      formData.accountType === 'standard'
                        ? 'border-[#e6c200] bg-[#e6c200] bg-opacity-5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-4 h-4 rounded-full ${
                          formData.accountType === 'standard' ? 'bg-[#e6c200]' : 'bg-gray-300'
                        }`}></div>
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Standard</span>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 ml-11" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <li>• No minimum deposit</li>
                        <li>• Average spreads of 1.4 pips</li>
                        <li>• $0 Commission</li>
                      </ul>
                    </div>
                  </label>

                  {/* Premier */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="premier"
                      checked={formData.accountType === 'premier'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 transition-all ${
                      formData.accountType === 'premier'
                        ? 'border-[#e6c200] bg-[#e6c200] bg-opacity-5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-4 h-4 rounded-full ${
                          formData.accountType === 'premier' ? 'bg-[#e6c200]' : 'bg-gray-300'
                        }`}></div>
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Premier</span>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 ml-11" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <li>• Deposits from $100</li>
                        <li>• Spreads from 0.0 pips</li>
                        <li>• $7/lot commission</li>
                      </ul>
                    </div>
                  </label>
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e6c200] focus:border-transparent"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code} {curr.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Free Account */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Swap Free Account
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isSwapFree"
                      checked={formData.isSwapFree}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e6c200] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4b000]"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  By selecting Swap Free Account you agree to the{' '}
                  <a href="#" className="text-[#e6c200] hover:underline">Terms and Conditions for Swap Free accounts</a>.
                  Swap Free Accounts are subject to a maximum leverage of 1:500.
                </p>
              </div>

              {/* Equiti Copy Account */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Equiti Copy Account
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isCopyAccount"
                      checked={formData.isCopyAccount}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e6c200] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4b000]"></div>
                  </label>
                </div>
              </div>

              {/* Reason for opening */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Reason for opening an additional account:
                </label>
                <select
                  name="reasonForAccount"
                  value={formData.reasonForAccount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e6c200] focus:border-transparent"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                >
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Portal Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Portal Password
                </label>
                <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  For added security we require you to confirm your Portal password.
                </p>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="portalPassword"
                    value={formData.portalPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e6c200] focus:border-transparent pr-10"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    placeholder="Enter your portal password"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4b000] hover:bg-[#c2a000] text-gray-900 py-3 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Account Created Success */}
        {currentStep === 2 && createdAccount && (
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#dff8f4] rounded-full mb-4">
                <svg className="w-10 h-10 text-[#d4b000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Account Created
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Congratulations, you've successfully created an additional trading account and can now start trading. Check below for your account details.
              </p>
            </div>

            {/* Account Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-4 text-left">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Trading account:</span>
                  <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>{createdAccount.account_number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Trading server:</span>
                  <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>{createdAccount.trading_server}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Password:</span>
                  <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>Please use your Portal password</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              We've also sent you an email with these details.
            </p>

            <button
              onClick={() => navigate('/user/dashboard')}
              className="w-full bg-[#d4b000] hover:bg-[#c2a000] text-gray-900 py-3 rounded-lg transition-colors font-semibold"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
            >
              To Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateAccount

