import React from 'react';
import Card from '../../../ui/Card';
import StatCard from '../../../ui/StatCard';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import {
  Users,
  Server,
  RefreshCw,
  Bug,
  Eye,
  Trash2,
  Edit,
} from 'lucide-react';

function TradingGroups() {
  // Dummy data
  const summaryStats = {
    totalGroups: { value: '17' },
    solAGroups: { value: '8' },
    solBGroups: { value: '8' },
  };

  const tradingGroupsData = [
    {
      id: 1,
      groupName: 'sol_A\\Classic',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 13,
      groupName: 'sol_A\\ECN',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '70%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 2,
      groupName: 'sol_A\\ECN+$10Comm',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '15%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 3,
      groupName: 'sol_A\\Prime',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 4,
      groupName: 'sol_A\\Pro',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 5,
      groupName: 'sol_A\\Standard',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 6,
      groupName: 'sol_A\\Startup',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 7,
      groupName: 'sol_A\\Plus',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 89,
      groupName: 'sol_B\\Plus',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-31 14:44',
    },
    {
      id: 90,
      groupName: 'sol_B\\Classic',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 91,
      groupName: 'sol_B\\ECN',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '70%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 92,
      groupName: 'sol_B\\ECN+$5Comm',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '15%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 93,
      groupName: 'sol_B\\Prime',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 94,
      groupName: 'sol_B\\Pro',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 95,
      groupName: 'sol_B\\Standard',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 96,
      groupName: 'sol_B\\Startup',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '50%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
    {
      id: 97,
      groupName: 'sol_B\\ECN+$10Comm',
      server: 1,
      company: 'sol Markets Limited',
      currency: 0,
      marginCall: '100%',
      stopOut: '15%',
      tradeFlags: 16,
      created: '2025-10-15 23:08',
    },
  ];

  const groupsColumns = [
    {
      key: 'id',
      label: 'ID',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'groupName',
      label: 'Group Name',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'server',
      label: 'Server',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'company',
      label: 'Company',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'currency',
      label: 'Currency',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'marginCall',
      label: 'Margin Call',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'stopOut',
      label: 'Stop Out',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'tradeFlags',
      label: 'Trade Flags',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'created',
      label: 'Created',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            title="View/Edit"
            onClick={() => console.log('View/Edit:', row)}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete"
            onClick={() => console.log('Delete:', row)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleSyncFromAPI = () => {
    console.log('Syncing from API...');
  };

  const handleDebugAJAX = () => {
    console.log('Debug AJAX...');
  };

  return (
    <div className="w-full space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>IB Portal</span>
        <span>{'>'}</span>
        <span className="text-gray-900 font-medium">Group Management</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Group Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="TOTAL GROUPS"
          value={summaryStats.totalGroups.value}
          subtitle="Groups"
          icon={Users}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="sol_A GROUPS"
          value={summaryStats.solAGroups.value}
          subtitle="Server A"
          icon={Server}
          iconBg="bg-purple-100"
          valueColor="text-purple-600"
        />

        <StatCard
          title="sol_B GROUPS"
          value={summaryStats.solBGroups.value}
          subtitle="Server B"
          icon={Server}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />
      </div>

      {/* Group Management Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Group Management Actions</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              icon={RefreshCw}
              onClick={handleSyncFromAPI}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Sync from API
            </Button>
            <Button
              variant="primary"
              icon={Bug}
              onClick={handleDebugAJAX}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Debug AJAX
            </Button>
          </div>
        </div>
      </Card>

      {/* Trading Account Groups Table */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Trading Account Groups</h2>
        <Table
          rows={tradingGroupsData}
          columns={groupsColumns}
          pageSize={25}
          searchPlaceholder="Search groups..."
          filters={{
            searchKeys: ['groupName', 'company'],
            selects: [
              {
                key: 'server',
                label: 'All Servers',
                options: ['1'],
              },
              {
                key: 'company',
                label: 'All Companies',
                options: ['sol Markets Limited'],
              },
            ],
          }}
        />
      </Card>
    </div>
  );
}

export default TradingGroups;
