import React from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Inbox,
} from 'lucide-react';

function Withdrawals() {
  // Dummy data
  const summaryStats = {
    totalCommission: { value: '$0.10', subtitle: 'From your trades + referrals' },
    availableBalance: { value: '$0.10', subtitle: 'Ready for withdrawal' },
    pendingWithdrawals: { value: '$0.00', subtitle: 'Awaiting approval' },
    totalWithdrawn: { value: '$0.00', subtitle: 'All time withdrawals' },
  };

  // Withdrawal history data (empty for now)
  const withdrawalHistoryData = [];

  const withdrawalHistoryColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (value) => (
        <span className="text-gray-900">{new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      key: 'method',
      label: 'Method',
      render: (value) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          'Pending': 'bg-orange-100 text-orange-800',
          'Approved': 'bg-green-100 text-green-800',
          'Rejected': 'bg-red-100 text-red-800',
          'Completed': 'bg-blue-100 text-blue-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      },
    },
  ];

  const handleAddPaymentMethod = () => {
    // Navigate to add payment method page or open modal
    console.log('Add payment method clicked');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Withdrawals</h1>
        <p className="text-gray-600">Manage your commission withdrawals</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Commission"
          value={summaryStats.totalCommission.value}
          subtitle={summaryStats.totalCommission.subtitle}
          icon={Wallet}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Available Balance</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{summaryStats.availableBalance.value}</p>
              <p className="text-xs text-gray-500">{summaryStats.availableBalance.subtitle}</p>
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
                <span className="text-sm font-medium text-gray-600">Pending Withdrawals</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{summaryStats.pendingWithdrawals.value}</p>
              <p className="text-xs text-gray-500">{summaryStats.pendingWithdrawals.subtitle}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Total Withdrawn</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{summaryStats.totalWithdrawn.value}</p>
              <p className="text-xs text-gray-500">{summaryStats.totalWithdrawn.subtitle}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Request Withdrawal Section */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Request Withdrawal</h2>
        </div>

        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Payment Methods Available</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Please add and get approval for a payment method to withdraw funds.
          </p>
          <Button
            size="lg"
            icon={Plus}
            onClick={handleAddPaymentMethod}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Add Payment Method
          </Button>
        </div>
      </Card>

      {/* Withdrawal History Section - Full Width */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-bold text-gray-900">Withdrawal History</h2>
        </div>

        <Table
          rows={withdrawalHistoryData}
          columns={withdrawalHistoryColumns}
          pageSize={10}
          searchPlaceholder="Search withdrawals..."
          filters={{
            searchKeys: ['method', 'status'],
            selects: [
              {
                key: 'status',
                label: 'All Statuses',
                options: ['Pending', 'Approved', 'Rejected', 'Completed'],
              },
            ],
            dateKey: 'date',
          }}
        />
      </Card>
    </div>
  );
}

export default Withdrawals;
