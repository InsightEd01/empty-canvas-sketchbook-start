
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, isMasterAdmin } = useAuth();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!user || !isMasterAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
