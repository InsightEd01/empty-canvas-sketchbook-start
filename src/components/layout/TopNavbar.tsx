
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from '../auth/UserMenu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface TopNavbarProps {
  onMenuToggle: () => void;
}

export function TopNavbar({ onMenuToggle }: TopNavbarProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-30 bg-background border-b flex items-center px-4 md:px-6">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:block">
            <Button variant="ghost" size="icon" onClick={onMenuToggle}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="font-bold text-lg md:text-xl">School Master Admin</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
