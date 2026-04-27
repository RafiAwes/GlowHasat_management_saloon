import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Package, 
  TrendingUp, 
  Calendar, 
  Clock, 
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Scissors,
  Sparkles,
  ArrowLeft,
  Star,
  DollarSign,
  Plus,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Upload
} from 'lucide-react';
import { DashboardLayout } from '@/src/components/layouts/DashboardLayout';
import { StatCard, GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon, Staff, InventoryItem, Discount } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';
import { OWNER_NAV } from '@/src/constants';

import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { Trash2 } from 'lucide-react';

const ownerNav = [
  { label: 'Dashboard', href: '/owner/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Analytics', href: '/owner/analytics', icon: <BarChart3 size={20} /> },
  { label: 'Staff', href: '/owner/staff', icon: <Users size={20} /> },
  { label: 'Inventory', href: '/owner/inventory', icon: <Package size={20} /> },
];

const revenueData = [
  { name: 'Mon', current: 4200, previous: 3800 },
  { name: 'Tue', current: 3800, previous: 3500 },
  { name: 'Wed', current: 5100, previous: 4200 },
  { name: 'Thu', current: 4800, previous: 4600 },
  { name: 'Fri', current: 6200, previous: 5800 },
  { name: 'Sat', current: 8500, previous: 7200 },
  { name: 'Sun', current: 7400, previous: 6800 },
];

const serviceData = [
  { name: 'Haircut', value: 45, color: '#2B2219' },
  { name: 'Coloring', value: 30, color: '#5C4B35' },
  { name: 'Styling', value: 15, color: '#9C8060' },
  { name: 'Treatments', value: 10, color: '#C8B49A' },
];

const staffPerformanceData = [
  { name: 'Alex', revenue: 4200, bookings: 45 },
  { name: 'Jordan', revenue: 3800, bookings: 38 },
  { name: 'Casey', revenue: 5100, bookings: 52 },
  { name: 'Morgan', revenue: 2900, bookings: 28 },
];

