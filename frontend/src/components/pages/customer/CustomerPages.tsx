import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  History, 
  Star, 
  Scissors, 
  Clock, 
  MapPin, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  CreditCard,
  Crown
} from 'lucide-react';
import { DashboardLayout } from '@/src/components/layouts/DashboardLayout';
import { GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';
import { CUSTOMER_NAV } from '@/src/constants';

export const CustomerHome = () => {
  const { salons, discounts, bookings, user } = useSalon();
  const navigate = useNavigate();
  
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  
  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="Welcome Back" userRole="Client">
      <div className="space-y-8">
        {/* Welcome Hero */}
        <section className="bg-salon-espresso text-white p-8 sm:p-12 rounded-[2rem] relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-salon-gold/20 rounded-full blur-[80px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold mb-4">Hello, {user?.name || 'Guest'}</h1>
              <p className="text-salon-cream/70 max-w-md">Your next ritual of transformation is just a few clicks away. Explore our artisan network.</p>
            </div>
            <div className="flex gap-4">
              <GlassContainer className="bg-white/5 border-white/10 p-4 text-center min-w-[120px]">
                <p className="text-2xl font-serif font-bold">750</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Points</p>
              </GlassContainer>
              <GlassContainer className="bg-white/5 border-white/10 p-4 text-center min-w-[120px]">
                <p className="text-2xl font-serif font-bold">{upcomingBookings.length}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Bookings</p>
              </GlassContainer>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Discounts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-serif font-bold text-salon-espresso">Current Promotions</h3>
              <Sparkles size={20} className="text-salon-gold" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discounts.map(d => (
                <GlassContainer key={d.id} className="p-6 bg-salon-cream/20 border-salon-ivory hover:border-salon-gold transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-salon-gold/10 rounded-xl flex items-center justify-center text-salon-bronze">
                      <Scissors size={24} />
                    </div>
                    <span className="bg-salon-espresso text-white text-[10px] font-bold px-2 py-1 rounded-full">{d.percentage}% OFF</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-salon-espresso">{d.title}</h4>
                  <p className="text-sm text-salon-gold mb-4">{d.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-salon-ivory/50">
                    <code className="text-[10px] font-mono bg-salon-cream px-2 py-1 rounded border border-salon-ivory">{d.code}</code>
                    <p className="text-[10px] text-salon-gold font-bold uppercase">Expires: {d.expiryDate}</p>
                  </div>
                </GlassContainer>
              ))}
            </div>

            {/* Salon Network Details */}
            <h3 className="text-2xl font-serif font-bold text-salon-espresso px-2 mt-12">Our Ritual Locations</h3>
            <div className="space-y-4">
              {salons.map(s => (
                <GlassContainer key={s.id} className="p-6 flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-salon-espresso text-salon-bg rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-salon-espresso">{s.name}</h4>
                      <p className="text-sm text-salon-gold">{s.location}</p>
                      <p className="text-xs text-salon-gold/80 italic mt-1">{s.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right flex flex-col justify-center gap-1">
                    <div className="flex items-center sm:justify-end gap-2 text-salon-gold">
                      <Clock size={14} />
                      <span className="text-xs font-bold uppercase tracking-widest">{s.openingHours}</span>
                    </div>
                    <p className="text-[10px] text-salon-gold/60 uppercase tracking-tighter">{s.phone}</p>
                  </div>
                </GlassContainer>
              ))}
            </div>
          </div>

          {/* Activity Feed / Upcoming */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-salon-espresso px-2">Your Schedule</h3>
            <div className="space-y-4">
              {upcomingBookings.length > 0 ? upcomingBookings.map(b => (
                <GlassContainer key={b.id} className="p-4 border-l-4 border-l-salon-gold">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-salon-espresso">{b.service}</h4>
                    <span className="text-[10px] text-salon-gold uppercase font-bold">{b.status}</span>
                  </div>
                  <p className="text-xs text-salon-gold">{b.stylistName}</p>
                  <p className="text-[10px] font-bold text-salon-bronze mt-2 uppercase">{b.date} @ {b.time}</p>
                </GlassContainer>
              )) : (
                <div className="p-8 text-center bg-salon-cream/20 rounded-2xl border border-dashed border-salon-ivory text-salon-gold italic text-sm">
                  No upcoming appointments.
                </div>
              )}
              <StylizedButton 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/customer/book')}
              >
                Book New Session
              </StylizedButton>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export const CustomerBook = () => {
  const { staff, addBooking, user } = useSalon();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    stylistId: '',
    stylistName: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    price: 0
  });

  const services = [
    { id: 's1', name: 'Signature Cut', price: 85, duration: '60 min', desc: 'Precision cutting tailored to your features.' },
    { id: 's2', name: 'Balayage Artistry', price: 220, duration: '150 min', desc: 'Hand-painted highlights for a natural glow.' },
    { id: 's3', name: 'GlowHaat Treatment', price: 65, duration: '45 min', desc: 'Deep conditioning ritual for silk-like hair.' },
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
            {(() => {
              const selectedServiceObj = services.find(s => s.name === bookingData.service);
              if (selectedServiceObj) {
                return (
                  <GlassContainer className="p-6 bg-salon-cream/30 border-salon-gold/30 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-salon-gold/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-salon-gold mb-1">Selected Service</p>
                        <h4 className="text-xl font-serif font-bold text-salon-espresso">{selectedServiceObj.name}</h4>
                        <p className="text-sm text-salon-gold mt-1 max-w-sm">{selectedServiceObj.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-serif font-bold text-salon-espresso">${selectedServiceObj.price}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-salon-bronze mt-1">{selectedServiceObj.duration}</p>
                      </div>
                    </div>
                  </GlassContainer>
                );
              }
              return null;
            })()}

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
            <h3 className="text-2xl font-serif font-bold text-salon-espresso">Select Date & Time</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="space-y-8">
                <GlassContainer className="p-6 bg-salon-cream/30 border-salon-ivory shadow-inner">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-salon-espresso">April 2026</h4>
                    <div className="flex gap-2 text-salon-gold">
                      <button className="p-1 hover:bg-salon-cream rounded transition-colors">&lt;</button>
                      <button className="p-1 hover:bg-salon-cream rounded transition-colors">&gt;</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-[10px] uppercase font-bold text-salon-gold/70 py-1">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center">
                    <div className="py-2 text-sm text-salon-gold/30">29</div>
                    <div className="py-2 text-sm text-salon-gold/30">30</div>
                    <div className="py-2 text-sm text-salon-gold/30">31</div>
                    
                    {Array.from({length: 30}).map((_, i) => {
                      const day = i + 1;
                      const dateStr = `2026-04-${day.toString().padStart(2, '0')}`;
                      const isSelected = bookingData.date === dateStr;
                      
                      return (
                        <button
                          key={day}
                          onClick={() => setBookingData({ ...bookingData, date: dateStr })}
                          className={cn(
                            "py-2 text-sm rounded-lg font-medium transition-all",
                            isSelected 
                              ? "bg-salon-espresso text-white shadow-md" 
                              : "text-salon-espresso hover:bg-salon-cream/50"
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                    
                    <div className="py-2 text-sm text-salon-gold/30">1</div>
                    <div className="py-2 text-sm text-salon-gold/30">2</div>
                  </div>
                </GlassContainer>

                <div className="space-y-4">
                  <h4 className="text-sm uppercase tracking-widest font-bold text-salon-gold ml-1">Available Times</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setBookingData({ ...bookingData, time: t })}
                        className={cn(
                          "p-3 rounded-xl font-bold text-sm transition-all border",
                          bookingData.time === t 
                            ? "bg-salon-espresso text-white border-salon-espresso shadow-lg" 
                            : "bg-white/50 text-salon-gold border-salon-ivory hover:border-salon-gold/50"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <GlassContainer className="p-8 bg-salon-cream/30 border-salon-gold/20 h-full flex flex-col">
                  <h4 className="text-sm uppercase tracking-widest font-bold text-salon-gold mb-6">Booking Summary</h4>
                  <div className="space-y-4 mb-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-salon-gold text-sm">Service</span>
                      <span className="font-bold text-salon-espresso text-right max-w-[180px] truncate">{bookingData.service}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-salon-gold text-sm">Artisan</span>
                      <span className="font-bold text-salon-espresso">{bookingData.stylistName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-salon-gold text-sm">Date & Time</span>
                      <span className="font-bold text-salon-espresso text-right">{bookingData.date} <br/><span className="text-salon-bronze">{bookingData.time ? `${bookingData.time}` : 'Time not selected'}</span></span>
                    </div>
                    <div className="h-[1px] bg-salon-ivory/50 my-4"></div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-serif font-bold text-salon-espresso">Total</span>
                      <span className="font-serif font-bold text-salon-bronze">${bookingData.price}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <StylizedButton 
                      disabled={!bookingData.time || !bookingData.date}
                      onClick={handleComplete}
                      className="w-full py-4"
                    >
                      Confirm Experience
                    </StylizedButton>
                    <StylizedButton variant="ghost" onClick={() => setStep(2)} className="w-full text-xs">Back to Artisan</StylizedButton>
                  </div>
                </GlassContainer>
              </div>

            </div>
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
  const navigate = useNavigate();

  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="My History" userRole="Client">
      <div className="space-y-6">
        {bookings.length > 0 ? bookings.map((booking) => (
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
        )) : (
          <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-salon-cream rounded-full flex items-center justify-center mx-auto mb-6 text-salon-gold">
              <History size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-salon-espresso mb-2">No History Yet</h3>
            <p className="text-salon-gold mb-8">You haven't experienced the GlowHaat ritual yet. Ready for your first transformation?</p>
            <StylizedButton onClick={() => navigate('/customer/book')}>Book a Session</StylizedButton>
          </div>
        )}
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

export const CustomerPayments = () => {
  const { bookings, updateBookingStatus } = useSalon();
  const pendingBookings = bookings.filter(b => b.status === 'pending');

  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="Payments" userRole="Client">
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-2xl font-serif font-bold text-salon-espresso mb-6">Pending Payments</h3>
        {pendingBookings.length > 0 ? pendingBookings.map(b => (
          <GlassContainer key={b.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-salon-cream rounded-xl flex items-center justify-center text-salon-gold flex-shrink-0">
                <CreditCard size={24} />
              </div>
              <div>
                <h4 className="font-bold text-salon-espresso">{b.service}</h4>
                <p className="text-sm text-salon-gold">with {b.stylistName}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-salon-bronze mt-1">{b.date} • {b.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <p className="text-xl font-serif font-bold text-salon-espresso">${b.price}</p>
              <StylizedButton onClick={() => updateBookingStatus(b.id, 'confirmed')} size="sm">
                Pay Now
              </StylizedButton>
            </div>
          </GlassContainer>
        )) : (
          <div className="text-center py-16 bg-salon-cream/20 rounded-2xl border border-dashed border-salon-ivory">
            <div className="w-16 h-16 bg-salon-cream rounded-full flex items-center justify-center mx-auto mb-4 text-salon-gold">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-salon-espresso mb-2">All Caught Up</h3>
            <p className="text-salon-gold text-sm">You have no pending payments at the moment.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export const CustomerSubscription = () => {
  const [activeTier, setActiveTier] = useState<string | null>(null);

  const tiers = [
    {
      id: 'basic',
      name: 'Essential',
      price: 49,
      interval: 'month',
      desc: 'Perfect for regular maintenance.',
      features: ['1 Signature Cut per month', '10% off retail products', 'Priority booking']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 129,
      interval: 'month',
      desc: 'The complete GlowHaat experience.',
      features: ['2 Signature Cuts per month', '1 Color Treatment', '20% off retail products', 'VIP lounge access'],
      isPopular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 299,
      interval: 'month',
      desc: 'Unlimited luxury and care.',
      features: ['Unlimited Cuts & Styling', 'Unlimited Color Treatments', '30% off retail products', 'Complimentary refreshments']
    }
  ];

  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="Subscription Plans" userRole="Client">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-salon-espresso mb-4">Elevate Your Ritual</h2>
        <p className="text-salon-gold max-w-xl mx-auto">Choose a membership tier that fits your lifestyle. Enjoy consistent luxury, exclusive perks, and priority access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <GlassContainer 
            key={tier.id} 
            className={cn(
              "p-8 flex flex-col relative overflow-hidden transition-all duration-300",
              tier.isPopular ? "border-salon-gold shadow-lg transform md:-translate-y-4" : "border-salon-ivory",
              activeTier === tier.id ? "ring-2 ring-salon-espresso" : ""
            )}
          >
            {tier.isPopular && (
              <div className="absolute top-4 right-4">
                <span className="bg-salon-gold text-salon-espresso text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-bold text-salon-espresso mb-2">{tier.name}</h3>
              <p className="text-sm text-salon-gold min-h-[40px]">{tier.desc}</p>
            </div>
            
            <div className="mb-8">
              <span className="text-4xl font-serif font-bold text-salon-espresso">${tier.price}</span>
              <span className="text-salon-gold text-sm">/{tier.interval}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-salon-bronze flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-salon-espresso/80">{feature}</span>
                </li>
              ))}
            </ul>

            <StylizedButton 
              variant={tier.isPopular ? 'primary' : 'outline'} 
              className="w-full mt-auto"
              onClick={() => setActiveTier(tier.id)}
            >
              {activeTier === tier.id ? 'Current Plan' : 'Subscribe'}
            </StylizedButton>
          </GlassContainer>
        ))}
      </div>
    </DashboardLayout>
  );
};
