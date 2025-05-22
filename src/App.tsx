
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';

// Components
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/layout/Layout';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { SchoolsPage } from '@/pages/schools/SchoolsPage';
import { SchoolDetailsPage } from '@/pages/schools/SchoolDetailsPage';
import { SchoolAdminsPage } from '@/pages/schools/SchoolAdminsPage';
import { SchoolFormPage } from '@/pages/schools/SchoolFormPage';
import { AdminsPage } from '@/pages/admins/AdminsPage';
import { TeachersPage } from '@/pages/teachers/TeachersPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="admin-ui-theme">
        <Router>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route element={<PublicLayout />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
              
              {/* Home redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Protected dashboard routes */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/schools" element={<SchoolsPage />} />
                <Route path="/schools/new" element={<SchoolFormPage />} />
                <Route path="/schools/:id" element={<SchoolDetailsPage />} />
                <Route path="/schools/:id/admins" element={<SchoolAdminsPage />} />
                <Route path="/schools/:id/edit" element={<SchoolFormPage />} />
                <Route path="/admins" element={<AdminsPage />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              
              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            
            <Toaster />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
