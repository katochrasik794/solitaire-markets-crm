import { useState } from 'react'

function Transfers() {
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <div className="min-h-screen p-4 sm:p-6 overflow-x-hidden" style={{ background: 'linear-gradient(to right, #E5E7EB 0%, #FFFFFF 20%, #FFFFFF 80%, #E5E7EB 100%)' }}>
      <div className="w-full max-w-[80%] mx-auto">
        <h1 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Move Funds
        </h1>
        {/* Form Container */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <form className="space-y-6">
            {/* From Account */}
            <div>
              <label className="block mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#000000', fontWeight: '400' }}>
                From Account
              </label>
              <div className="relative">
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}
                >
                  <option value="">Choose an account</option>
                  <option value="wallet-1">W-2337894-001 (Wallet - USD)</option>
                  <option value="mt5-1">1013516260 (MT5 - Standard - USD)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* To Account */}
            <div>
              <label className="block mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#000000', fontWeight: '400' }}>
                To Account
              </label>
              <div className="relative">
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}
                >
                  <option value="">Choose an account</option>
                  <option value="wallet-1">W-2337894-001 (Wallet - USD)</option>
                  <option value="mt5-1">1013516260 (MT5 - Standard - USD)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Transfer Amount */}
            <div>
              <label className="block mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#000000', fontWeight: '400' }}>
                Transfer Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '600' }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Transfers
