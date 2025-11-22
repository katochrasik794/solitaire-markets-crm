import { useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [showReferBanner, setShowReferBanner] = useState(true)
  const [showCopyTradingBanner, setShowCopyTradingBanner] = useState(true)

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5 md:space-y-6 max-w-full">
        {/* Promotional Banners */}
        {showReferBanner && (
          <div className="bg-gray-800 text-white rounded-lg p-4 sm:p-5 md:p-6 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              onClick={() => setShowReferBanner(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 pr-8 sm:pr-6">
              <h3 className="mb-2 text-lg sm:text-xl md:text-2xl text-white" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Get up to USD 125 for every friend you refer
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Invite a Like-Minded trader to create a live account and earn up to USD 125 per friend
              </p>
            </div>
            <Link
              to="/user/refer-a-friend"
              className="bg-[#00A896] hover:bg-[#008f7a] text-white px-4 sm:px-6 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              Refer a Friend
            </Link>
          </div>
        )}

        {showCopyTradingBanner && (
          <div className="bg-gray-800 text-white rounded-lg p-4 sm:p-5 md:p-6 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              onClick={() => setShowCopyTradingBanner(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 pr-8 sm:pr-6">
              <h3 className="mb-2 text-lg sm:text-xl md:text-2xl text-white" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Copy trades to diversify your portfolio
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Follow successful traders to copy their strategies instantly
              </p>
            </div>
            <button
              className="bg-[#00A896] hover:bg-[#008f7a] text-white px-4 sm:px-6 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              Start now
            </button>
          </div>
        )}

        {/* Account Summary */}
        <div>
          <h2 className="mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>
            Account Summary
          </h2>
          <div className="bg-white rounded-lg shadow flex flex-col sm:flex-row relative">
            {/* Total Balance */}
            <div className="flex-1 p-3 sm:p-4 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="absolute right-0 top-3 bottom-3 sm:top-4 sm:bottom-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Balance</h3>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                    <rect x="7" y="7" width="10" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
            </div>

            {/* Total Credit */}
            <div className="flex-1 p-3 sm:p-4 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="absolute right-0 top-3 bottom-3 sm:top-4 sm:bottom-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Credit</h3>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                    <rect x="7" y="7" width="10" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
            </div>

            {/* Total Equity */}
            <div className="flex-1 p-3 sm:p-4 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="absolute right-0 top-3 bottom-3 sm:top-4 sm:bottom-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Equity</h3>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                    <rect x="7" y="7" width="10" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
            </div>

            {/* Total Deposits */}
            <div className="flex-1 p-3 sm:p-4 relative border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="absolute right-0 top-3 bottom-3 sm:top-4 sm:bottom-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Deposits</h3>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                    <rect x="7" y="8" width="10" height="8" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v5m0 0l-2-2m2 2l2-2" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
            </div>

            {/* Total Withdrawals */}
            <div className="flex-1 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Withdrawals</h3>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                    <rect x="7" y="8" width="10" height="8" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16V11m0 0l-2 2m2-2l2 2" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="w-full">
          {/* Header - Outside Card */}
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', fontWeight: '400', color: '#374151' }}>
              Recent Activity
            </h2>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded transition-colors border border-gray-300 text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
              View More
            </button>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-lg shadow px-4 sm:px-5 md:px-6 py-2 sm:py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>21/11/2025 15:51 New account application</p>
              <span className="text-orange-600 text-sm whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Live Accounts */}
        <div className="w-full">
          {/* Header - Outside Card */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>
              Live Accounts
            </h2>
            <Link
              to="/user/addaccount/live"
              className="bg-white hover:bg-gray-50 text-gray-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded transition-colors border border-gray-300 inline-flex items-center gap-1.5 text-xs sm:text-sm"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Account</span>
            </Link>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto  sm:ml-0  sm:mr-0">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr style={{ backgroundColor: '#EAECEE' }}>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-left uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Account Details</th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-right uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Leverage</th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-right uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Equity</th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-right uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Balance</th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-right uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Margin</th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-right uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Credit</th>
                    <th className="w-75"></th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-left uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Platforms</th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-center uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Action</th>
                    <th className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-center uppercase text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#4B5156' }}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 sm:px-3 md:px-4 py-2">
                      <div className="flex items-center gap-2 sm:gap-3.5 flex-nowrap">
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-700 rounded text-xs whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>USD</span>
                        <div>
                          <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
                            <button className="text-gray-400 hover:text-gray-600" title="Copy">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <span className="text-gray-800 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>1013516260</span>
                            <button className="text-gray-400 hover:text-gray-600 relative">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
                              </svg>
                            </button>
                          </div>
                          <small>
                            <span className="font-bold text-gray-800 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>MT5</span>
                            <span className="text-gray-600 ml-1 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Standard</span>
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>1:2000</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>0.00</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>0.0000</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>0.00</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>0.00</td>
                    <td className="py-2"></td>
                    <td className="px-2 sm:px-3 md:px-4 py-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded hover:bg-gray-100">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </button>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded hover:bg-gray-100">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-center">
                      <Link
                        to="/user/deposits"
                        className="inline-flex items-center gap-0.5 sm:gap-1 bg-white hover:bg-gray-50 text-[#00A896] px-2 sm:px-3 py-1 sm:py-1.5 rounded border border-[#00A896] transition-colors text-xs sm:text-sm"
                        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="5" y="7" width="14" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v6m0 0l-2.5-2.5m2.5 2.5l2.5-2.5" />
                        </svg>
                        <span className="hidden sm:inline">Deposit</span>
                      </Link>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="10" className="px-2 sm:px-3 md:px-4 py-1 bg-gray-100"></td>
                  </tr>
                  <tr className="border-t border-gray-200" style={{ backgroundColor: '#F9FAFB' }}>
                    <td className="px-2 sm:px-3 md:px-4 py-2">
                      <div className="flex items-center gap-2 sm:gap-3.5 flex-nowrap">
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-700 rounded text-xs whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>USD</span>
                        <span className="text-gray-800 font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600', color: '#374151' }}>Total</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-2"></td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 text-right text-gray-800 font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="py-2"></td>
                    <td className="px-2 sm:px-3 md:px-4 py-2"></td>
                    <td className="px-2 sm:px-3 md:px-4 py-2"></td>
                    <td className="px-2 sm:px-3 md:px-4 py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-5 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#374151' }}>
              Demo Accounts
            </h2>
            <button className="bg-white hover:bg-gray-50 text-gray-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded transition-colors border border-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
              + Create Account
            </button>
          </div>
          <div className="text-center py-8 sm:py-10 md:py-12">
            <p className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
              Practice and master your trading skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
