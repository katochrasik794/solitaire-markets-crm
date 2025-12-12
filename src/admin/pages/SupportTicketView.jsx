import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Headphones, Send, RotateCcw, CheckCircle2 } from 'lucide-react';
import supportService from '../../services/support.service';

export default function SupportTicketView() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await supportService.getAdminTicket(id);
      if (data.success) {
        setTicket(data.data.ticket);
        setReplies(data.data.messages || []);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load ticket' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const updateStatus = async (status) => {
    try {
      const res = await supportService.updateStatus(id, status);
      if (res.success) {
        Swal.fire({ icon: 'success', title: 'Updated', timer: 1000, showConfirmButton: false });
        fetchData();
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not update status' });
    }
  };

  const sendReply = async () => {
    if (!message.trim()) return;
    try {
      const res = await supportService.adminReply(id, message, 'answered');
      if (res.success) {
        setMessage('');
        fetchData();
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not send reply' });
    }
  };

  if (loading || !ticket) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Headphones className="h-6 w-6" /> {ticket.subject || '(No subject)'}
          </h1>
          <p className="text-gray-600 text-sm">
            {ticket.user_name || ticket.user_email} • Created {new Date(ticket.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {String(ticket.status).toLowerCase() === 'closed' ? (
            <button onClick={() => updateStatus('open')} className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> Reopen
            </button>
          ) : (
            <button onClick={() => updateStatus('closed')} className="px-3 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Close
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Conversation */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-gray-200 font-semibold">Conversation</div>
          <div className="p-4 sm:p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {replies.map((r, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${r.sender_type === 'admin' ? 'bg-indigo-50 border-indigo-100 ml-10' : 'bg-gray-50 border-gray-200 mr-10'}`}>
                <div className="text-xs text-gray-500 mb-1 flex justify-between">
                  <span className="font-bold">{r.sender_name || (r.sender_type === 'admin' ? 'Support Agent' : 'User')}</span>
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-800 whitespace-pre-wrap">{r.message}</div>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-6 border-t border-gray-200">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write a reply..."
            />
            <div className="flex items-center justify-end mt-2">
              <button onClick={sendReply} className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
                <Send className="h-4 w-4" /> Send Reply
              </button>
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-fit">
          <div className="px-4 sm:px-6 py-3 border-b border-gray-200 font-semibold">Ticket Details</div>
          <div className="p-4 sm:p-6 space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Status</span>
              <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                  ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                }`}>{ticket.status.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Priority</span>
              <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${ticket.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>{ticket.priority}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-900">{ticket.category}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">User</span>
              <div className="text-right">
                <div className="font-medium">{ticket.user_name}</div>
                <div className="text-xs text-gray-500">{ticket.user_email}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Ticket ID</span>
              <span className="font-medium">#{ticket.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

