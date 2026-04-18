import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  Activity, 
  Server, 
  Globe,
  MoreVertical,
  Plus,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User as UserIcon,
  MapPin,
  Info,
  Scissors,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';
import { DashboardLayout } from '@/src/components/layouts/DashboardLayout';
import { StatCard, GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon, Salon, User } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';
import { ADMIN_NAV } from '@/src/constants';

import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const chartData = [
  { name: 'Jan', revenue: 4000, bookings: 240 },
  { name: 'Feb', revenue: 3000, bookings: 198 },
  { name: 'Mar', revenue: 2000, bookings: 980 },
  { name: 'Apr', revenue: 2780, bookings: 390 },
  { name: 'May', revenue: 1890, bookings: 480 },
  { name: 'Jun', revenue: 2390, bookings: 380 },
  { name: 'Jul', revenue: 3490, bookings: 430 },
];

// --- Admin Dashboard (Overview) ---
export const AdminDashboard = () => {
  const { activityLogs, users, salons } = useSalon();

  return (
    <DashboardLayout navItems={ADMIN_NAV} title="System Control" userRole="Genius Admin">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <StatCard title="Total Salons" value={salons.length} icon={<Building2 size={20} />} />
        <StatCard title="Global Users" value={users.length * 124} icon={<Users size={20} />} />
        <StatCard title="Server Uptime" value="99.99%" icon={<Activity size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <GlassContainer className="p-4 sm:p-8">
          <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Infrastructure Status</h3>
          <div className="space-y-4">
            {[
              { name: 'API Gateway', status: 'Operational', load: '12%' },
              { name: 'Database Cluster', status: 'Operational', load: '45%' },
              { name: 'Storage Service', status: 'Operational', load: '28%' },
              { name: 'Auth Provider', status: 'Operational', load: '8%' },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-4 bg-salon-cream/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Server size={18} className="text-salon-gold" />
                  <span className="text-sm font-bold text-salon-espresso">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-salon-gold font-bold">Load: {s.load}</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>

        <GlassContainer className="p-4 sm:p-8">
          <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Global Activity Logs</h3>
          <div className="space-y-6">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  log.status === 'Success' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                )}>
                  {log.type === 'system' ? <Server size={20} /> : log.type === 'salon' ? <Building2 size={20} /> : <UserIcon size={20} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-salon-espresso">{log.action}</p>
                  <p className="text-xs text-salon-gold">User: {log.user} • {log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <StylizedButton variant="ghost" className="w-full mt-8">View Global Logs</StylizedButton>
        </GlassContainer>
      </div>
    </DashboardLayout>
  );
};

// --- Manage Salons & Details ---
export const AdminSalons = () => {
  const { salons, addSalon } = useSalon();
  const [view, setView] = useState<'list' | 'details' | 'register'>('list');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    ownerName: '',
    email: '',
    phone: '',
    description: '',
    status: 'Onboarding' as Salon['status']
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    addSalon(formData);
    setView('list');
    setFormData({ name: '', location: '', ownerName: '', email: '', phone: '', description: '', status: 'Onboarding' });
  };

  if (view === 'register') {
    return (
      <DashboardLayout navItems={ADMIN_NAV} title="Register New Salon" userRole="Genius Admin">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-salon-gold hover:text-salon-espresso mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">Back to Network</span>
          </button>

          <GlassContainer className="p-6 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-salon-espresso mb-2">Salon Onboarding</h3>
            <p className="text-sm text-salon-gold mb-10">Initialize a new luxury destination in the Zenith network.</p>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Salon Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm"
                    placeholder="e.g. Zenith Paris"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Location</label>
                  <input 
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Owner Full Name</label>
                <input 
                  required
                  value={formData.ownerName}
                  onChange={e => setFormData({...formData, ownerName: e.target.value})}
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Contact Email</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Phone Number</label>
                  <input 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Salon Description</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm resize-none"
                />
              </div>

              <StylizedButton type="submit" className="w-full py-4">Register Salon</StylizedButton>
            </form>
          </GlassContainer>
        </div>
      </DashboardLayout>
    );
  }

  if (view === 'details' && selectedSalon) {
    return (
      <DashboardLayout navItems={ADMIN_NAV} title="Salon Profile" userRole="Genius Admin">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-salon-gold hover:text-salon-espresso mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">Back to Network</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <GlassContainer className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
                  <div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-4 inline-block",
                      selectedSalon.status === 'Active' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {selectedSalon.status}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-serif font-bold text-salon-espresso">{selectedSalon.name}</h3>
                    <p className="text-salon-gold flex items-center gap-2 mt-2 text-sm">
                      <MapPin size={16} />
                      {selectedSalon.location}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-2xl sm:text-3xl font-serif font-bold text-salon-bronze">{selectedSalon.revenue}</p>
                    <p className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">Annual Revenue</p>
                  </div>
                </div>

                <div className="h-[1px] bg-salon-ivory/50 mb-8"></div>

                <div className="space-y-6">
                  <h4 className="text-lg font-serif font-bold text-salon-espresso">About the Salon</h4>
                  <p className="text-salon-gold leading-relaxed">{selectedSalon.description}</p>
                  
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-salon-cream rounded-xl flex items-center justify-center text-salon-bronze">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-salon-espresso">{selectedSalon.staffCount}</p>
                        <p className="text-[10px] uppercase text-salon-gold font-bold">Staff Members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-salon-cream rounded-xl flex items-center justify-center text-salon-bronze">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-salon-espresso">{selectedSalon.joinedDate}</p>
                        <p className="text-[10px] uppercase text-salon-gold font-bold">Joined Network</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassContainer>

              <GlassContainer className="p-6 sm:p-8">
                <h4 className="text-lg font-serif font-bold text-salon-espresso mb-6">Revenue Performance</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9C8060" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#9C8060" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2D5C3" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9C8060', fontSize: 10 }} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9C8060', fontSize: 10 }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FDFAF5', 
                          border: '1px solid #C8B49A', 
                          borderRadius: '12px',
                          fontSize: '12px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#9C8060" 
                        fillOpacity={1} 
                        fill="url(#colorRev)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassContainer>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <GlassContainer className="p-6 sm:p-8">
                <h4 className="text-lg font-serif font-bold text-salon-espresso mb-6">Owner Contact</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-salon-espresso rounded-full flex items-center justify-center text-salon-bg">
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-salon-espresso">{selectedSalon.ownerName}</p>
                      <p className="text-[10px] uppercase text-salon-gold font-bold">Principal Owner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail size={18} className="text-salon-gold" />
                    <span className="text-sm text-salon-espresso">{selectedSalon.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={18} className="text-salon-gold" />
                    <span className="text-sm text-salon-espresso">{selectedSalon.phone}</span>
                  </div>
                </div>
                <StylizedButton variant="outline" className="w-full mt-8">Message Owner</StylizedButton>
              </GlassContainer>

              <GlassContainer className="p-6 sm:p-8 border-red-100">
                <h4 className="text-lg font-serif font-bold text-red-800 mb-4">Danger Zone</h4>
                <p className="text-xs text-red-600 mb-6">Suspend or remove this salon from the Zenith network.</p>
                <StylizedButton variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">Suspend Salon</StylizedButton>
              </GlassContainer>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={ADMIN_NAV} title="Salon Network" userRole="Genius Admin">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-salon-espresso">Managed Salons</h3>
        <StylizedButton variant="primary" onClick={() => setView('register')}>
          <Plus size={18} className="mr-2" />
          Register New Salon
        </StylizedButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {salons.map((salon) => (
          <GlassContainer 
            key={salon.id} 
            className="p-6 cursor-pointer hover:border-salon-gold transition-all group"
            onClick={() => {
              setSelectedSalon(salon);
              setView('details');
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-salon-espresso text-salon-bg rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Building2 size={24} />
              </div>
              <button className="p-2 text-salon-gold hover:bg-salon-cream rounded-full"><MoreVertical size={20} /></button>
            </div>
            <h4 className="text-lg font-serif font-bold text-salon-espresso">{salon.name}</h4>
            <p className="text-sm text-salon-gold mb-6">{salon.location}</p>
            <div className="flex justify-between items-center pt-4 border-t border-salon-ivory/50">
              <span className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                salon.status === 'Active' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
              )}>
                {salon.status}
              </span>
              <span className="text-sm font-bold text-salon-bronze">{salon.revenue}</span>
            </div>
          </GlassContainer>
        ))}
      </div>
    </DashboardLayout>
  );
};

// --- User Management ---
export const AdminUsers = () => {
  const { users } = useSalon();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length * 124,
    customers: users.length * 112,
    employees: users.length * 12,
    activeNow: Math.floor(users.length * 14.5)
  };

  return (
    <DashboardLayout navItems={ADMIN_NAV} title="User Management" userRole="Genius Admin">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard title="Total Customers" value={stats.customers.toLocaleString()} icon={<Users size={20} />} />
        <StatCard title="Active Employees" value={stats.employees.toLocaleString()} icon={<Scissors size={20} />} />
        <StatCard title="Active Now" value={stats.activeNow.toLocaleString()} icon={<Activity size={20} />} />
        <StatCard title="New This Month" value="+124" icon={<Plus size={20} />} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h3 className="text-2xl font-serif font-bold text-salon-espresso">Global Users</h3>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
            <input 
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-salon-ivory/50 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-salon-gold/20 outline-none"
            />
          </div>
          <StylizedButton variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter size={16} className="mr-2" />
            Filter
          </StylizedButton>
        </div>
      </div>

      <GlassContainer className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-salon-cream/30 border-b border-salon-ivory/50">
            <tr className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">
              <th className="px-8 py-4">User</th>
              <th className="px-8 py-4">Role</th>
              <th className="px-8 py-4">Location</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Last Active</th>
              <th className="px-8 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-b border-salon-ivory/20 last:border-0 hover:bg-salon-cream/20 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-sm font-bold text-salon-espresso">{u.name}</p>
                      <p className="text-xs text-salon-gold">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-bold text-salon-espresso uppercase tracking-wider">{u.role}</span>
                </td>
                <td className="px-8 py-5 text-sm text-salon-gold">{u.location || 'N/A'}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      u.status === 'active' ? "bg-green-500" : "bg-gray-400"
                    )}></span>
                    <span className="text-xs font-bold text-salon-espresso capitalize">{u.status}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-xs text-salon-gold">{u.lastActive}</td>
                <td className="px-8 py-5">
                  <div className="flex gap-2">
                    <StylizedButton variant="ghost" size="sm" className="p-2"><Info size={16} /></StylizedButton>
                    <StylizedButton variant="ghost" size="sm" className="p-2 text-red-400 hover:text-red-600"><XCircle size={16} /></StylizedButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassContainer>
  </DashboardLayout>
  );
};
