import React, { useState } from 'react';
import { Droplet, Lock, Mail, User, Shield, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../data/mockData';

export const LoginPage = ({ setActivePage }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('citizen@rainrescue.in');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter an email address.');
      return;
    }
    const res = login(email, password, selectedRole);
    if (res.success) {
      if (res.user.role === 'admin') setActivePage('admin-dashboard');
      else if (res.user.role === 'operator') setActivePage('operator-dashboard');
      else setActivePage('citizen-dashboard');
    }
  };

  const handleQuickLogin = (demoUser) => {
    setEmail(demoUser.email);
    setSelectedRole(demoUser.role);
    const res = login(demoUser.email, 'password123', demoUser.role);
    if (res.success) {
      if (demoUser.role === 'admin') setActivePage('admin-dashboard');
      else if (demoUser.role === 'operator') setActivePage('operator-dashboard');
      else setActivePage('citizen-dashboard');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '520px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary-600), var(--secondary-600))',
            color: 'white',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <Droplet size={30} fill="white" />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Welcome to RainRescue
          </h2>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginTop: '4px' }}>
            Sign in to access your role-specific flood recovery portal
          </p>
        </div>

        {/* 1-Click Demo Personas Box */}
        <div style={{
          background: 'var(--primary-50)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          border: '1px solid var(--primary-200)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Sparkles size={14} /> Quick Demo Access (1-Click Login):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_USERS[0])}
              style={{
                padding: '6px 4px',
                borderRadius: '6px',
                border: '1px solid var(--primary-300)',
                background: 'white',
                color: 'var(--primary-800)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              👤 Citizen
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_USERS[1])}
              style={{
                padding: '6px 4px',
                borderRadius: '6px',
                border: '1px solid var(--secondary-300)',
                background: 'white',
                color: 'var(--secondary-800)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🚚 Operator
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_USERS[2])}
              style={{
                padding: '6px 4px',
                borderRadius: '6px',
                border: '1px solid #fcd34d',
                background: 'white',
                color: '#b45309',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🏛️ GHMC Admin
            </button>
          </div>
        </div>

        {errorMsg && (
          <div style={{ padding: '10px', background: 'var(--red-50)', color: 'var(--red-600)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSelectedRole('citizen')}
                style={{
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedRole === 'citizen' ? 'var(--primary-600)' : 'var(--border-light)'}`,
                  background: selectedRole === 'citizen' ? 'var(--primary-50)' : 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Citizen
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('operator')}
                style={{
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedRole === 'operator' ? 'var(--primary-600)' : 'var(--border-light)'}`,
                  background: selectedRole === 'operator' ? 'var(--primary-50)' : 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Tanker
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                style={{
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedRole === 'admin' ? 'var(--primary-600)' : 'var(--border-light)'}`,
                  background: selectedRole === 'admin' ? 'var(--primary-50)' : 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontWeight: 700 }}>
            Sign In to RainRescue
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--slate-500)' }}>
          Don't have an account?{' '}
          <button
            onClick={() => setActivePage('register')}
            style={{ color: 'var(--primary-600)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

