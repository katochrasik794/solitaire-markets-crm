import { Link } from 'react-router-dom'
import { useState } from 'react'

function GooglePay() {
  const [selectedAccount, setSelectedAccount] = useState('account1')
  const [amount, setAmount] = useState('0.00')
  const [currency, setCurrency] = useState('USD')

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl">
        {/* Back Button */}
        <Link to="/user/deposits" className="inline-flex items-center text-[#00A896] hover:text-[#008f7a] mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Page Title */}
        <h1 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Deposit with Google Pay
        </h1>

        {/* Promotional Banner */}
        <div className="bg-[#00A896] text-white rounded-lg p-4 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            Deposit $100 or more to receive a complimentary 30% bonus credit
          </p>
        </div>

        {/* Deposit to account */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h2 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Deposit to account
          </h2>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            Choose a trading account or wallet for your deposit your money
          </p>

          {/* Account Options */}
          <div className="space-y-3">
            {/* Account 1 */}
            <div
              onClick={() => setSelectedAccount('account1')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedAccount === 'account1' ? 'border-[#00A896] bg-gray-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs mr-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>USD</span>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>1013516260</span>
                  </div>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>MT5 Standard</p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>Balance: USD 0.00</p>
                </div>
                {selectedAccount === 'account1' && (
                  <svg className="w-6 h-6 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {selectedAccount !== 'account1' && (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
            </div>

            {/* Account 2 */}
            <div
              onClick={() => setSelectedAccount('account2')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedAccount === 'account2' ? 'border-[#00A896] bg-gray-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs mr-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>USD</span>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>W-2337894-001</span>
                  </div>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>Wallet</p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>Balance: USD 0.00</p>
                </div>
                {selectedAccount === 'account2' && (
                  <svg className="w-6 h-6 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {selectedAccount !== 'account2' && (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Deposit amount */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h2 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Deposit amount
          </h2>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            Transaction limit: USD 10 - USD 20000
          </p>

          {/* Amount Input */}
          <div className="flex items-center border border-gray-300 rounded-lg mb-4">
            <div className="flex items-center px-3 py-2 border-r border-gray-300 bg-gray-50">
              <span className="mr-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>USD</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-4 py-2 outline-none"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}
              placeholder="0.00"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setAmount('100')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
            >
              USD 100
            </button>
            <button
              onClick={() => setAmount('150')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
            >
              USD 150
            </button>
            <button
              onClick={() => setAmount('200')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
            >
              USD 200
            </button>
          </div>
        </div>

        {/* Google Pay Button */}
        <button className="w-full bg-gray-800 text-white py-4 rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>G Pay</span>
        </button>
      </div>
    </div>
  )
}

export default GooglePay

