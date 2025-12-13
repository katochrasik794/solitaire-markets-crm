import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/auth.js'
import AuthLoader from '../components/AuthLoader.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Register() {
  const [currentPage, setCurrentPage] = useState(1) // 1 = country selection, 2 = registration form
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesLoading, setCountriesLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [usTaxChecked, setUsTaxChecked] = useState(true)
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

  // Fetch countries from database on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesLoading(true)
        const response = await fetch(`${API_BASE_URL}/countries?active_only=true`)
        const data = await response.json()

        if (data.success && data.data) {
          setCountries(data.data)
          // Set default phone code if countries are loaded
          if (data.data.length > 0 && !formData.phoneCode) {
            setFormData(prev => ({
              ...prev,
              phoneCode: data.data[0].phone_code
            }))
          }
        }
      } catch (err) {
        console.error('Error fetching countries:', err)
        setError('Failed to load countries. Please refresh the page.')
      } finally {
        setCountriesLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const handleCountrySubmit = (e) => {
    e.preventDefault()
    if (!country) {
      alert('Please select a country')
      return
    }
    // Auto-set phone code based on selected country
    const selectedCountry = countries.find(c => c.name === country)
    if (selectedCountry) {
      setFormData({
        ...formData,
        phoneCode: selectedCountry.phone_code
      })
    }
    setCurrentPage(2)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)

    try {
      const registrationData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneCode: formData.phoneCode,
        phoneNumber: formData.phoneNumber,
        country: country
      }

      // Minimum 3 seconds loading time for beautiful animation
      const [result] = await Promise.all([
        authService.register(registrationData),
        new Promise(resolve => setTimeout(resolve, 3000))
      ])

      if (result.success) {
        // Auto-login after successful registration
        navigate('/user/dashboard')
      }
    } catch (err) {
      // Handle validation errors from backend
      if (err.message && err.message.includes('Validation failed')) {
        setError(err.message)
      } else if (err.message && err.message.includes('already exists')) {
        setError('An account with this email already exists')
      } else {
        setError(err.message || 'Registration failed. Please try again.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Loading Animation */}
      {loading && <AuthLoader message="Creating your account..." />}
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div>
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-20 w-auto mr-10"
            style={{ filter: 'none' }}
          />
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="flex items-center gap-2 text-dark-base/70 hover:text-dark-base font-sans text-sm font-normal"
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
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-3xl font-bold text-dark-base text-center mb-6 font-heading">
            Registration
          </h1>

          {/* Page 1: Country Selection */}
          {currentPage === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              {countriesLoading ? (
                <div className="text-center py-8">
                  <p className="text-dark-base/60 font-sans">Loading countries...</p>
                </div>
              ) : (
                <form onSubmit={handleCountrySubmit}>
                  <div>
                    <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                      What is your country / region of residence?
                    </label>
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none font-sans text-sm"
                        disabled={countriesLoading}
                      >
                        <option value="">Select Country / Region of Residence</option>
                        {countries.map((countryOption) => (
                          <option key={countryOption.id} value={countryOption.name}>
                            {countryOption.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={countriesLoading || !country}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base border border-brand-500 py-3 rounded-lg transition-colors font-semibold uppercase mt-6 disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
                  >
                    CONTINUE
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Page 2: Registration Form */}
          {currentPage === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Selected Country Display - Read Only */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Country / Region of Residence
                  </label>
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed">
                    <p className="text-base font-normal text-dark-base font-sans">
                      {country}
                    </p>
                  </div>
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="As per your Passport / Government ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-sans text-sm"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="As per your Passport / Government ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-sans text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-sans text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    {/* Phone Code - Read Only (from selected country) */}
                    <div className="flex-1">
                      <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed">
                        <p className="text-base font-normal text-dark-base font-sans">
                          {formData.phoneCode || 'N/A'}
                        </p>
                      </div>
                    </div>
                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-sans text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Create your account password
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Account Password"
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
                  <p className="text-xs text-dark-base/50 mt-1 font-sans">
                    This password will be used to login to your MetaTrader trading account and the MySolitaire Markets Client Portal.
                  </p>
                </div>

                {/* US Tax Checkbox */}
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={usTaxChecked}
                      onChange={(e) => setUsTaxChecked(e.target.checked)}
                      className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 mt-1"
                    />
                    <span className="ml-2 text-sm text-dark-base/70 font-sans">
                      I declare and confirm that I am not a citizen or resident of the US for tax purposes.
                    </span>
                  </label>
                </div>


                {/* Continue Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base border border-brand-500 py-3 rounded-lg transition-colors font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
                >
                  {loading ? 'Registering...' : 'CONTINUE'}
                </button>

                {/* Legal Text */}
                <div className="text-xs text-dark-base/50 space-y-2 font-sans">
                  <p>
                    Based on the selected country of residence, you are registering with Solitaire Markets, regulated by the Seychelles FSA. By clicking Continue you confirm that you have read, understood, and agree with all the information in the{' '}
                    <a href="#" className="text-brand-700 hover:text-brand-800 underline">Client Agreement</a>.
                  </p>
                  <p>
                    Solitaire Markets Brokerage (Seychelles) Limited is authorized by the Financial Services Authority of Seychelles under license number SD064 as a Securities Dealers Broker.
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-dark-base/70 font-sans">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-700 hover:text-brand-800 font-medium font-sans">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
