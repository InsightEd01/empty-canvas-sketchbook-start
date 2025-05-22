
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';

export function Layout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
