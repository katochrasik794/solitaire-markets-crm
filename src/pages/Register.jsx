import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import authService from '../services/auth.js'
import AuthLoader from '../components/AuthLoader.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Register() {
  const [currentPage, setCurrentPage] = useState(1) // 1 = country selection, 2 = registration form, 3 = OTP verification
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesLoading, setCountriesLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [usTaxChecked, setUsTaxChecked] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpInputRefs = useRef([])
  const [verifying, setVerifying] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isRegisterPage = location.pathname === '/register' || location.pathname.startsWith('/register')

  // Character limits
  const CHAR_LIMITS = {
    firstName: 15,
    lastName: 15,
    email: 60,
    phoneNumber: 15
  }

  // Password requirements validation
  const validatePasswordRequirements = (password) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  }

  const passwordRequirements = validatePasswordRequirements(formData.password)
  const allPasswordRequirementsMet = Object.values(passwordRequirements).every(req => req === true)

  // Enhanced email validation with spam detection
  const validateEmailAdvanced = (email) => {
    if (!email || !email.trim()) {
      return { valid: false, message: 'Email is required', status: 'bad' }
    }

    const trimmedEmail = email.trim().toLowerCase()

    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return { valid: false, message: 'Invalid email format', status: 'bad' }
    }

    // Check length (60 characters max)
    if (trimmedEmail.length > 60) {
      return { valid: false, message: 'Email must be 60 characters or less', status: 'bad' }
    }

    // Split email into local and domain parts
    const [localPart, domain] = trimmedEmail.split('@')

    if (!domain || domain.length < 4) {
      return { valid: false, message: 'Invalid email domain', status: 'bad' }
    }

    // Check for spammy patterns
    const spamPatterns = [
      /^[0-9]+@/, // Starts with only numbers
      /@[0-9]+\.[a-z]+$/, // Domain is mostly numbers
      /(.)\1{4,}/, // Repeated characters (aaaaa, 11111)
      /^[0-9]{8,}@/, // Local part starts with 8+ consecutive numbers (very suspicious)
      /@(test|temp|fake|spam|trash|throwaway|disposable)/, // Suspicious domain keywords
      /@[a-z]{1,2}\.[a-z]{1,2}$/, // Very short domain (a.b)
    ]

    for (const pattern of spamPatterns) {
      if (pattern.test(trimmedEmail)) {
        return { valid: false, message: 'Please use a valid email address', status: 'bad' }
      }
    }

    // Check for suspicious local part
    if (localPart.match(/^[0-9]+$/) || localPart.length < 2) {
      return { valid: false, message: 'Please use a valid email address', status: 'bad' }
    }

    // Check for common disposable email domains
    const disposableDomains = [
      'tempmail.com', '10minutemail.com', 'guerrillamail.com',
      'mailinator.com', 'throwaway.email', 'trashmail.com'
    ]
    
    if (disposableDomains.some(d => trimmedEmail.includes(d))) {
      return { valid: false, message: 'Disposable email addresses are not allowed', status: 'bad' }
    }

    // Check TLD validity
    const parts = domain.split('.')
    const tld = parts[parts.length - 1]
    if (!tld || tld.length < 2) {
      return { valid: false, message: 'Invalid email domain', status: 'bad' }
    }

    // Good email - check if it looks professional
    const professionalDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'protonmail.com']
    const isProfessional = professionalDomains.some(d => domain.includes(d))
    const hasGoodLocalPart = localPart.length >= 3 && /^[a-z]/.test(localPart)

    if (isProfessional && hasGoodLocalPart) {
      return { valid: true, message: '', status: 'great' }
    } else if (hasGoodLocalPart && domain.length >= 5) {
      return { valid: true, message: '', status: 'good' }
    } else {
      return { valid: true, message: '', status: 'good' }
    }
  }

  // Get field status for visual feedback
  const getFieldStatus = (name, value) => {
    if (!value || !value.trim()) {
      return { status: 'bad', message: '' }
    }

    switch (name) {
      case 'firstName':
        if (value.length > CHAR_LIMITS.firstName) {
          return { status: 'bad', message: `Must be ${CHAR_LIMITS.firstName} characters or less` }
        }
        if (value.length >= 2 && value.length <= CHAR_LIMITS.firstName) {
          return { status: value.length >= 3 ? 'great' : 'good', message: '' }
        }
        return { status: 'bad', message: 'First name is required' }

      case 'lastName':
        if (value.length > CHAR_LIMITS.lastName) {
          return { status: 'bad', message: `Must be ${CHAR_LIMITS.lastName} characters or less` }
        }
        if (value.length >= 2 && value.length <= CHAR_LIMITS.lastName) {
          return { status: value.length >= 3 ? 'great' : 'good', message: '' }
        }
        return { status: 'bad', message: 'Last name is required' }

      case 'email':
        const emailValidation = validateEmailAdvanced(value)
        return { status: emailValidation.status, message: emailValidation.message }

      case 'phoneNumber':
        if (value.length > CHAR_LIMITS.phoneNumber) {
          return { status: 'bad', message: `Must be ${CHAR_LIMITS.phoneNumber} characters or less` }
        }
        if (value.length >= 10 && value.length <= CHAR_LIMITS.phoneNumber) {
          return { status: 'great', message: '' }
        }
        if (value.length > 0 && value.length < 10) {
          return { status: 'good', message: '' }
        }
        return { status: 'bad', message: '' }

      case 'password':
        if (allPasswordRequirementsMet) {
          return { status: 'great', message: '' }
        }
        if (value.length >= 6) {
          return { status: 'good', message: '' }
        }
        return { status: 'bad', message: '' }

      case 'confirmPassword':
        if (value === formData.password && formData.password) {
          return { status: 'great', message: '' }
        }
        if (value && value !== formData.password) {
          return { status: 'bad', message: 'Passwords do not match' }
        }
        return { status: 'bad', message: '' }

      default:
        return { status: 'bad', message: '' }
    }
  }

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

  // Real-time validation
  const validateField = (name, value) => {
    const errors = { ...fieldErrors }
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          errors.firstName = 'First name is required'
        } else if (value.length > CHAR_LIMITS.firstName) {
          errors.firstName = `First name must be ${CHAR_LIMITS.firstName} characters or less`
        } else {
          delete errors.firstName
        }
        break
      
      case 'lastName':
        if (!value.trim()) {
          errors.lastName = 'Last name is required'
        } else if (value.length > CHAR_LIMITS.lastName) {
          errors.lastName = `Last name must be ${CHAR_LIMITS.lastName} characters or less`
        } else {
          delete errors.lastName
        }
        break
      
      case 'email':
        const emailValidation = validateEmailAdvanced(value)
        if (!emailValidation.valid) {
          errors.email = emailValidation.message
        } else {
          delete errors.email
        }
        break
      
      case 'phoneNumber':
        if (value && value.length > CHAR_LIMITS.phoneNumber) {
          errors.phoneNumber = `Phone number must be ${CHAR_LIMITS.phoneNumber} characters or less`
        } else {
          delete errors.phoneNumber
        }
        break
      
      case 'password':
        if (!value) {
          errors.password = 'Password is required'
        } else if (!allPasswordRequirementsMet) {
          errors.password = 'Password does not meet all requirements'
        } else {
          delete errors.password
        }
        break
      
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password'
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match'
        } else {
          delete errors.confirmPassword
        }
        break
    }
    
    setFieldErrors(errors)
  }

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
    const { name, value } = e.target
    let newValue = value

    // Enforce character limits
    if (name === 'firstName' && value.length > CHAR_LIMITS.firstName) {
      newValue = value.slice(0, CHAR_LIMITS.firstName)
    } else if (name === 'lastName' && value.length > CHAR_LIMITS.lastName) {
      newValue = value.slice(0, CHAR_LIMITS.lastName)
    } else if (name === 'email' && value.length > CHAR_LIMITS.email) {
      newValue = value.slice(0, CHAR_LIMITS.email)
    } else if (name === 'phoneNumber' && value.length > CHAR_LIMITS.phoneNumber) {
      newValue = value.slice(0, CHAR_LIMITS.phoneNumber)
    }

    setFormData({
      ...formData,
      [name]: newValue
    })

    // Real-time validation
    validateField(name, newValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate all fields
    validateField('firstName', formData.firstName)
    validateField('lastName', formData.lastName)
    validateField('email', formData.email)
    validateField('phoneNumber', formData.phoneNumber)
    validateField('password', formData.password)
    validateField('confirmPassword', formData.confirmPassword)

    // Check if there are any errors
    if (Object.keys(fieldErrors).length > 0) {
      setError('Please fix the errors in the form')
      return
    }

    // Final validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    if (!allPasswordRequirementsMet) {
      setError('Password does not meet all requirements')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!usTaxChecked) {
      setError('You must confirm that you are not a US citizen or resident')
      return
    }

    setLoading(true)

    try {
      const registrationData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phoneCode: formData.phoneCode,
        phoneNumber: formData.phoneNumber.trim(),
        country: country
      }

      // Send OTP instead of directly registering
      const response = await fetch(`${API_BASE_URL}/auth/send-registration-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      })

      const result = await response.json()

      if (result.success) {
        // Move to OTP verification page
        setCurrentPage(3)
        // Initialize OTP input refs
        otpInputRefs.current = Array(6).fill(null).map(() => null)
        // Focus first input after a short delay
        setTimeout(() => {
          if (otpInputRefs.current[0]) {
            otpInputRefs.current[0].focus()
          }
        }, 100)
      } else {
        setError(result.message || 'Failed to send OTP. Please try again.')
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      if (otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1].focus()
      }
    }
  }

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      if (otpInputRefs.current[index - 1]) {
        otpInputRefs.current[index - 1].focus()
      }
    }
  }

  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      if (otpInputRefs.current[5]) {
        otpInputRefs.current[5].focus()
      }
    }
  }

  // Verify OTP and complete registration
  const handleVerifyOtp = async () => {
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP')
      return
    }

    setVerifying(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-registration-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          otp: otpString
        })
      })

      const result = await response.json()

      if (result.success) {
        // Store token and user data
        if (result.data.token) {
          localStorage.setItem('token', result.data.token)
        }
        // Auto-login after successful registration
        navigate('/user/dashboard')
      } else {
        setError(result.message || 'Invalid OTP. Please try again.')
        // Clear OTP on error
        setOtp(['', '', '', '', '', ''])
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus()
        }
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.')
      setOtp(['', '', '', '', '', ''])
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus()
      }
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Loading Animation */}
      {loading && <AuthLoader message="Creating your account..." />}
      
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Header with Logo and Navigation Tabs */}
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

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className={`font-sans text-base transition-colors ${
                !isRegisterPage
                  ? 'text-dark-base font-semibold border-b-2 border-dark-base pb-1'
                  : 'text-dark-base/50 hover:text-dark-base'
              }`}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className={`font-sans text-base transition-colors ${
                isRegisterPage
                  ? 'text-dark-base font-semibold border-b-2 border-dark-base pb-1'
                  : 'text-dark-base/50 hover:text-dark-base'
              }`}
            >
              Create an account
            </Link>
            </div>
        </div>
        <div className="w-full max-w-lg">

          {/* Page 1: Country Selection */}
          {currentPage === 1 && (
            <div className="p-6 w-full max-w-lg">
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
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-brand-500 focus:border-brand-500 appearance-none font-sans text-sm transition-colors"
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
            <div className="p-6 w-full">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Selected Country Display - Read Only */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Country / Region of Residence
                  </label>
                  <div className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed">
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
                    onBlur={() => validateField('firstName', formData.firstName)}
                    placeholder="As per your Passport / Government ID"
                    className={`w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-sans text-sm transition-colors ${
                      fieldErrors.firstName ? 'bg-red-50 border-red-300' : ''
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-1">
                      {(() => {
                        const status = getFieldStatus('firstName', formData.firstName)
                        if (status.status === 'great') {
                          return <span className="text-xs text-green-600 font-sans">✓ Looks great</span>
                        } else if (status.status === 'good') {
                          return <span className="text-xs text-blue-600 font-sans">Good</span>
                        } else if (status.status === 'bad' && formData.firstName) {
                          return <span className="text-xs text-red-600 font-sans">{status.message || 'Bad'}</span>
                        }
                        return <span className="text-xs text-red-600 font-sans">{fieldErrors.firstName || ''}</span>
                      })()}
                    </div>
                    <span className="text-xs text-dark-base/50 font-sans">
                      {formData.firstName.length}/{CHAR_LIMITS.firstName} characters
                    </span>
                  </div>
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
                    onBlur={() => validateField('lastName', formData.lastName)}
                    placeholder="As per your Passport / Government ID"
                    className={`w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-sans text-sm transition-colors ${
                      fieldErrors.lastName ? 'bg-red-50 border-red-300' : ''
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-1">
                      {(() => {
                        const status = getFieldStatus('lastName', formData.lastName)
                        if (status.status === 'great') {
                          return <span className="text-xs text-green-600 font-sans">✓ Looks great</span>
                        } else if (status.status === 'good') {
                          return <span className="text-xs text-blue-600 font-sans">Good</span>
                        } else if (status.status === 'bad' && formData.lastName) {
                          return <span className="text-xs text-red-600 font-sans">{status.message || 'Bad'}</span>
                        }
                        return <span className="text-xs text-red-600 font-sans">{fieldErrors.lastName || ''}</span>
                      })()}
                    </div>
                    <span className="text-xs text-dark-base/50 font-sans">
                      {formData.lastName.length}/{CHAR_LIMITS.lastName} characters
                    </span>
                  </div>
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
                    onBlur={() => validateField('email', formData.email)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-sans text-sm transition-colors ${
                      fieldErrors.email ? 'bg-red-50 border-red-300' : (() => {
                        const status = getFieldStatus('email', formData.email)
                        return status.status === 'great' ? 'bg-green-50 border-green-300' : status.status === 'good' ? 'bg-blue-50 border-blue-300' : ''
                      })()
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-1">
                      {(() => {
                        const status = getFieldStatus('email', formData.email)
                        if (status.status === 'great') {
                          return <span className="text-xs text-green-600 font-sans">✓ Looks great</span>
                        } else if (status.status === 'good') {
                          return <span className="text-xs text-blue-600 font-sans">Good</span>
                        } else if (status.status === 'bad' && formData.email) {
                          return <span className="text-xs text-red-600 font-sans">{status.message || 'Bad'}</span>
                        }
                        return <span className="text-xs text-red-600 font-sans">{fieldErrors.email || ''}</span>
                      })()}
                    </div>
                    <span className="text-xs text-dark-base/50 font-sans">
                      {formData.email.length}/{CHAR_LIMITS.email} characters
                    </span>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Phone
                  </label>
                  <div className="flex gap-2 items-center">
                    {/* Phone Code Dropdown */}
                    <div className="relative" style={{ minWidth: '120px' }}>
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            phoneCode: e.target.value
                          })
                        }}
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 appearance-none font-sans text-sm transition-colors"
                      >
                        {countries.map((countryOption) => (
                          <option key={countryOption.id} value={countryOption.phone_code}>
                            {countryOption.phone_code}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {/* Phone Number Input with Character Counter */}
                    <div className="flex-1 flex items-center gap-2">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                        onBlur={() => validateField('phoneNumber', formData.phoneNumber)}
                        placeholder="Phone number"
                        className={`flex-1 px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-sans text-sm transition-colors ${
                          fieldErrors.phoneNumber ? 'bg-red-50 border-red-300' : (() => {
                            const status = getFieldStatus('phoneNumber', formData.phoneNumber)
                            return status.status === 'great' ? 'bg-green-50 border-green-300' : ''
                          })()
                        }`}
                      />
                      <span className="text-xs text-dark-base/50 font-sans whitespace-nowrap">
                        {formData.phoneNumber.length} / {CHAR_LIMITS.phoneNumber} characters
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">
                    {(() => {
                      const status = getFieldStatus('phoneNumber', formData.phoneNumber)
                      if (status.status === 'great') {
                        return <span className="text-xs text-green-600 font-sans">✓ Looks great</span>
                      } else if (status.status === 'good') {
                        return <span className="text-xs text-blue-600 font-sans">Good</span>
                      } else if (status.status === 'bad' && formData.phoneNumber) {
                        return <span className="text-xs text-red-600 font-sans">{status.message || 'Bad'}</span>
                      }
                      return <span className="text-xs text-red-600 font-sans">{fieldErrors.phoneNumber || ''}</span>
                    })()}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Create your account password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => validateField('password', formData.password)}
                      placeholder="Enter password"
                      required
                      disabled={loading}
                    className={`w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-brand-500 focus:border-brand-500 pr-10 disabled:bg-gray-100 font-sans text-sm transition-colors ${
                      fieldErrors.password ? 'bg-red-50 border-red-300' : allPasswordRequirementsMet ? 'bg-green-50 border-green-300' : ''
                    }`}
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
                  
                  {/* Password Requirements Box */}
                  {formData.password && (
                    <div className="mt-2 p-3 bg-neutral-50 border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-dark-base mb-2 font-sans">Enter a password</p>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                            passwordRequirements.minLength ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {passwordRequirements.minLength && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-sans ${passwordRequirements.minLength ? 'text-green-700' : 'text-dark-base/70'}`}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                            passwordRequirements.hasUppercase ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {passwordRequirements.hasUppercase && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-sans ${passwordRequirements.hasUppercase ? 'text-green-700' : 'text-dark-base/70'}`}>
                            One uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                            passwordRequirements.hasLowercase ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {passwordRequirements.hasLowercase && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-sans ${passwordRequirements.hasLowercase ? 'text-green-700' : 'text-dark-base/70'}`}>
                            One lowercase letter
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                            passwordRequirements.hasNumber ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {passwordRequirements.hasNumber && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-sans ${passwordRequirements.hasNumber ? 'text-green-700' : 'text-dark-base/70'}`}>
                            One number
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                            passwordRequirements.hasSpecialChar ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {passwordRequirements.hasSpecialChar && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-sans ${passwordRequirements.hasSpecialChar ? 'text-green-700' : 'text-dark-base/70'}`}>
                            One special character
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-1">
                    {(() => {
                      const status = getFieldStatus('password', formData.password)
                      if (status.status === 'great') {
                        return <span className="text-xs text-green-600 font-sans">✓ Looks great</span>
                      } else if (status.status === 'good') {
                        return <span className="text-xs text-blue-600 font-sans">Good</span>
                      } else if (status.status === 'bad' && formData.password) {
                        return <span className="text-xs text-red-600 font-sans">{fieldErrors.password || 'Bad'}</span>
                      }
                      return null
                    })()}
                  </div>
                  
                  <p className="text-xs text-dark-base/50 mt-1 font-sans">
                    This password will be used to login to your MetaTrader trading account and the MySolitaire Markets Client Portal.
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-normal text-dark-base/70 mb-2 font-sans">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
                      placeholder="Confirm password"
                      required
                      disabled={loading}
                      className={`w-full px-4 py-2.5 bg-neutral-50 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-brand-500 focus:border-brand-500 pr-10 disabled:bg-gray-100 font-sans text-sm transition-colors ${
                        fieldErrors.confirmPassword ? 'bg-red-50 border-red-300' : formData.confirmPassword === formData.password && formData.password ? 'bg-green-50 border-green-300' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
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
                  <div className="mt-1">
                    {(() => {
                      const status = getFieldStatus('confirmPassword', formData.confirmPassword)
                      if (status.status === 'great') {
                        return <span className="text-xs text-green-600 font-sans">✓ Looks great</span>
                      } else if (status.status === 'good') {
                        return <span className="text-xs text-blue-600 font-sans">Good</span>
                      } else if (status.status === 'bad' && formData.confirmPassword) {
                        return <span className="text-xs text-red-600 font-sans">{status.message || fieldErrors.confirmPassword || 'Bad'}</span>
                      }
                      return null
                    })()}
                  </div>
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
                  disabled={loading || !allPasswordRequirementsMet || !usTaxChecked}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base border border-brand-500 py-3 rounded-lg transition-colors font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
                >
                  {loading ? 'Sending OTP...' : 'CONTINUE'}
                </button>

              </form>
            </div>
          )}

          {/* Page 3: OTP Verification */}
          {currentPage === 3 && (
            <div className="p-6 w-full">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {error}
                  </p>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-dark-base mb-3 font-sans">Verify Your Email</h2>
                <p className="text-dark-base/70 text-sm mb-2 font-sans">
                  OTP has been sent on your <strong className="font-bold text-dark-base">{formData.email}</strong>
                </p>
                <p className="text-dark-base/60 text-xs font-sans">
                  Please verify to activate your account
                </p>
              </div>

              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-sans"
                    style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '24px',
                      letterSpacing: '0',
                    }}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOtp}
                disabled={verifying || otp.join('').length !== 6}
                className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base border border-brand-500 py-3 rounded-lg transition-colors font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
              >
                {verifying ? 'Verifying...' : 'VERIFY & CONTINUE'}
              </button>

              {/* Resend OTP */}
              <div className="text-center mt-4">
                <button
                  onClick={async () => {
                    setError('')
                    setOtp(['', '', '', '', '', ''])
                    setLoading(true)
                    try {
                      const registrationData = {
                        email: formData.email.trim().toLowerCase(),
                        password: formData.password,
                        firstName: formData.firstName.trim(),
                        lastName: formData.lastName.trim(),
                        phoneCode: formData.phoneCode,
                        phoneNumber: formData.phoneNumber.trim(),
                        country: country
                      }
                      const response = await fetch(`${API_BASE_URL}/auth/send-registration-otp`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(registrationData)
                      })
                      const result = await response.json()
                      if (result.success) {
                        if (otpInputRefs.current[0]) {
                          otpInputRefs.current[0].focus()
                        }
                      } else {
                        setError(result.message || 'Failed to resend OTP')
                      }
                    } catch (err) {
                      setError('Failed to resend OTP. Please try again.')
                    } finally {
                      setLoading(false)
                    }
                  }}
                  disabled={loading}
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium font-sans disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

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

export default Register
