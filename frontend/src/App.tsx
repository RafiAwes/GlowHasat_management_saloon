import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SalonProvider } from './context/SalonContext';
import { LoginPage } from './components/pages/Auth';

// Owner Pages
import { 
  OwnerDashboard, 
  OwnerAnalytics,
  OwnerStaff, 
  OwnerInventory 
} from './components/pages/owner/OwnerPages';

// Employee Pages
import { 
  EmployeeSchedule, 
  EmployeeServices 
} from './components/pages/employee/EmployeePages';

// Customer Pages
import { 
  CustomerBook, 
  CustomerHistory, 
  CustomerLoyalty 
} from './components/pages/customer/CustomerPages';

// Admin Pages
import { 
  AdminDashboard, 
  AdminSalons,
  AdminUsers
} from './components/pages/admin/AdminPages';
import { SettingsPage } from './components/pages/Settings';

export default function App() {
  return (
    <SalonProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />

          {/* Owner Panel */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/analytics" element={<OwnerAnalytics />} />
          <Route path="/owner/staff" element={<OwnerStaff />} />
          <Route path="/owner/inventory" element={<OwnerInventory />} />

          {/* Employee Panel */}
          <Route path="/employee/schedule" element={<EmployeeSchedule />} />
          <Route path="/employee/services" element={<EmployeeServices />} />

          {/* Customer Panel */}
          <Route path="/customer/book" element={<CustomerBook />} />
          <Route path="/customer/history" element={<CustomerHistory />} />
          <Route path="/customer/loyalty" element={<CustomerLoyalty />} />

          {/* Admin Panel */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/salons" element={<AdminSalons />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          {/* Settings */}
          <Route path="/settings" element={<SettingsPage />} />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </SalonProvider>
  );
}
