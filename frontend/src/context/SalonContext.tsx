import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setTokens, clearTokens, getAccessToken } from '@/src/lib/api';
export type UserRole = 'owner' | 'employee' | 'customer' | 'admin';

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  lastActive: string;
  location?: string;
}

export interface Salon {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Onboarding' | 'Suspended';
  revenue: string;
  ownerName: string;
  email: string;
  phone: string;
  staffCount: number;
  description: string;
  joinedDate: string;
  openingHours: string;
}

export interface Discount {
  id: string;
  salonId: string;
  title: string;
  description: string;
  percentage: number;
  code: string;
  expiryDate: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  status: 'Success' | 'Warning' | 'Error';
  type: 'system' | 'user' | 'salon';
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  service: string;
  stylistId: string;
  stylistName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  rating: number;
  revenue: number;
  avatar: string;
  workingHours?: string;
  daysOff?: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
}

interface SalonContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  updateBooking: (id: string, data: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  staff: Staff[];
  addStaff: (staffMember: any) => Promise<void>;
  updateStaff: (id: string, staffData: any) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  inventory: InventoryItem[];
  updateInventory: (id: string, stock: number) => void;
  orderSupplies: (id: string, quantity: number) => void;
  salons: Salon[];
  addSalon: (salon: Omit<Salon, 'id' | 'joinedDate' | 'revenue' | 'staffCount'>) => void;
  users: User[];
  updateUserProfile: (data: Partial<User>) => void;
  discounts: Discount[];
  addDiscount: (discount: Omit<Discount, 'id'>) => void;
  activityLogs: ActivityLog[];
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [staff, setStaff] = useState<Staff[]>([]);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'i1', name: 'GlowHaat Silk Shampoo', category: 'Haircare', stock: 45, minStock: 10, price: 32 },
    { id: 'i2', name: 'Luxe Hold Spray', category: 'Styling', stock: 8, minStock: 15, price: 28 },
    { id: 'i3', name: 'Hydra-Mist Conditioner', category: 'Haircare', stock: 22, minStock: 10, price: 35 },
  ]);

  const [salons, setSalons] = useState<Salon[]>([
    { 
      id: 'sal1', 
      name: 'GlowHaat Flagship', 
      location: 'New York, NY', 
      status: 'Active', 
      revenue: '$1.2M', 
      ownerName: 'Rafia Wes', 
      email: 'nyc@zenith.com', 
      phone: '+1 (212) 555-0198',
      staffCount: 24,
      description: 'The original GlowHaat experience in the heart of Manhattan.',
      joinedDate: '2024-01-15',
      openingHours: 'Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM'
    },
    { 
      id: 'sal2', 
      name: 'Luxe Artistry', 
      location: 'Los Angeles, CA', 
      status: 'Active', 
      revenue: '$850K', 
      ownerName: 'Elena Rodriguez', 
      email: 'la@luxeart.com', 
      phone: '+1 (310) 555-0123',
      staffCount: 18,
      description: 'Modern minimalism meets Hollywood glamour.',
      joinedDate: '2024-06-20',
      openingHours: 'Tue-Sun: 10 AM - 9 PM'
    },
    { 
      id: 'sal3', 
      name: 'Ethereal Cuts', 
      location: 'London, UK', 
      status: 'Onboarding', 
      revenue: '$0', 
      ownerName: 'James Sterling', 
      email: 'london@ethereal.uk', 
      phone: '+44 20 7946 0123',
      staffCount: 0,
      description: 'Our first European expansion bringing the GlowHaat ritual to London.',
      joinedDate: '2026-04-01',
      openingHours: 'Mon-Sun: 9 AM - 10 PM'
    },
  ]);

  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: 'd1', salonId: 'sal1', title: 'Grand Opening', description: '20% off all services for first-time clients.', percentage: 20, code: 'GLOW20', expiryDate: '2026-05-01' },
    { id: 'd2', salonId: 'sal1', title: 'Spring Special', description: 'Complementary ritual with any coloring service.', percentage: 15, code: 'SPRINK15', expiryDate: '2026-04-30' },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 'o1', name: 'Rafia Wes', role: 'owner', email: 'owner@zenith.com', avatar: 'https://picsum.photos/seed/owner/100/100', status: 'active', lastActive: '2 mins ago', location: 'New York' },
    { id: 's1', name: 'Alex Rivers', role: 'employee', email: 'alex@zenith.com', avatar: 'https://picsum.photos/seed/s1/100/100', status: 'active', lastActive: 'Just now', location: 'New York' },
    { id: 's2', name: 'Jordan Lee', role: 'employee', email: 'jordan@zenith.com', avatar: 'https://picsum.photos/seed/s2/100/100', status: 'active', lastActive: '1 hour ago', location: 'Los Angeles' },
    { id: 'a1', name: 'System Admin', role: 'admin', email: 'admin@zenith.com', avatar: 'https://picsum.photos/seed/admin/100/100', status: 'active', lastActive: 'Just now', location: 'Global' },
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: 'l1', timestamp: '2026-04-15 10:25:45', action: 'New Salon Registered: "Ethereal Cuts"', user: 'admin_01', status: 'Success', type: 'salon' },
    { id: 'l2', timestamp: '2026-04-15 09:12:10', action: 'System Backup Completed', user: 'system', status: 'Success', type: 'system' },
    { id: 'l3', timestamp: '2026-04-15 08:45:22', action: 'Failed Login Attempt', user: 'unknown_ip', status: 'Warning', type: 'user' },
    { id: 'l4', timestamp: '2026-04-15 07:30:00', action: 'Inventory Alert: Luxe Hold Spray', user: 'system', status: 'Warning', type: 'salon' },
  ]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/accounts/profile');
      const data = response.data;
      
      if (data && data.user) {
        // Map backend roles to frontend roles
        let mappedRole: UserRole = 'customer';
        const rawRole = data.user.role.toUpperCase();
        
        if (rawRole === 'ADMIN_SUPER' || rawRole === 'ADMIN_EDITOR' || rawRole === 'ADMIN_SUPPORT') {
          mappedRole = 'admin';
        } else if (rawRole === 'MANAGER') {
          mappedRole = 'owner';
        } else if (rawRole === 'USER') {
          mappedRole = 'customer';
        } else if (rawRole === 'EMPLOYEE') {
          mappedRole = 'employee';
        }

        setUser({
          id: data.user.id,
          name: `${data.user.first_name} ${data.user.last_name}`,
          email: data.user.email,
          role: mappedRole,
          avatar: data.avatar_url || `https://picsum.photos/seed/${data.user.id}/100/100`,
          status: 'active',
          lastActive: 'Just now',
        });
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
      clearTokens();
    }
  };


  const login = async (email: string, password: string) => {
    try {
      const resData = await fetch('http://localhost:8000/api/accounts/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      });
      
      if (resData.success && resData.data) {
        setTokens(resData.data.access, resData.data.refresh);
        await fetchProfile();
      } else {
        throw new Error(resData.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const data = await fetch('http://localhost:8000/api/accounts/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(res => {
        if (!res.ok) throw new Error('Registration failed');
        return res.json();
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        await api.post('/accounts/logout', { refresh });
      }
    } catch (err) {
      console.error('Logout API failed', err);
    } finally {
      clearTokens();
      setUser(null);
    }
  };


  const addSalon = (salonData: Omit<Salon, 'id' | 'joinedDate' | 'revenue' | 'staffCount'>) => {
    const newSalon: Salon = {
      ...salonData,
      id: `sal${salons.length + 1}`,
      joinedDate: new Date().toISOString().split('T')[0],
      revenue: '$0',
      staffCount: 0
    };
    setSalons(prev => [newSalon, ...prev]);
    logActivity(`New Salon Registered: "${newSalon.name}"`, user?.name || 'System', 'Success', 'salon');
  };


  const updateInventory = (id: string, stock: number) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, stock } : item));
  };

  const orderSupplies = (id: string, quantity: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, stock: item.stock + quantity } : item
    ));
    
    // Log activity
    const item = inventory.find(i => i.id === id);
    const newLog: ActivityLog = {
      id: `l${activityLogs.length + 1}`,
      timestamp: new Date().toLocaleString(),
      action: `Ordered ${quantity} units of ${item?.name}`,
      user: user?.name || 'Owner',
      status: 'Success',
      type: 'salon'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const mapStaff = (item: any): Staff => ({
    id: item.id,
    name: `${item.user?.first_name || ''} ${item.user?.last_name || ''}`.trim() || 'Unnamed Staff',
    role: item.title,
    rating: 5,
    revenue: 0,
    avatar: item.avatar_url || `https://picsum.photos/seed/${item.id}/100/100`,
    workingHours: item.working_hours || '',
    daysOff: item.days_off || [],
  });

  const fetchStaff = async () => {
    try {
      const response = await api.get('/staffs/staffs/');
      const rows = Array.isArray(response.data) ? response.data : [];
      setStaff(rows.map(mapStaff));
    } catch (err) {
      console.error('Failed to fetch staff', err);
    }
  };

  const mapService = (item: any): Service => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: Number(item.price),
    duration: item.duration,
    description: item.description || '',
  });

  const fetchServices = async () => {
    try {
      const response = await api.get('/services/services/');
      const rows = Array.isArray(response.data) ? response.data : [];
      setServices(rows.map(mapService));
    } catch (err) {
      console.error('Failed to fetch services', err);
    }
  };

  const addService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      const response = await api.post('/services/services/', serviceData);
      const newService = mapService(response.data);
      setServices(prev => [...prev, newService]);
      logActivity(`New service added: ${newService.name}`, user?.name || 'Owner');
    } catch (err) {
      console.error('Failed to add service', err);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await api.delete(`/services/services/${id}/`);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Failed to delete service', err);
    }
  };

  const mapBooking = (item: any): Booking => ({
    id: item.id,
    clientId: item.client_email || 'walk-in',
    clientName: item.client_name,
    service: item.service_name,
    stylistId: item.staff,
    stylistName: item.staff_details ? `${item.staff_details.user?.first_name || ''} ${item.staff_details.user?.last_name || ''}`.trim() : 'Unknown',
    date: item.date,
    time: item.time,
    status: item.status,
    price: Number(item.price),
  });

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/bookings/');
      const rows = Array.isArray(response.data) ? response.data : [];
      setBookings(rows.map(mapBooking));
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  const addBooking = async (bookingData: Omit<Booking, 'id'>) => {
    try {
      const payload = {
        staff: bookingData.stylistId,
        service_name: bookingData.service,
        client_name: bookingData.clientName,
        client_email: bookingData.clientId.includes('@') ? bookingData.clientId : '',
        date: bookingData.date,
        time: bookingData.time,
        status: bookingData.status,
        price: bookingData.price,
      };
      const response = await api.post('/bookings/bookings/', payload);
      const newBooking = mapBooking(response.data);
      setBookings(prev => [...prev, newBooking]);
      logActivity(`New booking created for ${newBooking.clientName}`, user?.name || 'Owner');
    } catch (err) {
      console.error('Failed to add booking', err);
    }
  };

  const updateBooking = async (id: string, data: Partial<Booking>) => {
    try {
      // Map frontend fields back to backend if necessary
      const payload: any = { ...data };
      if (data.stylistId) payload.staff = data.stylistId;
      if (data.clientName) payload.client_name = data.clientName;
      
      const response = await api.patch(`/bookings/bookings/${id}/`, payload);
      const updated = mapBooking(response.data);
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
    } catch (err) {
      console.error('Failed to update booking', err);
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await api.delete(`/bookings/bookings/${id}/`);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Failed to delete booking', err);
    }
  };

  const addStaff = async (staffData: any) => {
    try {
      const formData = new FormData();
      
      const first_name = staffData.first_name ?? staffData.name?.split(' ')[0] ?? '';
      const last_name = staffData.last_name ?? staffData.name?.split(' ').slice(1).join(' ') ?? '';
      const email = staffData.email || `${(first_name || 'staff').toLowerCase().replace(' ', '.')}@glowhaat.com`;
      
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      if (staffData.phone_number) formData.append('phone_number', staffData.phone_number);
      if (staffData.password) formData.append('password', staffData.password);
      formData.append('title', staffData.title || staffData.role || '');
      formData.append('bio', staffData.bio || '');
      formData.append('working_hours', staffData.working_hours || '09:00 AM - 05:00 PM');
      
      // Handle days_off as JSON string for FormData compatibility
      const daysOff = Array.isArray(staffData.days_off) ? staffData.days_off : [];
      formData.append('days_off', JSON.stringify(daysOff));

      if (staffData.avatar instanceof File) {
        formData.append('avatar', staffData.avatar);
      } else if (staffData.avatar_url && typeof staffData.avatar_url === 'string' && /^https?:\/\//i.test(staffData.avatar_url)) {
        // If it's a URL and we don't have a file, the backend might handle it or we ignore it
        // In our new system, we primarily want files.
      }
      
      const response = await api.post('/staffs/', formData);
      const newStaff = mapStaff(response.data);
      setStaff(prev => [newStaff, ...prev]);

      // Log activity
      const newLog: ActivityLog = {
        id: `l${activityLogs.length + 1}`,
        timestamp: new Date().toLocaleString(),
        action: `New Staff Hired: "${newStaff.name}"`,
        user: user?.name || 'Owner',
        status: 'Success',
        type: 'user'
      };
      setActivityLogs(prev => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to add staff', err);
      throw err;
    }
  };

  const updateStaff = async (id: string, staffData: any) => {
    try {
      const formData = new FormData();
      
      if (staffData.first_name) formData.append('first_name', staffData.first_name);
      if (staffData.last_name) formData.append('last_name', staffData.last_name);
      if (staffData.email) formData.append('email', staffData.email);
      if (staffData.phone_number !== undefined) formData.append('phone_number', staffData.phone_number || '');
      if (staffData.password) formData.append('password', staffData.password);
      if (staffData.title) formData.append('title', staffData.title);
      if (staffData.bio !== undefined) formData.append('bio', staffData.bio || '');
      if (staffData.working_hours) formData.append('working_hours', staffData.working_hours);
      
      if (staffData.days_off) {
        formData.append('days_off', JSON.stringify(staffData.days_off));
      }

      if (staffData.avatar instanceof File) {
        formData.append('avatar', staffData.avatar);
      }
      
      const response = await api.patch(`/staffs/${id}/`, formData);
      const updated = mapStaff(response.data);
      setStaff(prev => prev.map(item => item.id === id ? updated : item));

      // Log activity
      const newLog: ActivityLog = {
        id: `l${activityLogs.length + 1}`,
        timestamp: new Date().toLocaleString(),
        action: `Staff Updated: "${updated.name}"`,
        user: user?.name || 'Owner',
        status: 'Success',
        type: 'user'
      };
      setActivityLogs(prev => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to update staff', err);
      throw err;
    }
  };

  const deleteStaff = async (id: string) => {
    try {
      const staffMember = staff.find(s => s.id === id);
      await api.delete(`/staffs/${id}/`);
      setStaff(prev => prev.filter(item => item.id !== id));
    
      // Log activity
      const newLog: ActivityLog = {
        id: `l${activityLogs.length + 1}`,
        timestamp: new Date().toLocaleString(),
        action: `Staff Member Removed: "${staffMember?.name}"`,
        user: user?.name || 'Owner',
        status: 'Warning',
        type: 'user'
      };
      setActivityLogs(prev => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to delete staff', err);
      throw err;
    }
  };

  const logActivity = (action: string, userName: string, status: ActivityLog['status'] = 'Success', type: ActivityLog['type'] = 'salon') => {
    const newLog: ActivityLog = {
      id: `l${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      action,
      user: userName,
      status,
      type
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addDiscount = (discount: Omit<Discount, 'id'>) => {
    const newDiscount: Discount = {
      ...discount,
      id: `d${discounts.length + 1}`
    };
    setDiscounts(prev => [newDiscount, ...prev]);

    logActivity(`New Discount Created: "${newDiscount.title}"`, user?.name || 'Owner', 'Success', 'salon');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...data } : u));
    
    logActivity(`Profile Updated: ${Object.keys(data).join(', ')}`, user.name, 'Success', 'user');
  };
  useEffect(() => {
    const initAuth = async () => {
      if (getAccessToken()) {
        try {
          await fetchProfile();
          await Promise.all([
            fetchStaff(),
            fetchServices(),
            fetchBookings(),
          ]);
        } catch (err) {
          console.error('Initial auth fetch failed', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);


  return (
    <SalonContext.Provider value={{ 
      user, loading, login, register, logout, services, addService, deleteService, bookings,
      addBooking,
      updateBooking,
      deleteBooking,
      staff,
      addStaff,
      updateStaff,
      deleteStaff,
      inventory,
      updateInventory,
      orderSupplies,
      salons,
      addSalon,
      users,
      updateUserProfile,
      discounts,
      addDiscount,
      activityLogs,
    }}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (context === undefined) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
