import React, { useState } from 'react';
import Card from '../../ui/Card';
import StatCard from '../../ui/StatCard';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Plus,
  Grid,
  Eye,
  Edit,
  Trash2,
  Copy,
  Search,
} from 'lucide-react';

function SymbolsPipValues() {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data
  const summaryStats = {
    totalSymbols: { value: '1,304' },
    configuredPipLot: { value: '1,304.00' },
    overrides: { value: '0' },
  };

  const categories = ['Stocks', 'Cryptocurrencies', 'Forex', 'Indices', 'Commodities', 'Other'];

  const symbolsByCategory = [
    { category: 'Stocks', count: 46 },
    { category: 'Cryptocurrencies', count: 141 },
    { category: 'Forex', count: 730 },
    { category: 'Indices', count: 209 },
    { category: 'Commodities', count: 176 },
    { category: 'Other', count: 2 },
  ];

  // Sample symbols data
  const symbolsData = [
    {
      id: 1,
      symbol: 'AAPL.sp',
      pair: '-',
      group: 'Stocks',
      category: 'Stocks',
      pipLot: '1.00 pip',
      pipValue: 'USD10.00',
      commission: 'USD10.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 2,
      symbol: 'ABNB.sp',
      pair: '-',
      group: 'Stocks',
      category: 'Stocks',
      pipLot: '1.00 pip',
      pipValue: 'USD10.00',
      commission: 'USD10.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 3,
      symbol: 'ADAUSD.>',
      pair: '-',
      group: 'Crypto',
      category: 'Cryptocurrencies',
      pipLot: '1.00 pip',
      pipValue: 'USD1.00',
      commission: 'USD1.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 4,
      symbol: 'ADAUSD.ecn',
      pair: 'ADA/USD',
      group: 'Crypto',
      category: 'Cryptocurrencies',
      pipLot: '1.00 pip',
      pipValue: 'USD1.00',
      commission: 'USD1.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 5,
      symbol: 'ALGOBIT.br',
      pair: '-',
      group: 'Crypto',
      category: 'Cryptocurrencies',
      pipLot: '1.00 pip',
      pipValue: 'USD1.00',
      commission: 'USD1.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 6,
      symbol: 'ALGUSD.r',
      pair: '-',
      group: 'Crypto',
      category: 'Cryptocurrencies',
      pipLot: '1.00 pip',
      pipValue: 'USD1.00',
      commission: 'USD1.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 7,
      symbol: 'AMD.sp',
      pair: '-',
      group: 'Stocks',
      category: 'Stocks',
      pipLot: '1.00 pip',
      pipValue: 'USD10.00',
      commission: 'USD10.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 8,
      symbol: 'AMGN.sp',
      pair: '-',
      group: 'Stocks',
      category: 'Stocks',
      pipLot: '1.00 pip',
      pipValue: 'USD10.00',
      commission: 'USD10.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 9,
      symbol: 'AMZN.sp',
      pair: '-',
      group: 'Stocks',
      category: 'Stocks',
      pipLot: '1.00 pip',
      pipValue: 'USD10.00',
      commission: 'USD10.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 10,
      symbol: 'ATMUSD.r',
      pair: 'ATM / USD',
      group: 'Crypto',
      category: 'Cryptocurrencies',
      pipLot: '1.00 pip',
      pipValue: 'USD1.00',
      commission: 'USD1.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 11,
      symbol: 'ATOMBIT.br',
      pair: '-',
      group: 'Crypto',
      category: 'Cryptocurrencies',
      pipLot: '1.00 pip',
      pipValue: 'USD1.00',
      commission: 'USD1.00',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 12,
      symbol: 'AUDCAD',
      pair: 'AUD / CAD',
      group: 'FX Minor',
      category: 'Forex',
      pipLot: '1.00 pip',
      pipValue: 'USD7.50',
      commission: 'USD7.50',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 13,
      symbol: 'AUDCAD#',
      pair: 'AUD / CAD',
      group: 'FX Minor',
      category: 'Forex',
      pipLot: '1.00 pip',
      pipValue: 'USD7.50',
      commission: 'USD7.50',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 14,
      symbol: 'AUDCAD.AT',
      pair: 'AUD / CAD',
      group: 'FX Minor',
      category: 'Forex',
      pipLot: '1.00 pip',
      pipValue: 'USD7.50',
      commission: 'USD7.50',
      currency: 'USD',
      status: 'Active',
    },
    {
      id: 15,
      symbol: 'AUDCAD.br',
      pair: 'AUD / CAD',
      group: 'FX Minor',
      category: 'Forex',
      pipLot: '1.00 pip',
      pipValue: 'USD7.50',
      commission: 'USD7.50',
      currency: 'USD',
      status: 'Active',
    },
  ];

  const symbolsColumns = [
    {
      key: 'symbol',
      label: 'Symbol',
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'pair',
      label: 'Pair/Description',
      render: (value) => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      key: 'group',
      label: 'Type Tag',
      render: (value) => {
        const groupColors = {
          'Stocks': 'bg-blue-100 text-blue-800',
          'Crypto': 'bg-purple-100 text-purple-800',
          'FX Minor': 'bg-indigo-100 text-indigo-800',
          'Forex': 'bg-indigo-100 text-indigo-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${groupColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'pipLot',
      label: 'Pip Value Unit',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'pipValue',
      label: 'Pip Value (USD)',
      render: (value) => <span className="font-semibold text-green-600">{value}</span>,
    },
    {
      key: 'commission',
      label: 'Commission',
      render: (value) => <span className="font-semibold text-orange-600">{value}</span>,
    },
    {
      key: 'currency',
      label: 'Currency',
      render: (value) => <span className="text-gray-700">{value}</span>,
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
          <button
            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
            title="Copy"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleSyncFromAPI = () => {
    console.log('Sync from API clicked');
  };

  const handleAddSymbol = () => {
    console.log('Add Symbol clicked');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Symbols & Pip Values</h1>
          <p className="text-gray-600">1,304 symbols loaded</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSyncFromAPI}
            icon={RefreshCw}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Sync from API
          </Button>
          <Button
            onClick={handleAddSymbol}
            icon={Plus}
            size="sm"
            variant="primary"
          >
            Add Symbol
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Symbols"
          value={summaryStats.totalSymbols.value}
          icon={TrendingUp}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <StatCard
          title="Configured Pip/Lot"
          value={summaryStats.configuredPipLot.value}
          icon={DollarSign}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />

        <StatCard
          title="Overrides"
          value={summaryStats.overrides.value}
          icon={AlertTriangle}
          iconBg="bg-yellow-100"
          valueColor="text-yellow-600"
        />
      </div>

      {/* Categories Card */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Grid className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Categories</h3>
        </div>
        <p className="text-sm text-gray-600">{categories.join(', ')}</p>
      </Card>

      {/* Main Data Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Symbols ({symbolsData.length} total)
          </h2>
          <Button variant="outline" size="sm" icon={Eye}>
            Preview
          </Button>
        </div>

        <Table
          rows={symbolsData}
          columns={symbolsColumns}
          pageSize={25}
          searchPlaceholder="Search symbols..."
          filters={{
            searchKeys: ['symbol', 'pair', 'category', 'group'],
            selects: [
              {
                key: 'category',
                label: 'All Categories',
                options: ['Stocks', 'Cryptocurrencies', 'Forex', 'Indices', 'Commodities', 'Other'],
              },
              {
                key: 'group',
                label: 'All Groups',
                options: ['Stocks', 'Crypto', 'FX Minor', 'Forex'],
              },
              {
                key: 'status',
                label: 'All Statuses',
                options: ['Active', 'Inactive'],
              },
            ],
          }}
        />
      </Card>

      {/* Symbols by Category */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Symbols by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {symbolsByCategory.map((item) => (
            <div
              key={item.category}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 text-center"
            >
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.count}</p>
              <p className="text-sm text-gray-600">{item.category}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SymbolsPipValues;
