import React, { createContext, useState, useContext, useEffect, useLayoutEffect } from 'react';
import { getData, storeData, removeData } from '../utils/storage';
import { AuthError, LoginSchema } from '~/types/auth';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await getData('authToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };



  const login = async (username: string, password: string) => {
    try {
     


        //TODO : Added Validation with Zod
              const validatedCredentials = LoginSchema.safeParse({ username, password });

              if (!validatedCredentials.success) {
                throw new AuthError(
                  'Validation failed',
                  'VALIDATION_ERROR',
                  validatedCredentials.error.flatten().fieldErrors
                );
              }

      if (username === 'user' && password === 'password') {
        await storeData('authToken', 'dummy-token');
        setIsAuthenticated(true);
      } else {
               throw new AuthError('Invalid credentials', 'INVALID_CREDENTIALS');

      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };



  const logout = async () => {
    try {
      await removeData('authToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };



  useLayoutEffect(() => {
    checkAuth();
  }, []);


  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
