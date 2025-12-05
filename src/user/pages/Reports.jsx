import { useState, useEffect } from 'react'
import authService from '../../services/auth.js'

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Reports() {
  const [selectedReport, setSelectedReport] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const reportOptions = [
    { value: '', label: 'Please select a report' },
    { value: 'account-statement-mt5', label: 'Account Statement - MT5' },
    { value: 'transaction-history', label: 'Transaction History' }
  ]

  useEffect(() => {
    if (selectedReport === 'transaction-history') {
      fetchTransactionHistory()
    } else {
      setTransactions([])
    }
  }, [selectedReport])

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true)
      const token = authService.getToken()
      const response = await fetch(`${API_BASE_URL}/reports/transaction-history?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setTransactions(data.data.transactions || [])
        }
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatAmount = (amount, currency = 'USD') => {
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 overflow-x-hidden" style={{ background: 'linear-gradient(to right, #E5E7EB 0%, #FFFFFF 20%, #FFFFFF 80%, #E5E7EB 100%)' }}>
      <div className="w-full max-w-[95%] mx-auto bg-gray-100 rounded-lg">
        <div className="w-full mx-auto p-4 md:p-6">
        <h1 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
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

          {/* Transaction History Table */}
          {selectedReport === 'transaction-history' && (
            <div className="mt-6">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading transaction history...</div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No transactions found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Account</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{formatDate(tx.createdAt)}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tx.type === 'deposit' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {tx.type === 'deposit' ? 'Deposit' : 'Account Created'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{tx.description}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {tx.amount ? formatAmount(tx.amount, tx.currency) : '-'}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {tx.status ? (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tx.status === 'approved' 
                                  ? 'bg-green-100 text-green-800'
                                  : tx.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {tx.status}
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Completed
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {tx.mt5AccountId ? (
                              <span className="text-purple-600">MT5: {tx.mt5AccountId}</span>
                            ) : tx.walletNumber ? (
                              <span className="text-blue-600">Wallet: {tx.walletNumber}</span>
                            ) : tx.accountNumber ? (
                              <span className="text-green-600">MT5: {tx.accountNumber}</span>
                            ) : (
                              '-'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
