import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../data/storageKeys';
import { INITIAL_NOTIFICATIONS } from '../data/mockData';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      timestamp: 'Just now',
      title,
      message,
      type,
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Also trigger temporary toast
    const toastId = `TOAST-${Date.now()}`;
    setToasts(prev => [...prev, { id: toastId, title, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 4500);
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      toasts,
      addNotification,
      clearNotification,
      markAllAsRead,
      unreadCount: notifications.filter(n => !n.read).length
    }}>
      {children}
      {/* Toast container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none'
      }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              background: toast.type === 'success' ? '#065f46' : toast.type === 'danger' ? '#991b1b' : '#0369a1',
              color: 'white',
              padding: '12px 18px',
              borderRadius: '10px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
              minWidth: '280px',
              maxWidth: '380px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              animation: 'fadeIn 0.25s ease'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{toast.title}</div>
            <div style={{ fontSize: '0.825rem', opacity: 0.9 }}>{toast.message}</div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

