
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={cn(
            "h-[calc(100vh-4rem)] fixed left-0 top-16 z-20 transition-all duration-300 bg-background border-r", 
            sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"
          )}
        >
          <Sidebar collapsed={!sidebarOpen} />
        </div>
        
        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 pt-16",
            sidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-16"
          )}
        >
          <div className="container p-4 md:p-6 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
