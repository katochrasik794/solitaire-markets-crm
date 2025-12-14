import { useEffect, useState } from 'react';
import { Headphones, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import supportService from '../../services/support.service';

export default function SupportTicketsList({ status }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      // Map 'opened' to 'open' for API
      const apiStatus = status === 'opened' ? 'open' : status === 'closed' ? 'closed' : '';
      const data = await supportService.getAllTickets(apiStatus);
      if (data.success) {
        setItems(data.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [status]);

  const titleMap = {
    opened: 'Open Tickets',
    closed: 'Closed Tickets',
  };

  // Filter client-side for search 'q' since API doesn't support search yet
  const filteredItems = items.filter(t =>
    !q ||
    t.subject?.toLowerCase().includes(q.toLowerCase()) ||
    t.user_email?.toLowerCase().includes(q.toLowerCase()) ||
    t.id.toString().includes(q)
  );

  return (
    <div className="p-2 sm:p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Headphones className="h-6 w-6" /> {titleMap[status] || 'Tickets'}
        </h1>
        <p className="text-gray-600">Manage and respond to customer support tickets</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search subject, email, or ID"
            className="w-full sm:w-80 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button onClick={fetchData} className="px-4 py-2 bg-brand-500 text-dark-base rounded-lg hover:bg-brand-600">Refresh</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td className="px-6 py-6 text-center text-gray-500" colSpan={7}>Loading...</td></tr>
              ) : filteredItems.length === 0 ? (
                <tr><td className="px-6 py-6 text-center text-gray-500" colSpan={7}>No tickets found</td></tr>
              ) : (
                filteredItems.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-500">#{t.id}</td>
                    <td className="px-3 sm:px-6 py-3">
                      <div className="text-sm font-medium text-gray-900">{t.subject}</div>
                      <div className="text-xs text-gray-500">{t.category}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-3">
                      <div className="text-sm font-medium text-gray-900">{t.user_name || 'Unknown'}</div>
                      <div className="text-xs text-gray-500">{t.user_email}</div>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${(t.priority || '').toLowerCase() === 'high' ? 'bg-red-100 text-red-800' :
                        (t.priority || '').toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                        {(t.priority || 'medium').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${t.status === 'open' ? 'bg-green-100 text-green-800' :
                        t.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-800">{new Date(t.updated_at).toLocaleString()}</td>
                    <td className="px-3 sm:px-6 py-3 text-sm">
                      <Link to={`/admin/support/tickets/${t.id}`} className="flex flex-col items-center text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                        <small className="text-[10px] leading-3 mt-1">View</small>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

