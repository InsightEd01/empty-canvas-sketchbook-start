
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SchoolProvider } from '@/contexts/SchoolContext';
import { Layout } from '@/components/layout/Layout';
import { SchoolsPage } from '@/pages/schools/SchoolsPage';
import { SchoolDetailsPage } from '@/pages/schools/SchoolDetailsPage';
import { SchoolSettingsPage } from '@/pages/schools/SchoolSettingsPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingOverlay } from '@/components/ui/loading';

import './App.css';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isMasterAdmin } = useAuth();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!user || !isMasterAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="admin-ui-theme">
        <Router>
          <AuthProvider>
            <SchoolProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/schools" element={<SchoolsPage />} />
                  <Route path="/schools/:id" element={<SchoolDetailsPage />} />
                  <Route path="/schools/:id/settings" element={<SchoolSettingsPage />} />
                </Route>
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
