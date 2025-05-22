import { createContext, useContext, useState, useEffect } from 'react';
import type { User, Session } from './AuthContext.types';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isMasterAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMasterAdmin, setIsMasterAdmin] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();

      setUser(session?.user || null);
      setSession(session || null);

      if (session?.user) {
        const { data, error } = await supabase
          .from('master_admins')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        setIsMasterAdmin(!!data);
      } else {
        setIsMasterAdmin(false);
      }
      setIsLoading(false);
    };

    loadSession();

    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setSession(session || null);
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Login failed:', error.message);
      setIsLoading(false);
      throw error;
    }

    setUser(data.user);
    setSession(data.session);

    const { data: adminData, error: adminError } = await supabase
      .from('master_admins')
      .select('*')
      .eq('user_id', data.user?.id)
      .single();

    setIsMasterAdmin(!!adminData);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error.message);
    }
    setUser(null);
    setSession(null);
    setIsMasterAdmin(false);
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isMasterAdmin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
