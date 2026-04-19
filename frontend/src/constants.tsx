import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Package, 
  ShieldCheck, 
  Building2,
  Calendar,
  Clock,
  Scissors,
  History,
  Award,
  Sparkles,
  Trash2,
} from 'lucide-react';

export const APP_TAGLINE = 'Luxury salon operations, unified in one intelligent dashboard.';

export const OWNER_NAV = [
  { label: 'Dashboard', href: '/owner/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Analytics', href: '/owner/analytics', icon: <BarChart3 size={20} /> },
  { label: 'Staff', href: '/owner/staff', icon: <Users size={20} /> },
  { label: 'Inventory', href: '/owner/inventory', icon: <Package size={20} /> },
  { label: 'Promotions', href: '/owner/promotions', icon: <Sparkles size={20} /> },
];

export const ADMIN_NAV = [
  { label: 'System Overview', href: '/admin/dashboard', icon: <ShieldCheck size={20} /> },
  { label: 'Manage Salons', href: '/admin/salons', icon: <Building2 size={20} /> },
  { label: 'User Management', href: '/admin/users', icon: <Users size={20} /> },
];

export const EMPLOYEE_NAV = [
  { label: 'My Schedule', href: '/employee/schedule', icon: <Calendar size={20} /> },
  { label: 'My Services', href: '/employee/services', icon: <Scissors size={20} /> },
];

export const CUSTOMER_NAV = [
  { label: 'Home', href: 'customer/home', icon: <Building2 size={20} /> },
  { label: 'Book Now', href: '/customer/book', icon: <Calendar size={20} /> },
  { label: 'My History', href: '/customer/history', icon: <History size={20} /> },
  { label: 'Loyalty', href: '/customer/loyalty', icon: <Award size={20} /> },
];
