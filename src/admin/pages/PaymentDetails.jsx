import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import { CreditCard, CheckCircle2, XCircle } from "lucide-react";
import ProTable from "../components/ProTable.jsx";

const BASE = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api";

export default function PaymentDetails() {
  const [loading, setLoading] = useState(true);
  const [allPaymentDetails, setAllPaymentDetails] = useState([]);
  const [admins, setAdmins] = useState({});

  const fmt = (v) => (v ? new Date(v).toLocaleString() : "-");

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${BASE}/admin/payment-details`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data?.ok) {
        setAllPaymentDetails(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch payment details' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  // Load admins to map reviewed_by ids to readable name + email
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${BASE}/admin/admins`, { 
          headers: { 'Authorization': `Bearer ${token}` } 
        });
        const data = await res.json();
        if (data?.ok && Array.isArray(data.admins)) {
          const map = {};
          for (const a of data.admins) map[String(a.id)] = a;
          setAdmins(map);
        }
      } catch (err) {
        console.error('Error fetching admins:', err);
      }
    })();
  }, []);

  const approve = async (id) => {
    const confirm = await Swal.fire({
      icon: 'question',
      title: 'Approve Payment Details?',
      text: 'This payment method will be approved for withdrawals.',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      confirmButtonColor: '#10b981'
    });
    if (!confirm.isConfirmed) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${BASE}/admin/payment-details/${id}/approve`, { 
        method: 'PATCH', 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      });
      const data = await res.json();
      if (res.ok && data?.ok) {
        Swal.fire({ icon: 'success', title: 'Approved', timer: 1200, showConfirmButton: false });
        fetchData();
      } else {
        Swal.fire({ icon: 'error', title: 'Failed', text: data?.error || 'Unable to approve' });
      }
    } catch (error) {
      console.error('Approve error:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to approve payment details' });
    }
  };

  const reject = async (id) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Reject Payment Details?',
      input: 'text',
      inputLabel: 'Rejection Reason (optional)',
      inputPlaceholder: 'Enter reason for rejection...',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Reject'
    });
    if (!result.isConfirmed) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${BASE}/admin/payment-details/${id}/reject`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ reason: result.value || '' })
      });
      const data = await res.json();
      if (res.ok && data?.ok) {
        Swal.fire({ icon: 'success', title: 'Rejected', timer: 1200, showConfirmButton: false });
        fetchData();
      } else {
        Swal.fire({ icon: 'error', title: 'Failed', text: data?.error || 'Unable to reject' });
      }
    } catch (error) {
      console.error('Reject error:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to reject payment details' });
    }
  };

  // Format payment method label
  const getMethodLabel = (method) => {
    if (method === 'bank_transfer') return 'Bank Transfer';
    if (method === 'usdt_trc20') return 'USDT TRC20';
    return method || '-';
  };

  // Format payment details based on method
  const formatPaymentDetails = (paymentMethod, paymentDetails) => {
    if (!paymentDetails || typeof paymentDetails !== 'object') {
      return '-';
    }

    if (paymentMethod === 'bank_transfer') {
      return (
        <div className="text-xs text-gray-700 space-y-1 min-w-max">
          {paymentDetails.name && <div><span className="font-semibold">Name:</span> {paymentDetails.name}</div>}
          {paymentDetails.bankName && <div><span className="font-semibold">Bank:</span> {paymentDetails.bankName}</div>}
          {paymentDetails.accountName && <div><span className="font-semibold">Account Name:</span> {paymentDetails.accountName}</div>}
          {paymentDetails.accountNumber && <div><span className="font-semibold">Account Number:</span> {paymentDetails.accountNumber}</div>}
          {paymentDetails.ifscSwiftCode && <div><span className="font-semibold">IFSC/SWIFT:</span> {paymentDetails.ifscSwiftCode}</div>}
          {paymentDetails.accountType && <div><span className="font-semibold">Account Type:</span> {paymentDetails.accountType}</div>}
        </div>
      );
    } else if (paymentMethod === 'usdt_trc20') {
      return (
        <div className="text-xs text-gray-700 min-w-max">
          <div><span className="font-semibold">Wallet Address:</span> {paymentDetails.walletAddress || '-'}</div>
        </div>
      );
    }
    return '-';
  };

  // Get status badge
  const getStatusBadge = (status, Badge) => {
    if (status === 'approved') {
      return <Badge tone="green">Approved</Badge>;
    } else if (status === 'rejected') {
      return <Badge tone="red">Rejected</Badge>;
    } else {
      return <Badge tone="amber">Pending</Badge>;
    }
  };

  const columns = useMemo(() => [
    { key: "__index", label: "SR No", sortable: false },
    {
      key: "user", 
      label: "User", 
      render: (v, row) => (
        <div className="min-w-max">
          <div className="text-sm font-medium text-gray-900">{row.user?.name || row.user?.email || `User #${row.userId}`}</div>
          <div className="text-xs text-gray-500">{row.user?.email || '-'}</div>
          {row.user?.phone && <div className="text-xs text-gray-500">{row.user.phone}</div>}
        </div>
      )
    },
    {
      key: "paymentMethod",
      label: "Method",
      render: (v) => getMethodLabel(v)
    },
    {
      key: "paymentDetails",
      label: "Details",
      render: (v, row) => formatPaymentDetails(row.paymentMethod, row.paymentDetails)
    },
    {
      key: "status",
      label: "Status",
      render: (v, row, Badge) => getStatusBadge(v, Badge)
    },
    {
      key: "createdAt",
      label: "Submitted",
      render: (v) => v ? new Date(v).toLocaleString() : '-'
    },
    {
      key: "reviewedAt",
      label: "Reviewed At",
      render: (v) => v ? new Date(v).toLocaleString() : '-'
    },
    {
      key: "reviewedBy",
      label: "Reviewed By",
      render: (v) => {
        if (!v) return '-';
        const a = admins[String(v)];
        if (!a) return `Admin #${v}`;
        const name = a.username || a.name || a.email || `Admin #${v}`;
        return <span className="text-xs">{name}</span>;
      }
    },
    {
      key: "rejectionReason",
      label: "Rejection Reason",
      render: (v) => v ? <span className="text-xs text-red-600">{v}</span> : '-'
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (v, row) => {
        if (row.status === 'approved') {
          return <span className="text-xs text-gray-500">Approved</span>;
        } else if (row.status === 'rejected') {
          return (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => approve(row.id)} 
                className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve
              </button>
            </div>
          );
        } else {
          return (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => approve(row.id)} 
                className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve
              </button>
              <button 
                onClick={() => reject(row.id)} 
                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs"
              >
                <XCircle className="h-4 w-4" /> Reject
              </button>
            </div>
          );
        }
      }
    }
  ], [admins]);

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
            <CreditCard size={20} className="text-dark-base" />
          </div>
          <h1 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Payment Details
          </h1>
        </div>
        <p className="text-gray-600 text-sm ml-[52px]">
          Review and approve user payment methods for withdrawals
        </p>
      </div>

      <ProTable
        title="All Payment Details"
        rows={allPaymentDetails.map(item => {
          // Flatten data for search and filtering
          const details = item.paymentDetails || {};
          const user = item.user || {};
          return {
            ...item,
            // Flatten user fields
            userName: user.name || '',
            userEmail: user.email || '',
            userPhone: user.phone || '',
            // Flatten payment details
            bankName: details.bankName || '',
            accountName: details.accountName || '',
            accountNumber: details.accountNumber || '',
            ifscSwiftCode: details.ifscSwiftCode || '',
            walletAddress: details.walletAddress || '',
            // Combined search text
            _searchText: [
              user.name || '',
              user.email || '',
              user.phone || '',
              item.paymentMethod || '',
              details.bankName || '',
              details.accountName || '',
              details.accountNumber || '',
              details.ifscSwiftCode || '',
              details.walletAddress || '',
              item.status || '',
              item.rejectionReason || ''
            ].join(' ').toLowerCase()
          };
        })}
        columns={columns}
        filters={{
          searchKeys: [
            '_searchText',
            'userName',
            'userEmail', 
            'userPhone',
            'paymentMethod',
            'status',
            'bankName',
            'accountName',
            'accountNumber',
            'ifscSwiftCode',
            'walletAddress',
            'rejectionReason'
          ],
          selects: [
            { key: 'status', label: 'Status', options: ['pending', 'approved', 'rejected'] },
            { key: 'paymentMethod', label: 'Method', options: ['bank_transfer', 'usdt_trc20'] }
          ],
          dateKey: 'createdAt'
        }}
        pageSize={10}
        searchPlaceholder="Search payment methods..."
      />
    </div>
  );
}
