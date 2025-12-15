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
  const [mt5Balances, setMt5Balances] = useState({}) // { account_number: { balance, equity, margin, credit, leverage } }
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [syncingBalances, setSyncingBalances] = useState(false)

  // Datatable state
  const [allTransactions, setAllTransactions] = useState([])
  const [internalTransfers, setInternalTransfers] = useState([])
  const [loadingInternalTransfers, setLoadingInternalTransfers] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterSource, setFilterSource] = useState('')
  const [filterTarget, setFilterTarget] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Internal transfers datatable state
  const [internalSearchQuery, setInternalSearchQuery] = useState('')
  const [internalFilterFrom, setInternalFilterFrom] = useState('')
  const [internalFilterTo, setInternalFilterTo] = useState('')
  const [internalDateFrom, setInternalDateFrom] = useState('')
  const [internalDateTo, setInternalDateTo] = useState('')
  const [internalSortConfig, setInternalSortConfig] = useState({ key: null, direction: 'asc' })
  const [internalCurrentPage, setInternalCurrentPage] = useState(1)
  const [internalPageSize, setInternalPageSize] = useState(10)

  const [toast, setToast] = useState(null)

  // Fetch balance for a specific MT5 account from API
  const fetchAccountBalance = async (accountNumber) => {
    try {
      const token = authService.getToken()
      if (!token) return null

      const response = await fetch(`${API_BASE_URL}/accounts/${accountNumber}/balance`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (data.success && data.data) {
        return data.data
      }
    } catch (error) {
      console.error(`Error fetching balance for account ${accountNumber}:`, error)
    }
    return null
  }

  // Fetch all MT5 account balances
  const fetchAllAccountBalances = async (accountList) => {
    const balances = {}
    const promises = accountList.map(async (acc) => {
      const accountNumber = acc.account_number
      const balanceData = await fetchAccountBalance(accountNumber)
      if (balanceData) {
        balances[accountNumber] = balanceData
      } else {
        // Fallback to database balance if API fails
        balances[accountNumber] = {
          balance: acc.balance || 0,
          equity: acc.equity || 0,
          margin: acc.margin || 0,
          credit: acc.credit || 0,
          leverage: acc.leverage || 2000
        }
      }
    })
    await Promise.all(promises)
    setMt5Balances(balances)
  }

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
          // Filter for active MT5 accounts only, exclude demo accounts
          const mt5 = all.filter((acc) => {
            const isMT5 = (acc.platform || '').toUpperCase() === 'MT5'
            const isActive = acc.account_status === 'active'
            const isNotDemo = !acc.is_demo && (!acc.trading_server || !acc.trading_server.toLowerCase().includes('demo'))
            return isMT5 && isActive && isNotDemo
          })
          setMt5Accounts(mt5)
          
          // Fetch real-time balances for MT5 accounts from API
          if (mt5.length > 0) {
            await fetchAllAccountBalances(mt5)
          }
        }

        const txData = await txRes.json()
        if (txData.success && txData.data) {
          setAllTransactions(txData.data.items || [])
        }

        // Fetch internal transfers
        const internalRes = await fetch(`${API_BASE_URL}/wallet/internal-transfers?limit=1000&offset=0`, { headers })
        const internalData = await internalRes.json()
        if (internalData.success && internalData.data) {
          setInternalTransfers(internalData.data.items || [])
        }
      } catch (err) {
        console.error('Load transfers page error:', err)
      } finally {
        setLoading(false)
        setLoadingInternalTransfers(false)
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

  // Filter and sort internal transfers
  const filteredAndSortedInternal = useMemo(() => {
    let filtered = [...internalTransfers]

    // Search filter
    if (internalSearchQuery) {
      const query = internalSearchQuery.toLowerCase()
      filtered = filtered.filter((transfer) => {
        return (
          transfer.from_type?.toLowerCase().includes(query) ||
          transfer.to_type?.toLowerCase().includes(query) ||
          transfer.from_account?.toLowerCase().includes(query) ||
          transfer.to_account?.toLowerCase().includes(query) ||
          transfer.reference?.toLowerCase().includes(query) ||
          transfer.amount?.toString().includes(query) ||
          transfer.status?.toLowerCase().includes(query)
        )
      })
    }

    // From type filter
    if (internalFilterFrom) {
      filtered = filtered.filter((transfer) => transfer.from_type === internalFilterFrom)
    }

    // To type filter
    if (internalFilterTo) {
      filtered = filtered.filter((transfer) => transfer.to_type === internalFilterTo)
    }

    // Date range filter
    if (internalDateFrom) {
      const fromDate = new Date(internalDateFrom)
      filtered = filtered.filter((transfer) => {
        const txDate = new Date(transfer.created_at)
        return txDate >= fromDate
      })
    }
    if (internalDateTo) {
      const toDate = new Date(internalDateTo)
      toDate.setHours(23, 59, 59, 999) // End of day
      filtered = filtered.filter((transfer) => {
        const txDate = new Date(transfer.created_at)
        return txDate <= toDate
      })
    }

    // Sorting
    if (internalSortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[internalSortConfig.key]
        let bVal = b[internalSortConfig.key]

        // Handle dates
        if (internalSortConfig.key === 'created_at') {
          aVal = new Date(aVal).getTime()
          bVal = new Date(bVal).getTime()
        }

        // Handle numbers
        if (internalSortConfig.key === 'amount') {
          aVal = Number(aVal)
          bVal = Number(bVal)
        }

        // Handle strings
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (aVal < bVal) return internalSortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return internalSortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [internalTransfers, internalSearchQuery, internalFilterFrom, internalFilterTo, internalDateFrom, internalDateTo, internalSortConfig])

  // Internal transfers pagination
  const internalTotalPages = Math.max(1, Math.ceil(filteredAndSortedInternal.length / internalPageSize))
  const paginatedInternalTransfers = useMemo(() => {
    const start = (internalCurrentPage - 1) * internalPageSize
    return filteredAndSortedInternal.slice(start, start + internalPageSize)
  }, [filteredAndSortedInternal, internalCurrentPage, internalPageSize])

  const handleInternalSort = (key) => {
    setInternalSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const resetInternalFilters = () => {
    setInternalSearchQuery('')
    setInternalFilterFrom('')
    setInternalFilterTo('')
    setInternalDateFrom('')
    setInternalDateTo('')
    setInternalSortConfig({ key: null, direction: 'asc' })
    setInternalCurrentPage(1)
  }

  const getInternalSortIcon = (columnKey) => {
    if (internalSortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return internalSortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#00A896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
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

      // Refresh wallet, balances, and transactions
      const walletRes = await fetch(`${API_BASE_URL}/wallet`, { headers })
      const walletData = await walletRes.json()
      if (walletData.success) setWallet(walletData.data)

      // Refresh accounts and balances
      const accountsRes = await fetch(`${API_BASE_URL}/accounts`, { headers })
      const accountsData = await accountsRes.json()
      if (accountsData.success) {
        const all = Array.isArray(accountsData.data) ? accountsData.data : []
        // Filter for active MT5 accounts only, exclude demo accounts
        const mt5 = all.filter((acc) => {
          const isMT5 = (acc.platform || '').toUpperCase() === 'MT5'
          const isActive = acc.account_status === 'active'
          const isNotDemo = !acc.is_demo && (!acc.trading_server || !acc.trading_server.toLowerCase().includes('demo'))
          return isMT5 && isActive && isNotDemo
        })
        setMt5Accounts(mt5)
        
        // Fetch fresh balances for all MT5 accounts
        if (mt5.length > 0) {
          await fetchAllAccountBalances(mt5)
        }
      }

      await reloadTransactions()

      // Reload internal transfers
      const internalRes = await fetch(`${API_BASE_URL}/wallet/internal-transfers?limit=1000&offset=0`, { headers })
      const internalData = await internalRes.json()
      if (internalData.success && internalData.data) {
        setInternalTransfers(internalData.data.items || [])
      }

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
      const balanceData = mt5Balances[fromAccount]
      return balanceData ? Number(balanceData.balance || 0) : 0
    }
    return 0
  }

  // Handle sync balances
  const handleSyncBalances = async () => {
    setSyncingBalances(true)
    try {
      const token = authService.getToken()
      if (!token) return

      const headers = { Authorization: `Bearer ${token}` }

      // Refresh accounts list first
      const accountsRes = await fetch(`${API_BASE_URL}/accounts`, { headers })
      const accountsData = await accountsRes.json()
      
      if (accountsData.success) {
        const all = Array.isArray(accountsData.data) ? accountsData.data : []
        // Filter for active MT5 accounts only, exclude demo accounts
        const mt5 = all.filter((acc) => {
          const isMT5 = (acc.platform || '').toUpperCase() === 'MT5'
          const isActive = acc.account_status === 'active'
          const isNotDemo = !acc.is_demo && (!acc.trading_server || !acc.trading_server.toLowerCase().includes('demo'))
          return isMT5 && isActive && isNotDemo
        })
        setMt5Accounts(mt5)
        
        // Fetch fresh balances for all MT5 accounts
        if (mt5.length > 0) {
          await fetchAllAccountBalances(mt5)
        }
      }

      // Also refresh wallet
      const walletRes = await fetch(`${API_BASE_URL}/wallet`, { headers })
      const walletData = await walletRes.json()
      if (walletData.success) setWallet(walletData.data)

      setToast({
        message: 'Balances refreshed successfully',
        type: 'success'
      })
    } catch (err) {
      console.error('Sync balances error:', err)
      setToast({
        message: 'Failed to refresh balances',
        type: 'error'
      })
    } finally {
      setSyncingBalances(false)
    }
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
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)' }}>
            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Sync Balance Button */}
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={handleSyncBalances}
                    disabled={syncingBalances}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  >
                    {syncingBalances ? (
                      <>
                        <svg className="w-4 h-4 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm text-gray-700">Refreshing...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">Refresh Balance</span>
                      </>
                    )}
                  </button>
                </div>
                {/* Side-by-side Account Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* From Account - Left */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                    <label
                      className="block mb-4 text-sm font-semibold text-gray-700"
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                      }}
                    >
                      From Account
                    </label>
                    <div className="relative mb-4">
                      <select
                        value={fromAccount}
                        onChange={(e) => {
                          setFromAccount(e.target.value)
                          setAmount('') // Reset amount when account changes
                        }}
                        className="w-full px-5 py-4 rounded-2xl bg-white appearance-none focus:ring-2 focus:ring-[#00A896] focus:ring-offset-2 outline-none transition-all text-gray-800"
                        style={{ 
                          fontFamily: 'Roboto, sans-serif', 
                          fontSize: '15px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)'
                        }}
                      >
                        <option value="">Choose an account</option>
                        {wallet && toAccount !== 'wallet' && (
                          <option value="wallet">
                            {wallet.wallet_number} | {Number(wallet.balance || 0).toFixed(2)}{wallet.currency}
                          </option>
                        )}
                        {mt5Accounts
                          .filter((acc) => acc.account_number !== toAccount)
                          .map((acc) => {
                            const balanceData = mt5Balances[acc.account_number]
                            const balance = balanceData ? Number(balanceData.balance || 0) : (acc.balance || 0)
                            return (
                              <option key={acc.id} value={acc.account_number}>
                                {acc.account_number} | {Number(balance).toFixed(2)}{acc.currency || 'USD'}
                              </option>
                            )
                          })}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
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
                      <div className="bg-gradient-to-r from-[#00A896]/10 to-[#00A896]/5 rounded-2xl p-4" style={{ boxShadow: '0 4px 15px rgba(0,168,150,0.15), 0 0 0 1px rgba(0,168,150,0.1), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                        <div className="text-xs text-gray-500 mb-1 font-medium">Available Balance</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${availableBalance.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* To Account - Right */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                    <label
                      className="block mb-4 text-sm font-semibold text-gray-700"
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                      }}
                    >
                      To Account
                    </label>
                    <div className="relative mb-4">
                      <select
                        value={toAccount}
                        onChange={(e) => {
                          setToAccount(e.target.value)
                          setAmount('') // Reset amount when account changes
                        }}
                        className="w-full px-5 py-4 rounded-2xl bg-white appearance-none focus:ring-2 focus:ring-[#00A896] focus:ring-offset-2 outline-none transition-all text-gray-800"
                        style={{ 
                          fontFamily: 'Roboto, sans-serif', 
                          fontSize: '15px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)'
                        }}
                      >
                        <option value="">Choose an account</option>
                        {wallet && fromAccount !== 'wallet' && (
                          <option value="wallet">
                            {wallet.wallet_number} | {Number(wallet.balance || 0).toFixed(2)}{wallet.currency}
                          </option>
                        )}
                        {mt5Accounts
                          .filter((acc) => acc.account_number !== fromAccount)
                          .map((acc) => {
                            const balanceData = mt5Balances[acc.account_number]
                            const balance = balanceData ? Number(balanceData.balance || 0) : (acc.balance || 0)
                            return (
                              <option key={acc.id} value={acc.account_number}>
                                {acc.account_number} | {Number(balance).toFixed(2)}{acc.currency || 'USD'}
                              </option>
                            )
                          })}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
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
                      <div className="bg-gradient-to-r from-[#00A896]/10 to-[#00A896]/5 rounded-2xl p-4" style={{ boxShadow: '0 4px 15px rgba(0,168,150,0.15), 0 0 0 1px rgba(0,168,150,0.1), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                        <div className="text-xs text-gray-500 mb-1 font-medium">Current Balance</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${toAccount === 'wallet' 
                            ? (wallet ? Number(wallet.balance).toFixed(2) : '0.00')
                            : (() => {
                                const balanceData = mt5Balances[toAccount]
                                return balanceData ? Number(balanceData.balance || 0).toFixed(2) : '0.00'
                              })()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transfer Amount with Range Slider */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                  <label
                    className="block mb-4 text-sm font-semibold text-gray-700"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                    }}
                  >
                    Transfer Amount
                  </label>
                  
                  {/* Amount Input */}
                  <div className="mb-5">
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
                      className="w-full px-5 py-4 rounded-2xl bg-white focus:ring-2 focus:ring-[#00A896] focus:ring-offset-2 outline-none text-xl font-bold text-gray-900 transition-all"
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)'
                      }}
                      min="0"
                      max={availableBalance}
                      step="0.01"
                    />
                  </div>

                  {/* Range Slider */}
                  {fromAccount && availableBalance > 0 && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-gray-500 font-medium">
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
                          className="w-full h-3 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: availableBalance > 0 
                              ? `linear-gradient(to right, #00A896 0%, #00A896 ${((Number(amount) || 0) / availableBalance) * 100}%, #e5e7eb ${((Number(amount) || 0) / availableBalance) * 100}%, #e5e7eb 100%)`
                              : '#e5e7eb',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.1)'
                          }}
                        />
                        <style>{`
                          input[type="range"]::-webkit-slider-thumb {
                            appearance: none;
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            background: #00A896;
                            cursor: pointer;
                            border: 3px solid white;
                            box-shadow: 0 4px 12px rgba(0,168,150,0.4), 0 0 0 1px rgba(0,168,150,0.2), inset 0 1px 2px rgba(0,0,0,0.1);
                            transition: all 0.2s;
                          }
                          input[type="range"]::-webkit-slider-thumb:hover {
                            transform: scale(1.1);
                            box-shadow: 0 6px 16px rgba(0,168,150,0.5), 0 0 0 1px rgba(0,168,150,0.3), inset 0 1px 2px rgba(0,0,0,0.1);
                          }
                          input[type="range"]::-moz-range-thumb {
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            background: #00A896;
                            cursor: pointer;
                            border: 3px solid white;
                            box-shadow: 0 4px 12px rgba(0,168,150,0.4), 0 0 0 1px rgba(0,168,150,0.2), inset 0 1px 2px rgba(0,0,0,0.1);
                            transition: all 0.2s;
                          }
                          input[type="range"]::-moz-range-thumb:hover {
                            transform: scale(1.1);
                            box-shadow: 0 6px 16px rgba(0,168,150,0.5), 0 0 0 1px rgba(0,168,150,0.3), inset 0 1px 2px rgba(0,0,0,0.1);
                          }
                        `}</style>
                      </div>
                      <div className="flex justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => setAmount((availableBalance * 0.25).toFixed(2))}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#00A896] hover:text-white text-gray-600 font-medium transition-all"
                          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                        >
                          25%
                        </button>
                        <button
                          type="button"
                          onClick={() => setAmount((availableBalance * 0.5).toFixed(2))}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#00A896] hover:text-white text-gray-600 font-medium transition-all"
                          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                        >
                          50%
                        </button>
                        <button
                          type="button"
                          onClick={() => setAmount((availableBalance * 0.75).toFixed(2))}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#00A896] hover:text-white text-gray-600 font-medium transition-all"
                          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                        >
                          75%
                        </button>
                        <button
                          type="button"
                          onClick={() => setAmount(availableBalance.toFixed(2))}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#00A896] hover:text-white text-gray-600 font-medium transition-all"
                          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                        >
                          100%
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button - Compact */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting || !fromAccount || !toAccount || !amount || Number(amount) <= 0 || Number(amount) > availableBalance}
                    className="bg-gradient-to-r from-[#e6c200] to-[#d4b000] hover:from-[#d4b000] hover:to-[#c2a000] text-gray-900 font-bold py-3 px-12 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '15px',
                      fontWeight: '600',
                      boxShadow: '0 8px 25px rgba(230,194,0,0.4), 0 0 0 1px rgba(212,176,0,0.2), inset 0 1px 0 rgba(255,255,255,0.6)'
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
                </div>
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

        {/* Internal Transfers Table */}
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
            Internal Transfer Transactions
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {loadingInternalTransfers ? (
              <div className="p-8 text-center text-gray-500">Loading transfers...</div>
            ) : (
              <>
                {/* Filters and Search Bar */}
                <div className="p-4 border-b border-gray-200 space-y-4">
                  {/* Search and Filters Row */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={internalSearchQuery}
                          onChange={(e) => {
                            setInternalSearchQuery(e.target.value)
                            setInternalCurrentPage(1)
                          }}
                          placeholder="Search transfers..."
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
                        value={internalFilterFrom}
                        onChange={(e) => {
                          setInternalFilterFrom(e.target.value)
                          setInternalCurrentPage(1)
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                      >
                        <option value="">All From</option>
                        <option value="wallet">Wallet</option>
                        <option value="mt5">MT5</option>
                      </select>

                      <select
                        value={internalFilterTo}
                        onChange={(e) => {
                          setInternalFilterTo(e.target.value)
                          setInternalCurrentPage(1)
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                      >
                        <option value="">All To</option>
                        <option value="wallet">Wallet</option>
                        <option value="mt5">MT5</option>
                      </select>

                      <input
                        type="date"
                        value={internalDateFrom}
                        onChange={(e) => {
                          setInternalDateFrom(e.target.value)
                          setInternalCurrentPage(1)
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                        placeholder="From Date"
                      />

                      <input
                        type="date"
                        value={internalDateTo}
                        onChange={(e) => {
                          setInternalDateTo(e.target.value)
                          setInternalCurrentPage(1)
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A896] focus:border-transparent outline-none text-sm"
                        placeholder="To Date"
                      />

                      <button
                        onClick={resetInternalFilters}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Results count and page size */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Showing {paginatedInternalTransfers.length} of {filteredAndSortedInternal.length} transfers
                    </span>
                    <div className="flex items-center gap-2">
                      <span>Rows per page:</span>
                      <select
                        value={internalPageSize}
                        onChange={(e) => {
                          setInternalPageSize(Number(e.target.value))
                          setInternalCurrentPage(1)
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
                          onClick={() => handleInternalSort('created_at')}
                        >
                          <div className="flex items-center gap-2">
                            Date & Time
                            {getInternalSortIcon('created_at')}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                          onClick={() => handleInternalSort('from_type')}
                        >
                          <div className="flex items-center gap-2">
                            From
                            {getInternalSortIcon('from_type')}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                          onClick={() => handleInternalSort('to_type')}
                        >
                          <div className="flex items-center gap-2">
                            To
                            {getInternalSortIcon('to_type')}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                          onClick={() => handleInternalSort('amount')}
                        >
                          <div className="flex items-center justify-end gap-2">
                            Amount
                            {getInternalSortIcon('amount')}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                          onClick={() => handleInternalSort('status')}
                        >
                          <div className="flex items-center gap-2">
                            Status
                            {getInternalSortIcon('status')}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Reference
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedInternalTransfers.length === 0 ? (
                        <tr>
                          <td
                            className="px-4 py-4 text-center text-gray-500"
                            colSpan={6}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p className="text-gray-600 font-medium">No transfers found</p>
                              <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        paginatedInternalTransfers.map((transfer) => (
                          <tr key={transfer.id} className="border-t border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="font-medium">{new Date(transfer.created_at).toLocaleDateString()}</span>
                                <span className="text-xs text-gray-500">{new Date(transfer.created_at).toLocaleTimeString()}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              <span className="capitalize font-medium">{transfer.from_type}</span>
                              <br />
                              <span className="text-gray-500 text-xs">{transfer.from_account}</span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              <span className="capitalize font-medium">{transfer.to_type}</span>
                              <br />
                              <span className="text-gray-500 text-xs">{transfer.to_account}</span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium whitespace-nowrap">
                              ${Number(transfer.amount).toFixed(2)}
                              <span className="text-gray-500 text-xs ml-1">{transfer.currency || 'USD'}</span>
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  transfer.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : transfer.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {transfer.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              <span className="truncate max-w-xs block" title={transfer.reference || '-'}>
                                {transfer.reference || '-'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-gray-100 bg-white">
                  {paginatedInternalTransfers.length === 0 ? (
                    <div className="p-8 text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-600 font-medium">No transfers found</p>
                      <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
                    </div>
                  ) : (
                    paginatedInternalTransfers.map((transfer) => (
                      <div key={transfer.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">
                                <span className="capitalize">{transfer.from_type}</span> → <span className="capitalize">{transfer.to_type}</span>
                              </span>
                              <span className="text-xs text-gray-500">{new Date(transfer.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-1">
                              {transfer.from_account} → {transfer.to_account}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">
                              ${Number(transfer.amount).toFixed(2)}
                            </div>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                transfer.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : transfer.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {transfer.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-2">
                          {transfer.reference && (
                            <span className="truncate max-w-full" title={transfer.reference}>
                              {transfer.reference}
                            </span>
                          )}
                          <span className="ml-auto text-gray-400">
                            {new Date(transfer.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 gap-3">
                  <div className="text-sm text-gray-600 order-2 sm:order-1">
                    Showing <span className="font-medium">{((internalCurrentPage - 1) * internalPageSize) + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(internalCurrentPage * internalPageSize, filteredAndSortedInternal.length)}</span> of{' '}
                    <span className="font-medium">{filteredAndSortedInternal.length}</span> transfers
                  </div>
                  <div className="flex items-center gap-2 order-1 sm:order-2">
                    <button
                      onClick={() => setInternalCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={internalCurrentPage <= 1}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-sm font-medium"
                    >
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Prev</span>
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, internalTotalPages) }, (_, i) => {
                        let pageNum
                        if (internalTotalPages <= 5) {
                          pageNum = i + 1
                        } else if (internalCurrentPage <= 3) {
                          pageNum = i + 1
                        } else if (internalCurrentPage >= internalTotalPages - 2) {
                          pageNum = internalTotalPages - 4 + i
                        } else {
                          pageNum = internalCurrentPage - 2 + i
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setInternalCurrentPage(pageNum)}
                            className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition ${
                              internalCurrentPage === pageNum
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
                      onClick={() => setInternalCurrentPage((p) => Math.min(internalTotalPages, p + 1))}
                      disabled={internalCurrentPage >= internalTotalPages}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-sm font-medium"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">Next</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transfers
