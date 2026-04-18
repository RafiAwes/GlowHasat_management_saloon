import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  Smartphone,
  CheckCircle2,
  Camera,
  Mail,
  Lock,
  Sparkles,
  Plus
} from 'lucide-react';
import { DashboardLayout } from '@/src/components/layouts/DashboardLayout';
import { GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';
import { OWNER_NAV, ADMIN_NAV, EMPLOYEE_NAV, CUSTOMER_NAV } from '@/src/constants';

export const SettingsPage = () => {
  const { user, updateUserProfile } = useSalon();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getNavItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'owner': return OWNER_NAV;
      case 'admin': return ADMIN_NAV;
      case 'employee': return EMPLOYEE_NAV;
      case 'customer': return CUSTOMER_NAV;
      default: return [];
    }
  };

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    setTimeout(() => {
      updateUserProfile({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
  ];

  return (
    <DashboardLayout 
      navItems={getNavItems()} 
      title="Account Settings" 
      userRole={user?.role || 'User'}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                activeTab === tab.id 
                  ? "bg-salon-espresso text-white shadow-lg" 
                  : "text-salon-gold hover:bg-salon-cream hover:text-salon-bronze"
              )}
            >
              {tab.icon}
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <GlassContainer className="p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      src={user?.avatar || "https://picsum.photos/seed/user/200/200"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button className="absolute bottom-[-10px] right-[-10px] p-3 bg-salon-espresso text-white rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={18} />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-serif font-bold text-salon-espresso">{user?.name}</h3>
                  <p className="text-salon-gold uppercase tracking-widest text-[10px] font-bold mt-1">{user?.role} Account</p>
                  <p className="text-xs text-salon-gold mt-2">Member since Jan 2024</p>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                      <input 
                        name="name"
                        defaultValue={user?.name}
                        className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                      <input 
                        name="email"
                        defaultValue={user?.email}
                        className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Bio / Professional Summary</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-salon-gold/20 outline-none text-sm resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-salon-ivory/50">
                  <div className="flex items-center gap-2">
                    {saveSuccess && (
                      <div className="flex items-center gap-2 text-green-600 animate-in fade-in duration-300">
                        <CheckCircle2 size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Changes Saved</span>
                      </div>
                    )}
                  </div>
                  <StylizedButton 
                    type="submit" 
                    disabled={isSaving}
                    className="min-w-[160px]"
                  >
                    {isSaving ? "Saving..." : "Update Profile"}
                  </StylizedButton>
                </div>
              </form>
            </GlassContainer>
          )}

          {activeTab === 'notifications' && (
            <GlassContainer className="p-6 sm:p-10">
              <h3 className="text-2xl font-serif font-bold text-salon-espresso mb-8">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { id: 'email_book', label: 'Email Notifications', desc: 'Receive updates about new bookings and cancellations', icon: <Mail size={20} /> },
                  { id: 'push_book', label: 'Push Notifications', desc: 'Real-time alerts on your mobile device', icon: <Smartphone size={20} /> },
                  { id: 'marketing', label: 'Marketing Updates', desc: 'News about Zenith features and luxury trends', icon: <Sparkles size={20} /> },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-salon-cream/20 rounded-2xl border border-salon-ivory/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-salon-cream flex items-center justify-center text-salon-bronze">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-salon-espresso">{item.label}</p>
                        <p className="text-xs text-salon-gold">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-salon-ivory rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-salon-gold"></div>
                    </label>
                  </div>
                ))}
              </div>
            </GlassContainer>
          )}

          {activeTab === 'security' && (
            <GlassContainer className="p-6 sm:p-10">
              <h3 className="text-2xl font-serif font-bold text-salon-espresso mb-8">Security & Privacy</h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-salon-espresso uppercase tracking-widest">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" placeholder="Current Password" className="bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none text-sm" />
                    <input type="password" placeholder="New Password" className="bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 outline-none text-sm" />
                  </div>
                  <StylizedButton variant="outline" size="sm">Update Password</StylizedButton>
                </div>

                <div className="pt-8 border-t border-salon-ivory/50">
                  <h4 className="text-sm font-bold text-salon-espresso uppercase tracking-widest mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 bg-salon-cream/20 rounded-2xl border border-salon-ivory/30">
                    <div className="flex items-center gap-4">
                      <Smartphone size={20} className="text-salon-gold" />
                      <div>
                        <p className="text-sm font-bold text-salon-espresso">SMS Authentication</p>
                        <p className="text-xs text-salon-gold">Secure your account with mobile verification</p>
                      </div>
                    </div>
                    <StylizedButton variant="outline" size="sm">Enable</StylizedButton>
                  </div>
                </div>
              </div>
            </GlassContainer>
          )}

          {activeTab === 'billing' && (
            <GlassContainer className="p-6 sm:p-10">
              <h3 className="text-2xl font-serif font-bold text-salon-espresso mb-8">Billing & Subscription</h3>
              <div className="bg-salon-espresso text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles size={120} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Current Plan</p>
                <h4 className="text-3xl font-serif font-bold mb-4">Zenith Elite Enterprise</h4>
                <p className="text-salon-cream/80 text-sm mb-6">Next billing date: May 15, 2026</p>
                <StylizedButton variant="secondary" size="sm">Manage Subscription</StylizedButton>
              </div>

              <h4 className="text-sm font-bold text-salon-espresso uppercase tracking-widest mb-4">Payment Methods</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-salon-cream/20 rounded-2xl border border-salon-ivory/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-salon-espresso rounded flex items-center justify-center text-[10px] font-bold text-white">VISA</div>
                    <div>
                      <p className="text-sm font-bold text-salon-espresso">Visa ending in 4242</p>
                      <p className="text-xs text-salon-gold">Expires 12/28</p>
                    </div>
                  </div>
                  <StylizedButton variant="ghost" size="sm">Edit</StylizedButton>
                </div>
                <StylizedButton variant="outline" className="w-full py-4">
                  <Plus size={18} className="mr-2" />
                  Add New Payment Method
                </StylizedButton>
              </div>
            </GlassContainer>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
