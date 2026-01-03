import React, { useState } from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  Users,
  UserCheck,
  TrendingUp,
  ArrowLeft,
  Eye,
  Edit,
  X,
  Info,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  Wallet,
  CreditCard,
  DollarSign,
  FileText,
  Download,
  BarChart3,
} from 'lucide-react';

function IBProfile() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [selectedIB, setSelectedIB] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);

  // Dummy data for IB profiles list
  const ibProfilesData = [
    {
      id: 1,
      name: 'ABCD XYZ',
      email: 'admin@gmail.com',
      referredBy: { name: '', email: '' },
      type: 'NORMAL',
      pipRate: '0.53 pip (avg, group-based)',
      referrals: 0,
      totalCommission: '$0.00',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Abdul Rehman',
      email: 'mani3130882929@gmail.com',
      referredBy: { name: 'nazeer sultan', email: 'asiacablg@gmail.com' },
      type: 'NORMAL',
      pipRate: '0.50 pip (avg, group-based)',
      referrals: 8,
      totalCommission: '$0.00',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Aditya Nikam',
      email: 'adityanikam8149@gmail.com',
      referredBy: { name: 'Suyog Datrange', email: 'suyogdatrange@gmail.com' },
      type: 'NORMAL',
      pipRate: '1.50 pip (avg, group-based)',
      referrals: 4,
      totalCommission: '$0.00',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Ajay Rajput',
      email: 'ajayrajput0019@gmail.com',
      referredBy: { name: 'Rohit Kamble', email: 'rohitkamble4147@gmail.com' },
      type: 'NORMAL',
      pipRate: '1.00 pip (avg, group-based)',
      referrals: 6,
      totalCommission: '$0.00',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Ajay Thengil',
      email: 'ajaythengil@gmail.com',
      referredBy: { name: 'Candle Story', email: 'ceo.candlestory@gmail.com' },
      type: 'NORMAL',
      pipRate: '1.20 pip (avg, group-based)',
      referrals: 49,
      totalCommission: '$0.00',
      status: 'Active',
    },
    {
      id: 6,
      name: 'AJIT BHANDALKAR',
      email: 'devanshsaee0809@gmail.com',
      referredBy: { name: 'Sagar Shinde', email: 'sagarshinde0034@gmail.com' },
      type: 'NORMAL',
      pipRate: 'Not configured',
      referrals: 0,
      totalCommission: '$0.00',
      status: 'Active',
    },
    {
      id: 7,
      name: 'AKANKSHA BAHADURE',
      email: 'akankshabahadure@gmail.com',
      referredBy: { name: 'V R ENTERPRISE', email: 'vrenterprisessatara@gmail.com' },
      type: 'NORMAL',
      pipRate: '1.50 pip (avg, group-based)',
      referrals: 0,
      totalCommission: '$0.00',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Akash Jadhav',
      email: 'akashjadhav@gmail.com',
      referredBy: { name: 'Amar Nikam', email: 'amarjeet4770@gmail.com' },
      type: 'NORMAL',
      pipRate: '1.00 pip (avg, group-based)',
      referrals: 0,
      totalCommission: '$0.00',
      status: 'Active',
    },
  ];

  // Dummy data for IB detail view
  const ibDetailData = {
    name: 'ABCD XYZ',
    email: 'admin@gmail.com',
    phone: '0000000000',
    country: 'India',
    ibType: 'normal',
    pipRate: '1.00 pip',
    approvedDate: '2025-10-15 08:47',
    referredBy: { name: '', email: '' },
    totalAccounts: 0,
    totalBalance: '$0.00',
    totalEquity: '$0.00',
    ownLots: '0.00',
    teamLots: '0.00',
    totalTrades: 0,
    totalLots: '0.00',
    id: 180,
  };

  // IB Pip Rates by Group data
  const pipRatesByGroup = [
    {
      id: 'classic',
      label: 'Classic IBs',
      group: 'OXO_B\\Classic',
      pipRate: '0.30',
      commission: '$3.00/lot',
    },
    {
      id: 'ecn',
      label: 'Raw + IBs',
      group: 'OXO_B\\ECN',
      pipRate: '0.01',
      commission: '$0.10/lot',
    },
    {
      id: 'plus',
      label: 'Plus IBs',
      group: 'OXO_B\\Plus',
      pipRate: '0.50',
      commission: '$5.00/lot',
    },
    {
      id: 'pro',
      label: 'Pro IBs',
      group: 'OXO_B\\Pro',
      pipRate: '1.00',
      commission: '$10.00/lot',
    },
    {
      id: 'standard',
      label: 'Standard IBs',
      group: 'OXO_B\\Standard',
      pipRate: '1.50',
      commission: '$15.00/lot',
    },
    {
      id: 'startup',
      label: 'Startup IBs',
      group: 'OXO_B\\Startup',
      pipRate: '0.01',
      commission: '$0.10/lot',
    },
  ];

  const profilesColumns = [
    {
      key: 'name',
      label: 'IB Name',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'referredBy',
      label: 'Referred By',
      render: (value) => {
        if (!value.name) return <span className="text-gray-400">-</span>;
        return (
          <div>
            <a href={`mailto:${value.email}`} className="text-blue-600 hover:underline font-medium">
              {value.name}
            </a>
            <div className="text-xs text-gray-600">{value.email}</div>
          </div>
        );
      },
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
      key: 'pipRate',
      label: 'Pip Rate',
      render: (value) => {
        if (value === 'Not configured') {
          return <span className="text-gray-500 italic">{value}</span>;
        }
        return <span className="text-gray-700">{value}</span>;
      },
    },
    {
      key: 'referrals',
      label: 'Referrals',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'totalCommission',
      label: 'Total Commission',
      render: (value) => <span className="font-semibold text-green-600">{value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Eye}
            onClick={() => handleViewDetail(row)}
          >
            View
          </Button>
          <button
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            title="Edit"
            onClick={() => handleEditPipRates(row)}
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetail = (ib) => {
    setSelectedIB(ib);
    setViewMode('detail');
  };

  const handleEditPipRates = (ib) => {
    setEditModalData(ib);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditModalData(null);
  };

  const handleSaveChanges = () => {
    console.log('Saving pip rate changes...', editModalData);
    handleCloseModal();
  };

  const handleResetDefaults = () => {
    console.log('Resetting to defaults...');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedIB(null);
  };

  // List View
  if (viewMode === 'list') {
    return (
      <div className="w-full space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Profiles</h1>
          <p className="text-gray-600">Manage and view all IB profiles</p>
        </div>

        {/* Profiles Table */}
        <Card>
          <Table
            rows={ibProfilesData}
            columns={profilesColumns}
            pageSize={10}
            searchPlaceholder="Search IBs..."
            filters={{
              searchKeys: ['name', 'email'],
              selects: [
                {
                  key: 'status',
                  label: 'All Statuses',
                  options: ['Active', 'Inactive', 'Suspended'],
                },
                {
                  key: 'type',
                  label: 'All Types',
                  options: ['NORMAL', 'MASTER'],
                },
              ],
            }}
          />
        </Card>

        {/* Edit Pip Rates Modal */}
        {showEditModal && editModalData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Edit IB Pip Rates by Group</h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* IB Name */}
              <div className="p-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">IB Name</p>
                <p className="text-lg font-semibold text-gray-900">{editModalData.name}</p>
              </div>

              {/* Pip Rates per Group */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pip Rates per Group</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pipRatesByGroup.map((group) => (
                    <div
                      key={group.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{group.label}</h4>
                        <Button variant="outline" size="sm">
                          Custom
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Group</p>
                          <p className="text-sm font-medium text-gray-700">{group.group}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Pip Rate</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              step="0.01"
                              defaultValue={group.pipRate}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                            />
                            <span className="text-sm text-gray-600">pip/lot</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Commission</p>
                          <p className="text-sm font-semibold text-green-600">{group.commission}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <p className="text-xs text-gray-700">
                            Rate will apply when IB gets accounts in this group
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Message */}
                <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Assign pip rates for each group. The IB will earn commission based on these rates for their clients' trades.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handleResetDefaults}>
                  Reset to Defaults
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Detail View
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Profile Details</h1>
          <p className="text-gray-600">Complete overview of IB user data and performance</p>
        </div>
        <Button variant="outline" icon={ArrowLeft} onClick={handleBackToList}>
          ← Back to Profiles
        </Button>
      </div>

      {/* IB Information and Account Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IB Information */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">IB Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="text-sm font-semibold text-gray-900">{ibDetailData.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-semibold text-gray-900">{ibDetailData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-semibold text-gray-900">{ibDetailData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Country</p>
                <p className="text-sm font-semibold text-gray-900">{ibDetailData.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">IB Type</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {ibDetailData.ibType}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Pip/Lot Rate</p>
                <p className="text-sm font-semibold text-green-600">{ibDetailData.pipRate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Approved Date</p>
                <p className="text-sm font-semibold text-gray-900">{ibDetailData.approvedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Referred By</p>
                {ibDetailData.referredBy.name ? (
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{ibDetailData.referredBy.name}</p>
                    <p className="text-xs text-gray-600">{ibDetailData.referredBy.email}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Direct signup</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Account Statistics */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Accounts</p>
                  <p className="text-2xl font-bold text-gray-900">{ibDetailData.totalAccounts}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900">{ibDetailData.totalBalance}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Equity</p>
                  <p className="text-2xl font-bold text-gray-900">{ibDetailData.totalEquity}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Trade History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Trade History (IB Pip Rate: $1.00/pip)
          </h2>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none">
              <option>All Trades</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <Button variant="outline" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        </div>
        <div className="py-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">No Trades Found</p>
          <p className="text-sm text-gray-600">This IB user has no trade history yet.</p>
        </div>
      </Card>

      {/* IB Tree Structure and User Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IB Tree Structure */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">IB Tree Structure</h2>
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="text-center py-6">
                <p className="text-4xl font-bold mb-2">{ibDetailData.ownLots}</p>
                <p className="text-sm font-medium opacity-90">Own Lots</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="text-center py-6">
                <p className="text-4xl font-bold mb-2">{ibDetailData.teamLots}</p>
                <p className="text-sm font-medium opacity-90">Team Lots</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <div className="text-center py-6">
                <p className="text-4xl font-bold mb-2">{ibDetailData.totalTrades}</p>
                <p className="text-sm font-medium opacity-90">Total Trades</p>
              </div>
            </Card>
          </div>
        </div>

        {/* User Profile Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
          <div className="text-center mb-6">
            <div className="mx-auto w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-1">{ibDetailData.name} (#{ibDetailData.id})</h3>
            <p className="text-sm text-gray-300">{ibDetailData.email}</p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">Account Balance</span>
              <span className="font-semibold">{ibDetailData.totalBalance}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">Accounts</span>
              <span className="font-semibold">{ibDetailData.totalAccounts}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">IB Pip Rate</span>
              <span className="font-semibold text-green-400">${ibDetailData.pipRate.split(' ')[0]} per lot</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">Own Lots</span>
              <span className="font-semibold">{ibDetailData.ownLots}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">Trades</span>
              <span className="font-semibold">{ibDetailData.totalTrades}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">Team Lots</span>
              <span className="font-semibold">{ibDetailData.teamLots}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-300">Total Lots</span>
              <span className="font-semibold">{ibDetailData.totalLots}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default IBProfile;
