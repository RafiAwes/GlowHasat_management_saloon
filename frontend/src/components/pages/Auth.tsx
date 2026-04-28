import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, ChevronDown, User, Phone } from 'lucide-react';
import { GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon, UserRole } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';

export const LoginPage = () => {
  const { login } = useSalon();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    
    const routes: Record<UserRole, string> = {
      owner: '/owner/dashboard',
      employee: '/employee/schedule',
      customer: '/customer/home',
      admin: '/admin/dashboard',
    };
    
    navigate(routes[selectedRole]);
  };

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'customer', label: 'Client', desc: 'Book and manage your appointments' },
    { id: 'employee', label: 'Stylist', desc: 'View your schedule and services' },
    { id: 'owner', label: 'Salon Owner', desc: 'Manage staff, inventory, and analytics' },
    { id: 'admin', label: 'System Admin', desc: 'Global platform management' },
  ];

  return (
    <div className="min-h-screen bg-salon-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-salon-ivory/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-salon-gold/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-salon-espresso rounded-2xl flex items-center justify-center text-salon-bg mx-auto mb-6 shadow-xl">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-salon-espresso mb-2">ZENITH</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-salon-gold font-bold">Salon Engine</p>
        </div>

        <GlassContainer className="p-6 sm:p-10 shadow-2xl shadow-salon-espresso/5">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-salon-espresso mb-1">Welcome Back</h2>
            <p className="text-sm text-salon-gold">Sign in to manage your luxury experience.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2 relative">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Access Role</label>
              <button 
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="w-full flex items-center justify-between bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 px-4 text-sm text-salon-espresso transition-all hover:bg-salon-cream/50"
              >
                <span className="font-semibold">{roles.find(r => r.id === selectedRole)?.label}</span>
                <ChevronDown size={18} className={cn("text-salon-gold transition-transform", isRoleDropdownOpen && "rotate-180")} />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-salon-ivory/50 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left p-4 hover:bg-salon-cream transition-colors border-b border-salon-ivory/20 last:border-0",
                        selectedRole === role.id && "bg-salon-cream/50"
                      )}
                    >
                      <p className="text-sm font-bold text-salon-espresso">{role.label}</p>
                      <p className="text-[10px] text-salon-gold">{role.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="email" 
                  defaultValue={selectedRole + "@zenith.com"}
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold">Password</label>
                <button type="button" className="text-[10px] uppercase tracking-widest text-salon-bronze font-bold hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <StylizedButton type="submit" className="w-full py-4 text-base group">
              Sign In as {roles.find(r => r.id === selectedRole)?.label}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </StylizedButton>
          </form>

          <div className="mt-8 pt-8 border-t border-salon-ivory/50 text-center">
            <p className="text-sm text-salon-gold">
              Don't have an account? {' '}
              <button onClick={() => navigate('/register')} className="text-salon-bronze font-bold hover:underline">Register Now</button>
            </p>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useSalon();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate register and login as customer
    login('customer');
    navigate('/customer/home');
  };

  return (
    <div className="min-h-screen bg-salon-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-salon-ivory/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-salon-gold/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-salon-espresso rounded-2xl flex items-center justify-center text-salon-bg mx-auto mb-6 shadow-xl">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-salon-espresso mb-2">ZENITH</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-salon-gold font-bold">Salon Engine</p>
        </div>

        <GlassContainer className="p-6 sm:p-10 shadow-2xl shadow-salon-espresso/5">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-salon-espresso mb-1">Create Account</h2>
            <p className="text-sm text-salon-gold">Join the Zenith luxury experience.</p>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="text" 
                  placeholder="Jane Doe"
                  required
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="email" 
                  placeholder="jane@example.com"
                  required
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <StylizedButton type="submit" className="w-full py-4 text-base group">
              Create Account
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </StylizedButton>
          </form>

          <div className="mt-8 pt-8 border-t border-salon-ivory/50 text-center">
            <p className="text-sm text-salon-gold">
              Already have an account? {' '}
              <button onClick={() => navigate('/login')} type="button" className="text-salon-bronze font-bold hover:underline">Sign In</button>
            </p>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};
