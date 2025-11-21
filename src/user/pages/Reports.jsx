import { useState } from 'react'

function Reports() {
  const [selectedReport, setSelectedReport] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(true)

  const reportOptions = [
    { value: '', label: 'Please select a report' },
    { value: 'account-statement-mt4', label: 'Account Statement - MT4' },
    { value: 'account-statement-mt5', label: 'Account Statement - MT5' },
    { value: 'daily-summary-mt4', label: 'Daily Account Summary - MT4' },
    { value: 'daily-summary-mt5', label: 'Daily Account Summary - MT5' },
    { value: 'daily-summary-wallet', label: 'Daily Account Summary - Wallet' },
    { value: 'transaction-history', label: 'Transaction History' }
  ]

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Reports
        </h1>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Report Selection Dropdown */}
            <div className="flex-1">
              <div className="relative">
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: selectedReport ? '#000000' : '#6B7280' }}
                >
                  {reportOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Open in New Tab Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="openInNewTab"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#00A896] focus:ring-[#00A896] cursor-pointer"
              />
              <label
                htmlFor="openInNewTab"
                className="cursor-pointer"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}
              >
                Open in a new tab
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
