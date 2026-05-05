import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SalonProvider } from './context/SalonContext';
import { LoginPage, RegisterPage } from './components/pages/Auth';

// Owner Pages
import { 
  OwnerDashboard, 
  OwnerAnalytics,
  OwnerStaff, 
  OwnerInventory,
  OwnerPromotions,
  OwnerBookings,
  OwnerServices
} from './components/pages/owner/OwnerPages';

// Employee Pages
import { 
  EmployeeSchedule, 
  EmployeeServices 
} from './components/pages/employee/EmployeePages';

// Customer Pages
import { 
  CustomerHome,
  CustomerBook, 
  CustomerHistory, 
  CustomerLoyalty,
  CustomerPayments,
  CustomerSubscription
} from './components/pages/customer/CustomerPages';

// Admin Pages
import { 
  AdminDashboard, 
  AdminSalons,
  AdminUsers
} from './components/pages/admin/AdminPages';
import { SettingsPage } from './components/pages/Settings';

import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <SalonProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Owner Panel */}
          <Route path="/owner/dashboard" element={<ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>} />
          <Route path="/owner/analytics" element={<ProtectedRoute allowedRoles={['owner']}><OwnerAnalytics /></ProtectedRoute>} />
          <Route path="/owner/staff" element={<ProtectedRoute allowedRoles={['owner']}><OwnerStaff /></ProtectedRoute>} />
          <Route path="/owner/bookings" element={<ProtectedRoute allowedRoles={['owner']}><OwnerBookings /></ProtectedRoute>} />
          <Route path="/owner/services" element={<ProtectedRoute allowedRoles={['owner']}><OwnerServices /></ProtectedRoute>} />
          <Route path="/owner/inventory" element={<ProtectedRoute allowedRoles={['owner']}><OwnerInventory /></ProtectedRoute>} />
          <Route path="/owner/promotions" element={<ProtectedRoute allowedRoles={['owner']}><OwnerPromotions /></ProtectedRoute>} />

          {/* Employee Panel */}
          <Route path="/employee/schedule" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeSchedule /></ProtectedRoute>} />
          <Route path="/employee/services" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeServices /></ProtectedRoute>} />

          {/* Customer Panel */}
          <Route path="/customer/home" element={<ProtectedRoute allowedRoles={['customer']}><CustomerHome /></ProtectedRoute>} />
          <Route path="/customer/book" element={<ProtectedRoute allowedRoles={['customer']}><CustomerBook /></ProtectedRoute>} />
          <Route path="/customer/history" element={<ProtectedRoute allowedRoles={['customer']}><CustomerHistory /></ProtectedRoute>} />
          <Route path="/customer/loyalty" element={<ProtectedRoute allowedRoles={['customer']}><CustomerLoyalty /></ProtectedRoute>} />
          <Route path="/customer/payments" element={<ProtectedRoute allowedRoles={['customer']}><CustomerPayments /></ProtectedRoute>} />
          <Route path="/customer/subscription" element={<ProtectedRoute allowedRoles={['customer']}><CustomerSubscription /></ProtectedRoute>} />

          {/* Admin Panel */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/salons" element={<ProtectedRoute allowedRoles={['admin']}><AdminSalons /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />

          {/* Settings */}
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </SalonProvider>
  );
}
