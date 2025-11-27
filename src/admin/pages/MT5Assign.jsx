// src/pages/admin/MT5Assign.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function MT5Assign() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");
  const [assignSuccess, setAssignSuccess] = useState("");

  const [formData, setFormData] = useState({
    userId: "",
    accountId: "",
    password: "",
    name: "",
    package: "",
  });

  const BASE = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5003";

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    let stop = false;
    setLoading(true);
    setError("");
    const token = localStorage.getItem('adminToken');
    fetch(`${BASE}/admin/users/all?limit=500`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (stop) return;
        if (!data?.ok) throw new Error(data?.error || "Failed to load");
        const items = Array.isArray(data.items) ? data.items : [];
        setUsers(items);
      })
      .catch(e => setError(e.message || String(e)))
      .finally(() => !stop && setLoading(false));
    return () => { stop = true; };
  }, [BASE]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fetchError) setFetchError("");
    if (assignError) setAssignError("");
    if (assignSuccess) setAssignSuccess("");
  }

  async function handleFetchInfo() {
    if (!formData.accountId) {
      setFetchError("Please enter MT5 ID");
      return;
    }
    setFetchLoading(true);
    setFetchError("");
    setAccountInfo(null);
    try {
      const response = await axios.get(`${BASE}/admin/mt5/account/${formData.accountId}`, {
        timeout: 30000,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.data?.ok) {
        const data = response.data.account;
        if (!data) {
          console.warn(`No data received for account ${formData.accountId}:`, response.data);
          setFetchError("No data received from MT5 API.");
        } else {
          setAccountInfo(data);
          // Extract package from Group path (e.g., "real\Bbook\Pro\dynamic-2000x-10P" → "Pro")
          let packageType = "";
          if (data.Group) {
            const groupParts = data.Group.split(/[\\\/]/);
            const packageKeywords = ['standard', 'pro', 'startup', 'premium', 'basic', 'advanced', 'enterprise'];
            for (const part of groupParts) {
              const lowerPart = part.toLowerCase();
              const found = packageKeywords.find(kw => lowerPart.includes(kw));
              if (found) {
                packageType = found;
                break;
              }
            }
            // If no keyword found, use the part that looks like a package name (usually after Bbook or similar)
            if (!packageType && groupParts.length > 2) {
              packageType = groupParts[2].toLowerCase();
            }
          }
          setFormData(prev => ({ 
            ...prev, 
            name: data.Name || "",
            package: packageType
          }));
        }
      } else {
        console.warn(`API returned error for account ${formData.accountId}:`, response.data);
        setFetchError(`Failed to fetch account info from MT5: ${response.data?.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.warn(`Failed to fetch account info for ${formData.accountId}:`, error.message);
      console.warn('Full error details:', error);
      setFetchError(`Failed to fetch account info from MT5: ${error.message}`);
    } finally {
      setFetchLoading(false);
    }
  }

  async function handleAssign() {
    if (!formData.userId || !formData.accountId || !formData.password) {
      setAssignError("Please select user, enter MT5 ID, and set password");
      return;
    }
    setAssignLoading(true);
    setAssignError("");
    setAssignSuccess("");
    try {
      const response = await axios.post(`${BASE}/admin/mt5/assign`, {
        userId: formData.userId,
        accountId: formData.accountId,
        password: formData.password,
        name: formData.name || undefined,
        leverage: accountInfo?.Leverage || undefined,
        package: formData.package || undefined,
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.data?.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'MT5 account assigned successfully!',
          timer: 2000,
          showConfirmButton: false
        });
        setAssignSuccess("MT5 account assigned successfully!");
        setFormData({ userId: "", accountId: "", password: "", name: "", package: "" });
        setAccountInfo(null);
      } else {
        const errorMsg = response.data?.error || "Failed to assign account";
        setAssignError(errorMsg);
        await Swal.fire({
          icon: 'error',
          title: 'Assignment Failed',
          text: errorMsg
        });
      }
    } catch (error) {
      let errorMsg = `Failed to assign account: ${error.message}`;
      if (error.response?.status === 409) {
        errorMsg = error.response?.data?.error || 'Account already assigned to another user';
        await Swal.fire({
          icon: 'error',
          title: 'Account Already Assigned',
          text: errorMsg
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg
        });
      }
      setAssignError(errorMsg);
    } finally {
      setAssignLoading(false);
    }
  }

  if (loading) return <div className="rounded-xl bg-white border border-gray-200 p-4">Loading users…</div>;
  if (error) return <div className="rounded-xl bg-white border border-rose-200 text-rose-700 p-4">{error}</div>;

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Assign Existing MT5 Account</h2>
        <p className="text-gray-600">Map an existing MT5 ID to a user account and save it to the database.</p>
      </div>

      {fetchError && (
        <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-md">
          {fetchError}
        </div>
      )}

      {assignError && (
        <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-md">
          {assignError}
        </div>
      )}

      {assignSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {assignSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select User Email</label>
          <input
            type="text"
            placeholder="Search users by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 h-10 px-3 mb-2"
          />
          <select
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 h-10 px-3"
          >
            <option value="">Select User</option>
            {filteredUsers.map(user => (
              <option key={user.id} value={user.id}>{user.email}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter MT5 ID</label>
          <input
            type="text"
            name="accountId"
            value={formData.accountId}
            onChange={handleInputChange}
            placeholder="Enter MT5 Account ID"
            className="w-full rounded-md border border-gray-300 h-10 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Account name (auto-filled from API)"
            className="w-full rounded-md border border-gray-300 h-10 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Leverage</label>
          <input
            type="text"
            value={accountInfo?.Leverage || "-"}
            readOnly
            placeholder="Leverage (fetched from API)"
            className="w-full rounded-md border border-gray-300 h-10 px-3 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Package</label>
          <input
            type="text"
            name="package"
            value={formData.package}
            onChange={handleInputChange}
            placeholder="Package (auto-filled from Group)"
            className="w-full rounded-md border border-gray-300 h-10 px-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Set new password"
            required
            className="w-full rounded-md border border-gray-300 h-10 px-3"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={handleFetchInfo}
          disabled={fetchLoading || !formData.accountId}
          className="px-4 h-10 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-400 disabled:opacity-60 flex items-center gap-2"
        >
          {fetchLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Fetching...
            </>
          ) : (
            "Fetch Info"
          )}
        </button>
        <button
          onClick={handleAssign}
          disabled={assignLoading || !formData.userId || !formData.accountId || !formData.password}
          className="px-4 h-10 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-400 disabled:opacity-60 flex items-center gap-2"
        >
          {assignLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Assigning...
            </>
          ) : (
            "Assign Account"
          )}
        </button>
      </div>

      {accountInfo && (
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600">Login</label>
              <div className="text-sm font-medium">{accountInfo.Login}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Name</label>
              <div className="text-sm font-medium">{accountInfo.Name || "-"}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Group</label>
              <div className="text-sm font-medium">{accountInfo.Group || "-"}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Balance</label>
              <div className="text-sm font-medium">${accountInfo.Balance || 0}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Equity</label>
              <div className="text-sm font-medium">${accountInfo.Equity || 0}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Leverage</label>
              <div className="text-sm font-medium">{accountInfo.Leverage || "-"}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Status</label>
              <div className="text-sm font-medium">{accountInfo.IsEnabled ? "Enabled" : "Disabled"}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Comment</label>
              <div className="text-sm font-medium">{accountInfo.Comment || "-"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}