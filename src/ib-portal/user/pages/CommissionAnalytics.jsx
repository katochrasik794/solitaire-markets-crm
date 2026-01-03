import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Button from '../../ui/Button';
import Table from '../../ui/Table';
import {
  Wallet,
  Calendar,
  TrendingUp,
  Users,
  Download,
  BarChart3,
  PieChart,
  Circle,
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

function CommissionAnalytics() {
  const [dateFilter, setDateFilter] = useState('30');

  // Dummy data
  const summaryStats = {
    totalCommission: { value: '$1,234.56', my: '$567.89', clients: '$666.67' },
    thisMonth: { value: '$1,234.56' },
    avgDaily: { value: '$41.15' },
    activeClients: { value: '1' },
  };

  // Monthly Commission Trend Data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Commission ($)',
        data: [450, 520, 480, 610, 580, 720, 680, 750, 820, 890, 780, 950],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10b981',
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
        borderColor: '#10b981',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
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
            return '$' + value.toFixed(0);
          },
          font: { size: 11 },
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

  // Commission by Category Data
  const categoryData = {
    labels: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks'],
    datasets: [
      {
        data: [450, 280, 180, 150, 120],
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#8b5cf6',
          '#ec4899',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Top Symbols Table Data
  const topSymbolsData = [
    {
      symbol: 'EURUSD',
      category: 'Forex',
      pips: '125.50',
      commission: '$125.50',
      trades: '25',
    },
    {
      symbol: 'GBPUSD',
      category: 'Forex',
      pips: '98.30',
      commission: '$98.30',
      trades: '18',
    },
    {
      symbol: 'US30',
      category: 'Indices',
      pips: '87.20',
      commission: '$87.20',
      trades: '15',
    },
    {
      symbol: 'XAUUSD',
      category: 'Commodities',
      pips: '76.40',
      commission: '$76.40',
      trades: '12',
    },
    {
      symbol: 'BTCUSD',
      category: 'Crypto',
      pips: '65.80',
      commission: '$65.80',
      trades: '10',
    },
  ];

  const topSymbolsColumns = [
    {
      key: 'symbol',
      label: 'Symbol',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'pips',
      label: 'Pips',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => <span className="font-semibold text-green-600">{value}</span>,
    },
    {
      key: 'trades',
      label: 'Trades',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
  ];

  // Recent Commission Ledger Data
  const ledgerData = [
    {
      date: '2026-01-03',
      client: 'Client A',
      symbol: 'EURUSD',
      lots: '0.50',
      commission: '$50.00',
    },
    {
      date: '2026-01-03',
      client: 'Client B',
      symbol: 'GBPUSD',
      lots: '0.30',
      commission: '$30.00',
    },
    {
      date: '2026-01-02',
      client: 'Client A',
      symbol: 'US30',
      lots: '0.25',
      commission: '$25.00',
    },
    {
      date: '2026-01-02',
      client: 'Client C',
      symbol: 'XAUUSD',
      lots: '0.20',
      commission: '$20.00',
    },
    {
      date: '2026-01-01',
      client: 'Client B',
      symbol: 'EURUSD',
      lots: '0.15',
      commission: '$15.00',
    },
  ];

  const ledgerColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (value) => (
        <span className="text-gray-700">{new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      ),
    },
    {
      key: 'client',
      label: 'Client',
      render: (value) => <span className="font-medium text-gray-900">{value}</span>,
    },
    {
      key: 'symbol',
      label: 'Symbol',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'lots',
      label: 'Lots',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => <span className="font-semibold text-green-600">{value}</span>,
    },
  ];

  const handleExport = () => {
    // Export functionality
    console.log('Exporting ledger data...');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Commission Analytics</h1>
        <p className="text-gray-600">Performance insights and commission breakdowns</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Commission"
          value={summaryStats.totalCommission.value}
          subtitle={`My: ${summaryStats.totalCommission.my} | Clients: ${summaryStats.totalCommission.clients}`}
          icon={Wallet}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="This Month"
          value={summaryStats.thisMonth.value}
          subtitle="Current month commission"
          icon={Calendar}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="Avg Daily"
          value={summaryStats.avgDaily.value}
          subtitle="Average daily commission"
          icon={TrendingUp}
          iconBg="bg-cyan-100"
          valueColor="text-cyan-600"
        />

        <StatCard
          title="Active Clients"
          value={summaryStats.activeClients.value}
          subtitle="Direct clients trading"
          icon={Users}
          iconBg="bg-orange-100"
          valueColor="text-orange-600"
        />
      </div>

      {/* Visual Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Commission Trend */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Monthly Commission Trend</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
              <Circle className="w-2 h-2 fill-green-600" />
              Live Data
            </span>
          </div>
          <div className="h-80">
            <Line data={monthlyData} options={monthlyOptions} />
          </div>
        </Card>

        {/* Commission by Category */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Commission by Category</h2>
          <div className="h-80">
            <Doughnut data={categoryData} options={categoryOptions} />
          </div>
        </Card>
      </div>

      {/* Detailed Data Tables */}
      <div className="space-y-6">
        {/* Top Symbols */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Top Symbols</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDateFilter(dateFilter === '30' ? '90' : '30')}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Last {dateFilter} days
            </Button>
          </div>
          <Table
            rows={topSymbolsData}
            columns={topSymbolsColumns}
            pageSize={5}
            searchPlaceholder="Search symbols..."
            filters={{
              searchKeys: ['symbol', 'category'],
              selects: [
                {
                  key: 'category',
                  label: 'All Categories',
                  options: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks'],
                },
              ],
            }}
          />
        </Card>

        {/* Recent Commission Ledger */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Commission Ledger</h2>
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
          <Table
            rows={ledgerData}
            columns={ledgerColumns}
            pageSize={5}
            searchPlaceholder="Search ledger..."
            filters={{
              searchKeys: ['client', 'symbol'],
              dateKey: 'date',
            }}
          />
        </Card>
      </div>

      {/* Info Note */}
      <Card className="bg-blue-50 border-l-4 border-blue-500">
        <div className="flex items-start gap-3">
          <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">Commission Analytics Note</p>
            <p className="text-xs text-blue-800 leading-relaxed">
              Commission analytics shows only direct clients, not children IBs. Data is updated in real-time. 
              All commission calculations are based on approved IB clients' trading activity.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CommissionAnalytics;
