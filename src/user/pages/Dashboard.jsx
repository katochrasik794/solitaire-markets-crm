  import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Dashboard() {
  const [showReferBanner, setShowReferBanner] = useState(true)
  const [showCopyTradingBanner, setShowCopyTradingBanner] = useState(true)
  const [showKycBanner, setShowKycBanner] = useState(true)

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      {/* Deposit Banner */}
      <div className="w-full h-20 bg-[#FFF9E6] border-t border-[#f3e7b5] px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left Section */}
        <div className="flex items-start md:items-center gap-2 text-sm md:text-base text-[#000] leading-snug">
          <span className="text-lg md:text-xl"><AiOutlineInfoCircle className="w-5 h-5 text-black" /></span>
          <p className="m-0">
            You can deposit up to USD 2,000. Complete full verification
            to make deposits without limitations.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="bg-[#FFB933] hover:bg-[#f0c21d] text-black text-sm md:text-base px-4 py-2 rounded-md font-medium transition">
            DEPOSIT NOW
          </button>

          <button className="text-black underline text-sm md:text-base hover:text-gray-700 transition">
            Complete verification
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6 max-w-full">
        {/* Promotional Banners */}
        {showReferBanner && (
          <div className="mt-10 bg-gray-800 text-white rounded-lg p-4 sm:p-6 relative">
            <button
              onClick={() => setShowReferBanner(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div className="flex-1 pr-0 sm:pr-6">
                <h3 className="mb-2 text-lg sm:text-2xl text-white" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Get up to USD 125 for every friend you refer
                </h3>
                <p className="text-gray-300 text-sm sm:text-base" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Invite a Like-Minded trader to create a live account and earn up to USD 125 per friend
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="/user/refer-a-friend"
                  className="bg-[#00A896] hover:bg-[#008f7a] text-white px-4 sm:px-6 py-2 rounded-lg transition-colors whitespace-nowrap inline-flex items-center justify-center w-full sm:w-auto"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                >
                  Refer a Friend
                </Link>
              </div>
            </div>
          </div>
        )}

        {showCopyTradingBanner && (
          <div className="bg-gray-800 text-white rounded-lg p-4 sm:p-6 relative">
            <button
              onClick={() => setShowCopyTradingBanner(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div className="flex-1 pr-0 sm:pr-6">
                <h3 className="mb-2 text-lg sm:text-2xl text-white" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Copy trades to diversify your portfolio
                </h3>
                <p className="text-gray-300 text-sm sm:text-base" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  Follow successful traders to copy their strategies instantly
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  className="bg-[#00A896] hover:bg-[#008f7a] text-white px-4 sm:px-6 py-2 rounded-lg transition-colors whitespace-nowrap inline-flex items-center justify-center w-full sm:w-auto"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
                >
                  Start now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Account Summary */}
        <div>
          <h2 className="mb-3 text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400', color: '#374151' }}>
            Account Summary
          </h2>
          <div className="bg-white rounded-lg shadow">
            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 md:divide-y-0 lg:divide-y-0 sm:divide-x-0 md:divide-x-0 lg:divide-x divide-gray-200">
              
              {/* Total Balance */}
              <div className="p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Balance</h3>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                      <rect x="7" y="7" width="10" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-800 text-sm sm:text-base lg:text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
              </div>

              {/* Total Credit */}
              <div className="p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Credit</h3>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                      <rect x="7" y="7" width="10" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-800 text-sm sm:text-base lg:text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
              </div>

              {/* Total Equity */}
              <div className="p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Equity</h3>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                      <rect x="7" y="7" width="10" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-800 text-sm sm:text-base lg:text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
              </div>

              {/* Total Deposits */}
              <div className="p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Deposits</h3>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                      <rect x="7" y="8" width="10" height="8" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v5m0 0l-2-2m2 2l2-2" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-800 text-sm sm:text-base lg:text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
              </div>

              {/* Total Withdrawals */}
              <div className="p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>Total Withdrawals</h3>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                      <rect x="7" y="8" width="10" height="8" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16V11m0 0l-2 2m2-2l2 2" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-800 text-sm sm:text-base lg:text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>0.00 USD</p>
              </div>

            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h2 className="text-lg text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', fontWeight: '400', color: '#374151' }}>
              Recent Activity
            </h2>
            <button className="text-gray-400 hover:text-gray-600 text-sm sm:text-base self-start sm:self-auto" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
              View More
            </button>
          </div>
          <div className="space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-200 gap-2">
              <div>
                <p className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>21/11/2025 15:51 New account application</p>
              </div>
              <span className="px-3 py-1 text-orange-600 rounded text-sm sm:text-base self-start sm:self-auto" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Live Accounts */}
        <div className="w-full">
          {/* Header - Outside Card */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
            <h2 className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', fontWeight: '400', color: '#374151' }}>
              Live Accounts
            </h2>
            <Link
              to="/user/addaccount/live"
              className="bg-white hover:bg-gray-50 text-gray-500 px-4 py-2 rounded transition-colors border border-gray-300 inline-flex items-center gap-1.5 justify-center sm:justify-start"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Account
            </Link>
          </div>

          {/* Table Card - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#EAECEE' }}>
                    <th className="px-4 py-4 text-left uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Account Details</th>
                    <th className="px-4 py-4 text-right uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Leverage</th>
                    <th className="px-4 py-4 text-right uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Equity</th>
                    <th className="px-4 py-4 text-right uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Balance</th>
                    <th className="px-4 py-4 text-right uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Margin</th>
                    <th className="px-4 py-4 text-right uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Credit</th>
                    <th className="w-16"></th>
                    <th className="px-4 py-4 text-left uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Platforms</th>
                    <th className="px-4 py-4 text-center uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Action</th>
                    <th className="px-4 py-4 text-center uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#4B5156' }}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3.5 flex-nowrap">
                        <span className="px-2 py-1 bg-green-500 text-white rounded text-xs whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>USD</span>
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <button className="text-gray-400 hover:text-gray-600" title="Copy">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <span className="text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#374151' }}>1013516260</span>
                            <button className="text-gray-400 hover:text-gray-600 relative">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
                              </svg>
                            </button>
                          </div>
                          <small>
                            <span className="font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '700' }}>MT5</span>
                            <span className="text-gray-600 ml-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>Standard</span>
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#374151' }}>1:2000</td>
                    <td className="px-4 py-2 text-right text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#374151' }}>0.00</td>
                    <td className="px-4 py-2 text-right text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#374151' }}>0.0000</td>
                    <td className="px-4 py-2 text-right text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#374151' }}>0.00</td>
                    <td className="px-4 py-2 text-right text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', color: '#374151' }}>0.00</td>
                    <td className="py-2"></td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Link
                        to="/user/deposits"
                        className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-[#00A896] px-3 py-1.5 rounded border border-[#00A896] transition-colors"
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="5" y="7" width="14" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v6m0 0l-2.5-2.5m2.5 2.5l2.5-2.5" />
                        </svg>
                        <span>Deposit</span>
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
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
                  <tr>
                    <td colSpan="10" className="px-4 py-1 bg-gray-100"></td>
                  </tr>
                  <tr className="border-t border-gray-200" style={{ backgroundColor: '#F9FAFB' }}>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3.5 flex-nowrap">
                        <span className="px-2 py-1 bg-green-500 text-white rounded text-xs whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>USD</span>
                        <span className="text-gray-800 font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Total</span>
                      </div>
                    </td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2 text-right text-gray-800 font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="px-4 py-2 text-right text-gray-800 font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="px-4 py-2 text-right text-gray-800 font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="px-4 py-2 text-right text-gray-800 font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '600', color: '#374151' }}>0.00</td>
                    <td className="py-2"></td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Mobile Card View - Visible on mobile and tablet, hidden on desktop */}
          <div className="lg:hidden space-y-4">
            {/* Account Card */}
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              {/* Account Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-500 text-white rounded text-xs whitespace-nowrap">USD</span>
                  <span className="text-gray-800 font-semibold text-sm">1013516260</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Platform</p>
                  <p className="text-gray-800 font-semibold text-sm">MT5 Standard</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Leverage</p>
                  <p className="text-gray-800 font-semibold text-sm">1:2000</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Equity</p>
                  <p className="text-gray-800 font-semibold text-sm">0.00</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Balance</p>
                  <p className="text-gray-800 font-semibold text-sm">0.0000</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Margin</p>
                  <p className="text-gray-800 font-semibold text-sm">0.00</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Credit</p>
                  <p className="text-gray-800 font-semibold text-sm">0.00</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-gray-600 text-xs hover:bg-gray-50">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Platform
                </button>
                <button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-gray-600 text-xs hover:bg-gray-50">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Verified
                </button>
              </div>

              {/* Primary Actions */}
              <div className="flex gap-2">
                <Link
                  to="/user/deposits"
                  className="flex-1 bg-[#00A896] hover:bg-[#008f7a] text-white px-4 py-2 rounded text-center text-sm font-medium transition-colors"
                >
                  Deposit
                </Link>
                <button className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Total Summary Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-green-500 text-white rounded text-xs whitespace-nowrap">USD</span>
                <span className="text-gray-800 font-semibold">Total</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Equity: </span>
                  <span className="text-gray-800 font-semibold">0.00</span>
                </div>
                <div>
                  <span className="text-gray-500">Balance: </span>
                  <span className="text-gray-800 font-semibold">0.00</span>
                </div>
                <div>
                  <span className="text-gray-500">Margin: </span>
                  <span className="text-gray-800 font-semibold">0.00</span>
                </div>
                <div>
                  <span className="text-gray-500">Credit: </span>
                  <span className="text-gray-800 font-semibold">0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* ================= DEMO ACCOUNTS ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Demo Accounts
          </h2>
          <button className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-md hover:bg-gray-50 transition text-sm sm:text-base">
            <AiOutlinePlus /> Create Account
          </button>
        </div>

        {/* Demo Card */}
        <div className="bg-white border border-gray-200 rounded-lg w-full py-8 sm:py-12 flex items-center justify-center text-gray-500 text-sm sm:text-base mb-8 sm:mb-12 text-center px-4">
          Practice and master your trading skills.
        </div>

        {/* ================= WALLET ACCOUNTS ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Wallet Accounts
          </h2>
          <button className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-md hover:bg-gray-50 transition text-sm sm:text-base">
            <AiOutlinePlus /> Create Account
          </button>
        </div>

        {/* Wallet Card */}
        <div className="bg-white border border-gray-200 rounded-lg w-full p-4 sm:p-6">
          
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            {/* Left Section - Mobile */}
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold bg-[#e5f5ea] text-green-700 rounded-md">
                  USD
                </span>
                <span className="text-teal-600 font-semibold text-sm">
                  W-2337894-001
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                Balance <span className="font-bold text-gray-800">0.000</span>
              </div>
            </div>

            {/* Buttons - Mobile */}
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center gap-1 border rounded-md px-3 py-2 text-xs hover:bg-gray-50 transition">
                <RiLoginBoxLine className="text-teal-600 w-4 h-4" />
                <span>Deposit</span>
              </button>
              <button className="flex flex-col items-center gap-1 border rounded-md px-3 py-2 text-xs hover:bg-gray-50 transition">
                <RiArrowLeftRightLine className="text-gray-600 w-4 h-4" />
                <span>Transfer</span>
              </button>
              <button className="flex flex-col items-center gap-1 border rounded-md px-3 py-2 text-xs hover:bg-gray-50 transition">
                <RiLogoutBoxLine className="text-gray-600 w-4 h-4" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left Section - Desktop */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <span className="px-3 py-1 text-xs font-semibold bg-[#e5f5ea] text-green-700 rounded-md">
                USD
              </span>
              <span className="text-teal-600 font-semibold text-sm md:text-base">
                W-2337894-001
              </span>
              <span className="text-gray-500 text-sm md:ml-4">
                Balance <span className="font-bold text-gray-800">0.000</span>
              </span>
            </div>

            {/* Buttons - Desktop */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition">
                <RiLoginBoxLine className="text-teal-600" />
                Deposit
              </button>
              <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition">
                <RiArrowLeftRightLine className="text-gray-600" />
                Transfer
              </button>
              <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition">
                <RiLogoutBoxLine className="text-gray-600" />
                Withdraw
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard
