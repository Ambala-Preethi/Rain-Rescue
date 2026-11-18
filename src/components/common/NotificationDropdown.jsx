import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, Droplets, Info } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAllAsRead, clearNotification } = useNotifications();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '8px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--slate-700)'
        }}
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'var(--red-500)',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '46px',
          width: '360px',
          background: 'white',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-light)',
          zIndex: 1100,
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--slate-50)'
          }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-900)' }}>
              Notifications ({notifications.length})
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.78rem',
                  color: 'var(--primary-600)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--slate-400)', fontSize: '0.85rem' }}>
                No notifications yet.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--slate-100)',
                    background: n.read ? 'white' : 'var(--primary-50)',
                    display: 'flex',
                    gap: '12px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: n.type === 'success' ? 'var(--secondary-100)' : 'var(--primary-100)',
                    color: n.type === 'success' ? 'var(--secondary-700)' : 'var(--primary-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Droplets size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--slate-900)' }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>{n.timestamp}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '2px', lineHeight: 1.35 }}>
                      {n.message}
                    </p>
                  </div>
                  <button
                    onClick={() => clearNotification(n.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--slate-300)',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                    title="Dismiss"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

