import React, { useState } from 'react';
import { Droplet, User, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const RegisterPage = ({ setActivePage }) => {
  const { register } = useAuth();
  const { addTanker } = useData();

  const [role, setRole] = useState('citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Tolichowki, Hyderabad');
  const [password, setPassword] = useState('');

  // Operator-specific
  const [tankerNumber, setTankerNumber] = useState('');
  const [tankerCapacity, setTankerCapacity] = useState('10000');
  const [tankMaterial, setTankMaterial] = useState('Stainless Steel 304 (Potable Grade)');

  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const res = register({
      name,
      email,
      phone,
      location,
      role,
      tankerNumber: role === 'operator' ? tankerNumber : null,
      tankerCapacity: role === 'operator' ? Number(tankerCapacity) : null
    });

    if (role === 'operator' && tankerNumber) {
      addTanker({
        registrationNumber: tankerNumber,
        operatorName: name,
        operatorPhone: phone,
        capacityLitres: Number(tankerCapacity),
        currentLocationName: location,
        tankMaterial
      });
    }

    if (res.success) {
      setSuccessMsg('Account registered successfully! Redirecting...');
      setTimeout(() => {
        if (role === 'operator') setActivePage('operator-dashboard');
        else setActivePage('citizen-dashboard');
      }, 800);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '620px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Join the RainRescue Network
          </h2>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginTop: '4px' }}>
            Help Hyderabad harvest every drop of excess rainwater
          </p>
        </div>

        {/* Role Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            onClick={() => setRole('citizen')}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${role === 'citizen' ? 'var(--primary-600)' : 'var(--border-light)'}`,
              background: role === 'citizen' ? 'var(--primary-50)' : 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} />
            </div>
            <strong style={{ fontSize: '0.95rem', color: 'var(--slate-900)' }}>Resident / Citizen</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textAlign: 'center' }}>Report waterlogging & view recharge impact</span>
          </div>

          <div
            onClick={() => setRole('operator')}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${role === 'operator' ? 'var(--secondary-600)' : 'var(--border-light)'}`,
              background: role === 'operator' ? 'var(--secondary-50)' : 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary-100)', color: 'var(--secondary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={20} />
            </div>
            <strong style={{ fontSize: '0.95rem', color: 'var(--slate-900)' }}>Water Tanker Operator</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textAlign: 'center' }}>Collect stormwater & deliver to recharge pits</span>
          </div>
        </div>

        {successMsg && (
          <div style={{ padding: '10px', background: 'var(--secondary-100)', color: 'var(--secondary-800)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="e.g., K. Suresh Reddy"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="+91 98480 12345"
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="suresh@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hyderabad Area / Locality</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
                placeholder="e.g. Gachibowli, Kukatpally"
                required
              />
            </div>
          </div>

          {role === 'operator' && (
            <div style={{ background: 'var(--secondary-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--secondary-200)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary-800)', marginBottom: '8px' }}>
                Water Tanker Fleet Details:
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Tanker Registration Number</label>
                  <input
                    type="text"
                    value={tankerNumber}
                    onChange={(e) => setTankerNumber(e.target.value)}
                    className="form-control"
                    placeholder="TS 09 UA 1234"
                    required={role === 'operator'}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Capacity (Litres)</label>
                  <select
                    value={tankerCapacity}
                    onChange={(e) => setTankerCapacity(e.target.value)}
                    className="form-select"
                  >
                    <option value="5000">5,000 Litres (Mini)</option>
                    <option value="8000">8,000 Litres (Medium)</option>
                    <option value="10000">10,000 Litres (Standard)</option>
                    <option value="12000">12,000 Litres (Heavy)</option>
                    <option value="20000">20,000 Litres (Multi-Chamber)</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Internal Tank Lining</label>
                <input
                  type="text"
                  value={tankMaterial}
                  onChange={(e) => setTankMaterial(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          )}

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

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', fontWeight: 700 }}
          >
            Complete Registration
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--slate-500)' }}>
          Already have an account?{' '}
          <button
            onClick={() => setActivePage('login')}
            style={{ color: 'var(--primary-600)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};

