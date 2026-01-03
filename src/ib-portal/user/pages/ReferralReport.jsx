import React, { useState } from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Printer,
  Download,
  Eye,
  User,
  Mail,
  FileText,
} from 'lucide-react';

function ReferralReport() {
  const [selectedLevel, setSelectedLevel] = useState('L1');

  // Dummy data
  const summaryStats = {
    totalReferrals: { value: '2' },
    totalDeposits: { value: '$210.00', transactions: '3 transactions' },
    totalWithdrawals: { value: '$0.00', transactions: '0 transactions' },
    netAmount: { value: '$210.00' },
  };

  const levelData = {
    L1: {
      referrals: '2',
      deposits: '$210.00',
      withdrawals: '$0.00',
      clients: [
        {
          id: 1,
          name: 'SS SS',
          email: 'ss@gmail.com',
          type: 'Client',
          deposits: { amount: '$0.00', count: 0 },
          withdrawals: { amount: '$0.00', count: 0 },
          netAmount: '$0.00',
        },
        {
          id: 2,
          name: 'sol TRADING',
          email: 'soltrading1@gmail.com',
          type: 'Client',
          deposits: { amount: '$210.00', count: 3 },
          withdrawals: { amount: '$0.00', count: 0 },
          netAmount: '$210.00',
        },
      ],
    },
  };

  const currentLevelData = levelData[selectedLevel] || levelData.L1;

  const tableColumns = [
    {
      key: 'id',
      label: '#',
      render: (value) => <span className="text-gray-700 font-medium">{value}</span>,
    },
    {
      key: 'name',
      label: 'Name',
      render: (value) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-gray-900">{value}</span>
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
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'deposits',
      label: 'Deposits',
      render: (value, row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.deposits.amount}</p>
          <p className="text-xs text-gray-500">{row.deposits.count} transaction(s)</p>
        </div>
      ),
    },
    {
      key: 'withdrawals',
      label: 'Withdrawals',
      render: (value, row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.withdrawals.amount}</p>
          <p className="text-xs text-gray-500">{row.withdrawals.count} transaction(s)</p>
        </div>
      ),
    },
    {
      key: 'netAmount',
      label: 'Net Amount',
      render: (value) => (
        <span className="font-bold text-green-600">{value}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <Button
          variant="outline"
          size="sm"
          icon={Eye}
          onClick={() => handleViewDetails(row.id)}
          className="text-xs"
        >
          Details
        </Button>
      ),
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Export functionality
    console.log('Exporting report...');
  };

  const handleViewDetails = (id) => {
    // View details functionality
    console.log('Viewing details for:', id);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Referral Report - Level-wise Deposits & Withdrawals
          </h1>
          <p className="text-gray-600">Track deposits and withdrawals by referral level</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            icon={Printer}
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={Download}
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Referrals"
          value={summaryStats.totalReferrals.value}
          subtitle="All referral levels"
          icon={Users}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="Total Deposits"
          value={summaryStats.totalDeposits.value}
          subtitle={summaryStats.totalDeposits.transactions}
          icon={TrendingUp}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="Total Withdrawals"
          value={summaryStats.totalWithdrawals.value}
          subtitle={summaryStats.totalWithdrawals.transactions}
          icon={TrendingDown}
          iconBg="bg-orange-100"
          valueColor="text-orange-600"
        />

        <StatCard
          title="Net Amount"
          value={summaryStats.netAmount.value}
          subtitle="Total net amount"
          icon={DollarSign}
          iconBg="bg-blue-100"
          valueColor="text-green-600"
        />
      </div>

      {/* Level-wise Table */}
      <Card>
        {/* Level Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{selectedLevel}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {currentLevelData.referrals} Referrals
              </span>
              <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {currentLevelData.deposits} Deposits
              </span>
              <span className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                {currentLevelData.withdrawals} Withdrawals
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table
          rows={currentLevelData.clients}
          columns={tableColumns}
          pageSize={10}
          searchPlaceholder="Search by name or email..."
          filters={{
            searchKeys: ['name', 'email'],
            selects: [
              {
                key: 'type',
                label: 'All Types',
                options: ['Client', 'IB'],
              },
            ],
          }}
        />
      </Card>
    </div>
  );
}

export default ReferralReport;
