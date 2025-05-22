
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building,
  Users,
  GraduationCap,
  Settings,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Schools',
    icon: Building,
    href: '/schools',
  },
  {
    title: 'Admins',
    icon: Users,
    href: '/admins',
  },
  {
    title: 'Teachers',
    icon: GraduationCap,
    href: '/teachers',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function Sidebar({ collapsed = false }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="h-full py-4 flex flex-col">
      <div className="flex-1 overflow-auto py-2">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || 
                             location.pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
                {!collapsed && (
                  <span className="flex-1">{item.title}</span>
                )}
                {!collapsed && isActive && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="px-3 py-2">
        {!collapsed && (
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} School Admin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
