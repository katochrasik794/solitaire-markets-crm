import { useEffect, useState, useMemo } from 'react'
import authService from '../../services/auth.js'
import Toast from '../../components/Toast.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Transfers() {
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [amount, setAmount] = useState('')

  const [wallet, setWallet] = useState(null)
  const [mt5Accounts, setMt5Accounts] = useState([])
  const [mt5Balances, setMt5Balances] = useState({}) // { account_number: balance }
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Datatable state
  const [allTransactions, setAllTransactions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterSource, setFilterSource] = useState('')
  const [filterTarget, setFilterTarget] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [toast, setToast] = useState(null)

  // Load wallet + MT5 accounts + all transactions for client-side filtering
  useEffect(() => {
    const load = async () => {
      try {
        const token = authService.getToken()
        if (!token) return

        const headers = { Authorization: `Bearer ${token}` }

        // Fetch all transactions (use a large limit to get all)
        const [walletRes, accountsRes, txRes] = await Promise.all([
          fetch(`${API_BASE_URL}/wallet`, { headers }),
          fetch(`${API_BASE_URL}/accounts`, { headers }),
          fetch(`${API_BASE_URL}/wallet/transactions?limit=1000&offset=0`, { headers }),
        ])

        const walletData = await walletRes.json()
        if (walletData.success) setWallet(walletData.data)

        const accountsData = await accountsRes.json()
        if (accountsData.success) {
          const all = Array.isArray(accountsData.data) ? accountsData.data : []
          const mt5 = all.filter(
            (acc) => (acc.platform || '').toUpperCase() === 'MT5'
          )
          setMt5Accounts(mt5)
          
          // Fetch balances for MT5 accounts (placeholder for now - would need MT5 API call)
          const balances = {}
          mt5.forEach(acc => {
            balances[acc.account_number] = acc.balance || 0 // Use balance if available, else 0
          })
          setMt5Balances(balances)
        }

        const txData = await txRes.json()
        if (txData.success && txData.data) {
          setAllTransactions(txData.data.items || [])
        }
      } catch (err) {
        console.error('Load transfers page error:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const reloadTransactions = async () => {
    try {
      const token = authService.getToken()
      if (!token) return

      const headers = { Authorization: `Bearer ${token}` }
      const res = await fetch(
        `${API_BASE_URL}/wallet/transactions?limit=1000&offset=0`,
        { headers }
      )
      const data = await res.json()
      if (data.success && data.data) {
        setAllTransactions(data.data.items || [])
        setCurrentPage(1) // Reset to first page
      }
    } catch (err) {
      console.error('Reload wallet transactions error:', err)
    }
  }

  // Filter and sort transactions
  const filteredAndSorted = useMemo(() => {
    let filtered = [...allTransactions]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((tx) => {
        return (
          tx.type?.toLowerCase().includes(query) ||
          tx.source?.toLowerCase().includes(query) ||
          tx.target?.toLowerCase().includes(query) ||
          tx.mt5_account_number?.toLowerCase().includes(query) ||
          tx.reference?.toLowerCase().includes(query) ||
          tx.amount?.toString().includes(query)
        )
      })
    }

    // Type filter
    if (filterType) {
      filtered = filtered.filter((tx) => tx.type === filterType)
    }

    // Source filter
    if (filterSource) {
      filtered = filtered.filter((tx) => tx.source === filterSource)
    }

    // Target filter
    if (filterTarget) {
      filtered = filtered.filter((tx) => tx.target === filterTarget)
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.created_at)
        return txDate >= fromDate
      })
    }
    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999) // End of day
      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.created_at)
        return txDate <= toDate
      })
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key]
        let bVal = b[sortConfig.key]

        // Handle dates
        if (sortConfig.key === 'created_at') {
          aVal = new Date(aVal).getTime()
          bVal = new Date(bVal).getTime()
        }

        // Handle numbers
        if (sortConfig.key === 'amount') {
          aVal = Number(aVal)
          bVal = Number(bVal)
        }

        // Handle strings
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [allTransactions, searchQuery, filterType, filterSource, filterTarget, dateFrom, dateTo, sortConfig])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize))
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredAndSorted.slice(start, start + pageSize)
  }, [filteredAndSorted, currentPage, pageSize])

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const resetFilters = () => {
    setSearchQuery('')
    setFilterType('')
    setFilterSource('')
    setFilterTarget('')
    setDateFrom('')
    setDateTo('')
    setSortConfig({ key: null, direction: 'asc' })
    setCurrentPage(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fromAccount || !toAccount || !amount) {
      setToast({ message: 'Please select accounts and amount', type: 'error' })
      return
    }
    if (fromAccount === toAccount) {
      setToast({ message: 'From and To accounts must be different', type: 'error' })
      return
    }

    const isFromWallet = fromAccount === 'wallet'
    const isToWallet = toAccount === 'wallet'

    if (!(isFromWallet ^ isToWallet)) {
      setToast({
        message: 'Only transfers between Wallet and MT5 accounts are allowed',
        type: 'error',
      })
      return
    }

    const mt5Account = isFromWallet ? toAccount : fromAccount

    setSubmitting(true)
    try {
      const token = authService.getToken()
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      let endpoint = ''
      if (isFromWallet && !isToWallet) {
        endpoint = '/wallet/transfer-to-mt5'
      } else if (!isFromWallet && isToWallet) {
        endpoint = '/wallet/transfer-from-mt5'
      }

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          mt5Account,
          amount: parseFloat(amount),
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Transfer failed')
      }

      setToast({
        message: 'Transfer completed successfully',
        type: 'success',
      })

      // Refresh wallet and transactions
      const walletRes = await fetch(`${API_BASE_URL}/wallet`, { headers })
      const walletData = await walletRes.json()
      if (walletData.success) setWallet(walletData.data)
      await reloadTransactions()

      // Reset form
      setFromAccount('')
      setToAccount('')
      setAmount('')
    } catch (err) {
      console.error('Transfer error:', err)
      setToast({ message: err.message || 'Transfer failed', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const formatDateTime = (value) => {
    if (!value) return '-'
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return '-'
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  // Get available balance for selected account
  const getAvailableBalance = () => {
    if (fromAccount === 'wallet') {
      return wallet ? Number(wallet.balance) : 0
    } else if (fromAccount) {
      return mt5Balances[fromAccount] || 0
    }
    return 0
  }

  const availableBalance = getAvailableBalance()

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-6 overflow-x-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="w-full">
        <h1
          className="text-left p-4 md:p-6 pb-0 mb-4"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '20px',
            color: '#000000',
            fontWeight: '400',
          }}
        >
          Move Funds
        </h1>

        {/* Transfer Form */}
        <div className="w-full pb-4 md:pb-6">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Side-by-side Account Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* From Account - Left */}
                  <div className="bg-white rounded-lg p-5 border-2 border-gray-200 shadow-sm">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-700"
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                      }}
                    >
                      From Account
                    </label>
                    <div className="relative mb-3">
                      <select
                        value={fromAccount}
                        onChange={(e) => {
                          setFromAccount(e.target.value)
                          setAmount('') // Reset amount when account changes
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-[#00A896] focus:border-[#00A896] outline-none transition-all"
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}
                      >
                        <option value="">Choose an account</option>
                        {wallet && toAccount !== 'wallet' && (
                          <option value="wallet">
                            {wallet.wallet_number} (Wallet - {wallet.currency})
                          </option>
                        )}
                        {mt5Accounts
                          .filter((acc) => acc.account_number !== toAccount)
                          .map((acc) => (
                            <option key={acc.id} value={acc.account_number}>
                              {acc.account_number} (MT5 - {acc.account_type} - {acc.currency})
                            </option>
                          ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Balance Display */}
                    {fromAccount && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Available Balance</div>
                        <div className="text-xl font-bold text-gray-900">
                          ${availableBalance.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* To Account - Right */}
                  <div className="bg-white rounded-lg p-5 border-2 border-gray-200 shadow-sm">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-700"
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                      }}
                    >
                      To Account
                    </label>
                    <div className="relative mb-3">
                      <select
                        value={toAccount}
                        onChange={(e) => {
                          setToAccount(e.target.value)
                          setAmount('') // Reset amount when account changes
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-[#00A896] focus:border-[#00A896] outline-none transition-all"
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px' }}
                      >
                        <option value="">Choose an account</option>
                        {wallet && fromAccount !== 'wallet' && (
                          <option value="wallet">
                            {wallet.wallet_number} (Wallet - {wallet.currency})
                          </option>
                        )}
                        {mt5Accounts
                          .filter((acc) => acc.account_number !== fromAccount)
                          .map((acc) => (
                            <option key={acc.id} value={acc.account_number}>
                              {acc.account_number} (MT5 - {acc.account_type} - {acc.currency})
                            </option>
                          ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Balance Display */}
                    {toAccount && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Current Balance</div>
                        <div className="text-xl font-bold text-gray-900">
                          ${toAccount === 'wallet' 
                            ? (wallet ? Number(wallet.balance).toFixed(2) : '0.00')
                            : (mt5Balances[toAccount] || 0).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transfer Amount with Range Slider */}
                <div className="bg-white rounded-lg p-5 border-2 border-gray-200 shadow-sm">
                  <label
                    className="block mb-3 text-sm font-semibold text-gray-700"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                    }}
                  >
                    Transfer Amount
                  </label>
                  
                  {/* Amount Input */}
                  <div className="mb-4">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === '' || (Number(val) >= 0 && Number(val) <= availableBalance)) {
                          setAmount(val)
                        }
                      }}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#00A896] focus:border-[#00A896] outline-none text-lg font-semibold"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                      min="0"
                      max={availableBalance}
                      step="0.01"
                    />
                  </div>

                  {/* Range Slider */}
                  {fromAccount && availableBalance > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>$0.00</span>
                        <span>${availableBalance.toFixed(2)}</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max={availableBalance}
                          step="0.01"
                          value={amount || 0}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: availableBalance > 0 
                              ? `linear-gradient(to right, #00A896 0%, #00A896 ${((Number(amount) || 0) / availableBalance) * 100}%, #e5e7eb ${((Number(amount) || 0) / availableBalance) * 100}%, #e5e7eb 100%)`
                              : '#e5e7eb'
                          }}
                        />
                        <style>{`
                          input[type="range"]::-webkit-slider-thumb {
                            appearance: none;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: #00A896;
                            cursor: pointer;
                            border: 2px solid white;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                          }
                          input[type="range"]::-moz-range-thumb {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: #00A896;
                            cursor: pointer;
                            border: 2px solid white;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                          }
                        `}</style>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <button
                          type="button"
                          onClick={() => setAmount((availableBalance * 0.25).toFixed(2))}
                          className="hover:text-[#00A896] transition"
                        >
                          25%
                        </button>
                        <button
                          type="button"
                          onClick={() => setAmount((availableBalance * 0.5).toFixed(2))}
                          className="hover:text-[#00A896] transition"
                        >
                          50%
                        </button>
                        <button
                          type="button"
                          onClick={() => setAmount((availableBalance * 0.75).toFixed(2))}
                          className="hover:text-[#00A896] transition"
                        >
                          75%
                        </button>
                        <button
                          type="button"
                          onClick={() => setAmount(availableBalance.toFixed(2))}
                          className="hover:text-[#00A896] transition"
                        >
                          100%
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !fromAccount || !toAccount || !amount || Number(amount) <= 0 || Number(amount) > availableBalance}
                  className="w-full bg-gradient-to-r from-[#e6c200] to-[#d4b000] hover:from-[#d4b000] hover:to-[#c2a000] text-gray-900 font-bold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Transfer Funds'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Transactions Datatable */}
        <div className="w-full pb-8 md:pb-10">
          <h2
            className="text-left mt-6 mb-3"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              color: '#000000',
              fontWeight: '500',
            }}
          >
            Wallet Transactions
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Filters and Search Bar */}
            <div className="p-4 border-b border-gray-200 space-y-4">
              {/* Search and Filters Row */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                    <option value="transfer_in">Transfer In</option>
                    <option value="transfer_out">Transfer Out</option>
                  </select>

                  <select
                    value={filterSource}
                    onChange={(e) => {
                      setFilterSource(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                  >
                    <option value="">All Sources</option>
                    <option value="wallet">Wallet</option>
                    <option value="mt5">MT5</option>
                  </select>

                  <select
                    value={filterTarget}
                    onChange={(e) => {
                      setFilterTarget(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                  >
                    <option value="">All Targets</option>
                    <option value="wallet">Wallet</option>
                    <option value="mt5">MT5</option>
                  </select>

                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                    placeholder="From Date"
                  />

                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                    placeholder="To Date"
                  />

                  <button
                    onClick={resetFilters}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Results count and page size */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {paginatedTransactions.length} of {filteredAndSorted.length} transactions
                </span>
                <div className="flex items-center gap-2">
                  <span>Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value))
                      setCurrentPage(1)
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
                      onClick={() => handleSort('created_at')}
                    >
                      <div className="flex items-center gap-2">
                        Time
                        {getSortIcon('created_at')}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center gap-2">
                        Type
                        {getSortIcon('type')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Source → Target
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Amount
                        {getSortIcon('amount')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      MT5 Account
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-4 text-center text-gray-500"
                        colSpan={6}
                      >
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    paginatedTransactions.map((tx) => (
                      <tr key={tx.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {formatDateTime(tx.created_at)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                          {tx.type.replace('_', ' ')}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tx.source} → {tx.target}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          ${Number(tx.amount).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tx.mt5_account_number || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {tx.reference || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {paginatedTransactions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No transactions found
                </div>
              ) : (
                paginatedTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatDateTime(tx.created_at)}</span>
                      <span className="capitalize">{tx.type.replace('_', ' ')}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      {tx.source} → {tx.target}
                    </div>
                    <div className="text-sm text-gray-900 font-semibold">
                      ${Number(tx.amount).toFixed(2)} {tx.currency}
                    </div>
                    {tx.mt5_account_number && (
                      <div className="text-xs text-gray-500">
                        MT5: {tx.mt5_account_number}
                      </div>
                    )}
                    {tx.reference && (
                      <div className="text-xs text-gray-500">{tx.reference}</div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  Prev
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded-lg text-sm ${
                          currentPage === pageNum
                            ? 'bg-[#00A896] text-white border-[#00A896]'
                            : 'border-gray-300 hover:bg-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transfers
