import React, { useState } from 'react';
import { 
  Calendar, 
  Scissors, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Star,
  MessageSquare
} from 'lucide-react';
import { DashboardLayout } from '@/src/components/layouts/DashboardLayout';
import { GlassContainer, StylizedButton } from '@/src/components/ui/Shared';
import { useSalon } from '@/src/context/SalonContext';
import { cn } from '@/src/lib/utils';
import { EMPLOYEE_NAV } from '@/src/constants';

export const EmployeeSchedule = () => {
  const { bookings, updateBookingStatus } = useSalon();
  const [selectedDate, setSelectedDate] = useState('2026-04-15');

  const todayBookings = bookings.filter(b => b.date === selectedDate);

  return (
    <DashboardLayout navItems={EMPLOYEE_NAV} title="My Schedule" userRole="Senior Stylist">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Date Selector */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[14, 15, 16, 17, 18, 19, 20].map((day) => {
              const date = `2026-04-${day}`;
              const isActive = selectedDate === date;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "flex flex-col items-center min-w-[70px] p-4 rounded-2xl transition-all duration-300",
                    isActive ? "bg-salon-espresso text-white shadow-xl" : "bg-white/50 text-salon-gold hover:bg-salon-cream"
                  )}
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70">Apr</span>
                  <span className="text-xl font-serif font-bold">{day}</span>
                </button>
              );
            })}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-salon-espresso px-2">Appointments for {selectedDate}</h3>
            {todayBookings.length > 0 ? (
              todayBookings.map((booking) => (
                <GlassContainer key={booking.id} className="p-6 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-lg transition-all">
                  <div className="md:w-24 text-center md:border-r border-salon-ivory/50">
                    <p className="text-xl font-serif font-bold text-salon-espresso">{booking.time}</p>
                    <p className="text-[10px] uppercase text-salon-gold font-bold">Confirmed</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-serif font-bold text-salon-espresso">{booking.service}</h4>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase",
                        booking.status === 'confirmed' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                      )}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-salon-gold flex items-center gap-2">
                      <span className="font-semibold text-salon-bronze">{booking.clientName}</span>
                      <span className="w-1 h-1 bg-salon-ivory rounded-full"></span>
                      <span>60 mins</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {booking.status === 'pending' && (
                      <StylizedButton 
                        variant="primary" 
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      >
                        Confirm
                      </StylizedButton>
                    )}
                    <StylizedButton variant="outline" size="sm">View Notes</StylizedButton>
                    <button className="p-2 text-salon-gold hover:bg-salon-cream rounded-full transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </GlassContainer>
              ))
            ) : (
              <div className="p-12 text-center text-salon-gold italic bg-white/30 rounded-3xl border border-dashed border-salon-ivory">
                No appointments scheduled for this date.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <GlassContainer className="p-8 text-center bg-salon-espresso text-salon-bg">
            <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center text-salon-gold">
              <Star size={32} fill="currentColor" />
            </div>
            <h4 className="text-2xl font-serif font-bold">4.9 Rating</h4>
            <p className="text-xs opacity-70 mb-6">Master of Color Artistry</p>
            <StylizedButton variant="secondary" className="w-full">View Reviews</StylizedButton>
          </GlassContainer>

          <GlassContainer className="p-6">
            <h4 className="text-sm font-serif font-bold text-salon-espresso mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-salon-cream text-sm text-salon-gold transition-colors">
                <span>Request Time Off</span>
                <Clock size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-salon-cream text-sm text-salon-gold transition-colors">
                <span>Contact Manager</span>
                <MessageSquare size={16} />
              </button>
            </div>
          </GlassContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export const EmployeeServices = () => {
  const services = [
    { name: 'Signature Balayage', duration: '120 min', price: 210, category: 'Color' },
    { name: 'Precision Cut & Style', duration: '60 min', price: 85, category: 'Cutting' },
    { name: 'Hydra-Gloss Treatment', duration: '45 min', price: 65, category: 'Treatment' },
    { name: 'Event Styling', duration: '90 min', price: 120, category: 'Styling' },
  ];

  return (
    <DashboardLayout navItems={EMPLOYEE_NAV} title="My Services" userRole="Senior Stylist">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-salon-espresso">Service Portfolio</h3>
        <StylizedButton variant="primary">Add Service</StylizedButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <GlassContainer key={service.name} className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-salon-cream rounded-xl flex items-center justify-center text-salon-bronze">
                <Scissors size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold text-salon-espresso">{service.name}</h4>
                <p className="text-xs text-salon-gold uppercase tracking-widest font-bold">{service.category} • {service.duration}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-serif font-bold text-salon-bronze">${service.price}</p>
              <button className="text-[10px] uppercase tracking-widest text-salon-gold font-bold hover:text-salon-espresso transition-colors">Edit</button>
            </div>
          </GlassContainer>
        ))}
      </div>
    </DashboardLayout>
  );
};
