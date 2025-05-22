
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SchoolProvider } from '@/contexts/SchoolContext';

// Components
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { SchoolsPage } from '@/pages/schools/SchoolsPage';
import { SchoolDetailsPage } from '@/pages/schools/SchoolDetailsPage';
import { SchoolSettingsPage } from '@/pages/schools/SchoolSettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="admin-ui-theme">
        <Router>
          <AuthProvider>
            <SchoolProvider>
              <Routes>
                {/* Auth routes */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Home redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Protected dashboard routes */}
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/schools" element={<SchoolsPage />} />
                  <Route path="/schools/:id" element={<SchoolDetailsPage />} />
                  <Route path="/schools/:id/settings" element={<SchoolSettingsPage />} />
                </Route>
                
                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              
              <Toaster />
            </SchoolProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
