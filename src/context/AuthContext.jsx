import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../data/storageKeys';
import { DEMO_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
    // Default to Resident / Citizen for immediate demo accessibility
    return DEMO_USERS[0];
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.error("Failed to persist user to localStorage", e);
    }
  }, [currentUser]);

  const login = (email, password, role) => {
    // In demo environment, match demo user or synthesize user based on role
    const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      return { success: true, user: matched };
    }
    // If not matching exact email, create user session with given role
    const fallbackUser = {
      id: `USER-${Date.now()}`,
      name: email.split('@')[0] || "Demo User",
      email,
      role: role || 'citizen',
      phone: "+91 98765 43210",
      location: "Hyderabad, Telangana"
    };
    setCurrentUser(fallbackUser);
    return { success: true, user: fallbackUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `USER-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'citizen',
      phone: userData.phone || "+91 98490 00000",
      location: userData.location || "Hyderabad",
      tankerNumber: userData.tankerNumber || null,
      tankerCapacity: userData.tankerCapacity || null
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchPersona = (roleKey) => {
    const target = DEMO_USERS.find(u => u.role === roleKey);
    if (target) {
      setCurrentUser(target);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      switchPersona,
      isAuthenticated: !!currentUser,
      isCitizen: currentUser?.role === 'citizen',
      isOperator: currentUser?.role === 'operator',
      isAdmin: currentUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

