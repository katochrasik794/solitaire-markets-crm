import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import withdrawalService from '../../../services/withdrawal.service'
import authService from '../../../services/auth.js'
import Swal from 'sweetalert2'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Crypto() {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState([])
  const [wallet, setWallet] = useState(null)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accountType, setAccountType] = useState('trading') // 'trading' or 'wallet'
  const [amount, setAmount] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cryptoAddress, setCryptoAddress] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20')
  const [kycStatus, setKycStatus] = useState(null)
  const [kycLoading, setKycLoading] = useState(true)

  useEffect(() => {
    checkKYCStatus()
  }, [])

  useEffect(() => {
    if (kycStatus === 'approved') {
      fetchAccounts()
      fetchWallet()
    }
  }, [kycStatus])

  const checkKYCStatus = async () => {
    try {
      setKycLoading(true)
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
          setKycStatus(data.data.status || 'unverified')
        } else {
          setKycStatus('unverified')
        }
      } else {
        setKycStatus('unverified')
      }
    } catch (error) {
      console.error('Error checking KYC status:', error)
      setKycStatus('unverified')
    } finally {
      setKycLoading(false)
    }
  }

  // Set default selection after accounts and wallet are loaded
  useEffect(() => {
    if (!selectedAccount) {
      if (accounts.length > 0) {
        setSelectedAccount({ ...accounts[0], type: 'trading' })
        setAccountType('trading')
      } else if (wallet) {
        setSelectedAccount({ ...wallet, type: 'wallet' })
        setAccountType('wallet')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, wallet])

  const fetchAccounts = async () => {
    try {
      const data = await withdrawalService.getAccounts()
      if (data && data.success && Array.isArray(data.data)) {
        // Filter for active MT5 accounts only, exclude demo accounts
        const activeAccounts = data.data.filter(acc => {
          const isMT5 = acc.platform === 'MT5'
          const isActive = acc.account_status === 'active'
          const isNotDemo = !acc.is_demo && (!acc.trading_server || !acc.trading_server.toLowerCase().includes('demo'))
          return isMT5 && isActive && isNotDemo
        })
        setAccounts(activeAccounts)
      }
    } catch (error) {
      console.error('Failed to fetch accounts', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load your trading accounts'
      })
    }
  }

  const fetchWallet = async () => {
    try {
      const data = await withdrawalService.getWallet()
      if (data && data.success && data.data) {
        setWallet(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch wallet', error)
    }
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()

    if (!selectedAccount) {
      Swal.fire('Error', 'Please select an account', 'error')
      return
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Swal.fire('Error', 'Please enter a valid amount', 'error')
      return
    }

    if (!password) {
      Swal.fire('Error', 'Please enter your password', 'error')
      return
    }

    if (!cryptoAddress) {
      Swal.fire('Error', 'Please enter your crypto wallet address', 'error')
      return
    }

    setLoading(true)

    try {
      const withdrawalData = {
        mt5AccountId: accountType === 'trading' ? selectedAccount.account_number : null,
        walletId: accountType === 'wallet' ? selectedAccount.id : null,
        amount: parseFloat(amount),
        currency: selectedAccount.currency || 'USD',
        method: 'crypto',
        paymentMethod: `USDT-${selectedNetwork}`,
        cryptoAddress: cryptoAddress,
        pmCurrency: 'USDT',
        pmNetwork: selectedNetwork,
        password: password
      }

      const response = await withdrawalService.createWithdrawal(withdrawalData)

      if (response && response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Withdrawal request submitted successfully! Funds have been deducted from your account pending approval.'
        })
        setAmount('')
        setPassword('')
        setCryptoAddress('')
        // Refresh accounts and wallet to show updated balance
        fetchAccounts()
        fetchWallet()
      } else {
        throw new Error(response.message || 'Unknown error')
      }

    } catch (error) {
      console.error('Withdrawal failed:', error)
      Swal.fire({
        icon: 'error',
        title: 'Withdrawal Failed',
        text: error.response?.data?.error || error.message || 'Something went wrong'
      })
    } finally {
      setLoading(false)
    }
  }

  const isKYCApproved = kycStatus === 'approved'

  return (
    <div className="min-h-screen p-4 sm:p-6 overflow-x-hidden relative" style={{ background: 'linear-gradient(to right, #E5E7EB 0%, #FFFFFF 20%, #FFFFFF 80%, #E5E7EB 100%)' }}>
      {/* Loading State */}
      {kycLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mb-4"></div>
            <p className="text-gray-600">Checking verification status...</p>
          </div>
        </div>
      )}

      {/* Blur Overlay - Show when KYC is not approved */}
      {!kycLoading && !isKYCApproved && (
        <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          {/* KYC Verification Modal */}
          <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-lg sm:max-w-xl md:max-w-2xl border border-gray-200">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                KYC Verification Required
              </h2>
              
              {/* Message */}
              <p className="text-gray-600 mb-6">
                To proceed with withdrawals, please complete your KYC (Know Your Customer) verification. This is required for security and regulatory compliance.
              </p>
              
              {/* Button */}
              <button
                onClick={() => navigate('/user/verification')}
                className="w-full bg-brand-500 hover:bg-brand-600 text-dark-base border border-brand-500 py-3 rounded-lg transition-colors font-semibold text-base"
              >
                Go to KYC Verification
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`w-full max-w-[95%] mx-auto bg-white rounded-lg ${!isKYCApproved && !kycLoading ? 'opacity-50 pointer-events-none' : ''}`}>
        <h1 className="text-left p-4 md:p-6 pb-0 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '400' }}>
          Withdraw through Crypto
        </h1>
        <div className="w-full max-w-2xl mx-auto px-4 md:px-6 pb-4 md:pb-6">

          {/* Main Form Container */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <form className="space-y-4" onSubmit={handleWithdraw}>
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800">Withdraw from Account</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Select a trading account to withdraw your money from
              </p>

              {/* Account List */}
              <div className="max-h-60 overflow-y-auto space-y-2">
                {/* Wallet Account */}
                {wallet && (
                  <div
                    onClick={() => {
                      setSelectedAccount({ ...wallet, type: 'wallet' })
                      setAccountType('wallet')
                    }}
                    className={`border rounded-xl p-3 flex justify-between items-start cursor-pointer transition-all ${accountType === 'wallet' && selectedAccount?.id === wallet.id ? 'border-[#009688] bg-white shadow-sm ring-1 ring-[#009688]' : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{wallet.wallet_number}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-blue-100 text-blue-700">Wallet</span>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-md text-xs">
                          <img src="https://flagsapi.com/US/flat/24.png" className="w-4 h-4" alt="USD" />
                          {wallet.currency || 'USD'}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">Balance: {wallet.currency || 'USD'} {parseFloat(wallet.balance || 0).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${accountType === 'wallet' && selectedAccount?.id === wallet.id ? 'border-[#009688] bg-[#009688]' : 'border-gray-300'
                        }`}>
                        {accountType === 'wallet' && selectedAccount?.id === wallet.id && <div className="h-2.5 w-2.5 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Trading Accounts */}
                {accounts.length === 0 && !wallet ? (
                  <p className="text-center text-gray-500 py-4">No active accounts found.</p>
                ) : (
                  accounts.map(acc => (
                    <div
                      key={acc.id}
                      onClick={() => {
                        setSelectedAccount({ ...acc, type: 'trading' })
                        setAccountType('trading')
                      }}
                      className={`border rounded-xl p-3 flex justify-between items-start cursor-pointer transition-all ${accountType === 'trading' && selectedAccount?.id === acc.id ? 'border-[#009688] bg-white shadow-sm ring-1 ring-[#009688]' : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                    >
                      <div>
                        <p className="text-gray-800 font-medium">{acc.account_number}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="px-2 py-0.5 text-xs rounded-md bg-gray-200">{acc.platform}</span>
                          <span className="px-2 py-0.5 text-xs rounded-md bg-gray-200">{acc.account_type}</span>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-md text-xs">
                            <img src="https://flagsapi.com/US/flat/24.png" className="w-4 h-4" alt="USD" />
                            {acc.currency}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">Balance: {acc.currency} {parseFloat(acc.balance || 0).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${accountType === 'trading' && selectedAccount?.id === acc.id ? 'border-[#009688] bg-[#009688]' : 'border-gray-300'
                          }`}>
                          {accountType === 'trading' && selectedAccount?.id === acc.id && <div className="h-2.5 w-2.5 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Crypto Details Section */}
              <h3 className="text-lg font-semibold mt-4">Destination Wallet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Network</label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-[#009688]"
                  >
                    <option value="TRC20">USDT (TRC20)</option>
                    <option value="ERC20">USDT (ERC20)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Wallet Address</label>
                  <input
                    type="text"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    placeholder="Enter wallet address"
                    className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-[#009688]"
                  />
                </div>
              </div>


              {/* Amount Section */}
              <h3 className="text-lg font-semibold mt-4">Amount</h3>
              <p className="text-gray-500 text-sm mt-1">
                Transaction limit: USD 10 - USD 20000
              </p>

              {/* Currency & Amount Input */}
              <div className="mt-2 border rounded-xl flex items-center p-3 bg-white">
                <div className="flex items-center gap-2">
                  <img src="https://flagsapi.com/US/flat/24.png" className="w-5 h-5" alt="USD" />
                  <span className="font-medium text-gray-700">USD</span>
                </div>
                <div className="ml-auto">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-right bg-transparent outline-none w-32"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex gap-3 mt-2 flex-wrap">
                {["USD 10", "USD 50", "USD 100", "USD 500"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setAmount(label.split(' ')[1])}
                    className="px-4 py-1.5 rounded-md border bg-white text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Password field */}
              <p className="text-gray-700 mt-4">Enter your password to confirm this withdrawal</p>

              <div className="mt-1 border rounded-xl p-3 flex items-center bg-white">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none w-full"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Info Notice */}
              <div className="flex items-start gap-2 mt-2 text-gray-500 text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 16h-1v-4h-1m1-4h.01" />
                </svg>
                <p>Your funds will be placed on hold until the transaction is fully processed.</p>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-3 py-2.5 rounded-lg font-semibold transition-colors ${!loading
                  ? 'bg-brand-500 hover:bg-brand-600 text-dark-base cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crypto
