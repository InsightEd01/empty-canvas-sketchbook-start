
import type { User, Session } from '@supabase/supabase-js';

export type { User, Session };

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isMasterAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
