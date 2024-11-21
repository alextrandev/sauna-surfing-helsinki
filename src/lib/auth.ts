import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));

// Initialize auth state from session
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    // Fetch user profile
    supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
      .then(({ data: profile }) => {
        useAuth.getState().setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.username || session.user.email!.split("@")[0],
          role: profile?.role || "user",
        });
      });
  }
});