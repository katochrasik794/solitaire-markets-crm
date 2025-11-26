import { useState, useEffect } from 'react'
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

  // Check existing KYC status on mount
  useEffect(() => {
    const checkKYCStatus = async () => {
      try {
        const token = authService.getToken()
        if (!token) {
          navigate('/login')
          return
        }

        const response = await fetch(`${API_BASE_URL}/kyc/status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setKycStatus(data.data.status)
            if (data.data.status === 'pending') {
              // If pending, show pending message
            } else if (data.data.status === 'approved') {
              // If approved, show success
            }
          }
        }
      } catch (err) {
        console.error('Error checking KYC status:', err)
      }
    }

    checkKYCStatus()
  }, [navigate])

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {error}
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

