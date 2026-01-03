import React, { useState } from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import {
  Users,
  TrendingUp,
  DollarSign,
  UserCheck,
  Mail,
  Calendar,
  CreditCard,
  Wallet,
  BarChart3,
  Percent,
  Tag,
} from 'lucide-react';

function MyClients() {
  const [selectedLevel, setSelectedLevel] = useState('1');

  // Dummy data
  const summaryStats = {
    totalClients: { value: '2' },
    totalVolume: { value: '0.23', unit: 'lots' },
    totalCommission: { value: '$0.10' },
    activeTraders: { value: '1' },
  };

  const levelSummary = {
    level: '1',
    clientCount: '2',
    volume: '0.23',
    commission: '$0.10',
  };

  // Clients data
  const clientsData = [
    {
      clientName: 'ss ss',
      clientId: '493',
      email: 'ss@gmail.com',
      referBy: 'OXO IB ACC',
      referByEmail: 'OXOIBACC1@gmail.com',
      joinDate: '2025-11-24',
      accounts: '0',
      balance: '$0.00',
      volume: '0.00',
      pipRate: '—',
      commission: '$0.00',
      type: 'Client',
    },
    {
      clientName: 'OXO TRADING',
      clientId: '459',
      email: 'oxotrading1@gmail.com',
      referBy: 'OXO IB ACC',
      referByEmail: 'OXOIBACC1@gmail.com',
      joinDate: '2025-11-21',
      accounts: '8',
      balance: '$200.71',
      volume: '0.23',
      pipRate: '—',
      commission: 'Pro: $0.10',
      type: 'Client',
    },
  ];

  const clientsColumns = [
    {
      key: 'clientName',
      label: 'Client Name',
      render: (value, row) => (
        <div>
          <span className="font-semibold text-gray-900">{value}</span>
          <span className="text-xs text-gray-500 ml-1">(ID: {row.clientId})</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: 'referBy',
      label: 'Refer By',
      render: (value, row) => (
        <div>
          <span className="text-gray-900 font-medium">{value}</span>
          <div className="text-xs text-gray-500">{row.referByEmail}</div>
        </div>
      ),
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: 'accounts',
      label: 'Accounts',
      render: (value) => (
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'balance',
      label: 'Balance',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">{value}</span>
        </div>
      ),
    },
    {
      key: 'volume',
      label: 'Volume (Lots)',
      render: (value) => (
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: 'pipRate',
      label: 'Pip Rate',
      render: (value) => (
        <span className="text-gray-500">{value}</span>
      ),
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => (
        <span className="font-semibold text-green-600">{value}</span>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-ib-100 rounded-lg">
          <Users className="w-6 h-6 text-ib-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My IB Clients</h1>
          <p className="text-gray-600 mt-1">Manage and track your introducing broker clients</p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Clients"
          value={summaryStats.totalClients.value}
          subtitle="All registered clients"
          icon={Users}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="Total Volume (Lots)"
          value={summaryStats.totalVolume.value}
          subtitle={summaryStats.totalVolume.unit}
          icon={TrendingUp}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="Total Commission"
          value={summaryStats.totalCommission.value}
          subtitle="Total earned commission"
          icon={DollarSign}
          iconBg="bg-yellow-100"
          valueColor="text-yellow-600"
        />

        <StatCard
          title="Active Traders"
          value={summaryStats.activeTraders.value}
          subtitle="Currently trading"
          icon={UserCheck}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />
      </div>

      {/* Clients Table */}
      <Card>
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
              Level {selectedLevel}
            </span>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{levelSummary.clientCount}</span> client(s) • 
              Volume: <span className="font-semibold text-gray-900">{levelSummary.volume}</span> lots • 
              Commission: <span className="font-semibold text-green-600">{levelSummary.commission}</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table
          rows={clientsData}
          columns={clientsColumns}
          pageSize={10}
          searchPlaceholder="Search clients..."
          filters={{
            searchKeys: ['clientName', 'email', 'clientId', 'referBy', 'referByEmail'],
            selects: [
              {
                key: 'type',
                label: 'All Types',
                options: ['Client', 'IB'],
              },
            ],
            dateKey: 'joinDate',
          }}
        />
      </Card>
    </div>
  );
}

export default MyClients;
