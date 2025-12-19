import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Info } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function TradePerformance() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chartParam = searchParams.get('chart') || 'net-profit';
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [timeframe, setTimeframe] = useState("365");
  const [activeChart, setActiveChart] = useState(chartParam);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    netProfit: 0,
    profit: 0,
    loss: 0,
    unrealisedPL: 0,
    closedOrders: 0,
    profitable: 0,
    unprofitable: 0,
    tradingVolume: 0,
    lifetimeVolume: 0,
    equity: 0
  });
  const [chartData, setChartData] = useState({
    netProfit: { labels: [], profit: [], loss: [] },
    closedOrders: { labels: [], profitable: [], unprofitable: [] },
    tradingVolume: { labels: [], volumes: [] },
    equity: { labels: [], values: [] }
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [selectedAccount, timeframe]);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/accounts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setAccounts(data.data);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        accountNumber: selectedAccount,
        timeframe: timeframe
      });
      
      const response = await fetch(`${API_BASE_URL}/reports/trading-performance?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success && data.data) {
        setSummary(data.data.summary);
        setChartData(data.data.chartData);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch trading performance');
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      setError(error.message || 'Failed to load trading performance');
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    // Chart data is now fetched together with summary
    // This function is kept for compatibility but data comes from fetchSummary
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Chart configurations
  const netProfitChartData = {
    labels: chartData.netProfit.labels,
    datasets: [
      {
        label: 'Profit',
        data: chartData.netProfit.profit,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1
      },
      {
        label: 'Loss',
        data: chartData.netProfit.loss,
        backgroundColor: 'rgba(107, 114, 128, 0.8)',
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 1
      }
    ]
  };

  const closedOrdersChartData = {
    labels: chartData.closedOrders.labels,
    datasets: [
      {
        label: 'Profitable',
        data: chartData.closedOrders.profitable,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1
      },
      {
        label: 'Unprofitable',
        data: chartData.closedOrders.unprofitable,
        backgroundColor: 'rgba(107, 114, 128, 0.8)',
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 1
      }
    ]
  };

  const tradingVolumeChartData = {
    labels: chartData.tradingVolume.labels,
    datasets: [
      {
        label: 'Trading Volume',
        data: chartData.tradingVolume.volumes,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  const equityChartData = {
    labels: chartData.equity.labels,
    datasets: [
      {
        label: 'Equity',
        data: chartData.equity.values,
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const equityChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: false
      }
    }
  };

  const tradingVolumeChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        ticks: {
          callback: function(value) {
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
            return value;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade Performance</h1>
          <p className="text-gray-600">Analyze your trading performance with detailed metrics and charts</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All accounts</option>
                {accounts.filter(acc => !acc.is_demo).map((account) => (
                  <option key={account.id} value={account.account_number}>
                    {account.account_number} - {account.account_type || 'MT5'}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last 365 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Net Profit */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-medium text-gray-700">Net profit</h3>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </div>
            </div>
            <p className={`text-2xl font-bold ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(summary.netProfit)}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Profit</span>
                <span className="text-green-600 font-semibold">+{formatCurrency(summary.profit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loss</span>
                <span className="text-red-600 font-semibold">{formatCurrency(summary.loss)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unrealised P/L</span>
                <span className="text-gray-700">{formatCurrency(summary.unrealisedPL)}</span>
              </div>
            </div>
          </div>

          {/* Closed Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-medium text-gray-700">Closed orders</h3>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(summary.closedOrders)}</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Profitable</span>
                <span className="text-green-600 font-semibold">{formatNumber(summary.profitable)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unprofitable</span>
                <span className="text-red-600 font-semibold">{formatNumber(summary.unprofitable)}</span>
              </div>
            </div>
            {summary.closedOrders === 0 && (
              <p className="mt-2 text-xs text-gray-500 italic">Trade history data not available</p>
            )}
          </div>

          {/* Trading Volume */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-medium text-gray-700">Trading volume</h3>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.tradingVolume)}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lifetime</span>
                <span className="text-gray-700 font-semibold">{formatCurrency(summary.lifetimeVolume)}</span>
              </div>
            </div>
          </div>

          {/* Equity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-medium text-gray-700">Equity</h3>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current</span>
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(summary.equity)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Charts</h2>
          
          {/* Chart Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b">
            <button
              onClick={() => {
                setActiveChart("net-profit");
                setSearchParams({ chart: 'net-profit' });
              }}
              className={`px-4 py-2 font-semibold text-sm transition-colors ${
                activeChart === "net-profit"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Net profit
            </button>
            <button
              onClick={() => {
                setActiveChart("closed-orders");
                setSearchParams({ chart: 'closed-orders' });
              }}
              className={`px-4 py-2 font-semibold text-sm transition-colors ${
                activeChart === "closed-orders"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Closed orders
            </button>
            <button
              onClick={() => {
                setActiveChart("trading-volume");
                setSearchParams({ chart: 'trading-volume' });
              }}
              className={`px-4 py-2 font-semibold text-sm transition-colors ${
                activeChart === "trading-volume"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Trading volume
            </button>
            <button
              onClick={() => {
                setActiveChart("equity");
                setSearchParams({ chart: 'equity' });
              }}
              className={`px-4 py-2 font-semibold text-sm transition-colors ${
                activeChart === "equity"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Equity
            </button>
          </div>

          {/* Chart Display */}
          <div className="h-[400px] md:h-[500px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading chart data...</div>
              </div>
            ) : (
              <>
                {activeChart === "net-profit" && (
                  <Bar data={netProfitChartData} options={chartOptions} />
                )}
                {activeChart === "closed-orders" && (
                  <Bar data={closedOrdersChartData} options={chartOptions} />
                )}
                {activeChart === "trading-volume" && (
                  <Bar data={tradingVolumeChartData} options={tradingVolumeChartOptions} />
                )}
                {activeChart === "equity" && (
                  <Line data={equityChartData} options={equityChartOptions} />
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Please keep in mind that only closed position count. Updated on: {new Date().toLocaleString('en-US', { 
              timeZone: 'UTC',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })} (UTC). For real-time statistics, check{" "}
            <a href="/user/web-terminal" className="text-blue-600 hover:underline">Terminal</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TradePerformance;

