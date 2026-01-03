import React from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Button from '../../ui/Button';
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  DollarSign,
  CreditCard,
  BarChart3,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  User
} from 'lucide-react';

function AccountOverview() {
  // Dummy data
  const accountStats = {
    totalAccounts: { value: '1', subtitle: 'Total Accounts' },
    totalBalance: { value: '$1,234.56', subtitle: 'Total Balance' },
    totalEquity: { value: '$1,500.00', subtitle: 'Total Equity' },
    accountStatus: { value: 'IB Approved', subtitle: 'Account Status', isBadge: true },
    myCommission: { value: '$567.89', subtitle: '1.23 lots', note: 'My Commission' },
    clientCommission: { value: '$666.67', subtitle: 'Total volume: 1.45 lots', note: 'From approved IB clients only', label: 'Client Commission' },
    totalCommission: { value: '$1,234.56', subtitle: '1.68 lots', note: 'Total Commission' },
    directReferrals: { value: '1', subtitle: 'Total clients: 1 (all levels)', note: 'Updated: Jan 3, 10:05', label: 'Direct Referrals' },
  };

  const commissionInfo = {
    myTrades: { value: '$567.89', volume: '1.23 lots traded' },
    referralClients: { value: '$666.67', volume: 'Total volume: 1.45 lots (all clients)', note: 'Commission from approved IB clients only' },
    totalEarned: { value: '$1,234.56', referrals: 'From 1 direct referrals (1 total clients)', note: 'Commission only from approved IB clients' },
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Overview</h1>
        <p className="text-gray-600">Your trading accounts grouped by type</p>
      </div>

      {/* Account Stats Grid - 8 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Accounts */}
        <StatCard
          title="Total Accounts"
          value={accountStats.totalAccounts.value}
          subtitle={accountStats.totalAccounts.subtitle}
          icon={CreditCard}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        {/* Total Balance */}
        <StatCard
          title="Total Balance"
          value={accountStats.totalBalance.value}
          subtitle={accountStats.totalBalance.subtitle}
          icon={Wallet}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        {/* Total Equity */}
        <StatCard
          title="Total Equity"
          value={accountStats.totalEquity.value}
          subtitle={accountStats.totalEquity.subtitle}
          icon={TrendingUp}
          iconBg="bg-cyan-100"
          valueColor="text-cyan-600"
        />

        {/* Account Status */}
        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">Account Status</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  IB Approved
                </span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        {/* My Commission */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{accountStats.myCommission.note}</p>
              <p className="text-2xl font-bold text-green-600 mb-1">{accountStats.myCommission.value}</p>
              <p className="text-xs text-gray-500">{accountStats.myCommission.subtitle}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Client Commission */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{accountStats.clientCommission.label}</p>
              <p className="text-2xl font-bold text-cyan-600 mb-1">{accountStats.clientCommission.value}</p>
              <p className="text-xs text-gray-500">{accountStats.clientCommission.subtitle}</p>
              <p className="text-xs text-blue-600 mt-1">{accountStats.clientCommission.note}</p>
            </div>
            <div className="p-3 bg-cyan-100 rounded-lg flex-shrink-0">
              <Users className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
        </Card>

        {/* Total Commission */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{accountStats.totalCommission.note}</p>
              <p className="text-2xl font-bold text-blue-600 mb-1">{accountStats.totalCommission.value}</p>
              <p className="text-xs text-gray-500">{accountStats.totalCommission.subtitle}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Direct Referrals */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{accountStats.directReferrals.label}</p>
              <p className="text-2xl font-bold text-purple-600 mb-1">{accountStats.directReferrals.value}</p>
              <p className="text-xs text-gray-500">{accountStats.directReferrals.subtitle}</p>
              <p className="text-xs text-gray-400 mt-1">{accountStats.directReferrals.note}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* No Trading Accounts Section */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ib-50/50 to-transparent"></div>
        <div className="relative text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-ib-100 to-ib-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <CreditCard className="w-12 h-12 text-ib-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Trading Accounts Found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You don't have any trading accounts yet. Create your first account to start trading.
          </p>
          <Button 
            size="lg" 
            icon={Plus}
            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Open Trading Account
          </Button>
        </div>
      </Card>

      {/* IB Commission Information */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-ib-100 rounded-lg">
            <Clock className="w-5 h-5 text-ib-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">IB Commission Information</h2>
            <p className="text-sm text-gray-600 mt-1">Your Commission Rates (Per Lot)</p>
          </div>
        </div>

        {/* Commission Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* My Trades Commission */}
          <Card className="border-2 border-gray-200 hover:border-ib-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 mb-2">My Trades Commission</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{commissionInfo.myTrades.value}</p>
                <p className="text-sm text-gray-600">{commissionInfo.myTrades.volume}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl flex-shrink-0">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* Referral Clients Commission */}
          <Card className="border-2 border-gray-200 hover:border-ib-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 mb-2">Referral Clients Commission</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{commissionInfo.referralClients.value}</p>
                <p className="text-sm text-gray-600 mb-1">{commissionInfo.referralClients.volume}</p>
                <p className="text-xs text-orange-600 font-medium">{commissionInfo.referralClients.note}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl flex-shrink-0">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Total Commission Earned Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-100 mb-2">Total Commission Earned</p>
              <p className="text-4xl font-bold mb-2">{commissionInfo.totalEarned.value}</p>
              <p className="text-sm text-blue-100 mb-1">{commissionInfo.totalEarned.referrals}</p>
              <p className="text-xs text-blue-200">{commissionInfo.totalEarned.note}</p>
            </div>
            <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm">
              <DollarSign className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900 mb-1">Important Note</p>
              <p className="text-xs text-blue-800 leading-relaxed">
                Commission is calculated based on your approved IB clients' trading activity on each account type. 
                Total volume shown includes all clients (IB + non-IB), but commission is only earned from approved IB clients. 
                Data is updated every minute. Last updated: Jan 3, 2026 10:05
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AccountOverview;
