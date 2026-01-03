import React from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Button from '../../ui/Button';
import Table from '../../ui/Table';
import { 
  Wallet, 
  User, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  Copy,
  Link2,
  BarChart3,
  Activity
} from 'lucide-react';

function Dashboard() {
  // Dummy data
  const stats = {
    totalCommission: { value: '$1,234.56', subtitle: 'From your trades + referrals' },
    myCommission: { value: '$567.89', subtitle: '1.23 lots from my trades' },
    clientsCommission: { value: '$666.67', subtitle: 'Total volume: 2.45 lots (all clients)', note: 'Commission from approved IB clients only' },
    availableBalance: { value: '$1,000.00', subtitle: 'Ready for withdrawal' },
    totalVolume: { value: '3.68', subtitle: 'My: 1.23 | Team: 2.45', note: 'Team volume includes all clients (IB + non-IB)' },
    residualRate: { value: '1.30', subtitle: 'You keep: 1.30 pip/lot', note: 'Downline gets: 0.20 pip/lot' },
    distributions: { value: '5', subtitle: 'Total distributions received' },
    pendingBalance: { value: '$234.56', subtitle: 'Awaiting approval', note: 'Available: $1,000.00' },
  };

  const referralCode = 'sol5310';
  const baseUrl = 'https://portal.solitairemarkets.com';
  const referralLink = `${baseUrl}/register.php?ref=${referralCode}`;
  
  // Multiple trading groups
  const tradingGroups = [
    { name: 'PLUS', rate: 1.50, downlineRate: 0.00, residualRate: 1.50 },
    { name: 'STANDARD', rate: 1.00, downlineRate: 0.00, residualRate: 1.00 },
    { name: 'PRO', rate: 0.80, downlineRate: 0.00, residualRate: 0.80 },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IB Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Real-time commission tracking • Commission = Trade Lots × Pip Rate × $10
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm">
            PLUS — 1.50 pip/lot
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold text-sm">
            Available: $1,000.00
          </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Commission"
          value={stats.totalCommission.value}
          subtitle={stats.totalCommission.subtitle}
          icon={Wallet}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />
        <StatCard
          title="My Commission"
          value={stats.myCommission.value}
          subtitle={stats.myCommission.subtitle}
          icon={User}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />
        <StatCard
          title="Clients Commission"
          value={stats.clientsCommission.value}
          subtitle={stats.clientsCommission.subtitle}
          icon={Users}
          iconBg="bg-purple-100"
          valueColor="text-purple-600"
        />
        <StatCard
          title="Available Balance"
          value={stats.availableBalance.value}
          subtitle={stats.availableBalance.subtitle}
          icon={DollarSign}
          iconBg="bg-ib-100"
          valueColor="text-ib-600"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Volume</p>
            <p className="text-3xl font-bold text-green-600 mb-1">{stats.totalVolume.value}</p>
            <p className="text-xs text-gray-500">{stats.totalVolume.subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">{stats.totalVolume.note}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Residual Rate</p>
            <p className="text-3xl font-bold text-blue-600 mb-1">{stats.residualRate.value}</p>
            <p className="text-xs text-gray-500">{stats.residualRate.subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">{stats.residualRate.note}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Distributions</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.distributions.value}</p>
            <p className="text-xs text-gray-500">{stats.distributions.subtitle}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Pending Balance</p>
            <p className="text-3xl font-bold text-red-600 mb-1">{stats.pendingBalance.value}</p>
            <p className="text-xs text-gray-500">{stats.pendingBalance.subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">{stats.pendingBalance.note}</p>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdraw Commission Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-ib-100 rounded-lg">
              <Wallet className="w-5 h-5 text-ib-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Withdraw Commission</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Available: $1,000.00</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none">
                <option>Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Details
              </label>
              <textarea
                rows="3"
                placeholder="Enter your payment details (account number, wallet address, etc.)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                rows="2"
                placeholder="Any additional notes for this withdrawal request"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none resize-none"
              />
            </div>

            <Button className="w-full" icon={ArrowUpRight} iconPosition="right">
              Request Withdrawal
            </Button>
          </div>
        </Card>

        {/* Referral Links Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-ib-100 rounded-lg">
              <Link2 className="w-5 h-5 text-ib-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Referral Links</h2>
          </div>

          <div className="space-y-6">
            {/* Pip Rates per Group */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Pip Rates per Group
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Set downline commission rates for each trading group
              </p>
              <div className="space-y-3">
                {tradingGroups.map((group, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{group.name}</span>
                      <Button size="sm" icon={Activity}>
                        Save
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={group.downlineRate}
                        step="0.01"
                        className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                      />
                      <span className="text-sm text-gray-600">pip</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Your rate: {group.rate} pip/lot • Residual you keep: {group.residualRate} pip/lot
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trader Link */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Trader Link</h3>
              <p className="text-xs text-gray-500 mb-2">
                For traders (no sub-IB commission)
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={Copy}
                  onClick={() => copyToClipboard(referralLink)}
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* IB Link */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                IB Link (with All Group Rates)
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                For sub-IBs - includes all saved group rates above. Updates after clicking "Save".
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={`${referralLink}&data=GRszDUEXFwMBFwEl`}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={Copy}
                  onClick={() => copyToClipboard(`${referralLink}&data=GRszDUEXFwMBFwEl`)}
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* Group-Specific Trader Links */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Group-Specific Trader Links
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Trader links for specific groups (Pro, Standard, etc.)
              </p>
              <div className="space-y-3">
                {tradingGroups.map((group, index) => (
                  <div key={index}>
                    <p className="text-xs font-medium text-gray-700 mb-2">{group.name} Trader Link</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={`${referralLink}&data=GRszDUEXFwMBFwEl${group.name}`}
                        readOnly
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Copy}
                        onClick={() => copyToClipboard(`${referralLink}&data=GRszDUEXFwMBFwEl${group.name}`)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group-Specific Referral Links */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Group-Specific Referral Links
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Create custom referral links with specific pip rates for each group (independent from above)
              </p>
              <div className="space-y-4">
                {tradingGroups.map((group, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-3">{group.name}</p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Downline Pip Rate</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={group.downlineRate}
                            step="0.01"
                            className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                          />
                          <span className="text-sm text-gray-600">pip</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Your rate: {group.rate} pip/lot • Residual you keep: {group.residualRate} pip/lot
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Referral Link</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={`${referralLink}&data=GRszDUEXFwMBFwEl${group.name}REF`}
                            readOnly
                            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Copy}
                            onClick={() => copyToClipboard(`${referralLink}&data=GRszDUEXFwMBFwEl${group.name}REF`)}
                          >
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Downline earns {group.downlineRate} pip/lot
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Link Generator Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">i</div>
                  <div>
                    <p className="text-xs font-semibold text-blue-900 mb-1">Quick Link Generator</p>
                    <p className="text-xs text-blue-800">
                      Enter pip rates and copy the links instantly. These are for temporary use and don't save to your account. For permanent settings, use "Pip Rates per Group" above.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Complete Trading Statistics */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-ib-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-ib-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Complete Trading Statistics</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Your Trading Performance */}
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-4">Your Trading Performance</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Total Lots Traded</p>
                <p className="text-lg font-semibold text-gray-900">0.00 lots</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Commission Earned</p>
                <p className="text-lg font-semibold text-gray-900">$0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Your IB Rates (Group-based)</p>
                <ul className="space-y-1">
                  {tradingGroups.map((group, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      • {group.name} – {group.rate} pip/lot
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div>
            <h3 className="text-sm font-semibold text-green-600 mb-4">Team Performance</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-lg font-semibold text-gray-900">0 clients (all levels)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Direct Referrals</p>
                <p className="text-lg font-semibold text-gray-900">0 clients</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Team Total Volume</p>
                <p className="text-lg font-semibold text-gray-900">0.00 lots (all clients)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Team Commission</p>
                <p className="text-lg font-semibold text-gray-900">$0.00</p>
                <p className="text-xs text-orange-600 mt-1">(from approved IB clients only)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Downline Rate</p>
                <p className="text-lg font-semibold text-gray-900">0.00 pip/lot</p>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div>
            <h3 className="text-sm font-semibold text-orange-600 mb-4">Financial Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-lg font-semibold text-gray-900">$0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-lg font-semibold text-gray-900">$0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Balance</p>
                <p className="text-lg font-semibold text-gray-900">$0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Distributions</p>
                <p className="text-lg font-semibold text-gray-900">0 times</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Structure Breakdown */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-blue-600 mb-4">Rate Structure Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tradingGroups.map((group, index) => (
              <div key={index} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-600 mb-2">{group.name}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{group.rate} pip/lot</p>
                <p className="text-xs text-gray-600 mb-3">Your IB rate for this group</p>
                <div className="space-y-1 pt-3 border-t border-blue-200">
                  <p className="text-xs text-gray-700">
                    <span className="text-green-600 font-medium">Downline:</span> {group.downlineRate} pip/lot
                  </p>
                  <p className="text-xs text-gray-700">
                    <span className="text-orange-600 font-medium">Residual:</span> {group.residualRate} pip/lot
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Withdrawal Requests */}
      <div>
        <Table
          title="Withdrawal Requests"
          rows={[]}
          columns={[
            { key: 'date', label: 'Date', sortable: true },
            { key: 'amount', label: 'Amount', sortable: true },
            { key: 'method', label: 'Payment Method', sortable: true },
            { key: 'status', label: 'Status', sortable: true },
            { key: 'notes', label: 'Notes' },
          ]}
          filters={{
            searchKeys: ['amount', 'method', 'status', 'notes'],
            selects: [
              {
                key: 'status',
                label: 'All Statuses',
                options: ['Pending', 'Approved', 'Rejected', 'Completed']
              },
              {
                key: 'method',
                label: 'All Methods',
                options: ['Bank Transfer', 'Crypto', 'E-Wallet']
              }
            ],
            dateKey: 'date'
          }}
          pageSize={10}
          searchPlaceholder="Search withdrawal requests..."
        />
      </div>

      {/* Complete IB Overview */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-ib-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-ib-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Complete IB Overview</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Name</p>
                <p className="text-sm font-semibold text-gray-900">AJIT BHANDALKAR</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Email</p>
                <p className="text-sm font-semibold text-gray-900">devanshsaee0809@gmail.com</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  IB Approved
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-600">Referral Code</p>
                <p className="text-sm font-semibold text-gray-900">{referralCode}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Account Pip Rates</p>
                <div className="space-y-1">
                  {tradingGroups.map((group, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      {group.name}: {group.rate} pip
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Performance Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Total Network</p>
                <p className="text-sm font-semibold text-gray-900">0 people (all levels)</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Direct Referrals</p>
                <p className="text-sm font-semibold text-gray-900">0 clients</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Volume</p>
                <p className="text-sm font-semibold text-gray-900">0.00 lots (all clients)</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Earnings</p>
                <p className="text-sm font-semibold text-gray-900">$0.00</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Available Balance</p>
                <p className="text-sm font-semibold text-gray-900">$0.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600 mb-1">0.0</p>
              <p className="text-xs font-medium text-gray-700">My Lots</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600 mb-1">0.0</p>
              <p className="text-xs font-medium text-gray-700">Team Lots</p>
              <p className="text-xs text-gray-500 mt-1">All clients</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-600 mb-1">0</p>
              <p className="text-xs font-medium text-gray-700">Referrals</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-cyan-600 mb-1">$0</p>
              <p className="text-xs font-medium text-gray-700">Earnings</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-600 mb-1">1.3</p>
              <p className="text-xs font-medium text-gray-700">Residual</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-700 mb-1">0</p>
              <p className="text-xs font-medium text-gray-700">Distributions</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
