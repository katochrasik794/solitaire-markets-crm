import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [currentPage, setCurrentPage] = useState(1) // 1 = country selection, 2 = registration form
  const [country, setCountry] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+91',
    phoneNumber: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [usTaxChecked, setUsTaxChecked] = useState(true)
  const [languageOpen, setLanguageOpen] = useState(false)
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

  const countries = [
    { name: 'India', flag: '🇮🇳' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'South Africa', flag: '🇿🇦' }
  ]

  const handleCountrySubmit = (e) => {
    e.preventDefault()
    if (!country) {
      alert('Please select a country')
      return
    }
    setCurrentPage(2)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert('Please fill in all required fields')
      return
    }
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }
    // Redirect to home
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div>
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="h-8 w-auto"
            style={{ filter: 'none' }}
          />
        </div>
        
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
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Registration
          </h1>

          {/* Page 1: Country Selection */}
          {currentPage === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleCountrySubmit}>
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    What is your country / region of residence?
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent appearance-none"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    >
                      <option value="">Select Country / Region of Residence</option>
                      {countries.map((countryOption) => (
                        <option key={countryOption.name} value={countryOption.name}>
                          {countryOption.flag} {countryOption.name}
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
                  className="w-full bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 py-3 rounded-lg transition-colors font-semibold uppercase mt-6"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                >
                  CONTINUE
                </button>
              </form>
            </div>
          )}

          {/* Page 2: Registration Form */}
          {currentPage === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Selected Country Display */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Selected Country:
                  </p>
                  <p className="text-base font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {countries.find(c => c.name === country)?.flag} {country}
                  </p>
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="As per your Passport / Government ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="As per your Passport / Government ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent appearance-none"
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="flex-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Create your account password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Account Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent pr-10"
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
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    This password will be used to login to your MetaTrader trading account and the MyEquiti Client Portal.
                  </p>
                </div>

                {/* US Tax Checkbox */}
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={usTaxChecked}
                      onChange={(e) => setUsTaxChecked(e.target.checked)}
                      className="w-4 h-4 text-[#ffd700] border-gray-300 rounded focus:ring-[#ffd700] mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      I declare and confirm that I am not a citizen or resident of the US for tax purposes.
                    </span>
                  </label>
                </div>

                {/* reCAPTCHA */}
                <div className="border border-gray-300 rounded p-4 bg-gray-50">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      I'm not a robot
                    </span>
                  </label>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span>reCAPTCHA</span>
                    <span>Privacy</span>
                    <span>-</span>
                    <span>Terms</span>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  className="w-full bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 py-3 rounded-lg transition-colors font-semibold uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                >
                  CONTINUE
                </button>

                {/* Legal Text */}
                <div className="text-xs text-gray-600 space-y-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <p>
                    Based on the selected country of residence, you are registering with Equiti, regulated by the Seychelles FSA. By clicking Continue you confirm that you have read, understood, and agree with all the information in the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">Client Agreement</a>.
                  </p>
                  <p>
                    Equiti Brokerage (Seychelles) Limited is authorized by the Financial Services Authority of Seychelles under license number SD064 as a Securities Dealers Broker.
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
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
