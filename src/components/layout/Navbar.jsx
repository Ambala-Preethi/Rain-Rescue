import React from 'react';
import { 
  Droplet, 
  User, 
  LogOut, 
  Shield, 
  Truck, 
  MapPin, 
  ChevronDown,
  Sparkles,
  Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NotificationDropdown } from '../common/NotificationDropdown';

export const Navbar = ({ activePage, setActivePage, toggleSidebar }) => {
  const { currentUser, logout, switchPersona, isCitizen, isOperator, isAdmin } = useAuth();

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--slate-700)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-md)'
          }}
          aria-label="Toggle navigation"
        >
          <Menu size={22} />
        </button>

        <div className="nav-brand" onClick={() => setActivePage('home')}>
          <div className="brand-icon">
            <Droplet size={24} fill="white" />
          </div>
          <div>
            <span style={{ color: 'var(--primary-700)' }}>Rain</span>
            <span style={{ color: 'var(--secondary-600)' }}>Rescue</span>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--slate-400)', letterSpacing: '0.04em', lineHeight: 1 }}>
              HYDERABAD RECHARGE
            </div>
          </div>
        </div>
      </div>

      <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => setActivePage('home')}
        >
          Home
        </button>
        <button
          className={`nav-link ${activePage === 'map' ? 'active' : ''}`}
          onClick={() => setActivePage('map')}
        >
          <MapPin size={16} />
          Live Map
        </button>
        <button
          className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
          onClick={() => setActivePage('about')}
        >
          About
        </button>

        {/* Quick Demo Persona Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--slate-100)',
          borderRadius: 'var(--radius-full)',
          padding: '3px 4px',
          border: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => switchPersona('citizen')}
            style={{
              border: 'none',
              background: isCitizen ? '#ffffff' : 'transparent',
              color: isCitizen ? 'var(--primary-700)' : 'var(--slate-600)',
              fontWeight: isCitizen ? 700 : 500,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              boxShadow: isCitizen ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'var(--transition-fast)'
            }}
          >
            Citizen
          </button>
          <button
            onClick={() => switchPersona('operator')}
            style={{
              border: 'none',
              background: isOperator ? '#ffffff' : 'transparent',
              color: isOperator ? 'var(--primary-700)' : 'var(--slate-600)',
              fontWeight: isOperator ? 700 : 500,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              boxShadow: isOperator ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'var(--transition-fast)'
            }}
          >
            Tanker Operator
          </button>
          <button
            onClick={() => switchPersona('admin')}
            style={{
              border: 'none',
              background: isAdmin ? '#ffffff' : 'transparent',
              color: isAdmin ? 'var(--primary-700)' : 'var(--slate-600)',
              fontWeight: isAdmin ? 700 : 500,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              boxShadow: isAdmin ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'var(--transition-fast)'
            }}
          >
            GHMC Admin
          </button>
        </div>

        {/* Notifications */}
        <NotificationDropdown />

        {/* User profile / login button */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'white',
              border: '1px solid var(--border-light)',
              padding: '4px 10px 4px 6px',
              borderRadius: 'var(--radius-full)'
            }}>
              <img
                src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                alt={currentUser.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-800)' }}>
                  {currentUser.name.split(' ')[0]}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--slate-500)', textTransform: 'capitalize' }}>
                  {currentUser.role}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                setActivePage('login');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--slate-400)',
                cursor: 'pointer',
                padding: '6px'
              }}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActivePage('login')}
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

