// src/pages/admin/GroupManagement.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import ProTable from "../components/ProTable.jsx";
import Modal from "../components/Modal.jsx";
import { RefreshCw, Eye, Power, Pencil } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

function fmtDate(v) {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString();
}

export default function GroupManagement() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [filterActive, setFilterActive] = useState("");
  const [editModal, setEditModal] = useState(null); // { id, group, dedicated_name }
  const [savingDedicatedName, setSavingDedicatedName] = useState(false);

  const BASE = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5003";

  const loadGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem('adminToken');
      
      const params = new URLSearchParams();
      if (filterActive !== "") {
        params.append('is_active', filterActive);
      }
      
      const response = await axios.get(`${BASE}/admin/group-management?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.data?.ok) {
        throw new Error(response.data?.error || "Failed to load groups");
      }
      
      setRows(response.data.items || []);
    } catch (e) {
      setError(e.message || String(e));
      console.error("Failed to load groups:", e);
    } finally {
      setLoading(false);
    }
  }, [BASE, filterActive]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const handleSync = useCallback(async () => {
    try {
      setSyncing(true);
      const token = localStorage.getItem('adminToken');
      
      Swal.fire({
        title: 'Syncing Groups...',
        text: 'Please wait while we sync groups from the API',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      const response = await axios.post(`${BASE}/admin/group-management/sync`, {}, {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: 60000, // 60 seconds timeout for sync
      });
      
      if (!response.data?.ok) {
        throw new Error(response.data?.error || "Sync failed");
      }
      
      const stats = response.data.stats || {};
      
      Swal.fire({
        icon: 'success',
        title: 'Sync Completed!',
        html: `
          <div style="text-align: left;">
            <p><strong>Created:</strong> ${stats.created || 0}</p>
            <p><strong>Updated:</strong> ${stats.updated || 0}</p>
            <p><strong>Errors:</strong> ${stats.errors || 0}</p>
            <p><strong>Total:</strong> ${stats.total || 0}</p>
          </div>
        `,
        confirmButtonText: 'OK'
      });
      
      // Reload groups after sync
      await loadGroups();
    } catch (e) {
      console.error("Sync failed:", e);
      Swal.fire({
        icon: 'error',
        title: 'Sync Failed',
        text: e.message || "Failed to sync groups from API",
        confirmButtonText: 'OK'
      });
    } finally {
      setSyncing(false);
    }
  }, [BASE, loadGroups]);

  const handleToggleActive = useCallback(async (row) => {
    try {
      const token = localStorage.getItem('adminToken');
      const newStatus = !row.is_active;
      
      const result = await Swal.fire({
        title: newStatus ? 'Activate Group?' : 'Deactivate Group?',
        text: `Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} group "${row.group}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      });
      
      if (!result.isConfirmed) return;
      
      const response = await axios.put(
        `${BASE}/admin/group-management/${row.id}/toggle-active`,
        { is_active: newStatus },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (!response.data?.ok) {
        throw new Error(response.data?.error || "Failed to update group status");
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Group ${newStatus ? 'activated' : 'deactivated'} successfully`,
        timer: 1500,
        showConfirmButton: false
      });
      
      // Reload groups
      await loadGroups();
    } catch (e) {
      console.error("Toggle failed:", e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.message || "Failed to update group status",
        confirmButtonText: 'OK'
      });
    }
  }, [BASE, loadGroups]);

  const handleView = useCallback((row) => {
    setViewModal(row);
  }, []);

  const handleEditDedicatedName = useCallback((row) => {
    setEditModal({
      id: row.id,
      group: row.group,
      dedicated_name: row.dedicated_name || ""
    });
  }, []);

  const handleSaveDedicatedName = useCallback(async () => {
    if (!editModal || savingDedicatedName) return;
    
    try {
      setSavingDedicatedName(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.put(
        `${BASE}/admin/group-management/${editModal.id}/dedicated-name`,
        { dedicated_name: editModal.dedicated_name },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (!response.data?.ok) {
        throw new Error(response.data?.error || "Failed to update dedicated name");
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Dedicated name updated successfully',
        timer: 1500,
        showConfirmButton: false
      });
      
      setEditModal(null);
      // Reload groups
      await loadGroups();
    } catch (e) {
      console.error("Update failed:", e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.message || "Failed to update dedicated name",
        confirmButtonText: 'OK'
      });
    } finally {
      setSavingDedicatedName(false);
    }
  }, [BASE, editModal, loadGroups, savingDedicatedName]);

  const columns = useMemo(() => [
    { key: "__index", label: "Sr No", sortable: false },
    { key: "group", label: "Group Name" },
    { 
      key: "dedicated_name", 
      label: "Dedicated Name", 
      render: (v, row) => (
        <div className="flex items-center gap-2">
          <span>{v || "-"}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditDedicatedName(row);
            }}
            className="h-6 w-6 grid place-items-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            title="Edit Dedicated Name"
          >
            <Pencil size={12} />
          </button>
        </div>
      )
    },
    { key: "margin_call", label: "Margin Call", render: (v) => v ? `${v}%` : "-" },
    { key: "margin_stop_out", label: "Margin Stop Out", render: (v) => v ? `${v}%` : "-" },
    { key: "synced_at", label: "Last Synced", render: (v) => fmtDate(v) },
    { key: "is_active", label: "Status", render: (v) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        v ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {v ? 'Active' : 'Inactive'}
      </span>
    ) },
    { key: "actions", label: "Actions", sortable: false, render: (v, row) => (
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleView(row)}
          className="flex flex-col items-center gap-1 px-2 py-1 rounded-md border border-violet-200 text-violet-700 hover:bg-violet-50 transition-colors"
          title="View Details"
        >
          <Eye size={16} />
          <span className="text-xs">View</span>
        </button>
        <button
          onClick={() => handleToggleActive(row)}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded-md border transition-colors ${
            row.is_active
              ? 'border-orange-200 text-orange-700 hover:bg-orange-50'
              : 'border-green-200 text-green-700 hover:bg-green-50'
          }`}
          title={row.is_active ? "Deactivate" : "Activate"}
        >
          <Power size={16} />
          <span className="text-xs">{row.is_active ? 'Inactive' : 'Active'}</span>
        </button>
      </div>
    ) },
  ], [handleView, handleToggleActive, handleEditDedicatedName]);

  const filters = useMemo(() => ({
    searchKeys: ["group", "company", "currency"],
  }), []);

  if (loading && rows.length === 0) {
    return <div className="rounded-xl bg-white border border-gray-200 p-4">Loading groups…</div>;
  }
  if (error && rows.length === 0) {
    return <div className="rounded-xl bg-white border border-rose-200 text-rose-700 p-4">{error}</div>;
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing..." : "Sync from API"}
          </button>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">All Groups</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>
      </div>

      <ProTable
        title="Group Management"
        rows={rows}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search group / company / currency…"
        pageSize={20}
      />

      {/* View Details Modal */}
      <Modal open={!!viewModal} onClose={() => setViewModal(null)} title={`Group Details: ${viewModal?.group || ''}`}>
        {viewModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.group || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Server</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.server || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.company || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.currency || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency Digits</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.currency_digits || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    viewModal.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {viewModal.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demo Leverage</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.demo_leverage ? `1:${viewModal.demo_leverage}` : "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demo Deposit</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.demo_deposit ? `$${viewModal.demo_deposit}` : "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Margin Call</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.margin_call ? `${viewModal.margin_call}%` : "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Margin Stop Out</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.margin_stop_out ? `${viewModal.margin_stop_out}%` : "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Margin Mode</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.margin_mode || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trade Flags</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.trade_flags || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions Flags</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.permissions_flags || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auth Mode</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.auth_mode || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auth Password Min</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.auth_password_min || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.company_email || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Support Email</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.company_support_email || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Page</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.company_page || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Support Page</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md break-all">{viewModal.company_support_page || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reports Mode</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.reports_mode || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">News Mode</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.news_mode || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mail Mode</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.mail_mode || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trade Interest Rate</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.trade_interestrate || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trade Virtual Credit</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.trade_virtual_credit || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Limit History</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.limit_history || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Limit Orders</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.limit_orders || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Limit Symbols</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.limit_symbols || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Limit Positions</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{viewModal.limit_positions || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Synced</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{fmtDate(viewModal.synced_at)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{fmtDate(viewModal.created_at)}</div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setViewModal(null)} className="px-4 h-10 rounded-md border">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Dedicated Name Modal */}
      <Modal 
        open={!!editModal} 
        onClose={savingDedicatedName ? undefined : () => setEditModal(null)} 
        title={`Edit Dedicated Name: ${editModal?.group || ''}`}
      >
        {editModal && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dedicated Name</label>
              <input
                type="text"
                value={editModal.dedicated_name}
                onChange={(e) => setEditModal({ ...editModal, dedicated_name: e.target.value })}
                placeholder="Enter dedicated name"
                disabled={savingDedicatedName}
                className="w-full rounded-md border border-gray-300 h-10 px-3 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to clear the dedicated name</p>
            </div>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setEditModal(null)} 
                disabled={savingDedicatedName}
                className="px-4 h-10 rounded-md border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveDedicatedName}
                disabled={savingDedicatedName}
                className="px-4 h-10 rounded-md bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {savingDedicatedName && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {savingDedicatedName ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

