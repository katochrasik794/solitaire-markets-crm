import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.js'
import AuthLoader from '../../components/AuthLoader.jsx'
import Toast from '../../components/Toast.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Verification() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1) // 1 = profile form, 2 = document upload
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [kycStatus, setKycStatus] = useState(null)
  const [toast, setToast] = useState(null)
  const [sumsubInitialized, setSumsubInitialized] = useState(false)
  const [sumsubAccessToken, setSumsubAccessToken] = useState(null)
  const [sumsubApplicantId, setSumsubApplicantId] = useState(null)
  const [sumsubStatus, setSumsubStatus] = useState(null)
  const sumsubContainerRef = useRef(null)
  const sumsubInstanceRef = useRef(null)
  
  const [formData, setFormData] = useState({
    hasTradingExperience: '',
    employmentStatus: '',
    annualIncome: '',
    totalNetWorth: '',
    sourceOfWealth: ''
  })

  const [documentData, setDocumentData] = useState({
    documentType: '',
    frontFile: null,
    backFile: null,
    frontPreview: null,
    backPreview: null
  })

  // Load Sumsub SDK script
  // Note: Sumsub SDK URL needs to be obtained from Sumsub dashboard
  // The SDK is typically loaded via their API or provided URL in dashboard
  useEffect(() => {
    const loadSumsubSDK = () => {
      if (window.snsml) {
        return Promise.resolve()
      }

      return new Promise((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="sumsub"]')
        if (existingScript && window.snsml) {
          resolve()
          return
        }

        // IMPORTANT: Sumsub SDK domain restriction
        // The 403 error occurs because your current domain (localhost) is not in the allowed domains
        // in your Sumsub dashboard. You need to:
        // 
        // SOLUTION 1: Add localhost to allowed domains (for development)
        // 1. Go to Sumsub Dashboard -> Your App -> Integration -> Web SDK
        // 2. In "Domains to host WebSDK" section, add: http://localhost:3000
        // 3. Click "Test and save"
        //
        // SOLUTION 2: Only load SDK in production (recommended)
        // The SDK will only work on https://portal.solitairemarkets.com/ which is already configured
        // For development, use manual verification fallback
        
        // Only try to load SDK if we're on the production domain or localhost is configured
        const currentHost = window.location.hostname
        const isProductionDomain = currentHost.includes('solitairemarkets.com')
        const isLocalhost = currentHost === 'localhost' || currentHost === '127.0.0.1'
        
        // Skip SDK loading if not on allowed domain (will use manual verification)
        if (!isProductionDomain && !isLocalhost) {
          reject(new Error('Domain not configured in Sumsub. Using manual verification.'))
          return
        }
        
        const script = document.createElement('script')
        // Use the standard Sumsub SDK URL
        // This will work once the domain is added to Sumsub dashboard
        script.src = 'https://static.sumsub.com/idensic/static/sns-web-sdk-build/sns-web-sdk-loader.js'
        script.async = true
        script.type = 'text/javascript'
        
        const timeout = setTimeout(() => {
          script.remove()
          reject(new Error('Sumsub SDK loading timeout. Please check the SDK URL in your Sumsub dashboard.'))
        }, 15000)

        script.onload = () => {
          clearTimeout(timeout)
          // Wait for snsml to be available (Sumsub SDK global object)
          const checkSnsml = setInterval(() => {
            if (window.snsml || window.SNSML) {
              // Some versions use SNSML instead of snsml
              if (window.SNSML && !window.snsml) {
                window.snsml = window.SNSML
              }
              clearInterval(checkSnsml)
              resolve()
            }
          }, 100)
          
          // Timeout after 5 seconds if snsml doesn't become available
          setTimeout(() => {
            clearInterval(checkSnsml)
            if (!window.snsml && !window.SNSML) {
              script.remove()
              reject(new Error('Sumsub SDK loaded but snsml object not found'))
            }
          }, 5000)
        }
        
        script.onerror = (error) => {
          clearTimeout(timeout)
          script.remove()
          console.error('Sumsub SDK loading error:', error)
          reject(new Error('Failed to load Sumsub SDK. Please check the SDK URL in your Sumsub dashboard or use manual verification.'))
        }
        
        document.head.appendChild(script)
      })
    }

    loadSumsubSDK().catch(err => {
      console.error('Error loading Sumsub SDK:', err)
      if (err.message.includes('403') || err.message.includes('Forbidden')) {
        console.warn(`
          ⚠️ Sumsub SDK blocked due to domain restriction.
          
          TO FIX:
          1. Go to Sumsub Dashboard: https://dashboard.sumsub.com
          2. Navigate to: Your App → Integration → Web SDK
          3. In "Domains to host WebSDK", add your development domain:
             - For localhost: http://localhost:3000
             - Or your staging domain if different
          4. Click "Test and save"
          
          For now, manual verification is available as fallback.
        `)
      } else {
        console.warn('Sumsub SDK failed to load. Manual verification will be available as fallback.')
      }
      // Don't set error state - allow fallback to manual verification
    })
  }, [])

  // Check existing KYC status and initialize Sumsub on mount
  useEffect(() => {
    const checkKYCStatusAndInitSumsub = async () => {
      try {
        const token = authService.getToken()
        if (!token) {
          navigate('/login')
          return
        }

        // Check KYC status
        try {
          const statusResponse = await fetch(`${API_BASE_URL}/kyc/status`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (statusResponse.ok) {
            const statusData = await statusResponse.json()
            if (statusData.success && statusData.data) {
              setKycStatus(statusData.data.status)
              setSumsubApplicantId(statusData.data.sumsub_applicant_id)
              setSumsubStatus(statusData.data.sumsub_verification_status)
              
              // If already approved, don't initialize Sumsub
              if (statusData.data.status === 'approved') {
                return
              }

              // If pending with Sumsub, try to get access token
              if (statusData.data.sumsub_applicant_id) {
                try {
                  const tokenResponse = await fetch(
                    `${API_BASE_URL}/kyc/sumsub/access-token/${statusData.data.sumsub_applicant_id}`,
                    {
                      headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    }
                  )
                  if (tokenResponse.ok) {
                    const tokenData = await tokenResponse.json()
                    if (tokenData.success) {
                      setSumsubAccessToken(tokenData.data.accessToken)
                      setSumsubApplicantId(tokenData.data.applicantId)
                      // Widget will be initialized when container is ready
                    }
                  }
                } catch (err) {
                  console.error('Error getting access token:', err)
                }
                return
              }
            }
          } else if (statusResponse.status === 401) {
            // Token expired or invalid
            console.error('Authentication failed, redirecting to login')
            navigate('/login')
            return
          }
        } catch (err) {
          console.error('Error checking KYC status:', err)
          // Continue with initialization even if status check fails
        }

        // If no Sumsub applicant exists, initialize Sumsub
        if (!sumsubAccessToken) {
          // Wait for SDK to load before initializing
          const waitForSDK = setInterval(() => {
            if (window.snsml) {
              clearInterval(waitForSDK)
              setLoading(true)
              fetch(`${API_BASE_URL}/kyc/sumsub/init`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
                .then(async (initResponse) => {
                  if (initResponse.ok) {
                    const initData = await initResponse.json()
                    if (initData.success) {
                      setSumsubAccessToken(initData.data.accessToken)
                      setSumsubApplicantId(initData.data.applicantId)
                      setSumsubInitialized(true)
                    }
                  } else {
                    const errorData = await initResponse.json().catch(() => ({}))
                    console.error('Failed to initialize Sumsub:', errorData)
                    // Don't show error - allow fallback to manual verification
                    // setError(errorData.message || 'Failed to initialize verification')
                  }
                })
                .catch((err) => {
                  console.error('Error initializing Sumsub:', err)
                  // Don't show error - allow fallback to manual verification
                  // setError('Failed to initialize verification. Please try again.')
                })
                .finally(() => {
                  setLoading(false)
                })
            }
          }, 100)

          // Timeout after 10 seconds
          setTimeout(() => {
            clearInterval(waitForSDK)
            if (!sumsubAccessToken) {
              setLoading(false)
              // Allow fallback to manual verification
            }
          }, 10000)
        }
      } catch (err) {
        console.error('Error checking KYC status:', err)
      }
    }

    // Wait for SDK to load before initializing, but don't block if it takes too long
    let checkSDK = null
    const timeout = setTimeout(() => {
      if (checkSDK) clearInterval(checkSDK)
      // Proceed even if SDK hasn't loaded (will use manual verification)
      checkKYCStatusAndInitSumsub()
    }, 5000) // 5 second timeout

    checkSDK = setInterval(() => {
      if (window.snsml) {
        clearInterval(checkSDK)
        clearTimeout(timeout)
        checkKYCStatusAndInitSumsub()
      }
    }, 100)

    return () => {
      if (checkSDK) clearInterval(checkSDK)
      clearTimeout(timeout)
    }
  }, [navigate])

  // Initialize widget when access token and container are ready
  useEffect(() => {
    if (sumsubAccessToken && sumsubContainerRef.current && window.snsml && !sumsubInstanceRef.current) {
      initializeSumsubWidget(sumsubAccessToken)
    }
  }, [sumsubAccessToken])

  // Initialize Sumsub widget
  const initializeSumsubWidget = (accessToken) => {
    if (!window.snsml) {
      console.warn('Sumsub SDK not loaded yet')
      return
    }

    if (!sumsubContainerRef.current) {
      console.warn('Sumsub container not ready yet')
      return
    }

    try {
      // Destroy existing instance if any
      if (sumsubInstanceRef.current) {
        try {
          sumsubInstanceRef.current.destroy()
        } catch (e) {
          console.warn('Error destroying previous Sumsub instance:', e)
        }
        sumsubInstanceRef.current = null
      }

      const snsml = window.snsml
      if (!snsml || typeof snsml.init !== 'function') {
        console.error('Sumsub SDK not properly initialized')
        return
      }

      const snsmlInstance = snsml.init(
        accessToken,
        () => {
          // Token expired callback - get new token
          refreshAccessToken()
        }
      )

      snsmlInstance.on('idCheck.onStepCompleted', (payload) => {
        console.log('Sumsub step completed:', payload)
        setSumsubStatus(payload.reviewStatus || 'pending')
      })

      snsmlInstance.on('idCheck.onApplicantSubmitted', (payload) => {
        console.log('Applicant submitted:', payload)
        setSumsubStatus('pending')
        setKycStatus('pending')
        setToast({
          message: 'Verification submitted successfully! Your documents are under review.',
          type: 'success'
        })
        // Check status after a delay
        setTimeout(() => {
          checkSumsubStatus()
        }, 2000)
      })

      snsmlInstance.on('idCheck.onReviewCompleted', (payload) => {
        console.log('Review completed:', payload)
        setSumsubStatus(payload.reviewStatus)
        if (payload.reviewResult === 'GREEN') {
          setKycStatus('approved')
          setToast({
            message: 'Verification approved! You can now make deposits without limitations.',
            type: 'success'
          })
        } else if (payload.reviewResult === 'RED') {
          setKycStatus('rejected')
          setToast({
            message: `Verification rejected: ${payload.reviewComment || 'Please try again.'}`,
            type: 'error'
          })
        }
      })

      snsmlInstance.on('idCheck.onError', (error) => {
        console.error('Sumsub error:', error)
        setError('Verification error occurred. Please try again.')
        setToast({
          message: 'An error occurred during verification. Please try again.',
          type: 'error'
        })
      })

      snsmlInstance.mount(sumsubContainerRef.current)
      sumsubInstanceRef.current = snsmlInstance
    } catch (err) {
      console.error('Error initializing Sumsub widget:', err)
      setError('Failed to load verification widget. Please try again.')
    }
  }

  // Refresh access token
  const refreshAccessToken = async () => {
    try {
      const token = authService.getToken()
      if (!token || !sumsubApplicantId) return

      const response = await fetch(
        `${API_BASE_URL}/kyc/sumsub/access-token/${sumsubApplicantId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setSumsubAccessToken(data.data.accessToken)
          initializeSumsubWidget(data.data.accessToken)
        }
      }
    } catch (err) {
      console.error('Error refreshing access token:', err)
    }
  }

  // Check Sumsub status
  const checkSumsubStatus = async () => {
    try {
      const token = authService.getToken()
      if (!token) return

      const response = await fetch(`${API_BASE_URL}/kyc/sumsub/status?refresh=true`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setSumsubStatus(data.data.status)
          if (data.data.reviewResult === 'GREEN') {
            setKycStatus('approved')
          } else if (data.data.reviewResult === 'RED') {
            setKycStatus('rejected')
          }
        }
      }
    } catch (err) {
      console.error('Error checking Sumsub status:', err)
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleDocumentTypeSelect = (type) => {
    setDocumentData({
      ...documentData,
      documentType: type,
      frontFile: null,
      backFile: null,
      frontPreview: null,
      backPreview: null
    })
  }

  const handleFileChange = (e, side) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (side === 'front') {
          setDocumentData({
            ...documentData,
            frontFile: file,
            frontPreview: reader.result
          })
        } else {
          setDocumentData({
            ...documentData,
            backFile: file,
            backPreview: reader.result
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.hasTradingExperience || !formData.employmentStatus || 
        !formData.annualIncome || !formData.totalNetWorth || !formData.sourceOfWealth) {
      setError('Please fill in all fields')
      return
    }

    setCurrentStep(2)
    setError('')
  }

  const handleDocumentSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!documentData.documentType) {
      setError('Please select a document type')
      return
    }

    if (!documentData.frontFile) {
      setError('Please upload the front of your document')
      return
    }

    // For drivers license and identity card, back is required
    if ((documentData.documentType === 'drivers_license' || documentData.documentType === 'identity_card') 
        && !documentData.backFile) {
      setError('Please upload both front and back of your document')
      return
    }

    setSubmitting(true)

    try {
      const token = authService.getToken()
      if (!token) {
        navigate('/login')
        return
      }

      // Create FormData for file upload
      const formDataToSend = new FormData()
      formDataToSend.append('hasTradingExperience', formData.hasTradingExperience === 'yes')
      formDataToSend.append('employmentStatus', formData.employmentStatus)
      formDataToSend.append('annualIncome', formData.annualIncome)
      formDataToSend.append('totalNetWorth', formData.totalNetWorth)
      formDataToSend.append('sourceOfWealth', formData.sourceOfWealth)
      formDataToSend.append('documentType', documentData.documentType)
      formDataToSend.append('frontDocument', documentData.frontFile)
      if (documentData.backFile) {
        formDataToSend.append('backDocument', documentData.backFile)
      }

      // Minimum 6 seconds loading time for beautiful animation
      const [response] = await Promise.all([
        fetch(`${API_BASE_URL}/kyc/submit`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataToSend
        }),
        new Promise(resolve => setTimeout(resolve, 6000))
      ])

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit verification')
      }

      if (data.success) {
        setKycStatus('pending')
        setSubmitting(false)
        // Show success toast
        setToast({
          message: 'Verification submitted successfully! Your documents are under review.',
          type: 'success'
        })
      }
    } catch (err) {
      setSubmitting(false)
      // Show error toast
      setToast({
        message: err.message || 'Failed to submit verification. Please try again.',
        type: 'error'
      })
    }
  }

  // If already pending or approved, show status
  if (kycStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-yellow-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Verification Under Review
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Your verification documents are being reviewed. We'll notify you once the review is complete.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Status: <span className="font-semibold">Pending</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (kycStatus === 'approved') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Verification Approved
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Your account has been verified. You can now make deposits without limitations.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show Sumsub widget if initialized and SDK is loaded
  if (sumsubAccessToken && window.snsml) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {loading && <AuthLoader message="Initializing verification..." />}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Identity Verification
            </h1>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Please complete the verification process below to verify your identity.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Sumsub Widget Container */}
            <div ref={sumsubContainerRef} id="sumsub-container" className="min-h-[600px]"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading && <AuthLoader message="Initializing verification..." />}
      {submitting && <AuthLoader message="Document submitted..." />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-[#00A896]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#00A896] text-white' : 'bg-gray-200'}`}>
                {currentStep > 1 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>1</span>
                )}
              </div>
              <span className="font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Profile</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200">
              <div className={`h-full ${currentStep >= 2 ? 'bg-[#00A896]' : 'bg-gray-200'}`} style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
            </div>
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-[#00A896]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#00A896] text-white' : 'bg-gray-200'}`}>
                <span>2</span>
              </div>
              <span className="font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Verify Documents</span>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Complete the profile verification to remove all limitations on depositing and trading.
          </p>
        </div>

        {/* Loading Message */}
        {loading && !sumsubAccessToken && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Initializing verification service...
            </p>
          </div>
        )}

        {/* Error Message - Only show critical errors */}
        {error && error.includes('Failed to load verification service') && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {error}
            </p>
            <p className="text-sm text-red-700 mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              You can still complete verification using the manual form below.
            </p>
          </div>
        )}

        {/* Step 1: Profile Form */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Profile Verification
            </h1>

            <form onSubmit={handleProfileSubmit} className="space-y-8">
              {/* Trading Experience */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Trading Experience
                </h2>
                <div>
                  <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Have you traded CFDs or Forex before?
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasTradingExperience"
                        value="yes"
                        checked={formData.hasTradingExperience === 'yes'}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#00A896] border-gray-300 focus:ring-[#00A896]"
                      />
                      <span className="ml-2 text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasTradingExperience"
                        value="no"
                        checked={formData.hasTradingExperience === 'no'}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#00A896] border-gray-300 focus:ring-[#00A896]"
                      />
                      <span className="ml-2 text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Employment and Financial Background */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Employment and financial background
                </h2>

                <div className="space-y-6">
                  {/* Employment Status */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Employment Status
                    </h3>
                    <div className="space-y-2">
                      {['Employed', 'Self employed', 'Retired', 'Unemployed', 'Student'].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="employmentStatus"
                            value={status.toLowerCase().replace(' ', '_')}
                            checked={formData.employmentStatus === status.toLowerCase().replace(' ', '_')}
                            onChange={handleFormChange}
                            className="w-4 h-4 text-[#00A896] border-gray-300 focus:ring-[#00A896]"
                          />
                          <span className="ml-2 text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Annual Income */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Annual Income
                    </h3>
                    <div className="space-y-2">
                      {[
                        'Below $10,000',
                        '$10,000 - $50,000',
                        '$50,000 - $250,000',
                        '$250,000 - $500,000',
                        '$500,000 - $1,000,000',
                        'Above $1,000,000'
                      ].map((income) => (
                        <label key={income} className="flex items-center">
                          <input
                            type="radio"
                            name="annualIncome"
                            value={income}
                            checked={formData.annualIncome === income}
                            onChange={handleFormChange}
                            className="w-4 h-4 text-[#00A896] border-gray-300 focus:ring-[#00A896]"
                          />
                          <span className="ml-2 text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{income}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Total Net Worth */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Your Total Net Worth (USD)
                    </h3>
                    <div className="space-y-2">
                      {[
                        'Below $500',
                        '$500 - $5,000',
                        '$5,000 - $50,000',
                        '$50,000 - $250,000',
                        '$250,000 - $500,000',
                        '$500,000 - $1,000,000',
                        'Above $1,000,000'
                      ].map((worth) => (
                        <label key={worth} className="flex items-center">
                          <input
                            type="radio"
                            name="totalNetWorth"
                            value={worth}
                            checked={formData.totalNetWorth === worth}
                            onChange={handleFormChange}
                            className="w-4 h-4 text-[#00A896] border-gray-300 focus:ring-[#00A896]"
                          />
                          <span className="ml-2 text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{worth}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Source of Wealth */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Source of wealth
                    </h3>
                    <div className="space-y-2">
                      {[
                        'Employment income',
                        'Savings, investments, or pension',
                        'Inheritance',
                        'Third party',
                        'Grant, gift or loan or other'
                      ].map((source) => (
                        <label key={source} className="flex items-center">
                          <input
                            type="radio"
                            name="sourceOfWealth"
                            value={source}
                            checked={formData.sourceOfWealth === source}
                            onChange={handleFormChange}
                            className="w-4 h-4 text-[#00A896] border-gray-300 focus:ring-[#00A896]"
                          />
                          <span className="ml-2 text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{source}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 py-3 rounded-lg transition-colors font-semibold uppercase"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
              >
                CONTINUE
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Document Upload */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              We need to verify your identity.
            </h1>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              To confirm your identity, you will need to take picture, scan or upload one of the following documents:
            </p>

            <form onSubmit={handleDocumentSubmit} className="space-y-6">
              {/* Document Type Selection */}
              <div className="space-y-4">
                {/* International Passport */}
                <div
                  onClick={() => handleDocumentTypeSelect('passport')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    documentData.documentType === 'passport'
                      ? 'border-[#00A896] bg-[#00A896] bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          International Passport
                        </h3>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          The photo page of your passport.
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Driver's License */}
                <div
                  onClick={() => handleDocumentTypeSelect('drivers_license')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    documentData.documentType === 'drivers_license'
                      ? 'border-[#00A896] bg-[#00A896] bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          Drivers License
                        </h3>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          Both front and back sides.
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Identity Card */}
                <div
                  onClick={() => handleDocumentTypeSelect('identity_card')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    documentData.documentType === 'identity_card'
                      ? 'border-[#00A896] bg-[#00A896] bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          Identity Card
                        </h3>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          Both sides of your National ID card (Huduma card is not accepted).
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              {documentData.documentType && (
                <div className="space-y-4 border-t pt-6">
                  {/* Front Document Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {documentData.documentType === 'passport' ? 'Passport Photo Page' : 'Front of Document'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {documentData.frontPreview ? (
                        <div className="space-y-2">
                          <img src={documentData.frontPreview} alt="Front preview" className="max-h-48 mx-auto rounded" />
                          <button
                            type="button"
                            onClick={() => setDocumentData({ ...documentData, frontFile: null, frontPreview: null })}
                            className="text-sm text-red-600 hover:text-red-800"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'front')}
                            className="hidden"
                            id="front-upload"
                          />
                          <label
                            htmlFor="front-upload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              Click to upload or drag and drop
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back Document Upload (if required) */}
                  {(documentData.documentType === 'drivers_license' || documentData.documentType === 'identity_card') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Back of Document
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {documentData.backPreview ? (
                          <div className="space-y-2">
                            <img src={documentData.backPreview} alt="Back preview" className="max-h-48 mx-auto rounded" />
                            <button
                              type="button"
                              onClick={() => setDocumentData({ ...documentData, backFile: null, backPreview: null })}
                              className="text-sm text-red-600 hover:text-red-800"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'back')}
                              className="hidden"
                              id="back-upload"
                            />
                            <label
                              htmlFor="back-upload"
                              className="cursor-pointer flex flex-col items-center"
                            >
                              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <span className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Click to upload or drag and drop
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg transition-colors font-semibold uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                >
                  BACK
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 py-3 rounded-lg transition-colors font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                >
                  {submitting ? 'SUBMITTING...' : 'SUBMIT VERIFICATION'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Verification

