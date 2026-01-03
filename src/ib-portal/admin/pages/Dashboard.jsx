import React from 'react';
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
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Users,
  UserPlus,
  UserCheck,
  CreditCard,
  DollarSign,
  Eye,
  Settings,
  TrendingUp,
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

function Dashboard() {
  // Dummy data
  const keyMetrics = {
    totalUsers: { value: '537' },
    activeIBs: { value: '210' },
    activeUsers30Days: { value: '239' },
    tradingAccounts: { value: '448' },
    totalCommission: {
      value: '$10,868.29',
      from: 'From 65 IBs (aggregated)',
      breakdown: 'ib_commissions $10,509.41 | jallf: $41.12',
    },
  };

  const commissionByAccountGroup = [
    { group: 'Plus', amount: '$7,869.20', percentage: '72.4%' },
    { group: 'Standard', amount: '$2,954.99', percentage: '27.2%' },
    { group: 'Pro', amount: '$85.06', percentage: '0.8%' },
    { group: 'Startup', amount: '$0.13', percentage: '0.0%' },
    { group: 'Classic', amount: '$0.03', percentage: '0.0%' },
    { group: 'Ecn', amount: '$0.00', percentage: '0.0%' },
  ];

  // Commission Processed Chart Data
  const commissionProcessedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Commission ($)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 480, 50, 0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const commissionProcessedOptions = {
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
        max: 500,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          },
          font: { size: 11 },
          stepSize: 100,
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

  // Commission by Category Chart Data
  const commissionByCategoryData = {
    labels: ['Forex', 'Metals', 'Indices', 'Crypto'],
    datasets: [
      {
        data: [100, 0, 0, 0],
        backgroundColor: [
          '#10b981',
          '#f59e0b',
          '#3b82f6',
          '#8b5cf6',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const commissionByCategoryOptions = {
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
            return `${label}: ${value.toFixed(1)}%`;
          },
        },
      },
    },
  };

  // Recent IB Requests Data
  const recentIBRequestsData = [
    {
      id: 1,
      applicant: 'Ganesh Kamble',
      email: 'ganeshkamble002003@gmail.com',
      requestedRate: '$1.00',
      type: 'normal',
      applied: '2025-12-30 10:22',
      status: 'Pending',
    },
    {
      id: 2,
      applicant: 'Vinod Kumar',
      email: 'vinodkumar760@gmail.com',
      requestedRate: '$1.00',
      type: 'normal',
      applied: '2025-12-20 12:06',
      status: 'Pending',
    },
    {
      id: 3,
      applicant: 'Xian Xu',
      email: 'xxxianxuu@126.com',
      requestedRate: '$1.00',
      type: 'normal',
      applied: '2025-12-15 12:10',
      status: 'Pending',
    },
    {
      id: 4,
      applicant: 'User #671',
      email: 'ramnfk007@gmail.com',
      requestedRate: '$1.00',
      type: 'normal',
      applied: '2025-12-11 16:40',
      status: 'Pending',
    },
    {
      id: 5,
      applicant: 'Guru Prasad',
      email: 'pchavan1686@gmail.com',
      requestedRate: '$1.00',
      type: 'normal',
      applied: '2025-12-02 13:20',
      status: 'Pending',
    },
  ];

  const ibRequestsColumns = [
    {
      key: 'applicant',
      label: 'Applicant',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value}</div>
          <div className="text-xs text-gray-600">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'requestedRate',
      label: 'Requested Rate',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium capitalize">
          {value}
        </span>
      ),
    },
    {
      key: 'applied',
      label: 'Applied',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
  ];

  // Recent Commission Ledger Data
  const recentCommissionLedgerData = [
    {
      id: 1,
      date: '2025-11-28 10:36',
      ib: 'Rajan Agalave',
      symbol: 'EURUSD',
      group: 'Plus',
      lots: '0.00',
      commission: '$328.24',
    },
    {
      id: 2,
      date: '2025-11-28 10:35',
      ib: 'Rajan Agalave',
      symbol: 'GBPUSD',
      group: 'Plus',
      lots: '0.00',
      commission: '$163.72',
    },
    {
      id: 3,
      date: '2025-11-28 10:33',
      ib: 'Rajan Agalave',
      symbol: 'XAUUSD',
      group: 'Plus',
      lots: '0.00',
      commission: '$1.00',
    },
  ];

  const commissionLedgerColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'ib',
      label: 'IB',
      render: (value) => <span className="font-medium text-gray-900">{value}</span>,
    },
    {
      key: 'symbol',
      label: 'Symbol',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'group',
      label: 'Group',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          {value}
        </span>
      ),
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

  const handleManageRequests = () => {
    // Navigate to manage requests page
    console.log('Manage requests clicked');
  };

  const handleOpenLedger = () => {
    // Navigate to full ledger page
    console.log('Open ledger clicked');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Dashboard</h1>
        <p className="text-gray-600">Advanced Pip-wise Commission Management System</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Users"
          value={keyMetrics.totalUsers.value}
          icon={Users}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="Active IBs"
          value={keyMetrics.activeIBs.value}
          icon={UserPlus}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="Active Users (30 days)"
          value={keyMetrics.activeUsers30Days.value}
          icon={UserCheck}
          iconBg="bg-orange-100"
          valueColor="text-orange-600"
        />

        <StatCard
          title="Trading Accounts"
          value={keyMetrics.tradingAccounts.value}
          icon={CreditCard}
          iconBg="bg-purple-100"
          valueColor="text-purple-600"
        />

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Total Commission</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{keyMetrics.totalCommission.value}</p>
              <p className="text-xs text-gray-500 mb-1">{keyMetrics.totalCommission.from}</p>
              <p className="text-xs text-gray-600">{keyMetrics.totalCommission.breakdown}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Commission by Account Group */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission by Account Group</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {commissionByAccountGroup.map((item) => (
            <div
              key={item.group}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200"
            >
              <p className="text-sm font-medium text-gray-600 mb-1">{item.group}</p>
              <p className="text-xl font-bold text-gray-900 mb-1">{item.amount}</p>
              <p className="text-xs text-gray-500">{item.percentage} of total</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commission Processed Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Commission Processed (Last 12 months)</h2>
            <Button variant="outline" size="sm">
              Preview
            </Button>
          </div>
          <div className="h-80">
            <Line data={commissionProcessedData} options={commissionProcessedOptions} />
          </div>
        </Card>

        {/* Commission by Category Chart */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission by Category</h2>
          <div className="h-80">
            <Doughnut data={commissionByCategoryData} options={commissionByCategoryOptions} />
          </div>
        </Card>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent IB Requests */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent IB Requests</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManageRequests}
            >
              Manage
            </Button>
          </div>
          <Table
            rows={recentIBRequestsData}
            columns={ibRequestsColumns}
            pageSize={10}
            searchPlaceholder="Search requests..."
            filters={{
              searchKeys: ['applicant', 'email', 'type'],
              selects: [
                {
                  key: 'status',
                  label: 'All Statuses',
                  options: ['Pending', 'Approved', 'Rejected'],
                },
                {
                  key: 'type',
                  label: 'All Types',
                  options: ['normal', 'premium'],
                },
              ],
            }}
          />
        </Card>

        {/* Recent Commission Ledger */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Commission Ledger</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenLedger}
            >
              Open Ledger
            </Button>
          </div>
          <Table
            rows={recentCommissionLedgerData}
            columns={commissionLedgerColumns}
            pageSize={10}
            searchPlaceholder="Search ledger..."
            filters={{
              searchKeys: ['ib', 'symbol', 'group'],
              selects: [
                {
                  key: 'group',
                  label: 'All Groups',
                  options: ['Plus', 'Standard', 'Pro', 'Startup', 'Classic', 'Ecn'],
                },
              ],
              dateKey: 'date',
            }}
          />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
