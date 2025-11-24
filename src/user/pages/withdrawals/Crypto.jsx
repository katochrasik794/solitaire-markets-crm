import { useState } from 'react'

function Crypto() {
  const [selectedAccount, setSelectedAccount] = useState('wallet-1')
  const [amount, setAmount] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen p-4 sm:p-6 overflow-x-hidden" style={{ background: 'linear-gradient(to right, #E5E7EB 0%, #FFFFFF 20%, #FFFFFF 80%, #E5E7EB 100%)' }}>
      <div className="w-full max-w-[80%] mx-auto">
        <h1 className="mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Withdraw through Crypto
        </h1>

        {/* Main Form Container - White outer div */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          {/* Inner gray div - centered content */}
          <div className="bg-gray-200 rounded-lg p-6 text-center">
            <form className="space-y-6">
              {/* Withdraw from Account Section */}
              <div>
                <h2 className="mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
                  Withdraw from Account
                </h2>
                <p className="mb-4 text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Select a trading account or a wallet to withdraw your money from.
                </p>
                
                <div className="space-y-3">
                  {/* Wallet Option */}
                  <div
                    onClick={() => setSelectedAccount('wallet-1')}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAccount === 'wallet-1' ? 'border-[#00A896] bg-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>Wallet</span>
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>USD</span>
                          <span className="text-xs">🇺🇸</span>
                        </div>
                        <div className="font-semibold mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '600' }}>
                          W-2337894-001
                        </div>
                        <div className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                          Balance: USD 0.00
                        </div>
                      </div>
                      {selectedAccount === 'wallet-1' ? (
                        <svg className="w-6 h-6 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* MT5 Option */}
                  <div
                    onClick={() => setSelectedAccount('mt5-1')}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAccount === 'mt5-1' ? 'border-[#00A896] bg-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>MT5</span>
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>Standard</span>
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>USD</span>
                          <span className="text-xs">🇺🇸</span>
                        </div>
                        <div className="font-semibold mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '600' }}>
                          1013516260
                        </div>
                        <div className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                          Balance: USD 0.00
                        </div>
                      </div>
                      {selectedAccount === 'mt5-1' ? (
                        <svg className="w-6 h-6 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Section */}
              <div>
                <h2 className="mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
                  Amount
                </h2>
                <p className="mb-3 text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Transaction limit: USD 10 - USD 20000
                </p>
                
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <div className="flex items-center gap-2 px-4 py-2 border-r border-gray-300 bg-gray-50">
                    <span className="text-sm">🇺🇸</span>
                    <span className="font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '500' }}>USD</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-4 py-2 outline-none"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setAmount('10')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                  >
                    USD 10
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount('50')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                  >
                    USD 50
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount('100')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                  >
                    USD 100
                  </button>
                </div>
              </div>

              {/* Password Confirmation Section */}
              <div>
                <h2 className="mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
                  Password Confirmation
                </h2>
                <p className="mb-3 text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Enter your password to confirm this withdrawal
                </p>
                
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 outline-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent"
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Warning Message */}
              <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Your funds will be placed on hold until the transaction is fully processed.
                </p>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={!amount || !password}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  amount && password
                    ? 'bg-[#00A896] hover:bg-[#008f7a] text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '600' }}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crypto
