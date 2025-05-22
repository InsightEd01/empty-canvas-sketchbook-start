
import { createContext, useContext, useState, useEffect } from 'react';
import type { User, Session, AuthContextType } from './AuthContext.types';
import { supabase } from '@/integrations/supabase/client';

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
        // Check if user exists in users table with master_admin role
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .eq('role', 'master_admin')
          .single();

        setIsMasterAdmin(!!data);
      } else {
        setIsMasterAdmin(false);
      }
      setIsLoading(false);
    };

    loadSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setSession(session || null);
      setIsLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
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

    // Check if user exists in users table with master_admin role
    const { data: adminData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user?.id)
      .eq('role', 'master_admin')
      .single();

    setIsMasterAdmin(!!adminData);
    setIsLoading(false);
  };

  const signOut = async () => {
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
    signIn,
    signOut,
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
