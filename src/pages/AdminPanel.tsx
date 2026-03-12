import { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, CheckCircle2, Trash2, Clock, RefreshCw,
  Search, User, Mail, Phone, MapPin, Calendar,
  DollarSign, Wrench, LogOut, ShieldAlert, Eye
} from 'lucide-react';
import API_BASE_URL from '../config/api';

const ADMIN_PASSWORD = 'admin123';

interface Booking {
  id: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceTitle: string;
  servicePrice: number;
  date: string;
  time: string;
  notes?: string;
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600 shadow-2xl shadow-blue-600/40 mb-4">
            <ShieldAlert className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">Admin Panel</h1>
          <p className="text-slate-400 mt-2">ServicePro Booking Management</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Admin Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-4 text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98]"
            >
              Sign In to Admin Panel
            </button>
          </div>
          <p className="text-center text-slate-500 text-xs mt-6">Default password: <span className="text-slate-300 font-mono">admin123</span></p>
        </form>
      </div>
    </div>
  );
}

function BookingModal({ booking, onClose, onConfirm, onDelete }: {
  booking: Booking;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Booking #{booking.id.slice(0, 8).toUpperCase()}</p>
              <h2 className="text-xl font-black text-white">{booking.serviceTitle}</h2>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${booking.status === 'confirmed' ? 'bg-green-500 text-white' : 'bg-amber-400 text-amber-900'
              }`}>
              {booking.status === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: User, label: 'Name', value: booking.name },
              { icon: Mail, label: 'Email', value: booking.email },
              { icon: Phone, label: 'Phone', value: booking.phone },
              { icon: DollarSign, label: 'Total', value: `$${booking.servicePrice}` },
              { icon: Calendar, label: 'Date', value: booking.date },
              { icon: Clock, label: 'Time', value: booking.time },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 break-all">{value || '—'}</p>
              </div>
            ))}
          </div>
          {booking.address && (
            <div className="bg-slate-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{booking.address}</p>
            </div>
          )}
          {booking.notes && (
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-slate-700">{booking.notes}</p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-4 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Close</button>
          {booking.status === 'pending' && (
            <button
              onClick={() => { onConfirm(booking.id); onClose(); }}
              className="flex-1 rounded-xl bg-green-500 py-3 text-sm font-bold text-white hover:bg-green-600 transition-all"
            >
              ✅ Confirm Order
            </button>
          )}
          <button
            onClick={() => { onDelete(booking.id); onClose(); }}
            className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-600 hover:bg-red-100 transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      setBookings(await res.json());
    } catch {
      console.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const confirmBooking = async (id: string) => {
    await fetch(`${API_BASE_URL}/api/bookings/${id}/confirm`, { method: 'PATCH' });
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return;
    await fetch(`${API_BASE_URL}/api/bookings/${id}`, { method: 'DELETE' });
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter;
    const matchSearch = !search ||
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceTitle?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + (b.servicePrice || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-lg leading-tight">ServicePro</p>
              <p className="text-xs text-gray-400 font-medium leading-tight">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchBookings} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Refresh">
              <RefreshCw className="h-5 w-5" />
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, icon: LayoutDashboard, color: 'blue' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'amber' },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: 'green' },
            { label: 'Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'purple' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    color === 'green' ? 'bg-green-50 text-green-600' :
                      'bg-purple-50 text-purple-600'
                }`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
          <div className="p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or service…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'pending', 'confirmed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${filter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                >
                  {f === 'all' ? `All (${stats.total})` : f === 'pending' ? `Pending (${stats.pending})` : `Confirmed (${stats.confirmed})`}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-400 gap-3">
                <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
                <span className="font-medium">Loading bookings…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <LayoutDashboard className="h-12 w-12 mb-4 text-gray-200" />
                <p className="font-bold text-gray-500">No bookings found</p>
                <p className="text-sm mt-1">Bookings will appear here after customers check out</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-t border-gray-100">
                    {['Customer', 'Service', 'Date & Time', 'Total', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-black text-gray-400 uppercase tracking-wider px-6 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{b.name}</p>
                          <p className="text-xs text-gray-400">{b.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700">{b.serviceTitle}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-700">{b.date || '—'}</p>
                        <p className="text-xs text-gray-400">{b.time || ''}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-black text-gray-900">${b.servicePrice}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${b.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                          }`}>
                          {b.status === 'confirmed' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {b.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {b.status === 'pending' && (
                            <button
                              onClick={() => confirmBooking(b.id)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                              title="Confirm order"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onConfirm={confirmBooking}
          onDelete={deleteBooking}
        />
      )}
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={logout} />;
}
