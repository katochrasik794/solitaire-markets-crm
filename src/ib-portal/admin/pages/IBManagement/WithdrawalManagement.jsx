import React, { useState } from 'react';
import Card from '../../../ui/Card';
import StatCard from '../../../ui/StatCard';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import {
  FileText,
  Clock,
  CheckCircle,
  X,
  Eye,
  Search,
  CreditCard,
} from 'lucide-react';

function WithdrawalManagement() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Dummy data
  const summaryStats = {
    totalRequests: { value: '211' },
    pending: { value: '0', amount: '$0.00' },
    approved: { value: '197', amount: '$10,405.27' },
    rejected: { value: '14' },
  };

  const withdrawalRequestsData = [
    {
      id: 218,
      ibUser: 'Pramod Kirdat',
      ibUserId: 455,
      email: 'kirdatpramod518@gmail.com',
      amount: '$13.35',
      paymentMethod: 'Mt5',
      mt5Id: '369137',
      status: 'Approved',
      autoApproved: true,
      requestedDate: 'Jan 02, 2026 15:50',
      approvedDate: 'Jan 02, 2026 15:50',
    },
    {
      id: 217,
      ibUser: 'Siddhesh Jadhav',
      ibUserId: 551,
      email: 'siddheshjadhav873@gmail.com',
      amount: '$19.00',
      paymentMethod: 'Bank',
      bankDetails: {
        accountHolder: 'Siddhesh Jadhav',
        bankName: 'Bank of baroda',
        accountNumber: '36880100012327',
        ifscCode: 'BARBOVASHID',
        bankAddress: 'Shriram nagar Vasind west',
      },
      status: 'Approved',
      autoApproved: false,
      requestedDate: 'Jan 02, 2026 10:03',
      approvedDate: 'Jan 02, 2026 11:01',
    },
    {
      id: 216,
      ibUser: 'Priyjeet Devkar',
      ibUserId: 472,
      email: 'devkarpriyjeet@gmail.com',
      amount: '$10.00',
      paymentMethod: 'Mt5',
      mt5Id: '369143',
      status: 'Approved',
      autoApproved: true,
      requestedDate: 'Jan 02, 2026 06:51',
      approvedDate: 'Jan 02, 2026 06:51',
    },
    {
      id: 215,
      ibUser: 'Snehal Kamble',
      ibUserId: 389,
      email: 'snehalzende21@gmail.com',
      amount: '$59.00',
      paymentMethod: 'Bank',
      bankDetails: {
        accountHolder: 'Snehal Kamble',
        bankName: 'HDFC Bank',
        accountNumber: '1234567890',
        ifscCode: 'HDFC0001234',
        bankAddress: 'Mumbai, Maharashtra',
      },
      status: 'Approved',
      autoApproved: false,
      requestedDate: 'Jan 01, 2026 12:34',
      approvedDate: 'Jan 01, 2026 12:46',
    },
    {
      id: 214,
      ibUser: 'SOMESH KUMAR',
      ibUserId: 678,
      email: 'someshuniyal09@gmail.com',
      amount: '$11.00',
      paymentMethod: 'Mt5',
      mt5Id: '369330',
      status: 'Approved',
      autoApproved: true,
      requestedDate: 'Dec 31, 2025 11:53',
      approvedDate: 'Dec 31, 2025 11:53',
    },
  ];

  const withdrawalColumns = [
    {
      key: 'requestId',
      label: 'Request ID',
      render: (value, row) => <span className="font-semibold text-gray-900">#{row.id}</span>,
    },
    {
      key: 'ibUser',
      label: 'IB User',
      render: (value, row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.ibUser}</p>
          <p className="text-xs text-gray-600">ID: {row.ibUserId}</p>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => <span className="font-semibold text-blue-600">{value}</span>,
    },
    {
      key: 'paymentMethod',
      label: 'Payment Method',
      render: (value, row) => (
        <div>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-1 inline-block">
            {value}
          </span>
          {row.mt5Id && (
            <div className="text-xs text-gray-600 mt-1">MT5 ID: {row.mt5Id}</div>
          )}
          <button
            className="text-xs text-blue-600 hover:text-blue-700 hover:underline mt-1 flex items-center gap-1"
            onClick={() => handleViewPaymentDetails(row)}
          >
            <Eye className="w-3 h-3" />
            View Details
          </button>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, row) => (
        <div>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            {value}
          </span>
          {row.autoApproved && (
            <div className="text-xs text-gray-500 mt-1">Auto-approved</div>
          )}
        </div>
      ),
    },
    {
      key: 'requestedDate',
      label: 'Requested Date',
      render: (value, row) => (
        <div className="text-xs">
          <p className="text-gray-700">Requested: {row.requestedDate}</p>
          {row.approvedDate && (
            <p className="text-gray-600">Approved: {row.approvedDate}</p>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            title="View Details"
            onClick={() => handleViewPaymentDetails(row)}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleViewPaymentDetails = (row) => {
    setSelectedPayment(row);
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IB Withdrawal Management</h1>
        <p className="text-gray-600">Review and manage IB commission withdrawal requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={summaryStats.totalRequests.value}
          icon={FileText}
          iconBg="bg-blue-100"
          valueColor="text-blue-600"
        />

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Pending</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{summaryStats.pending.value}</p>
              <p className="text-xs text-gray-500">{summaryStats.pending.amount}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Approved</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{summaryStats.approved.value}</p>
              <p className="text-xs text-gray-500">{summaryStats.approved.amount}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Rejected</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{summaryStats.rejected.value}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Withdrawal Requests Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Withdrawal Requests</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ib-500 focus:border-ib-500 outline-none"
            />
          </div>
        </div>

        <Table
          rows={withdrawalRequestsData}
          columns={withdrawalColumns}
          pageSize={25}
          searchPlaceholder="Search requests..."
          filters={{
            searchKeys: ['ibUser', 'email', 'paymentMethod'],
            selects: [
              {
                key: 'status',
                label: 'All Statuses',
                options: ['Approved', 'Pending', 'Rejected'],
              },
              {
                key: 'paymentMethod',
                label: 'All Payment Methods',
                options: ['Bank', 'Mt5'],
              },
            ],
            dateKey: 'requestedDate',
          }}
        />
      </Card>

      {/* Payment Details Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
              </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method:</label>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {selectedPayment.paymentMethod}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Details:</label>
                {selectedPayment.paymentMethod === 'Bank' && selectedPayment.bankDetails ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Account Holder</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.bankDetails.accountHolder}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.bankDetails.bankName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Account Number</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.bankDetails.ifscCode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Bank Address</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.bankDetails.bankAddress}</p>
                    </div>
                  </div>
                ) : selectedPayment.paymentMethod === 'Mt5' && selectedPayment.mt5Id ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">MT5 Account ID:</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        #{selectedPayment.mt5Id}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Account Type:</p>
                      <p className="text-sm font-semibold text-gray-900">Plus</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-6 border-t border-gray-200">
              <Button variant="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WithdrawalManagement;
