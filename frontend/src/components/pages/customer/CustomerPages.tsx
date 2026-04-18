import React, { useState } from 'react';
import { 
  Calendar, 
  History, 
  Star, 
  Scissors, 
  Clock, 
  MapPin, 
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { DashboardLayout } from '@/src/components/layouts/DashboardLayout';
import { GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';
import { CUSTOMER_NAV } from '@/src/constants';

export const CustomerBook = () => {
  const { staff, addBooking, user } = useSalon();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    stylistId: '',
    stylistName: '',
    date: '2026-04-16',
    time: '',
    price: 0
  });

  const services = [
    { id: 's1', name: 'Signature Cut', price: 85, duration: '60 min', desc: 'Precision cutting tailored to your features.' },
    { id: 's2', name: 'Balayage Artistry', price: 220, duration: '150 min', desc: 'Hand-painted highlights for a natural glow.' },
    { id: 's3', name: 'Zenith Treatment', price: 65, duration: '45 min', desc: 'Deep conditioning ritual for silk-like hair.' },
  ];

  const handleComplete = () => {
    addBooking({
      clientId: user?.id || 'guest',
      clientName: user?.name || 'Guest',
      service: bookingData.service,
      stylistId: bookingData.stylistId,
      stylistName: bookingData.stylistName,
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      price: bookingData.price
    });
    setStep(4);
  };

  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="Book an Experience" userRole="Client">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-salon-ivory/50 -translate-y-1/2 z-0"></div>
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative z-10 transition-all duration-500",
                step >= i ? "bg-salon-espresso text-white shadow-lg" : "bg-salon-cream text-salon-gold"
              )}
            >
              {step > i ? <CheckCircle2 size={20} /> : i}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-serif font-bold text-salon-espresso">Select a Service</h3>
            <div className="grid grid-cols-1 gap-4">
              {services.map((s) => (
                <GlassContainer 
                  key={s.id} 
                  onClick={() => {
                    setBookingData({ ...bookingData, service: s.name, price: s.price });
                    setStep(2);
                  }}
                  className="p-6 flex items-center justify-between cursor-pointer hover:border-salon-gold transition-all group"
                >
                  <div>
                    <h4 className="text-lg font-serif font-bold text-salon-espresso">{s.name}</h4>
                    <p className="text-sm text-salon-gold mb-1">{s.desc}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-salon-bronze">{s.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-serif font-bold text-salon-espresso">${s.price}</p>
                    <ChevronRight size={20} className="text-salon-gold ml-auto mt-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassContainer>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-serif font-bold text-salon-espresso">Choose your Artisan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.map((s) => (
                <GlassContainer 
                  key={s.id} 
                  onClick={() => {
                    setBookingData({ ...bookingData, stylistId: s.id, stylistName: s.name });
                    setStep(3);
                  }}
                  className="p-6 flex items-center gap-4 cursor-pointer hover:border-salon-gold transition-all"
                >
                  <img src={s.avatar} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-lg font-serif font-bold text-salon-espresso">{s.name}</h4>
                    <p className="text-xs text-salon-gold mb-2">{s.role}</p>
                    <div className="flex items-center gap-1 text-salon-bronze">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{s.rating}</span>
                    </div>
                  </div>
                </GlassContainer>
              ))}
            </div>
            <StylizedButton variant="ghost" onClick={() => setStep(1)} className="mt-4">Back to Services</StylizedButton>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-serif font-bold text-salon-espresso">Select Time & Confirm</h3>
            <div className="grid grid-cols-3 gap-3">
              {['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map((t) => (
                <button
                  key={t}
                  onClick={() => setBookingData({ ...bookingData, time: t })}
                  className={cn(
                    "p-4 rounded-xl font-bold text-sm transition-all",
                    bookingData.time === t ? "bg-salon-espresso text-white shadow-lg" : "bg-white/50 text-salon-gold hover:bg-salon-cream"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <GlassContainer className="p-8 bg-salon-cream/30">
              <h4 className="text-sm uppercase tracking-widest font-bold text-salon-gold mb-6">Booking Summary</h4>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-salon-gold">Service</span>
                  <span className="font-bold text-salon-espresso">{bookingData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-salon-gold">Artisan</span>
                  <span className="font-bold text-salon-espresso">{bookingData.stylistName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-salon-gold">Date & Time</span>
                  <span className="font-bold text-salon-espresso">{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="h-[1px] bg-salon-ivory/50"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-serif font-bold text-salon-espresso">Total</span>
                  <span className="font-serif font-bold text-salon-bronze">${bookingData.price}</span>
                </div>
              </div>
              <StylizedButton 
                disabled={!bookingData.time}
                onClick={handleComplete}
                className="w-full py-4"
              >
                Confirm Experience
              </StylizedButton>
            </GlassContainer>
            <StylizedButton variant="ghost" onClick={() => setStep(2)} className="w-full">Back to Artisan</StylizedButton>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-6 animate-in zoom-in duration-500 py-12">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-4xl font-serif font-bold text-salon-espresso">Transformation Awaits</h3>
            <p className="text-salon-gold max-w-md mx-auto">Your appointment has been requested. We'll notify you as soon as it's confirmed by your artisan.</p>
            <div className="pt-8">
              <StylizedButton variant="primary" onClick={() => setStep(1)}>Book Another Service</StylizedButton>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export const CustomerHistory = () => {
  const { bookings } = useSalon();
  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="My History" userRole="Client">
      <div className="space-y-6">
        {bookings.map((booking) => (
          <GlassContainer key={booking.id} className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-salon-cream rounded-2xl flex items-center justify-center text-salon-gold">
                <Sparkles size={28} />
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold text-salon-espresso">{booking.service}</h4>
                <p className="text-sm text-salon-gold mb-1">with {booking.stylistName}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-salon-bronze">{booking.date} • {booking.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-serif font-bold text-salon-espresso">${booking.price}</p>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase",
                booking.status === 'completed' ? "bg-green-100 text-green-600" : "bg-salon-cream text-salon-gold"
              )}>
                {booking.status}
              </span>
            </div>
          </GlassContainer>
        ))}
      </div>
    </DashboardLayout>
  );
};

export const CustomerLoyalty = () => {
  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="Loyalty Rewards" userRole="Client">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassContainer className="lg:col-span-2 p-10 bg-salon-espresso text-salon-bg relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-salon-gold/20 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-serif font-bold mb-4">Elite Status: Gold</h3>
            <p className="opacity-70 mb-10 max-w-md">You're part of our inner circle. Enjoy exclusive perks, early access to new rituals, and priority booking.</p>
            
            <div className="space-y-2 mb-10">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Progress to Platinum</span>
                <span>750 / 1000 pts</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-salon-gold w-[75%] rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-2xl font-serif font-bold">12</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Visits</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-2xl font-serif font-bold">750</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Points</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-2xl font-serif font-bold">3</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Rewards</p>
              </div>
            </div>
          </div>
        </GlassContainer>

        <div className="space-y-6">
          <h4 className="text-xl font-serif font-bold text-salon-espresso px-2">Available Rewards</h4>
          {[
            { name: 'Free Scalp Massage', pts: 200 },
            { name: '15% Off Retail', pts: 350 },
            { name: 'Signature Blowout', pts: 500 },
          ].map((r) => (
            <GlassContainer key={r.name} className="p-6 flex items-center justify-between group cursor-pointer hover:bg-salon-cream transition-colors">
              <div>
                <p className="font-bold text-salon-espresso">{r.name}</p>
                <p className="text-xs text-salon-gold">{r.pts} Points</p>
              </div>
              <StylizedButton variant="outline" size="sm">Redeem</StylizedButton>
            </GlassContainer>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
