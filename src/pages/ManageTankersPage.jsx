import React, { useState } from 'react';
import { Truck, Plus, ShieldCheck, CheckCircle2, AlertCircle, Phone, MapPin, Power } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatLitres } from '../utils/formatters';

export const ManageTankersPage = () => {
  const { tankers, addTanker, toggleTankerAvailability } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [operatorName, setOperatorName] = useState('');
  const [operatorPhone, setOperatorPhone] = useState('');
  const [capacityLitres, setCapacityLitres] = useState('12000');
  const [currentLocationName, setCurrentLocationName] = useState('Banjara Hills Circle');
  const [tankMaterial, setTankMaterial] = useState('Stainless Steel 304 (Potable Grade)');

  const handleAddTankerSubmit = (e) => {
    e.preventDefault();
    if (!registrationNumber || !operatorName) return;

    addTanker({
      registrationNumber,
      operatorName,
      operatorPhone,
      capacityLitres: Number(capacityLitres),
      currentLocationName,
      tankMaterial,
      lat: 17.4125,
      lng: 78.4350
    });

    setIsAddModalOpen(false);
    setRegistrationNumber('');
    setOperatorName('');
    setOperatorPhone('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Manage Water Tanker Fleet
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
            Registered, audited, and GPS-tracked commercial and municipal water tankers across Hyderabad.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} /> Register New Tanker
        </button>
      </div>

      {/* Fleet Overview Cards */}
      <div className="grid-3">
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700 }}>TOTAL ENROLLED FLEET</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: '4px' }}>
            {tankers.length} Tankers
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>100% verified for potable / clean water transport</div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700 }}>AVAILABLE FOR PICKUP</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary-700)', marginTop: '4px' }}>
            {tankers.filter(t => t.availability === 'available').length} Units
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Stationed across GHMC zones</div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700 }}>CUMULATIVE FLEET CAPACITY</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b45309', marginTop: '4px' }}>
            {formatLitres(tankers.reduce((s, t) => s + (t.capacityLitres || 0), 0))}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Single-trip recovery capacity</div>
        </div>
      </div>

      {/* Tankers Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Truck size={20} color="var(--primary-600)" />
            Active Fleet Registry
          </h3>
          <span className="badge badge-success">GHMC Certified Fleet</span>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Registration No.</th>
                <th>Operator Name</th>
                <th>Capacity</th>
                <th>Current Station</th>
                <th>Lining / Cleanliness</th>
                <th>Trips Done</th>
                <th>Water Recovered</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tankers.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--slate-900)' }}>{t.registrationNumber}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--secondary-700)', fontWeight: 600 }}>✓ GHMC Verified</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{t.operatorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{t.operatorPhone}</div>
                  </td>
                  <td>
                    <strong>{(t.capacityLitres || 0).toLocaleString()} L</strong>
                  </td>
                  <td>{t.currentLocationName}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>{t.tankMaterial}</td>
                  <td>{t.tripsCompleted || 0}</td>
                  <td>
                    <strong style={{ color: 'var(--secondary-700)' }}>
                      {formatLitres(t.totalWaterRecoveredLitres || 0)}
                    </strong>
                  </td>
                  <td>
                    <StatusBadge status={t.availability} />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => toggleTankerAvailability(t.id)}
                      style={{ fontSize: '0.75rem' }}
                    >
                      <Power size={12} /> Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tanker Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register & Verify New Water Tanker">
        <form onSubmit={handleAddTankerSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Vehicle Registration Number *</label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="TS 09 UA 9999"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tanker Capacity (Litres) *</label>
              <select
                value={capacityLitres}
                onChange={(e) => setCapacityLitres(e.target.value)}
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

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Operator / Driver Name *</label>
              <input
                type="text"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                placeholder="e.g. B. Narsimha"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone Number *</label>
              <input
                type="tel"
                value={operatorPhone}
                onChange={(e) => setOperatorPhone(e.target.value)}
                placeholder="+91 98480 98765"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Home Depot / Parking Locality</label>
            <input
              type="text"
              value={currentLocationName}
              onChange={(e) => setCurrentLocationName(e.target.value)}
              placeholder="e.g. Kukatpally Depot"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tank Material & Coating Standard</label>
            <input
              type="text"
              value={tankMaterial}
              onChange={(e) => setTankMaterial(e.target.value)}
              className="form-control"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register & Authorize Tanker
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

