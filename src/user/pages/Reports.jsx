import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.js'

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Reports() {
  const navigate = useNavigate()
  const [selectedReport, setSelectedReport] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [mt5Transactions, setMt5Transactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMt5, setLoadingMt5] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState('')
  const [mt5Accounts, setMt5Accounts] = useState([])

  // Datatable state for MT5 transactions
  const [mt5SearchQuery, setMt5SearchQuery] = useState('')
  const [mt5FilterType, setMt5FilterType] = useState('')
  const [mt5FilterStatus, setMt5FilterStatus] = useState('')
  const [mt5DateFrom, setMt5DateFrom] = useState('')
  const [mt5DateTo, setMt5DateTo] = useState('')
  const [mt5SortConfig, setMt5SortConfig] = useState({ key: null, direction: 'asc' })
  const [mt5CurrentPage, setMt5CurrentPage] = useState(1)
  const [mt5PageSize, setMt5PageSize] = useState(10)

  const reportOptions = [
    { value: '', label: 'Please select a report' },
    { value: 'account-statement-mt5', label: 'Account Statement - MT5' },
    { value: 'transaction-history', label: 'Transaction History' }
  ]

  // Fetch MT5 accounts
  useEffect(() => {
    const fetchMt5Accounts = async () => {
      try {
        const token = authService.getToken()
        if (!token) return

        const response = await fetch(`${API_BASE_URL}/accounts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()
        if (data.success) {
          const all = Array.isArray(data.data) ? data.data : []
          const mt5 = all.filter(
            (acc) => (acc.platform || '').toUpperCase() === 'MT5'
          )
          setMt5Accounts(mt5)
        }
      } catch (error) {
        console.error('Error fetching MT5 accounts:', error)
      }
    }

    fetchMt5Accounts()
  }, [])

  useEffect(() => {
    if (selectedReport === 'transaction-history') {
      fetchTransactionHistory()
      setMt5Transactions([])
    } else if (selectedReport === 'account-statement-mt5') {
      fetchMt5AccountStatement()
      setTransactions([])
    } else {
      setTransactions([])
      setMt5Transactions([])
    }
  }, [selectedReport, selectedAccount])

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true)
      const token = authService.getToken()
      const response = await fetch(`${API_BASE_URL}/reports/transaction-history?limit=1000`, {
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

  const fetchMt5AccountStatement = async () => {
    try {
      setLoadingMt5(true)
      const token = authService.getToken()
      const url = `${API_BASE_URL}/reports/mt5-account-statement?limit=1000${selectedAccount ? `&accountNumber=${selectedAccount}` : ''}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setMt5Transactions(data.data.transactions || [])
        }
      }
    } catch (error) {
      console.error('Error fetching MT5 account statement:', error)
    } finally {
      setLoadingMt5(false)
    }
  }

  const handleOpenInNewTab = () => {
    if (openInNewTab && selectedReport) {
      const url = `/user/reports?report=${selectedReport}${selectedAccount ? `&account=${selectedAccount}` : ''}`
      window.open(url, '_blank')
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const token = authService.getToken()
      const url = `${API_BASE_URL}/reports/mt5-account-statement/download/pdf${selectedAccount ? `?accountNumber=${encodeURIComponent(selectedAccount)}` : ''}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `MT5_Account_Statement_${selectedAccount || 'All'}_${Date.now()}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF')
    }
  }

  const handleDownloadExcel = async () => {
    try {
      const token = authService.getToken()
      const url = `${API_BASE_URL}/reports/mt5-account-statement/download/excel${selectedAccount ? `?accountNumber=${encodeURIComponent(selectedAccount)}` : ''}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `MT5_Account_Statement_${selectedAccount || 'All'}_${Date.now()}.xlsx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error downloading Excel:', error)
      alert('Failed to download Excel')
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

  // Filter and sort MT5 transactions
  const filteredAndSortedMt5 = useMemo(() => {
    let filtered = [...mt5Transactions]

    // Search filter
    if (mt5SearchQuery) {
      const query = mt5SearchQuery.toLowerCase()
      filtered = filtered.filter((tx) => {
        return (
          tx.type?.toLowerCase().includes(query) ||
          tx.description?.toLowerCase().includes(query) ||
          tx.mt5AccountId?.toString().includes(query) ||
          tx.reference?.toLowerCase().includes(query) ||
          tx.amount?.toString().includes(query) ||
          tx.status?.toLowerCase().includes(query)
        )
      })
    }

    // Type filter
    if (mt5FilterType) {
      filtered = filtered.filter((tx) => tx.type === mt5FilterType)
    }

    // Status filter
    if (mt5FilterStatus) {
      filtered = filtered.filter((tx) => tx.status === mt5FilterStatus)
    }

    // Date range filter
    if (mt5DateFrom) {
      const fromDate = new Date(mt5DateFrom)
      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.createdAt)
        return txDate >= fromDate
      })
    }
    if (mt5DateTo) {
      const toDate = new Date(mt5DateTo)
      toDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.createdAt)
        return txDate <= toDate
      })
    }

    // Sorting
    if (mt5SortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[mt5SortConfig.key]
        let bVal = b[mt5SortConfig.key]

        if (mt5SortConfig.key === 'createdAt') {
          aVal = new Date(aVal).getTime()
          bVal = new Date(bVal).getTime()
        }

        if (mt5SortConfig.key === 'amount') {
          aVal = Number(aVal)
          bVal = Number(bVal)
        }

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (aVal < bVal) return mt5SortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return mt5SortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [mt5Transactions, mt5SearchQuery, mt5FilterType, mt5FilterStatus, mt5DateFrom, mt5DateTo, mt5SortConfig])

  // MT5 pagination
  const mt5TotalPages = Math.max(1, Math.ceil(filteredAndSortedMt5.length / mt5PageSize))
  const paginatedMt5Transactions = useMemo(() => {
    const start = (mt5CurrentPage - 1) * mt5PageSize
    return filteredAndSortedMt5.slice(start, start + mt5PageSize)
  }, [filteredAndSortedMt5, mt5CurrentPage, mt5PageSize])

  const handleMt5Sort = (key) => {
    setMt5SortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const resetMt5Filters = () => {
    setMt5SearchQuery('')
    setMt5FilterType('')
    setMt5FilterStatus('')
    setMt5DateFrom('')
    setMt5DateTo('')
    setMt5SortConfig({ key: null, direction: 'asc' })
    setMt5CurrentPage(1)
  }

  const getMt5SortIcon = (columnKey) => {
    if (mt5SortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return mt5SortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
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

          {/* MT5 Account Statement Datatable */}
          {selectedReport === 'account-statement-mt5' && (
            <div className="mt-6">
              {loadingMt5 ? (
                <div className="text-center py-8 text-gray-500">Loading MT5 account statement...</div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {/* Filters and Search Bar */}
                  <div className="p-4 border-b border-gray-200 space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Search */}
                      <div className="flex-1">
                        <div className="relative">
                          <input
                            type="text"
                            value={mt5SearchQuery}
                            onChange={(e) => {
                              setMt5SearchQuery(e.target.value)
                              setMt5CurrentPage(1)
                            }}
                            placeholder="Search transactions..."
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none"
                          />
                          <svg
                            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>

                      {/* Filter Dropdowns */}
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={mt5FilterType}
                          onChange={(e) => {
                            setMt5FilterType(e.target.value)
                            setMt5CurrentPage(1)
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                        >
                          <option value="">All Types</option>
                          <option value="deposit">Deposit</option>
                          <option value="withdrawal">Withdrawal</option>
                        </select>

                        <select
                          value={mt5FilterStatus}
                          onChange={(e) => {
                            setMt5FilterStatus(e.target.value)
                            setMt5CurrentPage(1)
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                        >
                          <option value="">All Status</option>
                          <option value="completed">Completed</option>
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        <input
                          type="date"
                          value={mt5DateFrom}
                          onChange={(e) => {
                            setMt5DateFrom(e.target.value)
                            setMt5CurrentPage(1)
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                          placeholder="From Date"
                        />

                        <input
                          type="date"
                          value={mt5DateTo}
                          onChange={(e) => {
                            setMt5DateTo(e.target.value)
                            setMt5CurrentPage(1)
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                          placeholder="To Date"
                        />

                        <button
                          onClick={resetMt5Filters}
                          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Results count and page size */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Showing {paginatedMt5Transactions.length} of {filteredAndSortedMt5.length} transactions
                      </span>
                      <div className="flex items-center gap-2">
                        <span>Rows per page:</span>
                        <select
                          value={mt5PageSize}
                          onChange={(e) => {
                            setMt5PageSize(Number(e.target.value))
                            setMt5CurrentPage(1)
                          }}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[#00A896] outline-none text-sm"
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Desktop table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                            onClick={() => handleMt5Sort('createdAt')}
                          >
                            <div className="flex items-center gap-2">
                              Date & Time
                              {getMt5SortIcon('createdAt')}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                            onClick={() => handleMt5Sort('type')}
                          >
                            <div className="flex items-center gap-2">
                              Type
                              {getMt5SortIcon('type')}
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            Description
                          </th>
                          <th
                            className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                            onClick={() => handleMt5Sort('amount')}
                          >
                            <div className="flex items-center justify-end gap-2">
                              Amount
                              {getMt5SortIcon('amount')}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                            onClick={() => handleMt5Sort('status')}
                          >
                            <div className="flex items-center gap-2">
                              Status
                              {getMt5SortIcon('status')}
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            Account
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedMt5Transactions.length === 0 ? (
                          <tr>
                            <td className="px-4 py-4 text-center text-gray-500" colSpan={6}>
                              <div className="flex flex-col items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-600 font-medium">No MT5 transactions found</p>
                                <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          paginatedMt5Transactions.map((tx) => (
                            <tr key={tx.id} className="border-t border-gray-100 hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                <div className="flex flex-col">
                                  <span className="font-medium">{new Date(tx.createdAt).toLocaleDateString()}</span>
                                  <span className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleTimeString()}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                  tx.type === 'deposit' 
                                    ? 'bg-green-100 text-green-800'
                                    : tx.type === 'withdrawal'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {tx.type}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                <span className="truncate max-w-xs block" title={tx.description}>
                                  {tx.description}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium whitespace-nowrap">
                                {tx.amount ? `${tx.currency || 'USD'} ${Number(tx.amount).toFixed(2)}` : '-'}
                              </td>
                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  tx.status === 'completed' || tx.status === 'approved'
                                    ? 'bg-green-100 text-green-800'
                                    : tx.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {tx.status || 'Completed'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {tx.mt5AccountId ? (
                                  <span className="font-mono text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                    {tx.mt5AccountId}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden divide-y divide-gray-100 bg-white">
                    {paginatedMt5Transactions.length === 0 ? (
                      <div className="p-8 text-center">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600 font-medium">No MT5 transactions found</p>
                        <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
                      </div>
                    ) : (
                      paginatedMt5Transactions.map((tx) => (
                        <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                  tx.type === 'deposit' 
                                    ? 'bg-green-100 text-green-800'
                                    : tx.type === 'withdrawal'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {tx.type}
                                </span>
                                <span className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="text-sm text-gray-700 mb-1">{tx.description}</div>
                              {tx.mt5AccountId && (
                                <div className="text-xs text-gray-500 font-mono">MT5: {tx.mt5AccountId}</div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">
                                {tx.amount ? `${tx.currency || 'USD'} ${Number(tx.amount).toFixed(2)}` : '-'}
                              </div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                tx.status === 'completed' || tx.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : tx.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {tx.status || 'Completed'}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-2">
                            {new Date(tx.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 gap-3">
                    <div className="text-sm text-gray-600 order-2 sm:order-1">
                      Showing <span className="font-medium">{((mt5CurrentPage - 1) * mt5PageSize) + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(mt5CurrentPage * mt5PageSize, filteredAndSortedMt5.length)}</span> of{' '}
                      <span className="font-medium">{filteredAndSortedMt5.length}</span> transactions
                    </div>
                    <div className="flex items-center gap-2 order-1 sm:order-2">
                      <button
                        onClick={() => setMt5CurrentPage((p) => Math.max(1, p - 1))}
                        disabled={mt5CurrentPage <= 1}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-sm font-medium"
                      >
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">Prev</span>
                      </button>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, mt5TotalPages) }, (_, i) => {
                          let pageNum
                          if (mt5TotalPages <= 5) {
                            pageNum = i + 1
                          } else if (mt5CurrentPage <= 3) {
                            pageNum = i + 1
                          } else if (mt5CurrentPage >= mt5TotalPages - 2) {
                            pageNum = mt5TotalPages - 4 + i
                          } else {
                            pageNum = mt5CurrentPage - 2 + i
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setMt5CurrentPage(pageNum)}
                              className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition ${
                                mt5CurrentPage === pageNum
                                  ? 'bg-[#00A896] text-white border-[#00A896] shadow-sm'
                                  : 'border-gray-300 hover:bg-white hover:border-gray-400'
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}
                      </div>
                      <button
                        onClick={() => setMt5CurrentPage((p) => Math.min(mt5TotalPages, p + 1))}
                        disabled={mt5CurrentPage >= mt5TotalPages}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-sm font-medium"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