export const OwnerDashboard = () => {
  const { bookings, staff } = useSalon();
  
  return (
    <DashboardLayout navItems={OWNER_NAV} title="Executive Dashboard" userRole="Owner">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard title="Monthly Revenue" value="$42,850" trend={{ value: 12.5, isPositive: true }} icon={<TrendingUp size={20} />} />
        <StatCard title="Total Appointments" value={bookings.length * 42} trend={{ value: 8.2, isPositive: true }} icon={<Calendar size={20} />} />
        <StatCard title="Avg. Ticket Size" value="$115" trend={{ value: 3.1, isPositive: false }} icon={<BarChart3 size={20} />} />
        <StatCard title="Retention Rate" value="78%" trend={{ value: 5.4, isPositive: true }} icon={<UserPlus size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
        <GlassContainer className="lg:col-span-2 p-4 sm:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-salon-espresso">Weekly Revenue</h3>
              <p className="text-xs text-salon-gold">Current week vs Previous week performance</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5C4B35" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5C4B35" stopOpacity={0}/>
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
                  dataKey="current" 
                  stroke="#5C4B35" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCurrent)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#C8B49A" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassContainer>

        <GlassContainer className="p-8">
          <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Service Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {serviceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-salon-espresso">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-salon-gold">{item.value}%</span>
              </div>
            ))}
          </div>
        </GlassContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <GlassContainer className="p-4 sm:p-8">
          <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Top Performing Staff</h3>
          <div className="space-y-6">
            {staff.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={member.avatar} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm font-bold text-salon-espresso">{member.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-salon-gold font-bold">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-salon-bronze">${member.revenue.toLocaleString()}</p>
                  <div className="w-24 h-1.5 bg-salon-cream rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-salon-gold rounded-full" 
                      style={{ width: `${(member.revenue / 6000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>

        <GlassContainer className="p-8">
          <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { type: 'Booking', msg: 'New Balayage appointment for Sarah J.', time: '10 mins ago', icon: <Calendar size={16} /> },
              { type: 'Inventory', msg: 'Low stock alert: GlowHaat Silk Shampoo', time: '1 hour ago', icon: <Package size={16} /> },
              { type: 'Staff', msg: 'Alex Rivers completed 5th service today', time: '2 hours ago', icon: <TrendingUp size={16} /> },
              { type: 'Review', msg: 'New 5-star review from Michael R.', time: '4 hours ago', icon: <Sparkles size={16} /> },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-salon-cream flex items-center justify-center text-salon-bronze shrink-0">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-salon-espresso">{activity.msg}</p>
                  <p className="text-[10px] text-salon-gold uppercase font-bold tracking-widest">{activity.type} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>
      </div>
    </DashboardLayout>
  );
};

export const OwnerAnalytics = () => {
  return (
    <DashboardLayout navItems={OWNER_NAV} title="Detailed Analytics" userRole="Owner">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        <GlassContainer className="p-4 sm:p-8">
          <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Staff Efficiency</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={staffPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2D5C3" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9C8060', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9C8060', fontSize: 10 }} />
                <Tooltip cursor={{fill: '#F2EDE4'}} />
                <Legend />
                <Bar dataKey="revenue" fill="#5C4B35" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bookings" fill="#9C8060" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassContainer>

        <GlassContainer className="p-8">
          <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Customer Retention</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2D5C3" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9C8060', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9C8060', fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="current" stroke="#5C4B35" strokeWidth={3} dot={{ r: 4, fill: '#5C4B35' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassContainer>
      </div>

      <GlassContainer className="p-4 sm:p-8">
        <h3 className="text-xl font-serif font-bold text-salon-espresso mb-6">Revenue by Service Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {serviceData.map((service) => (
            <div key={service.name} className="p-6 bg-salon-cream/30 rounded-2xl border border-salon-ivory/50">
              <p className="text-[10px] uppercase tracking-widest text-salon-gold font-bold mb-1">{service.name}</p>
              <p className="text-2xl font-serif font-bold text-salon-espresso">${(service.value * 420).toLocaleString()}</p>
              <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold mt-2">
                <TrendingUp size={12} />
                +{(Math.random() * 10).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </GlassContainer>
    </DashboardLayout>
  );
};

export const OwnerStaff = () => {
  const { staff, addStaff, deleteStaff, bookings } = useSalon();
  const [view, setView] = useState<'list' | 'details' | 'add'>('list');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleDeleteStaff = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this staff member? This will also disable their system access.")) {
      deleteStaff(id);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAddStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addStaff({
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      avatar: avatarPreview || `https://picsum.photos/seed/${Math.random()}/200/200`
    });
    setAvatarPreview(null);
    setView('list');
  };

  if (view === 'add') {
    return (
      <DashboardLayout navItems={OWNER_NAV} title="Hire New Artisan" userRole="Owner">
        <button onClick={() => { setView('list'); setAvatarPreview(null); }} className="flex items-center gap-2 text-salon-gold hover:text-salon-bronze mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Artisans</span>
        </button>

        <div className="max-w-2xl mx-auto">
          <GlassContainer className="p-10">
            <h3 className="text-2xl font-serif font-bold text-salon-espresso mb-8">Staff Onboarding</h3>
            <form onSubmit={handleAddStaff} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Full Name</label>
                  <input name="name" required className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20" placeholder="e.g. Julian Vane" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Professional Role</label>
                  <select name="role" className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20">
                    <option>Senior Stylist</option>
                    <option>Master Barber</option>
                    <option>Color Specialist</option>
                    <option>Artisan Director</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Upload Profile Picture</label>
                  <div className="space-y-4 flex flex-col items-center justify-center p-6 border-2 border-dashed border-salon-ivory/80 rounded-2xl bg-salon-cream/10 relative overflow-hidden group">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white z-10" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-salon-cream flex items-center justify-center text-salon-gold z-10">
                        <Upload size={24} />
                      </div>
                    )}
                    <div className="text-center z-10">
                      <p className="text-sm font-bold text-salon-espresso">{avatarPreview ? 'Change Profile Image' : 'Upload Profile Image'}</p>
                      <p className="text-[10px] text-salon-gold mt-1">Recommended size: 200x200px</p>
                    </div>
                    <input 
                      name="avatar" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    />
                    <div className="absolute inset-0 bg-salon-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Bio / Expertise</label>
                <textarea className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20 h-32" placeholder="Tell us about their craft..." />
              </div>
              <StylizedButton type="submit" className="w-full py-4">Confirm Onboarding</StylizedButton>
            </form>
          </GlassContainer>
        </div>
      </DashboardLayout>
    );
  }

  if (view === 'details' && selectedStaff) {
    const staffBookings = bookings.filter(b => b.stylistId === selectedStaff.id);
    const upcomingBookings = staffBookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
    const pastBookings = staffBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
    return (
      <DashboardLayout navItems={OWNER_NAV} title="Artisan Profile" userRole="Owner">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-salon-gold hover:text-salon-bronze mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Artisans</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <GlassContainer className="p-6 sm:p-8 flex flex-col items-center text-center h-fit">
            <img src={selectedStaff.avatar} className="w-32 h-32 rounded-3xl object-cover shadow-2xl mb-6 border-4 border-white" referrerPolicy="no-referrer" />
            <h3 className="text-2xl font-serif font-bold text-salon-espresso">{selectedStaff.name}</h3>
            <p className="text-salon-gold font-medium mb-6">{selectedStaff.role}</p>
            
            <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-salon-ivory/50">
              <div className="bg-salon-cream/30 p-4 rounded-2xl">
                <Star className="text-salon-gold mx-auto mb-2" size={20} />
                <p className="text-xl font-bold text-salon-espresso">{selectedStaff.rating}</p>
                <p className="text-[10px] uppercase font-bold text-salon-gold">Rating</p>
              </div>
              <div className="bg-salon-cream/30 p-4 rounded-2xl">
                <DollarSign className="text-salon-gold mx-auto mb-2" size={20} />
                <p className="text-xl font-bold text-salon-espresso">${selectedStaff.revenue.toLocaleString()}</p>
                <p className="text-[10px] uppercase font-bold text-salon-gold">Revenue</p>
              </div>
            </div>

            <div className="w-full pt-6 mt-6 border-t border-salon-ivory/50 text-left">
              <h4 className="text-sm font-serif font-bold text-salon-espresso mb-4">Routine & Availability</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-salon-gold flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">Working Hours</p>
                    <p className="text-sm text-salon-espresso font-medium">{selectedStaff.workingHours || 'Not Set'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-4">
                  <Calendar size={16} className="text-salon-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">Days Off</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedStaff.daysOff && selectedStaff.daysOff.length > 0 ? (
                        selectedStaff.daysOff.map(day => (
                          <span key={day} className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold">{day}</span>
                        ))
                      ) : (
                        <span className="text-sm text-salon-espresso">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>

          <div className="lg:col-span-2 space-y-8">
            <GlassContainer className="p-8">
              <h4 className="text-lg font-serif font-bold text-salon-espresso mb-6">Performance Analytics</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2D5C3" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9C8060', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9C8060', fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="current" stroke="#5C4B35" fill="#5C4B35" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassContainer className="p-6 h-80 overflow-y-auto">
                <h4 className="text-sm font-serif font-bold text-salon-espresso mb-4 flex justify-between items-center">
                  Upcoming Schedule
                  <span className="px-2 py-1 bg-salon-cream/50 rounded-full text-[10px] text-salon-gold">{upcomingBookings.length}</span>
                </h4>
                <div className="space-y-4">
                  {upcomingBookings.length > 0 ? upcomingBookings.map(b => {
                    const dateObj = new Date(b.date);
                    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                    const day = dateObj.getDate();
                    return (
                    <div key={b.id} className="flex items-center gap-3 p-3 bg-salon-cream/20 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-salon-espresso text-white flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[8px] font-bold">{month}</span>
                        <span className="text-xs font-bold">{day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-salon-espresso truncate">{b.service}</p>
                        <p className="text-[10px] text-salon-gold truncate">{b.time} • Client: {b.clientName}</p>
                      </div>
                      <div>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase",
                          b.status === 'confirmed' ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                        )}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  )}) : (
                    <p className="text-xs text-salon-gold italic">No upcoming appointments.</p>
                  )}
                </div>
              </GlassContainer>

              <GlassContainer className="p-6 h-80 overflow-y-auto">
                <h4 className="text-sm font-serif font-bold text-salon-espresso mb-4 flex justify-between items-center">
                  Past Bookings
                  <span className="px-2 py-1 bg-salon-cream/50 rounded-full text-[10px] text-salon-gold">{pastBookings.length}</span>
                </h4>
                <div className="space-y-4">
                  {pastBookings.length > 0 ? pastBookings.map(b => {
                    const dateObj = new Date(b.date);
                    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                    const day = dateObj.getDate();
                    return (
                    <div key={b.id} className="flex items-center gap-3 p-3 bg-salon-cream/20 rounded-xl opacity-80">
                      <div className="w-10 h-10 rounded-lg bg-salon-cream text-salon-espresso flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[8px] font-bold">{month}</span>
                        <span className="text-xs font-bold">{day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-salon-espresso truncate">{b.service}</p>
                        <p className="text-[10px] text-salon-gold truncate">{b.time} • Client: {b.clientName}</p>
                      </div>
                      <div>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase",
                          b.status === 'completed' ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                        )}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  )}) : (
                    <p className="text-xs text-salon-gold italic">No past bookings.</p>
                  )}
                </div>
              </GlassContainer>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={OWNER_NAV} title="Staff Management" userRole="Owner">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-salon-espresso">Our Artisans</h3>
        <StylizedButton variant="primary" onClick={() => setView('add')}>
          <Plus size={18} className="mr-2" />
          Hire New Artisan
        </StylizedButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {staff.map((member) => (
          <GlassContainer 
            key={member.id} 
            className="p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group"
            onClick={() => {
              setSelectedStaff(member);
              setView('details');
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <img src={member.avatar} className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => handleDeleteStaff(e, member.id)}
                  className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove Staff"
                >
                  <Trash2 size={20} />
                </button>
                <button className="p-2 text-salon-gold hover:bg-salon-cream rounded-full"><MoreHorizontal size={20} /></button>
              </div>
            </div>
            <h4 className="text-lg font-serif font-bold text-salon-espresso">{member.name}</h4>
            <p className="text-sm text-salon-gold mb-4">{member.role}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-salon-ivory/50">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">Rating</p>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-salon-gold fill-salon-gold" />
                  <p className="text-sm font-bold text-salon-espresso">{member.rating}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">Revenue</p>
                <p className="text-sm font-bold text-salon-espresso">${member.revenue.toLocaleString()}</p>
              </div>
            </div>
          </GlassContainer>
        ))}
      </div>
    </DashboardLayout>
  );
};

export const OwnerInventory = () => {
  const { inventory, orderSupplies } = useSalon();
  const [view, setView] = useState<'list' | 'order'>('list');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    const formData = new FormData(e.currentTarget);
    const quantity = parseInt(formData.get('quantity') as string);
    orderSupplies(selectedItem.id, quantity);
    setView('list');
  };

  if (view === 'order' && selectedItem) {
    return (
      <DashboardLayout navItems={OWNER_NAV} title="Order Supplies" userRole="Owner">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-salon-gold hover:text-salon-bronze mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Inventory</span>
        </button>

        <div className="max-w-xl mx-auto">
          <GlassContainer className="p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-salon-cream flex items-center justify-center text-salon-bronze">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-salon-espresso">Restock Item</h3>
                <p className="text-xs text-salon-gold">{selectedItem.name}</p>
              </div>
            </div>

            <form onSubmit={handleOrder} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Order Quantity</label>
                <input 
                  name="quantity" 
                  type="number" 
                  min="1" 
                  defaultValue="10"
                  required 
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20" 
                />
              </div>
              
              <div className="p-4 bg-salon-cream/20 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-salon-gold">Unit Price</span>
                  <span className="font-bold text-salon-espresso">${selectedItem.price}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-salon-ivory/50 pt-2">
                  <span className="font-bold text-salon-espresso">Estimated Total</span>
                  <span className="font-bold text-salon-bronze">Calculated at checkout</span>
                </div>
              </div>

              <StylizedButton type="submit" className="w-full py-4">Place Order Request</StylizedButton>
            </form>
          </GlassContainer>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={OWNER_NAV} title="Inventory Control" userRole="Owner">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-salon-espresso">Stock & Supplies</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-salon-cream/30 rounded-full border border-salon-ivory/50">
            <AlertCircle size={14} className="text-red-400" />
            <span className="text-[10px] font-bold text-salon-espresso uppercase tracking-widest">
              {inventory.filter(i => i.stock <= i.minStock).length} Low Stock Items
            </span>
          </div>
        </div>
      </div>
      <GlassContainer className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-salon-cream/30 border-b border-salon-ivory/50">
            <tr className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">
              <th className="px-8 py-4">Product Name</th>
              <th className="px-8 py-4">Category</th>
              <th className="px-8 py-4">Stock Level</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Price</th>
              <th className="px-8 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const isLow = item.stock <= item.minStock;
              return (
                <tr key={item.id} className="border-b border-salon-ivory/20 last:border-0 hover:bg-salon-cream/20 transition-colors">
                  <td className="px-8 py-5 font-medium text-salon-espresso">{item.name}</td>
                  <td className="px-8 py-5 text-sm text-salon-gold">{item.category}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-salon-ivory/50 rounded-full overflow-hidden w-24">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-1000", isLow ? "bg-red-400" : "bg-salon-gold")} 
                          style={{ width: `${Math.min((item.stock / (item.minStock * 3)) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-salon-espresso">{item.stock}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      isLow ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    )}>
                      {isLow ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-salon-bronze">${item.price}</td>
                  <td className="px-8 py-5">
                    <StylizedButton 
                      variant="outline" 
                      className="py-1.5 px-3 text-[10px]"
                      onClick={() => {
                        setSelectedItem(item);
                        setView('order');
                      }}
                    >
                      Order
                    </StylizedButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassContainer>
  </DashboardLayout>
  );
};

export const OwnerPromotions = () => {
  const { discounts, addDiscount } = useSalon();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddDiscount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addDiscount({
      salonId: 'sal1', // Default for owner portal
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      percentage: parseInt(formData.get('percentage') as string),
      code: formData.get('code') as string,
      expiryDate: formData.get('expiryDate') as string,
    });
    setIsAdding(false);
  };

  return (
    <DashboardLayout navItems={OWNER_NAV} title="Promotion Management" userRole="Owner">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-salon-espresso">Active Offers</h3>
        <StylizedButton variant="primary" onClick={() => setIsAdding(true)}>
          <Plus size={18} className="mr-2" />
          Create Discount
        </StylizedButton>
      </div>

      {isAdding && (
        <GlassContainer className="p-8 mb-8 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAddDiscount} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-salon-gold tracking-widest">Offer Title</label>
              <input name="title" required className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20" placeholder="e.g. Summer Glow Special" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-salon-gold tracking-widest">Promo Code</label>
              <input name="code" required className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20" placeholder="e.g. SUMMER24" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] uppercase font-bold text-salon-gold tracking-widest">Description</label>
              <textarea name="description" required className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20 h-24 resize-none" placeholder="Describe the offer..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-salon-gold tracking-widest">Discount %</label>
              <input name="percentage" type="number" required min="1" max="100" className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20" placeholder="e.g. 20" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-salon-gold tracking-widest">Expiry Date</label>
              <input name="expiryDate" type="date" required className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-salon-gold/20" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <StylizedButton variant="ghost" type="button" onClick={() => setIsAdding(false)}>Cancel</StylizedButton>
              <StylizedButton variant="primary" type="submit">Publish Offer</StylizedButton>
            </div>
          </form>
        </GlassContainer>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map(d => (
          <GlassContainer key={d.id} className="p-6 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-salon-espresso text-white text-[10px] font-bold rounded-bl-xl">
              {d.percentage}% OFF
            </div>
            <div className="w-10 h-10 bg-salon-gold/10 rounded-xl flex items-center justify-center text-salon-bronze mb-4">
              <Sparkles size={24} />
            </div>
            <h4 className="text-xl font-serif font-bold text-salon-espresso mb-2">{d.title}</h4>
            <p className="text-sm text-salon-gold mb-6 line-clamp-2">{d.description}</p>
            <div className="flex items-center justify-between pt-6 border-t border-salon-ivory/50">
              <div className="px-3 py-1 bg-salon-cream rounded border border-salon-gold/20 font-mono text-xs font-bold text-salon-bronze">
                {d.code}
              </div>
              <p className="text-[10px] uppercase font-bold text-salon-gold">Expires: {d.expiryDate}</p>
            </div>
          </GlassContainer>
        ))}
        {discounts.length === 0 && !isAdding && (
          <div className="md:col-span-3 py-20 text-center text-salon-gold italic border-2 border-dashed border-salon-ivory rounded-[2rem]">
            No proactive promotions currently active.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
