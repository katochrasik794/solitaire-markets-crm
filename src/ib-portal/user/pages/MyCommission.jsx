import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Coins,
  User,
  Users,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Info,
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function MyCommission() {
  // Dummy data
  const pipRates = {
    ECN: '0.01',
    PLUS: '2.00',
    PRO: '1.00',
    STANDARD: '1.50',
    STARTUP: '0.01',
  };

  // Excluded Trades Data
  const excludedTrades = {
    myTrades: { count: '0', lots: '0.00' },
    clientTrades: { count: '2', lots: '0.02' },
    total: { count: '2', lots: '0.02' },
  };

  // Commission by Client Data
  const commissionByClientData = [
    {
      id: 1,
      client: 'OXO TRADING',
      email: 'oxotrading1@gmail.com',
      referral: true,
      ibStatus: 'Non-IB',
      mt5Account: '369001',
      accountGroup: 'PRO',
      tradingPair: 'XAUUSD.r',
      pipRate: '1.00 pip/lot',
      pipValue: '@$10.00/pip',
      volume: '0.03',
      excludedVolume: { lots: '0.02', trades: 2 },
      commission: '$0.10',
      percentTotal: '10.0',
    },
    {
      id: 2,
      client: 'OXO TRADING',
      email: 'oxotrading1@gmail.com',
      referral: true,
      ibStatus: 'Non-IB',
      mt5Account: '7100016975',
      accountGroup: 'PLUS',
      tradingPair: 'EURUSD.r',
      pipRate: '2.00 pip/lot',
      pipValue: '@$10.00/pip',
      volume: '0.10',
      excludedVolume: null,
      commission: '$0.00',
      percentTotal: '0.0',
    },
    {
      id: 3,
      client: 'OXO TRADING',
      email: 'oxotrading1@gmail.com',
      referral: true,
      ibStatus: 'Non-IB',
      mt5Account: '7100016975',
      accountGroup: 'PLUS',
      tradingPair: 'ETHUSD.ffx',
      pipRate: '2.00 pip/lot',
      pipValue: '@$1.00/pip',
      volume: '0.10',
      excludedVolume: null,
      commission: '$0.00',
      percentTotal: '0.0',
    },
  ];

  const commissionByClientColumns = [
    {
      key: 'client',
      label: 'Client',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value}</div>
          <div className="text-xs text-gray-600">{row.email}</div>
          {row.referral && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">
              Referral
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'ibStatus',
      label: 'IB Status',
      render: (value) => (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'mt5Account',
      label: 'MT5 Account',
      render: (value) => (
        <div>
          <span className="font-medium text-gray-900">{value}</span>
          <div className="text-xs text-gray-500">MT5 Account ID</div>
        </div>
      ),
    },
    {
      key: 'accountGroup',
      label: 'Account Group',
      render: (value) => (
        <div>
          <span className="font-semibold text-gray-900">{value}</span>
          <div className="text-xs text-gray-500 capitalize">{value === 'PRO' ? 'Pro' : 'Plus'}</div>
        </div>
      ),
    },
    {
      key: 'tradingPair',
      label: 'Trading Pair',
      render: (value) => (
        <div>
          <span className="font-semibold text-blue-600">{value}</span>
          <div className="text-xs text-gray-500">Trading Pair</div>
        </div>
      ),
    },
    {
      key: 'pipRate',
      label: 'Pip Rate',
      render: (value, row) => (
        <div>
          <span className="text-gray-900">{value}</span>
          <div className="text-xs text-gray-500">({row.pipValue})</div>
        </div>
      ),
    },
    {
      key: 'volume',
      label: 'Volume (Lots)',
      render: (value, row) => (
        <div>
          <span className="font-semibold text-gray-900">{value} lots</span>
          {row.excludedVolume && (
            <div className="mt-1 flex items-center gap-1 text-xs text-orange-600">
              <AlertTriangle className="w-3 h-3" />
              <span>Excluded: {row.excludedVolume.lots} lots ({row.excludedVolume.trades} trades)</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => (
        <div>
          <span className="font-semibold text-gray-900">{value}</span>
          <div className="text-xs text-gray-500">Commission</div>
        </div>
      ),
    },
    {
      key: 'percentTotal',
      label: '% of Total',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
          {value}%
        </span>
      ),
    },
  ];

  // Recent Commission History Data
  const recentCommissionHistoryData = [
    {
      id: 1,
      date: '2025-11-21',
      symbol: 'XAUUSD.r',
      volume: '0.01',
      commission: '$0.10',
      type: 'Referral Trade',
    },
  ];

  const recentHistoryColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'symbol',
      label: 'Symbol',
      render: (value) => <span className="font-semibold text-blue-600">{value}</span>,
    },
    {
      key: 'volume',
      label: 'Volume',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
  ];

  // Monthly Commission Trend Data
  const monthlyData = {
    labels: ['Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'],
    datasets: [
      {
        label: 'Commission ($)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.09, 0, 0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const monthlyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        borderColor: '#3b82f6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return '$' + context.parsed.y.toFixed(2);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          },
          font: { size: 11 },
          stepSize: 0.01,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
    },
  };

  const subtotalData = {
    volume: '0.23',
    commission: '$0.10',
    percentTotal: '100.0',
    breakdown: '$0.10 | ib_commissions table: $0.10 | Summary table: $0.10',
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Commission</h1>
        <p className="text-gray-600">Your personal trading commission analytics</p>
      </div>

      {/* My Pip Rate Per Lot */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Pip Rate Per Lot:</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(pipRates).map(([category, rate]) => (
            <div
              key={category}
              className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
            >
              <span className="text-sm font-semibold text-gray-700">{category}: </span>
              <span className="text-sm font-bold text-gray-900">{rate}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Row - Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Earnings"
          value="$0.10"
          subtitle="From Trades: $0.10"
          icon={Coins}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="My Commission"
          value="$0.00"
          subtitle="0.00 lots from my trades"
          icon={User}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Clients Commission</span>
              </div>
              <p className="text-2xl font-bold text-cyan-600 mb-1">$0.10</p>
              <p className="text-xs text-gray-500 mb-1">Total volume: 0.01 lots (all clients)</p>
              <p className="text-xs text-orange-600">Commission from approved IB clients only</p>
            </div>
          </div>
        </Card>

        <StatCard
          title="This Month"
          value="$0.00"
          subtitle="Avg: $0.00/day"
          icon={Calendar}
          iconBg="bg-orange-100"
          valueColor="text-orange-600"
        />
      </div>

      {/* Middle Row - Monthly Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">This Month - My Commission</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">$0.00</p>
              <p className="text-xs text-gray-500">From your own trades</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">This Month - Clients Commission</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">$0.00</p>
              <p className="text-xs text-gray-500">From all clients (IB + non-IB)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Row - Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-600 mb-2 block">Available Balance</span>
              <p className="text-3xl font-bold text-green-600 mb-1">$0.10</p>
              <p className="text-xs text-gray-500">Ready for withdrawal</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Pending Balance</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">$0.00</p>
              <p className="text-xs text-gray-500">Awaiting approval</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Commission Trend Chart */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Monthly Commission Trend</h2>
        </div>
        <div className="h-80">
          <Line data={monthlyData} options={monthlyOptions} />
        </div>
      </Card>

      {/* Excluded Trades Section */}
      <Card className="bg-yellow-50 border-l-4 border-yellow-400">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Excluded Trades (Duration ≤ 60 seconds)
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              The following trades are excluded from commission calculation because they were closed within 60 seconds (1 minute) of opening. Note: This rule only applies to trades closed on or after November 21, 2025. Trades closed before this date are eligible for commission regardless of duration.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-blue-100 rounded-lg">
                <div className="text-xs font-medium text-gray-600">My Trades</div>
                <div className="text-sm font-bold text-gray-900">{excludedTrades.myTrades.count} trades</div>
                <div className="text-xs text-gray-600">{excludedTrades.myTrades.lots} lots</div>
              </div>
              <div className="px-4 py-2 bg-blue-100 rounded-lg">
                <div className="text-xs font-medium text-gray-600">Client Trades</div>
                <div className="text-sm font-bold text-gray-900">{excludedTrades.clientTrades.count} trades</div>
                <div className="text-xs text-gray-600">{excludedTrades.clientTrades.lots} lots</div>
              </div>
              <div className="px-4 py-2 bg-red-100 rounded-lg">
                <div className="text-xs font-medium text-gray-600">Total Excluded</div>
                <div className="text-sm font-bold text-gray-900">{excludedTrades.total.count} trades</div>
                <div className="text-xs text-gray-600">{excludedTrades.total.lots} lots</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Commission by Client Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-bold text-gray-900">Commission by Client</h2>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Shows all referral clients (all levels) that generate commission from trades.
        </p>

        {/* Table with custom rows for excluded trades and subtotals */}
        <div className="space-y-4">
          <Table
            rows={commissionByClientData}
            columns={commissionByClientColumns}
            pageSize={10}
            searchPlaceholder="Search clients..."
            filters={{
              searchKeys: ['client', 'email', 'mt5Account', 'tradingPair'],
            }}
          />

          {/* Excluded Trades Row */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="grid grid-cols-9 gap-4 items-center">
              <div className="col-span-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Excluded Trades (Duration ≤ 60s):</span>
              </div>
              <div className="col-span-1">
                <span className="text-sm text-gray-600">369001</span>
              </div>
              <div className="col-span-5"></div>
              <div className="col-span-1">
                <span className="text-sm font-semibold text-gray-900">0.02 lots</span>
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <span className="text-xs text-gray-600">2 trades excluded</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold">
                  Excluded
                </span>
              </div>
            </div>
          </div>

          {/* Subtotal */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">
                Subtotal (Breakdown from ib_commissions table):
              </span>
            </div>
            <div className="grid grid-cols-9 gap-4 items-center">
              <div className="col-span-6"></div>
              <div className="col-span-1">
                <span className="text-sm font-semibold text-gray-900">{subtotalData.volume}</span>
              </div>
              <div className="col-span-1">
                <span className="text-sm font-semibold text-gray-900">{subtotalData.commission}</span>
              </div>
              <div className="col-span-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {subtotalData.percentTotal}%
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
              <Info className="w-3 h-3" />
              <span>Breakdown sum: {subtotalData.breakdown}</span>
            </div>
          </div>

          {/* Excluded Trades Summary */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-gray-900">
                Excluded Trades (Duration ≤ 60 seconds):
              </span>
            </div>
            <p className="text-xs text-gray-700 mb-2">
              Trades closed within 60 seconds are excluded from commission calculation (only applies to trades closed on/after Nov 21, 2025) (My: 0.00 | Clients: 0.02)
            </p>
            <div className="grid grid-cols-9 gap-4 items-center">
              <div className="col-span-6"></div>
              <div className="col-span-1">
                <span className="text-sm font-semibold text-gray-900">0.02 lots</span>
              </div>
              <div className="col-span-1">
                <span className="text-xs text-gray-600">2 trades excluded</span>
              </div>
              <div className="col-span-1">
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold">
                  Excluded
                </span>
              </div>
            </div>
          </div>

          {/* Total Commission */}
          <div className="bg-blue-100 rounded-lg p-4 border border-blue-300">
            <div className="grid grid-cols-9 gap-4 items-center">
              <div className="col-span-6">
                <span className="text-sm font-bold text-gray-900">Total Commission:</span>
              </div>
              <div className="col-span-1">
                <span className="text-sm font-bold text-gray-900">0.23</span>
              </div>
              <div className="col-span-1">
                <span className="text-sm font-bold text-gray-900">$0.10</span>
              </div>
              <div className="col-span-1">
                <span className="px-2 py-1 bg-blue-200 text-blue-900 rounded-full text-xs font-bold">
                  100%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Commission History Section */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-bold text-gray-900">Recent Commission History</h2>
        </div>

        <Table
          rows={recentCommissionHistoryData}
          columns={recentHistoryColumns}
          pageSize={10}
          searchPlaceholder="Search trades..."
          filters={{
            searchKeys: ['symbol', 'type'],
            dateKey: 'date',
          }}
        />
      </Card>
    </div>
  );
}

export default MyCommission;
