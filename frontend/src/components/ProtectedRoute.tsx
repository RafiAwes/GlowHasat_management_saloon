import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSalon, UserRole } from '@/src/context/SalonContext';
import { Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, loading } = useSalon();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-salon-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-salon-espresso rounded-2xl flex items-center justify-center text-salon-bg mx-auto mb-4 animate-pulse shadow-xl">
            <Sparkles size={32} />
          </div>
          <p className="text-salon-gold font-serif italic tracking-widest animate-pulse">Zenith is loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Role not authorized, redirect to their default home
    const defaultRoutes: Record<string, string> = {
      owner: '/owner/dashboard',
      employee: '/employee/schedule',
      customer: '/customer/home',
      admin: '/admin/dashboard',
    };
    return <Navigate to={defaultRoutes[user.role] || '/customer/home'} replace />;
  }

  return <>{children}</>;
};
