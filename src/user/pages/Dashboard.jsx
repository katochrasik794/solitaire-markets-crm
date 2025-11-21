import { useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [showReferBanner, setShowReferBanner] = useState(true)
  const [showCopyTradingBanner, setShowCopyTradingBanner] = useState(true)

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-full">
        {/* Promotional Banners */}
        {showReferBanner && (
          <div className="bg-gray-800 text-white rounded-lg p-3 sm:p-4 relative flex items-center justify-between h-auto sm:h-auto min-h-[120px] sm:min-h-0">
            <button
              onClick={() => setShowReferBanner(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white z-10"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 pr-2 sm:pr-4">
              <h3 className="mb-1 text-sm sm:text-base lg:text-2xl" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFF', fontWeight: '400' }}>
                Get up to USD 125 for every friend you refer
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Invite a Like-Minded trader to create a live account and earn up to USD 125 per friend
              </p>
            </div>
            <div className="hidden sm:block ml-4">
              <img src="/dollar-icon.png" alt="Dollar" className="w-12 h-12 sm:w-16 sm:h-16 opacity-20" />
            </div>
            <Link
              to="/user/refer-a-friend"
              className="bg-[#00B8A3] hover:bg-[#00A896] text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg ml-2 sm:ml-4 transition-colors text-xs sm:text-sm lg:text-base whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              Refer a Friend
            </Link>
          </div>
        )}

        {showCopyTradingBanner && (
          <div className="bg-gray-800 text-white rounded-lg p-3 sm:p-4 relative flex items-center justify-between h-auto sm:h-auto min-h-[120px] sm:min-h-0">
            <button
              onClick={() => setShowCopyTradingBanner(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white z-10"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 pr-2 sm:pr-4">
              <h3 className="mb-1 text-sm sm:text-base lg:text-2xl" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFF', fontWeight: '400' }}>
                Copy trades to diversify your portfolio
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Follow successful traders to copy their strategies instantly
              </p>
            </div>
            <div className="hidden sm:block ml-4">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <button
              className="bg-[#00B8A3] hover:bg-[#00A896] text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg ml-2 sm:ml-4 transition-colors text-xs sm:text-sm lg:text-base whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              Start now
            </button>
          </div>
        )}

        {/* Account Summary */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#4B5156' }}>
            Account Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>Total Balance</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}>0.00 USD</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>Total Credit</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}>0.00 USD</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>Total Equity</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}>0.00 USD</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>Total Deposits</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}>0.00 USD</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>Total Withdrawals</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}>0.00 USD</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#4B5156' }}>
              Recent Activity
            </h2>
            <button className="text-[#00A896] hover:text-[#008f7a] font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
              View More
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>21/11/2025 15:51</p>
                <p className="text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
                  New account application
                </p>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Live Accounts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#4B5156' }}>
              Live Accounts
            </h2>
            <button className="bg-white hover:bg-gray-50 text-[#00A896] px-4 py-2 rounded-lg transition-colors border border-gray-300" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
              + Create Account
            </button>
          </div>
          <div className="overflow-x-auto max-w-full">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px' }}>Account Details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Leverage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Equity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Balance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Margin</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Credit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Platforms</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>USD</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>1013516260</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-500 mt-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>MT5 Standard</p>
                  </td>
                  <td className="px-4 py-4 text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>1:2000</td>
                  <td className="px-4 py-4 text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.00</td>
                  <td className="px-4 py-4 text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.0000</td>
                  <td className="px-4 py-4 text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.00</td>
                  <td className="px-4 py-4 text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.00</td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <span className="text-gray-800 font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>MT5</span>
                      <br />
                      <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>WebTrader</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to="/user/deposits"
                      className="inline-flex items-center space-x-1 bg-white hover:bg-gray-50 text-[#00A896] px-3 py-1 rounded text-sm transition-colors border border-gray-300"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Deposit</span>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>USD</span>
                      <span className="text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>Total</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4 text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.00</td>
                  <td className="px-4 py-4 text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.00</td>
                  <td className="px-4 py-4 text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.00</td>
                  <td className="px-4 py-4 text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.00</td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#4B5156' }}>
              Demo Accounts
            </h2>
            <button className="bg-white hover:bg-gray-50 text-[#00A896] px-4 py-2 rounded-lg transition-colors border border-gray-300" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
              + Create Account
            </button>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-400" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
              Practice and master your trading skills.
            </p>
          </div>
        </div>

        {/* Wallet Accounts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#4B5156' }}>
              Wallet Accounts
            </h2>
            <button className="bg-white hover:bg-gray-50 text-[#00A896] px-4 py-2 rounded-lg transition-colors border border-gray-300" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
              + Create Account
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>USD</span>
                <div>
                  <p className="text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>Wallet ID</p>
                  <p className="text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>W-2337894-001</p>
                </div>
                <div>
                  <p className="text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}>Balance</p>
                  <p className="text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>0.000</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  to="/user/deposits"
                  className="inline-flex items-center space-x-1 bg-white hover:bg-gray-50 text-[#00A896] px-4 py-2 rounded text-sm transition-colors border border-gray-300"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Deposit</span>
                </Link>
                <button className="inline-flex items-center space-x-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm transition-colors" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>Transfer</span>
                </button>
                <Link
                  to="/user/withdrawals"
                  className="inline-flex items-center space-x-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm transition-colors"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Withdraw</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
