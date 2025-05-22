
import type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  email: string;
}

export interface Session extends SupabaseSession {
  expires_at: number;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isMasterAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
