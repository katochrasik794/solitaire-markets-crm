import React, { useState } from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Users,
  User,
  UserCheck,
  Wallet,
  RefreshCw,
  Eye,
  FileText,
  Send,
  X,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

function CommissionDistribution() {
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [selectedIB, setSelectedIB] = useState(null);

  // Dummy data
  const summaryStats = {
    totalApprovedIBs: { value: '153' },
    totalDirectClients: { value: '298' },
    totalSubIBs: { value: '125' },
    totalIBBalance: { value: '$2,913.46' },
  };

  const commissionData = [
    {
      id: 1,
      name: 'AJIT BHANDALKAR',
      email: 'devanshsaee0809@gmail.com',
      approvedDate: 'Jan 02, 2026',
      ibRate: '1.30',
      directClients: 0,
      subIBs: 0,
      totalReferrals: 0,
      totalBalance: '$0.00',
      commission: '$0.00',
      phone: '7080755171',
      memberSince: 'Jan 02, 2026',
    },
    {
      id: 2,
      name: 'Mahesh Kumbhar',
      email: 'kumbharmahesh3810@gmil.com',
      approvedDate: 'Dec 29, 2025',
      ibRate: '1.30',
      directClients: 0,
      subIBs: 0,
      totalReferrals: 0,
      totalBalance: '$65.67',
      commission: '$0.00',
      phone: '1234567890',
      memberSince: 'Dec 29, 2025',
    },
    {
      id: 3,
      name: 'Shail Raj',
      email: 'shailphotography1997@gmail.com',
      approvedDate: 'Dec 29, 2025',
      ibRate: '0.50',
      directClients: 0,
      subIBs: 0,
      totalReferrals: 0,
      totalBalance: '$0.00',
      commission: '$0.00',
      phone: '1234567890',
      memberSince: 'Dec 29, 2025',
    },
    {
      id: 4,
      name: 'Amitkumar PATIL',
      email: 'amitkumarpatil1982@gmail.com',
      approvedDate: 'Dec 28, 2025',
      ibRate: '1.30',
      directClients: 0,
      subIBs: 0,
      totalReferrals: 0,
      totalBalance: '$0.00',
      commission: '$0.00',
      phone: '1234567890',
      memberSince: 'Dec 28, 2025',
    },
    {
      id: 5,
      name: 'MONEY GROWTH',
      email: 'amrutmoneygrowth@gmail.com',
      approvedDate: 'Dec 28, 2025',
      ibRate: '1.30',
      directClients: 0,
      subIBs: 1,
      totalReferrals: 1,
      totalBalance: '$0.00',
      commission: '$0.00',
      phone: '1234567890',
      memberSince: 'Dec 28, 2025',
    },
    {
      id: 6,
      name: 'ALPHA CAPITAL',
      email: 'alphacapital2025@gmail.com',
      approvedDate: 'Dec 28, 2025',
      ibRate: '1.30',
      directClients: 0,
      subIBs: 0,
      totalReferrals: 0,
      totalBalance: '$0.00',
      commission: '$0.00',
      phone: '1234567890',
      memberSince: 'Dec 28, 2025',
    },
    {
      id: 7,
      name: 'Manohar Harad',
      email: 'manoharharad8@gmail.com',
      approvedDate: 'Dec 26, 2025',
      ibRate: '1.20',
      directClients: 0,
      subIBs: 0,
      totalReferrals: 0,
      totalBalance: '$0.00',
      commission: '$0.00',
      phone: '1234567890',
      memberSince: 'Dec 26, 2025',
    },
  ];

  const commissionColumns = [
    {
      key: 'srNo',
      label: 'Sr No.',
      render: (value, row, index) => <span className="text-gray-700">{index + 1}</span>,
    },
    {
      key: 'ibDetails',
      label: 'IB Details',
      render: (value, row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-600">{row.email}</p>
          <p className="text-xs text-gray-500">Approved: {row.approvedDate}</p>
        </div>
      ),
    },
    {
      key: 'ibRate',
      label: 'IB Rate',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
          PIP {value}
        </span>
      ),
    },
    {
      key: 'directClients',
      label: 'Direct Clients',
      render: (value) => (
        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'subIBs',
      label: 'Sub-IBs',
      render: (value) => (
        <span className="inline-flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'totalReferrals',
      label: 'Total Referrals',
      render: (value) => (
        <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'totalBalance',
      label: 'Total Balance',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => <span className="font-semibold text-green-600">{value}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="View Details"
            onClick={() => handleViewDetails(row)}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
            title="Commission Calculation"
            onClick={() => handleCommissionCalculation(row)}
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded transition-colors"
            title="Distribute Commission"
            onClick={() => handleDistributeCommission(row)}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (ib) => {
    setSelectedIB(ib);
    setShowDetailsModal(true);
  };

  const handleCommissionCalculation = (ib) => {
    setSelectedIB(ib);
    setShowCommissionModal(true);
  };

  const handleDistributeCommission = (ib) => {
    setSelectedIB(ib);
    setShowDistributeModal(true);
  };

  const handleCloseModal = () => {
    setShowCommissionModal(false);
    setShowDetailsModal(false);
    setShowDistributeModal(false);
    setSelectedIB(null);
  };

  const handleDistribute = () => {
    console.log('Distributing commission...', selectedIB);
    handleCloseModal();
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Commission Distribution</h1>
        <p className="text-gray-600">Advanced IB Commission Management and Distribution System</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Approved IBs"
          value={summaryStats.totalApprovedIBs.value}
          icon={Users}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="Total Direct Clients"
          value={summaryStats.totalDirectClients.value}
          icon={User}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="Total Sub-IBs"
          value={summaryStats.totalSubIBs.value}
          icon={UserCheck}
          iconBg="bg-cyan-100"
          valueColor="text-cyan-600"
        />

        <StatCard
          title="Total IB Balance"
          value={summaryStats.totalIBBalance.value}
          icon={Wallet}
          iconBg="bg-orange-100"
          valueColor="text-orange-600"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Rate</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none">
              <option>All Rates</option>
              <option>0.50</option>
              <option>1.20</option>
              <option>1.30</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none">
              <option>Approval Date</option>
              <option>Name</option>
              <option>Commission</option>
              <option>Balance</option>
            </select>
          </div>
          <Button variant="primary" icon={RefreshCw}>
            Refresh
          </Button>
        </div>
      </Card>

      {/* Commission Table */}
      <Card>
        <Table
          rows={commissionData}
          columns={commissionColumns}
          pageSize={10}
          searchPlaceholder="Search IBs..."
          filters={{
            searchKeys: ['name', 'email'],
            selects: [
              {
                key: 'ibRate',
                label: 'All Rates',
                options: ['0.50', '1.20', '1.30'],
              },
            ],
          }}
        />
      </Card>

      {/* Commission Calculation Modal */}
      {showCommissionModal && selectedIB && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Commission Calculation</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* IB Info */}
            <div className="p-6 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Commission Calculation for {selectedIB.name}</p>
              <p className="text-lg font-semibold text-gray-900">IB Rate: ${selectedIB.ibRate} per lot</p>
            </div>

            {/* Summary Cards */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Direct Commission</p>
                <p className="text-2xl font-bold text-blue-600">$0.00</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Residual Commission</p>
                <p className="text-2xl font-bold text-green-600">$0.00</p>
              </div>
              <div className="bg-cyan-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total Commission</p>
                <p className="text-2xl font-bold text-cyan-600">$0.00</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total Lots</p>
                <p className="text-2xl font-bold text-orange-600">0.00</p>
              </div>
            </div>

            {/* Direct Client Commission */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Client Commission</h3>
              <p className="text-sm text-gray-600 mb-4">Commission from direct clients (non-IB users)</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Client</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Trades</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Lots</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                        No direct client data available
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Residual Commission */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Residual Commission from Sub-IBs</h3>
              <p className="text-sm text-gray-600 mb-4">Commission from sub-IBs with lower rates</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Sub-IB</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Rate</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Trades</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Lots</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Resid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        No sub-IB data available
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Commission Summary */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Direct Client Commission:</span>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Residual Commission:</span>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distributed Commission:</span>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-900 font-semibold">Total Commission:</span>
                  <span className="font-bold text-green-600">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Trades:</span>
                  <span className="font-semibold text-gray-900">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lots:</span>
                  <span className="font-semibold text-gray-900">0.00</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-600">IB Rate:</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    ${selectedIB.ibRate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IB Details Modal */}
      {showDetailsModal && selectedIB && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">IB Details</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* IB Information and Commission Summary */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200">
              {/* IB Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">IB Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedIB.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedIB.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedIB.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">IB Rate</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      ${selectedIB.ibRate}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Approved Date</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedIB.approvedDate} 18:46</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Member Since</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedIB.memberSince}</p>
                  </div>
                </div>
              </div>

              {/* Commission Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Summary</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Trades</p>
                    <p className="text-lg font-bold text-gray-900">0</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Lots</p>
                    <p className="text-lg font-bold text-gray-900">0.00</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Commission</p>
                    <p className="text-lg font-bold text-green-600">$0.00</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">IB Rate</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      ${selectedIB.ibRate}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Estimated Earnings</p>
                    <p className="text-lg font-bold text-green-600">$0.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Clients and Sub-IBs */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Direct Clients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Direct Clients ({selectedIB.directClients})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Accounts</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          No direct clients
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-IBs */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sub-IBs ({selectedIB.subIBs})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">IB Rate</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Accounts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          No sub-IBs
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Distribute Commission Modal */}
      {showDistributeModal && selectedIB && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Distribute Commission</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Calculated amount: $0.00</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Add any notes about this commission distribution."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleDistribute}>
                Distribute Commission
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommissionDistribution;
