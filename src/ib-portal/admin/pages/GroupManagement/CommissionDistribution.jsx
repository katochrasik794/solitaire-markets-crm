import React, { useState } from 'react';
import Card from '../../../ui/Card';
import StatCard from '../../../ui/StatCard';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import {
  DollarSign,
  CheckCircle,
  TrendingUp,
  Users,
  Plus,
  X,
  Edit,
  Copy,
  Trash2,
  Eye,
} from 'lucide-react';

function CommissionDistribution() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDistribution, setSelectedDistribution] = useState(null);
  const [searchUsers, setSearchUsers] = useState('');

  // Dummy data
  const summaryStats = {
    totalDistributions: { value: '6' },
    activeDistributions: { value: '6' },
    averagePipValue: { value: '0.8' },
    availableGroups: { value: '17' },
  };

  const commissionDistributionData = [
    {
      id: 7,
      groupName: 'CLASSIC',
      groupPath: 'sol_B\\Classic',
      pipValue: '0.30',
      availability: 'Selected Users',
      availabilityCount: 1,
      status: 'Active',
      created: '2025-12-01 16:57',
      updated: '2025-12-01 18:06',
    },
    {
      id: 1,
      groupName: 'ECN',
      groupPath: 'sol_B\\ECN',
      pipValue: '0.01',
      availability: 'All Users',
      availabilityCount: null,
      status: 'Active',
      created: '2025-10-16 01:32',
      updated: '2025-11-19 00:00',
    },
    {
      id: 6,
      groupName: 'PLUS',
      groupPath: 'sol_B\\Plus',
      pipValue: '2.00',
      availability: 'All Users',
      availabilityCount: null,
      status: 'Active',
      created: '2025-10-31 14:49',
      updated: '2025-11-01 20:19',
    },
    {
      id: 2,
      groupName: 'PRO',
      groupPath: 'sol_B\\Pro',
      pipValue: '1.00',
      availability: 'All Users',
      availabilityCount: null,
      status: 'Active',
      created: '2025-10-16 01:35',
      updated: '2025-10-31 16:29',
    },
    {
      id: 3,
      groupName: 'STANDARD',
      groupPath: 'sol_B\\Standard',
      pipValue: '1.50',
      availability: 'All Users',
      availabilityCount: null,
      status: 'Active',
      created: '2025-10-16 01:35',
      updated: '2025-10-31 16:27',
    },
    {
      id: 4,
      groupName: 'STARTUP',
      groupPath: 'sol_B\\Startup',
      pipValue: '0.01',
      availability: 'Selected Users',
      availabilityCount: 1,
      status: 'Active',
      created: '2025-10-16 01:36',
      updated: '2025-12-01 17:41',
    },
  ];

  const availableGroups = [
    'sol_B\\Classic',
    'sol_B\\ECN',
    'sol_B\\Plus',
    'sol_B\\Pro',
    'sol_B\\Standard',
    'sol_B\\Startup',
    'sol_A\\Classic',
    'sol_A\\ECN',
    'sol_A\\Plus',
    'sol_A\\Pro',
    'sol_A\\Standard',
    'sol_A\\Startup',
  ];

  const usersList = [
    { id: 1, name: 'Aakanksha Pawar', email: 'aakanksha.pawar8149@gmail.com' },
    { id: 2, name: 'abc cde', email: 'thomasselve7@gmail.com' },
    { id: 3, name: 'Abdul Rehman', email: 'mani3130882929@gmail.com' },
    { id: 4, name: 'Abhishek Pratap Yadav', email: 'abhishekpy00@gmail.com' },
    { id: 5, name: 'Aakanksha Pawar', email: 'aakankshalp@gmail.com' },
    { id: 6, name: 'ABCD XYZ', email: 'admin@gmail.com' },
    { id: 7, name: 'Abhishek Pratap Yadav', email: 'abhipratap9999@gmail.com' },
    { id: 8, name: 'Abhyansh Awasthi', email: 'abhyanshawasthi4@gmail.com' },
  ];

  const distributionColumns = [
    {
      key: 'id',
      label: 'ID',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'groupName',
      label: 'Group Name',
      render: (value) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'groupPath',
      label: 'Group Path',
      render: (value) => (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
          {value}
        </span>
      ),
    },
    {
      key: 'pipValue',
      label: 'Pip Value',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'availability',
      label: 'Availability',
      render: (value, row) => (
        <div>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            {value}
          </span>
          {row.availabilityCount !== null && (
            <div className="text-xs text-gray-600 mt-1">({row.availabilityCount} users)</div>
          )}
        </div>
      ),
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
      key: 'created',
      label: 'Created',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'updated',
      label: 'Updated',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            title="Edit"
            onClick={() => handleEdit(row)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded transition-colors"
            title="Copy"
            onClick={() => handleCopy(row)}
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete"
            onClick={() => handleDelete(row)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddAllGroups = () => {
    console.log('Adding all groups...');
  };

  const handleEdit = (row) => {
    setSelectedDistribution(row);
    setShowEditModal(true);
  };

  const handleCopy = (row) => {
    console.log('Copying:', row);
  };

  const handleDelete = (row) => {
    console.log('Deleting:', row);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedDistribution(null);
    setSearchUsers('');
  };

  const handleSave = () => {
    console.log('Saving commission distribution...');
    handleCloseModal();
  };

  const handleUpdate = () => {
    console.log('Updating commission distribution...', selectedDistribution);
    handleCloseModal();
  };

  return (
    <div className="w-full space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>IB Portal</span>
          <span>{'>'}</span>
          <span className="text-gray-900 font-medium">Commission Distribution</span>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Commission Distribution</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">TOTAL DISTRIBUTIONS</p>
              <p className="text-3xl font-bold text-gray-900 mb-3">{summaryStats.totalDistributions.value}</p>
              <Button variant="outline" size="sm" icon={DollarSign}>
                Pip Values
              </Button>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">ACTIVE DISTRIBUTIONS</p>
              <p className="text-3xl font-bold text-gray-900 mb-3">{summaryStats.activeDistributions.value}</p>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                <CheckCircle className="w-3 h-3" />
                Active
              </span>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">AVERAGE PIP VALUE</p>
              <p className="text-3xl font-bold text-gray-900 mb-3">{summaryStats.averagePipValue.value}</p>
              <Button variant="outline" size="sm" icon={TrendingUp}>
                Average
              </Button>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">AVAILABLE GROUPS</p>
              <p className="text-3xl font-bold text-gray-900 mb-3">{summaryStats.availableGroups.value}</p>
              <Button variant="outline" size="sm" icon={Users} className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200">
                Groups
              </Button>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Commission Distribution Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Commission Distribution Actions</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              icon={Plus}
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Add Group
            </Button>
            <Button
              variant="primary"
              icon={Users}
              onClick={handleAddAllGroups}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Add All Groups
            </Button>
          </div>
        </div>
      </Card>

      {/* Commission Distribution Settings Table */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission Distribution Settings</h2>
        <Table
          rows={commissionDistributionData}
          columns={distributionColumns}
          pageSize={25}
          searchPlaceholder="Search distributions..."
          filters={{
            searchKeys: ['groupName', 'groupPath'],
            selects: [
              {
                key: 'status',
                label: 'All Statuses',
                options: ['Active', 'Inactive'],
              },
              {
                key: 'availability',
                label: 'All Availabilities',
                options: ['All Users', 'Selected Users'],
              },
            ],
          }}
        />
      </Card>

      {/* Add Commission Distribution Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Commission Distribution</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Group <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none">
                  <option>Select a group...</option>
                  {availableGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., ECN+, Pro, Standard"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">User-friendly name shown in trading account dropdown</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pip Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="Enter pip value"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Enter the pip value for this group (0.00 - 100.00)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Availability <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none">
                  <option>All Users</option>
                  <option>Selected Users</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" defaultChecked className="w-4 h-4 text-ib-500 border-gray-300 rounded focus:ring-ib-500" />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Active
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Commission
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Commission Distribution Modal */}
      {showEditModal && selectedDistribution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit Commission Distribution</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Path</label>
                <input
                  type="text"
                  value={selectedDistribution.groupPath}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Backend group path (read-only)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedDistribution.groupName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">User-friendly name shown in trading account dropdown</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pip Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  defaultValue={selectedDistribution.pipValue}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue={selectedDistribution.availability}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
                >
                  <option>All Users</option>
                  <option>Selected Users</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="edit-active" defaultChecked={selectedDistribution.status === 'Active'} className="w-4 h-4 text-ib-500 border-gray-300 rounded focus:ring-ib-500" />
                <label htmlFor="edit-active" className="text-sm font-medium text-gray-700">
                  Active
                </label>
              </div>

              {/* Select Users Section */}
              {selectedDistribution.availability === 'Selected Users' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Users</label>
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchUsers}
                    onChange={(e) => setSearchUsers(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none mb-4"
                  />
                  <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {usersList
                        .filter(user => 
                          user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchUsers.toLowerCase())
                        )
                        .map((user) => (
                          <div key={user.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`user-${user.id}`}
                              className="w-4 h-4 text-ib-500 border-gray-300 rounded focus:ring-ib-500"
                            />
                            <label htmlFor={`user-${user.id}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Select which users can access this group</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommissionDistribution;
