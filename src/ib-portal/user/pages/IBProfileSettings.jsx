import React from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Wallet,
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  Info,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

function IBProfileSettings() {
  // Dummy data
  const profileData = {
    fullName: 'sol IB ACC',
    email: 'solIBACC1@gmail.com',
    phone: '0000000000',
    approvedDate: 'Nov 21, 2025 12:30',
    country: 'uae',
    referralCode: 'sol637134',
    ibType: 'Normal',
  };

  const summaryStats = {
    totalCommission: { value: '$0.10' },
    thisMonth: { value: '$0.00' },
    totalClients: { value: '2' },
    activeTraders: { value: '1' },
  };

  const commissionBreakdown = {
    myCommission: { amount: '$0.00', lots: '0.00 lots' },
    clientsCommission: { amount: '$0.10', lots: '0.01 lots' },
    distributed: '$0.00',
    pending: '$0.00',
  };

  const pipRatesData = [
    { accountGroup: 'STARTUP', yourRate: '0.01 pip/lot', maxRate: '0.01 pip/lot' },
    { accountGroup: 'STANDARD', yourRate: '1.50 pip/lot', maxRate: '1.50 pip/lot' },
    { accountGroup: 'PRO', yourRate: '1.00 pip/lot', maxRate: '1.00 pip/lot' },
    { accountGroup: 'PLUS', yourRate: '2.00 pip/lot', maxRate: '2.00 pip/lot' },
    { accountGroup: 'ECN', yourRate: '0.01 pip/lot', maxRate: '0.01 pip/lot' },
  ];

  const pipRatesColumns = [
    {
      key: 'accountGroup',
      label: 'Account Group',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'yourRate',
      label: 'Your Rate',
      render: (value) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'maxRate',
      label: 'Max Rate',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
  ];

  const accountStatsColumns = [
    {
      key: 'accountNumber',
      label: 'Account Number',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'accountGroup',
      label: 'Account Group',
      render: (value) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'balance',
      label: 'Balance',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'equity',
      label: 'Equity',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'volume',
      label: 'Volume (Lots)',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          'Active': 'bg-green-100 text-green-800',
          'Inactive': 'bg-gray-100 text-gray-800',
          'Suspended': 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      },
    },
  ];

  const networkStats = {
    totalClients: '2',
    subIBs: '0',
    activeTraders: '1',
    directReferrals: '2',
  };

  const recentActivityData = [
    {
      id: 1,
      date: 'Nov 21, 2025 15:51',
      client: 'sol TRADING',
      symbol: 'XAUUSD.r',
      accountGroup: 'Pro',
      volume: '0.01',
      commission: '$0.10',
    },
  ];

  const recentActivityColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'client',
      label: 'Client',
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
      key: 'accountGroup',
      label: 'Account Group',
      render: (value) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'volume',
      label: 'Volume',
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => <span className="font-semibold text-green-600">{value}</span>,
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Profile</h1>
          <p className="text-gray-600">Viewing IB profile as: {profileData.fullName}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200">
            Admin View
          </Button>
          <Button variant="outline" className="bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200">
            IB Approved
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Commission"
          value={summaryStats.totalCommission.value}
          icon={Wallet}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="This Month"
          value={summaryStats.thisMonth.value}
          icon={Calendar}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="Total Clients"
          value={summaryStats.totalClients.value}
          icon={Users}
          iconBg="bg-cyan-100"
          valueColor="text-cyan-600"
        />

        <StatCard
          title="Active Traders"
          value={summaryStats.activeTraders.value}
          icon={User}
          iconBg="bg-orange-100"
          valueColor="text-orange-600"
        />
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IB Information */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">IB Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="text-sm font-semibold text-gray-900">{profileData.fullName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-semibold text-gray-900">{profileData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-semibold text-gray-900">{profileData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Approved Date</p>
                <p className="text-sm font-semibold text-gray-900">{profileData.approvedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Country</p>
                <p className="text-sm font-semibold text-gray-900">{profileData.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Referral Code</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {profileData.referralCode}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">IB Type</p>
                <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">
                  {profileData.ibType}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Commission Breakdown */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">My Commission</span>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{commissionBreakdown.myCommission.amount}</p>
                <p className="text-xs text-gray-500">{commissionBreakdown.myCommission.lots}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Clients Commission</span>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{commissionBreakdown.clientsCommission.amount}</p>
                <p className="text-xs text-gray-500">{commissionBreakdown.clientsCommission.lots}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Distributed</span>
              <p className="text-sm font-semibold text-gray-900">{commissionBreakdown.distributed}</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <p className="text-sm font-semibold text-gray-900">{commissionBreakdown.pending}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Group-Based Pip Rates */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Group-Based Pip Rates</h2>
        <Table
          rows={pipRatesData}
          columns={pipRatesColumns}
          pageSize={10}
        />
      </Card>

      {/* Account Statistics */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
        <Table
          rows={[]}
          columns={accountStatsColumns}
          pageSize={10}
          searchPlaceholder="Search accounts..."
          filters={{
            searchKeys: ['accountNumber', 'accountGroup', 'status'],
            selects: [
              {
                key: 'accountGroup',
                label: 'All Groups',
                options: ['Pro', 'Plus', 'Standard', 'Startup', 'ECN'],
              },
              {
                key: 'status',
                label: 'All Statuses',
                options: ['Active', 'Inactive', 'Suspended'],
              },
            ],
          }}
        />
      </Card>

      {/* Network Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total Clients</p>
            <p className="text-2xl font-bold text-gray-900">{networkStats.totalClients}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Sub-IBs</p>
            <p className="text-2xl font-bold text-gray-900">{networkStats.subIBs}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Active Traders</p>
            <p className="text-2xl font-bold text-gray-900">{networkStats.activeTraders}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Direct Referrals</p>
            <p className="text-2xl font-bold text-gray-900">{networkStats.directReferrals}</p>
          </div>
        </Card>
      </div>

      {/* Recent Commission Activity */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-bold text-gray-900">Recent Commission Activity</h2>
        </div>

        <Table
          rows={recentActivityData}
          columns={recentActivityColumns}
          pageSize={25}
          searchPlaceholder="Search..."
          filters={{
            searchKeys: ['client', 'symbol', 'accountGroup'],
            selects: [
              {
                key: 'accountGroup',
                label: 'All Groups',
                options: ['Pro', 'Plus', 'Standard', 'Startup', 'ECN'],
              },
            ],
            dateKey: 'date',
          }}
        />
      </Card>
    </div>
  );
}

export default IBProfileSettings;
