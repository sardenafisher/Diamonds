'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, isSupabaseConfigured } from './supabase/client';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  role: 'Owner' | 'Admin' | 'Manager' | 'Member';
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'Owner' | 'Admin' | 'Manager' | 'Member';
}

interface AuthContextType {
  user: UserProfile | null;
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  isLoading: boolean;
  isConfigured: boolean;
  switchWorkspace: (workspaceId: string) => void;
  signIn: (email: string, password?: string) => Promise<{ error?: string }>;
  signUp: (email: string, password?: string, fullName?: string, companyName?: string) => Promise<{ error?: string }>;
  demoLogin: (role?: 'Owner' | 'Manager') => void;
  signOut: () => Promise<void>;
}

const DEFAULT_WORKSPACES: Workspace[] = [
  {
    id: 'ws-apex',
    name: 'Apex Global Operations',
    slug: 'apex-operations',
    plan: 'Professional',
    role: 'Owner',
  },
  {
    id: 'ws-horizon',
    name: 'Horizon Luxury Retreats',
    slug: 'horizon-retreats',
    plan: 'Enterprise',
    role: 'Admin',
  },
];

const DEFAULT_USER: UserProfile = {
  id: 'usr-marcus-vance',
  email: 'marcus.vance@apexoperations.io',
  fullName: 'Marcus Vance',
  role: 'Owner',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('diamonds_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_USER;
        }
      }
    }
    return DEFAULT_USER;
  });

  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('diamonds_workspaces');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_WORKSPACES;
        }
      }
    }
    return DEFAULT_WORKSPACES;
  });

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(() => {
    if (typeof window !== 'undefined') {
      const savedId = localStorage.getItem('diamonds_current_workspace_id');
      if (savedId) {
        const found = workspaces.find((w) => w.id === savedId);
        if (found) return found;
      }
    }
    return DEFAULT_WORKSPACES[0];
  });

  const [isLoading, setIsLoading] = useState(false);
  const isConfigured = isSupabaseConfigured();

  // Synchronize with Supabase Auth if real keys exist
  useEffect(() => {
    if (!isConfigured) return;

    try {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            role: 'Owner',
          };
          setUser(profile);
          localStorage.setItem('diamonds_user', JSON.stringify(profile));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            role: 'Owner',
          };
          setUser(profile);
          localStorage.setItem('diamonds_user', JSON.stringify(profile));
        } else {
          setUser(null);
          localStorage.removeItem('diamonds_user');
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (e) {
      console.warn('Supabase auth listener initialization error:', e);
    }
  }, [isConfigured]);

  const switchWorkspace = (workspaceId: string) => {
    const ws = workspaces.find((w) => w.id === workspaceId);
    if (ws) {
      setCurrentWorkspace(ws);
      if (typeof window !== 'undefined') {
        localStorage.setItem('diamonds_current_workspace_id', ws.id);
      }
    }
  };

  const signIn = async (email: string, password?: string) => {
    setIsLoading(true);
    if (isConfigured && password) {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setIsLoading(false);
          return { error: error.message };
        }
      } catch (e: any) {
        setIsLoading(false);
        return { error: e.message || 'Authentication error' };
      }
    }

    // Local profile instantiation
    const loggedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      role: 'Owner',
    };
    setUser(loggedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('diamonds_user', JSON.stringify(loggedUser));
    }
    setIsLoading(false);
    return {};
  };

  const signUp = async (email: string, password?: string, fullName?: string, companyName?: string) => {
    setIsLoading(true);
    if (isConfigured && password) {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, company_name: companyName },
          },
        });
        if (error) {
          setIsLoading(false);
          return { error: error.message };
        }
      } catch (e: any) {
        setIsLoading(false);
        return { error: e.message || 'Registration error' };
      }
    }

    const newCompany = companyName || 'My Business Workspace';
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name: newCompany,
      slug: newCompany.toLowerCase().replace(/\s+/g, '-'),
      plan: 'Professional',
      role: 'Owner',
    };

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: fullName || email.split('@')[0],
      role: 'Owner',
    };

    setUser(newUser);
    const updatedWs = [newWs, ...workspaces];
    setWorkspaces(updatedWs);
    setCurrentWorkspace(newWs);

    if (typeof window !== 'undefined') {
      localStorage.setItem('diamonds_user', JSON.stringify(newUser));
      localStorage.setItem('diamonds_workspaces', JSON.stringify(updatedWs));
      localStorage.setItem('diamonds_current_workspace_id', newWs.id);
    }

    setIsLoading(false);
    return {};
  };

  const demoLogin = (role: 'Owner' | 'Manager' = 'Owner') => {
    const demoUser: UserProfile = role === 'Owner' ? DEFAULT_USER : {
      id: 'usr-elena-vance',
      email: 'elena.vance@horizonretreats.com',
      fullName: 'Elena Vance',
      role: 'Manager',
    };
    setUser(demoUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('diamonds_user', JSON.stringify(demoUser));
    }
  };

  const signOut = async () => {
    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out warning:', e);
      }
    }
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('diamonds_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspaces,
        currentWorkspace,
        isLoading,
        isConfigured,
        switchWorkspace,
        signIn,
        signUp,
        demoLogin,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
