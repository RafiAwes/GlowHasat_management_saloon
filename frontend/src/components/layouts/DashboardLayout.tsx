import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User, 
  Menu, 
  X, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Package, 
  BarChart3, 
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { GlassContainer } from '@/src/components/ui/Shared';
import { useSalon } from '@/src/context/SalonContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  title: string;
  userRole: string;
}

export const DashboardLayout = ({ children, navItems, title, userRole }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useSalon();

  return (
    <div className="min-h-screen bg-salon-bg flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white/60 backdrop-blur-xl border-r border-salon-ivory/50 transform transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-salon-espresso rounded-xl flex items-center justify-center text-salon-bg">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-tight text-salon-espresso leading-none">GLOWHAAT</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-salon-gold font-bold">Salon Engine</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-salon-espresso text-white shadow-lg shadow-salon-espresso/10" 
                      : "text-salon-gold hover:bg-salon-cream hover:text-salon-bronze"
                  )}
                >
                  <span className={cn(
                    "transition-colors",
                    isActive ? "text-white" : "text-salon-gold group-hover:text-salon-bronze"
                  )}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto pt-6 border-t border-salon-ivory/50 space-y-1">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-salon-gold hover:bg-salon-cream hover:text-salon-bronze transition-all"
            >
              <Settings size={20} />
              <span className="font-medium text-sm">Settings</span>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/40 backdrop-blur-md border-b border-salon-ivory/50 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-salon-espresso"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <h2 className="text-xl font-serif font-semibold text-salon-espresso">{title}</h2>
          </div>

          <div className="flex items-center gap-2 lg:gap-6">
            <div className="hidden md:flex items-center bg-salon-cream/50 border border-salon-ivory/50 rounded-full px-4 py-2 w-64">
              <Search size={18} className="text-salon-gold" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full placeholder:text-salon-gold/60"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-salon-gold hover:bg-salon-cream rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-salon-gold rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-8 w-[1px] bg-salon-ivory/50 mx-2 hidden sm:block"></div>

              <div className="flex items-center gap-3 pl-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-salon-espresso leading-none mb-1">{user?.name || 'User'}</p>
                  <p className="text-[10px] uppercase tracking-wider text-salon-gold font-bold">{userRole}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-salon-ivory p-0.5">
                  <img 
                    src={user?.avatar || "https://picsum.photos/seed/user/100/100"} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-salon-espresso/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
