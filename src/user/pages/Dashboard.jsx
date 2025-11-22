import { useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [showReferBanner, setShowReferBanner] = useState(true)
  const [showCopyTradingBanner, setShowCopyTradingBanner] = useState(true)
  const [showKycBanner, setShowKycBanner] = useState(true)

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      <div className="p-3 sm:p-4 md:p-5 lg:p-12 space-y-4 sm:space-y-5 md:space-y-6 max-w-full">
        {/* Promotional Banners */}
        {showReferBanner && (
          <div className="max-w-[1100px] mx-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white rounded-lg p-6 sm:p-7 md:p-8 relative shadow-lg">
            <button
              onClick={() => setShowReferBanner(false)}
              className="absolute top-0 right-0 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-full p-2 z-20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base md:text-lg mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Get up to USD 125 for every friend you refer
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Invite a Like-Minded trader to create a live account and earn up to USD 125 per friend
                </p>
              </div>
              <Link
                to="/user/refer-a-friend"
                className="mr-8 bg-[#00A896] hover:bg-[#008f7a] text-white px-6 py-2 rounded transition-colors whitespace-nowrap text-sm sm:text-center w-32 text-center"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
              >
                Refer a Friend
              </Link>
            </div>
          </div>
        )}

        {showCopyTradingBanner && (
          <div className="max-w-[1100px] mx-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white rounded-lg p-6 sm:p-7 md:p-8 relative shadow-lg">
            <button
              onClick={() => setShowCopyTradingBanner(false)}
              className="absolute top-0 right-0 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-full p-2 z-20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base md:text-lg mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Copy trades to diversify your portfolio
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Follow successful traders to copy their strategies instantly
                </p>
              </div>
              <Link
                to="/user/platforms"
                className="mr-8 bg-[#00A896] hover:bg-[#008f7a] text-white px-6 py-2 rounded transition-colors whitespace-nowrap text-sm sm:text-base w-32 text-center"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
              >
                Start now
              </Link>
            </div>
          </div>
        )}

        {/* Account Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-sm text-gray-700 mb-2 lg:mb-0" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
              Account Summary
            </h2>
            <div className="flex gap-2">
              {/* Currency tabs could go here */}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row relative">
            {/* Total Balance */}
            <div className="flex-1 p-4 sm:p-6 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Balance</p>
                    <p className="text-gray-800 text-sm font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>0.00 USD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Credit */}
            <div className="flex-1 p-4 sm:p-6 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Credit</p>
                    <p className="text-gray-800 text-sm font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>0.00 USD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Equity */}
            <div className="flex-1 p-4 sm:p-6 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Equity</p>
                    <p className="text-gray-800 text-sm font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>0.00 USD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Deposits */}
            <div className="flex-1 p-4 sm:p-6 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Deposits</p>
                    <p className="text-gray-800 text-sm font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>0.00 USD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Withdrawals */}
            <div className="flex-1 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18V12m0 0l-3 3m3-3l3 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Withdrawals</p>
                    <p className="text-gray-800 text-sm font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>0.00 USD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="w-full">
          {/* Header - Outside Card */}
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#374151' }}>
              Recent Activity
            </h2>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded transition-colors border border-gray-300 text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
              View More
            </button>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-lg shadow px-4 sm:px-5 md:px-6 py-2 sm:py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>21/11/2025 15:51 New account application</p>
              <span className="text-orange-600 text-xs whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Live Accounts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
              Live Accounts
            </h2>
            <Link
              to="/user/addaccount/live"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-500 px-4 py-2 rounded border border-gray-300 text-sm transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Account
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#EAECEE' }}>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Account Details</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Leverage</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Equity</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Balance</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Margin</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Credit</th>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Platforms</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Action</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">USD</span>
                      <div>
                        <div className="flex items-center gap-1">
                          <button className="text-gray-400 hover:text-gray-600" title="Copy">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <span className="text-xs font-medium text-gray-900">1013516260</span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
                            </svg>
                          </button>
                        </div>
                        <small className="text-gray-600">
                          <span className="font-medium">MT5</span> Standard
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-900">1:2000</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-900">0.00</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-900">0.0000</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-900">0.00</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-900">0.00</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                        <img src="/MT5-icon.svg" alt="MT5" className="w-5 h-5" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      to="/user/deposits"
                      className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-[#00A896] px-3 py-1.5 rounded border border-[#00A896] transition-colors text-sm"
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="5" y="7" width="14" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v6m0 0l-2.5-2.5m2.5 2.5l2.5-2.5" />
                      </svg>
                      Deposit
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">USD</span>
                      <span className="text-xs font-semibold text-gray-900">Total</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-900">0.00</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-900">0.00</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-900">0.00</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-900">0.00</td>
                  <td className="px-4 py-3" colSpan="4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

       

        {/* Demo Accounts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
              Demo Accounts
            </h2>
            <Link
              to="/user/addaccount/demo"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-500 px-4 py-2 rounded border border-gray-300 text-sm transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Account
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#EAECEE' }}>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Account Details</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Leverage</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Equity</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Balance</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Margin</th>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Platforms</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center">
                    <p className="text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Practice and master your trading skills.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

         {/* Wallet Accounts */}
        <div className=" rounded-lg shadow-sm  border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
              Wallet Accounts
            </h2>
            <Link
              to="/user/addaccount/wallet"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-500 px-4 py-2 rounded border border-gray-300 text-sm transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Account
            </Link>
          </div>
          
          {/* Wallet Account Cards */}
          <div className="p-4 sm:p-6">
            {/* Sample Wallet Account Card */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 p-4 bg-gray-50 rounded-lg border mb-4">
              <div className="flex-1 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">USD</span>
                  <span className="text-xs font-medium text-gray-900">W-2337894-001</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-gray-600 mr-4">Balance</span>
                  <span className="text-sm font-semibold text-gray-900">0.000</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link
                  to="/user/deposits"
                  className="inline-flex items-center gap-1 bg-[#00A896] hover:bg-[#008f7a] text-white px-3 py-1.5 rounded text-xs transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0l-3-3m3 3l3-3" />
                  </svg>
                  Deposit
                </Link>
                
                <button
                  disabled
                  className="inline-flex items-center gap-1 bg-gray-300 text-gray-500 px-3 py-1.5 rounded text-xs cursor-not-allowed"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Transfer
                </button>
                
                <button
                  disabled
                  className="inline-flex items-center gap-1 bg-gray-300 text-gray-500 px-3 py-1.5 rounded text-xs cursor-not-allowed"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18V6m0 0l-3 3m3-3l3 3" />
                  </svg>
                  Withdraw
                </button>
              </div>
            </div>
            

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
