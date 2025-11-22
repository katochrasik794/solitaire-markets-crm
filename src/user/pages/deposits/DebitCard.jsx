import { Link } from 'react-router-dom'
import { useState } from 'react'

function DebitCard() {
  const [selectedAccount, setSelectedAccount] = useState('account1')
  const [amount, setAmount] = useState('0.00')

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl">
        <Link to="/user/deposits" className="inline-flex items-center text-[#00A896] hover:text-[#008f7a] mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <h1 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Deposit Using Your Debit or Credit Card
        </h1>

        {/* Card Logos and Information */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          {/* Card Logos */}
          <div className="flex items-center gap-8 mb-6">
            {/* VISA */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-12 bg-blue-600 rounded flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>VISA</span>
              </div>
            </div>
            
            {/* Mastercard */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-12 flex items-center justify-center mb-2 relative">
                <div className="relative" style={{ width: '50px', height: '30px' }}>
                  <div className="absolute w-7 h-7 bg-red-500 rounded-full" style={{ left: '0px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}></div>
                  <div className="absolute w-7 h-7 bg-orange-500 rounded-full" style={{ left: '7px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}></div>
                </div>
              </div>
              <span className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>mastercard</span>
            </div>
            
            {/* Maestro */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-12 flex items-center justify-center mb-2 relative">
                <div className="relative" style={{ width: '50px', height: '30px' }}>
                  <div className="absolute w-7 h-7 bg-red-500 rounded-full" style={{ left: '0px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}></div>
                  <div className="absolute w-7 h-7 bg-blue-500 rounded-full" style={{ left: '7px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}></div>
                </div>
              </div>
              <span className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>maestro</span>
            </div>
          </div>

          {/* Information Text */}
          <div className="space-y-4">
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#4B5156', fontWeight: '400', lineHeight: '1.5' }}>
              Solitaire follows a strict return to source policy, in all instances where applicable, all monies paid out by Solitaire will be paid back to the source from where they originated from.
            </p>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#4B5156', fontWeight: '400', lineHeight: '1.5' }}>
              To make a withdrawal to a card, a deposit must first be made from a card and the details must be saved on this platform.
            </p>
          </div>
        </div>

        <div className="bg-[#00A896] text-white rounded-lg p-4 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            Deposit $100 or more to receive a complimentary 30% bonus credit
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h2 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Deposit to account
          </h2>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            Choose a trading account or wallet for your deposit your money
          </p>

          <div className="space-y-3">
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
                {selectedAccount === 'account1' ? (
                  <svg className="w-6 h-6 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
            </div>

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
                {selectedAccount === 'account2' ? (
                  <svg className="w-6 h-6 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h2 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Deposit amount
          </h2>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            Transaction limit: USD 10 - USD 20000
          </p>

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

        <button className="w-full bg-white border-2 border-gray-300 text-gray-800 py-4 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>Continue with Card</span>
        </button>
      </div>
    </div>
  )
}

export default DebitCard

