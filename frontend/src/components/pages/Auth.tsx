import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, ChevronDown, User, Phone } from 'lucide-react';
import { GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon, UserRole } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';

export const LoginPage = () => {
  const { login, user } = useSalon();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      const routes: Record<string, string> = {
        owner: '/owner/dashboard',
        employee: '/employee/schedule',
        customer: '/customer/home',
        admin: '/admin/dashboard',
      };
      navigate(routes[user.role] || '/customer/home');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <div className="p-3 bg-red-50 text-red-500 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@zenith.com"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <StylizedButton type="submit" className="w-full py-4 text-base group" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
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
  const { register } = useSalon();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const parts = fullName.split(' ');
      const first_name = parts[0];
      const last_name = parts.slice(1).join(' ');

      await register({
        first_name,
        last_name,
        email,
        phone_number: phone,
        password
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <div className="p-3 bg-red-50 text-red-500 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-salon-gold font-bold ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-gold" size={18} />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-salon-cream/30 border border-salon-ivory/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-salon-gold/20 focus:border-salon-gold outline-none transition-all text-sm"
                />
              </div>
            </div>

            <StylizedButton type="submit" className="w-full py-4 text-base group" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
