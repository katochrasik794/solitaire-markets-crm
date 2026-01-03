import React from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Users,
  Clock,
  Wallet,
  UserCheck,
  TrendingUp,
  FileText,
  DollarSign,
  BarChart3,
  ArrowRight,
  Eye,
  AlertCircle,
} from 'lucide-react';

function Overview() {
  // Dummy data
  const keyMetrics = {
    totalIBs: { value: '225', breakdown: '210 approved | 9 pending' },
    pendingRequests: { value: '9', subtitle: 'Awaiting approval' },
    totalCommissions: { value: '$10,868.29', from: 'From 3,255.53 lots', across: 'Across 210 IBs' },
    totalReferrals: { value: '421', subtitle: 'Network growth' },
  };

  const commissionByAccountGroup = [
    { group: 'Plus', amount: '$7,869.20', percentage: '72.4% of total', lots: '2,623.07 lots' },
    { group: 'Standard', amount: '$2,954.99', percentage: '27.2% of total', lots: '1,969.99 lots' },
    { group: 'Pro', amount: '$85.06', percentage: '0.8% of total', lots: '85.06 lots' },
    { group: 'Startup', amount: '$0.13', percentage: '0.0% of total', lots: '0.13 lots' },
    { group: 'Classic', amount: '$0.03', percentage: '0.0% of total', lots: '0.03 lots' },
    { group: 'Ecn', amount: '$0.00', percentage: '0.0% of total', lots: '0.00 lots' },
  ];

  const ibActivity = {
    approvedIBs: { value: '210', subtitle: 'Active partners' },
    totalVolume: { value: '3,255.5', subtitle: 'All IB trading' },
    totalTrades: { value: '17,544', subtitle: 'All IB activity' },
    avgCommissionLot: { value: '$3.34', subtitle: 'Per lot average' },
  };

  // Recent IB Requests Data
  const recentIBRequestsData = [
    {
      id: 1,
      name: 'AJIT BHANDALKAR',
      email: 'devanshsaee0809@gmail.com',
      rate: '1.50 pip/lot',
      rateGroups: '1 group',
      status: 'Approved',
    },
    {
      id: 2,
      name: 'Ganesh Kamble',
      email: 'ganeshkamble002003@gmail.com',
      rate: 'Not configured',
      rateGroups: '',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Mahesh Kumbhar',
      email: 'kumbharmahesh3810@gmil.com',
      rate: '1.00 pip/lot',
      rateGroups: '3 groups',
      status: 'Approved',
    },
    {
      id: 4,
      name: 'Shail Raj',
      email: 'shailphotography1997@gmail.com',
      rate: '0.50 pip/lot',
      rateGroups: '1 group',
      status: 'Approved',
    },
    {
      id: 5,
      name: 'Amitkumar PATIL',
      email: 'amitkumarpatil1982@gmail.com',
      rate: '1.50 pip/lot',
      rateGroups: '1 group',
      status: 'Approved',
    },
  ];

  const ibRequestsColumns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value}</div>
          <div className="text-xs text-gray-600">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'rate',
      label: 'Rate',
      render: (value, row) => (
        <div>
          <span className={value === 'Not configured' ? 'px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium' : 'font-semibold text-gray-900'}>
            {value}
          </span>
          {row.rateGroups && (
            <div className="text-xs text-gray-600 mt-1">({row.rateGroups})</div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          'Approved': 'bg-green-100 text-green-800',
          'Pending': 'bg-orange-100 text-orange-800',
          'Rejected': 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => <span className="text-gray-700">{value || 'Jan 02, 2026'}</span>,
    },
  ];

  // Top Commission Earners Data
  const topCommissionEarnersData = [
    {
      id: 1,
      name: 'Pramod Kirdat',
      email: 'kirdatpramod4@gmail.com',
      referrals: '1 referral',
      commission: '$2,552.94',
      volume: '196.38 lots',
    },
    {
      id: 2,
      name: 'Ajay Thengil',
      email: 'ajaythengil@gmail.com',
      referrals: '6 referrals',
      commission: '$1,596.51',
      volume: '108.89 lots',
    },
    {
      id: 3,
      name: 'Pramod Kirdat',
      email: 'kirdatpramod518@gmail.com',
      referrals: '3 referrals',
      commission: '$1,343.55',
      volume: '89.57 lots',
    },
    {
      id: 4,
      name: 'V R ENTERPRISE',
      email: 'vrenterprisessatara@gmail.com',
      referrals: '8 referrals',
      commission: '$644.63',
      volume: '590.53 lots',
    },
    {
      id: 5,
      name: 'sanjay Jadhav',
      email: 'jsanjay1070@gmail.com',
      referrals: '3 referrals',
      commission: '$636.39',
      volume: '460.19 lots',
    },
  ];

  const topEarnersColumns = [
    {
      key: 'name',
      label: 'IB Name',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value}</div>
          <div className="text-xs text-gray-600">{row.email}</div>
          <div className="text-xs text-gray-500 mt-0.5">({row.referrals})</div>
        </div>
      ),
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => <span className="font-semibold text-green-600">{value}</span>,
    },
    {
      key: 'volume',
      label: 'Volume',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
  ];

  // Recent Activity Data
  const recentActivityData = [
    {
      id: 1,
      name: 'Ajay Thengil',
      email: 'ajaythengil@gmail.com',
      commission: '$91.95',
      period: 'Last 7 days',
      volume: '6.13 lots',
    },
    {
      id: 2,
      name: 'Pramod Kirdat',
      email: 'kirdatpramod518@gmail.com',
      commission: '$72.60',
      period: 'Last 7 days',
      volume: '4.84 lots',
    },
    {
      id: 3,
      name: 'Priyjeet Devkar',
      email: 'devkarpriyjeet@gmail.com',
      commission: '$34.78',
      period: 'Last 7 days',
      volume: '4.23 lots',
    },
    {
      id: 4,
      name: 'Snehal Kamble',
      email: 'snehalzende21@gmail.com',
      commission: '$32.88',
      period: 'Last 7 days',
      volume: '2.20 lots',
    },
    {
      id: 5,
      name: 'Sagar Shinde',
      email: 'sagarshinde0034@gmail.com',
      commission: '$28.49',
      period: 'Last 7 days',
      volume: '4.53 lots',
    },
  ];

  const recentActivityColumns = [
    {
      key: 'name',
      label: 'IB Name',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-gray-900">{value}</div>
          <div className="text-xs text-gray-600">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value, row) => (
        <div>
          <span className="font-semibold text-green-600">{value}</span>
          <div className="text-xs text-gray-500">({row.period})</div>
        </div>
      ),
    },
    {
      key: 'volume',
      label: 'Volume',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
  ];

  const systemSummary = {
    ibStatistics: {
      totalIBs: '225',
      approved: '210',
      pending: '9',
      rejected: '6',
      approvalRate: '93.3%',
      ibsEarning: '66',
    },
    tradingStatistics: {
      totalVolume: '3,255.53 lots',
      totalTrades: '17,544',
      avgVolumePerTrade: '0.19 lots',
      totalReferrals: '421',
      totalClients: '216',
      ibsWithReferrals: '67',
    },
    commissionStatistics: {
      totalCommission: '$10,868.29',
      avgCommissionPerLot: '$3.34',
      commissionPerTrade: '$0.62',
      ibsEarning: '66/210',
      avgPerEarningIB: '$164.67',
    },
    performanceMetrics: {
      activeIBs: '210',
      volumePerIB: '15.50 lots',
      commissionPerIB: '$51.75',
      referralsPerIB: '2.0',
      avgReferralsActive: '6.3',
    },
  };

  const handleViewAll = () => {
    console.log('View All clicked');
  };

  const handleManageSymbols = () => {
    console.log('Manage Symbols clicked');
  };

  const handleViewLedger = () => {
    console.log('View Ledger clicked');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Management Dashboard</h1>
        <p className="text-gray-600">Overview of the group-based commission system</p>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Total IBs</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{keyMetrics.totalIBs.value}</p>
              <p className="text-xs text-gray-600">
                <span className="text-green-600 font-semibold">210 approved</span>
                {' | '}
                <span className="text-orange-600 font-semibold">9 pending</span>
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Pending Requests</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{keyMetrics.pendingRequests.value}</p>
              <p className="text-xs text-gray-500">{keyMetrics.pendingRequests.subtitle}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Total Commissions</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{keyMetrics.totalCommissions.value}</p>
              <p className="text-xs text-gray-500 mb-0.5">{keyMetrics.totalCommissions.from}</p>
              <p className="text-xs text-gray-500">{keyMetrics.totalCommissions.across}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Total Referrals</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{keyMetrics.totalReferrals.value}</p>
              <p className="text-xs text-gray-500">{keyMetrics.totalReferrals.subtitle}</p>
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
              <p className="text-xl font-bold text-blue-600 mb-1">{item.amount}</p>
              <p className="text-xs text-gray-500 mb-0.5">{item.percentage}</p>
              <p className="text-xs text-gray-600">{item.lots}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* IB Activity Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{ibActivity.approvedIBs.value}</p>
            <p className="text-sm font-medium text-gray-600 mb-1">Approved IBs</p>
            <p className="text-xs text-gray-500">{ibActivity.approvedIBs.subtitle}</p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{ibActivity.totalVolume.value}</p>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Volume (Lots)</p>
            <p className="text-xs text-gray-500">{ibActivity.totalVolume.subtitle}</p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{ibActivity.totalTrades.value}</p>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Trades</p>
            <p className="text-xs text-gray-500">{ibActivity.totalTrades.subtitle}</p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <DollarSign className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{ibActivity.avgCommissionLot.value}</p>
            <p className="text-sm font-medium text-gray-600 mb-1">Avg Commission/Lot</p>
            <p className="text-xs text-gray-500">{ibActivity.avgCommissionLot.subtitle}</p>
          </div>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="space-y-6">
        {/* Recent IB Requests */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent IB Requests</h2>
            <Button variant="outline" size="sm" onClick={handleViewAll}>
              View All
            </Button>
          </div>
          <Table
            rows={recentIBRequestsData}
            columns={ibRequestsColumns}
            pageSize={5}
            searchPlaceholder="Search requests..."
            filters={{
              searchKeys: ['name', 'email', 'status'],
              selects: [
                {
                  key: 'status',
                  label: 'All Statuses',
                  options: ['Approved', 'Pending', 'Rejected'],
                },
              ],
            }}
          />
        </Card>

        {/* Top Commission Earners */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Commission Earners (All-Time)</h2>
          <Table
            rows={topCommissionEarnersData}
            columns={topEarnersColumns}
            pageSize={5}
            searchPlaceholder="Search earners..."
            filters={{
              searchKeys: ['name', 'email'],
            }}
          />
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6">
        {/* Recent Activity */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity (Last 7 Days)</h2>
          <Table
            rows={recentActivityData}
            columns={recentActivityColumns}
            pageSize={5}
            searchPlaceholder="Search activity..."
            filters={{
              searchKeys: ['name', 'email'],
            }}
          />
        </Card>

        {/* Commission Breakdown */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission Breakdown</h2>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">$10,868.29</p>
              <p className="text-sm text-gray-600">Total Commission Earned by All IBs</p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>From 3,255.53 lots across 17,544 trades</p>
              <p>Generated by 210 approved IBs</p>
            </div>
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <p className="text-xs font-semibold text-gray-700">Data Source:</p>
              <p className="text-xs text-gray-600">Commission Data: Pre-calculated from aggregated summary tables</p>
              <p className="text-xs text-gray-600">Calculation Method: Group-based pip rates with symbol rate matching</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                <p className="text-xs text-gray-700">
                  <strong>Note:</strong> All commissions are calculated using group-specific rates, not a single per_lot value.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* System Summary */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">System Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* IB Statistics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900">IB Statistics</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total IBs:</span>
                <span className="font-semibold text-gray-900">{systemSummary.ibStatistics.totalIBs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approved:</span>
                <span className="font-semibold text-green-600">{systemSummary.ibStatistics.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending:</span>
                <span className="font-semibold text-orange-600">{systemSummary.ibStatistics.pending}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rejected:</span>
                <span className="font-semibold text-red-600">{systemSummary.ibStatistics.rejected}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approval Rate:</span>
                <span className="font-semibold text-gray-900">{systemSummary.ibStatistics.approvalRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IBs Earning:</span>
                <span className="font-semibold text-gray-900">{systemSummary.ibStatistics.ibsEarning}</span>
              </div>
            </div>
          </div>

          {/* Trading Statistics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900">Trading Statistics</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Volume:</span>
                <span className="font-semibold text-gray-900">{systemSummary.tradingStatistics.totalVolume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Trades:</span>
                <span className="font-semibold text-gray-900">{systemSummary.tradingStatistics.totalTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Volume/Trade:</span>
                <span className="font-semibold text-gray-900">{systemSummary.tradingStatistics.avgVolumePerTrade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Referrals:</span>
                <span className="font-semibold text-gray-900">{systemSummary.tradingStatistics.totalReferrals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Clients:</span>
                <span className="font-semibold text-gray-900">{systemSummary.tradingStatistics.totalClients}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IBs with Referrals:</span>
                <span className="font-semibold text-gray-900">{systemSummary.tradingStatistics.ibsWithReferrals}</span>
              </div>
            </div>
          </div>

          {/* Commission Statistics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900">$ Commission Statistics</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Commission:</span>
                <span className="font-semibold text-green-600">{systemSummary.commissionStatistics.totalCommission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Commission/Lot:</span>
                <span className="font-semibold text-gray-900">{systemSummary.commissionStatistics.avgCommissionPerLot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission/Trade:</span>
                <span className="font-semibold text-gray-900">{systemSummary.commissionStatistics.commissionPerTrade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IBs Earning:</span>
                <span className="font-semibold text-gray-900">{systemSummary.commissionStatistics.ibsEarning}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg per Earning IB:</span>
                <span className="font-semibold text-gray-900">{systemSummary.commissionStatistics.avgPerEarningIB}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900">Performance Metrics</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active IBs:</span>
                <span className="font-semibold text-gray-900">{systemSummary.performanceMetrics.activeIBs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume per IB:</span>
                <span className="font-semibold text-gray-900">{systemSummary.performanceMetrics.volumePerIB}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission per IB:</span>
                <span className="font-semibold text-gray-900">{systemSummary.performanceMetrics.commissionPerIB}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Referrals per IB:</span>
                <span className="font-semibold text-gray-900">{systemSummary.performanceMetrics.referralsPerIB}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Referrals (Active):</span>
                <span className="font-semibold text-gray-900">{systemSummary.performanceMetrics.avgReferralsActive}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Management Tools & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-lg mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Symbol Management</h3>
            <p className="text-sm text-gray-600 mb-4">Configure pip values and categories</p>
            <Button variant="primary" onClick={handleManageSymbols}>
              Manage Symbols
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-purple-100 rounded-lg mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">IB Management</h3>
            <p className="text-sm text-gray-600">Manage entitlements and allocations</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-green-100 rounded-lg mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Commission Ledger</h3>
            <p className="text-sm text-gray-600 mb-4">View detailed commission records</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleViewLedger}>
              View Ledger
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Overview;
