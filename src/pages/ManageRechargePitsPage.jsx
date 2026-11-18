import React, { useState } from 'react';
import { Droplets, Plus, ShieldCheck, MapPin, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Modal } from '../components/common/Modal';
import { formatLitres } from '../utils/formatters';

export const ManageRechargePitsPage = () => {
  const { rechargePits, addRechargePit } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [teluguName, setTeluguName] = useState('రీఛార్జ్ కేంద్రం');
  const [locality, setLocality] = useState('Jubilee Hills');
  const [dailyCapacityLitres, setDailyCapacityLitres] = useState('100000');
  const [soilType, setSoilType] = useState('Fractured Weathered Granite & Red Sandy Loam');
  const [filterSystem, setFilterSystem] = useState('4-Stage: Coarse Gravel, Pebbles, Charcoal, River Sand');
  const [contactPerson, setContactPerson] = useState('Hydrological Executive Engineer');

  const handleAddPitSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    addRechargePit({
      name,
      teluguName,
      locality,
      dailyCapacityLitres: Number(dailyCapacityLitres),
      soilType,
      filterSystem,
      contactPerson,
      lat: 17.4250,
      lng: 78.4400
    });

    setIsAddModalOpen(false);
    setName('');
  };

  const totalCapacity = rechargePits.reduce((s, p) => s + (p.dailyCapacityLitres || 0), 0);
  const totalWaterInfused = rechargePits.reduce((s, p) => s + (p.currentStoredLitres || 0), 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Approved Recharge Pits & Structures
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
            Registered groundwater recharge wells, percolation shafts, and bioswales certified by the Ground Water Department.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} /> Register New Recharge Pit
        </button>
      </div>

      {/* Key Basin Metrics */}
      <div className="grid-3">
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700 }}>REGISTERED RECHARGE PITS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary-700)', marginTop: '4px' }}>
            {rechargePits.length} Facilities
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Located across parks, campuses & institutions</div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700 }}>TOTAL DAILY INFILTRATION RATE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: '4px' }}>
            {formatLitres(totalCapacity)} / day
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Cumulative percolation rate</div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700 }}>CUMULATIVE RAINWATER INFUSED</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b45309', marginTop: '4px' }}>
            {formatLitres(totalWaterInfused + 414000)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Safely transferred to deep aquifer</div>
        </div>
      </div>

      {/* Recharge Pits Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {rechargePits.map((pit) => (
          <div key={pit.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--secondary-600)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className="badge badge-success">✓ CGWB Approved</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700 }}>{pit.id}</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                {pit.name}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--secondary-700)', fontWeight: 700, margin: '2px 0 10px' }}>
                {pit.teluguName} • {pit.locality}
              </div>

              <div style={{
                background: 'var(--slate-50)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.825rem',
                color: 'var(--slate-700)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginBottom: '1rem'
              }}>
                <div><strong>Daily Infiltration:</strong> {(pit.dailyCapacityLitres || 0).toLocaleString()} L/day</div>
                <div><strong>Aquifer Table Rise:</strong> <span style={{ color: 'var(--secondary-700)', fontWeight: 700 }}>+{pit.waterTableRiseRecordedCm || 28} cm recorded</span></div>
                <div><strong>Geological Lithology:</strong> {pit.soilType}</div>
                <div><strong>Filtration System:</strong> {pit.filterSystem}</div>
                <div><strong>Supervising Officer:</strong> {pit.contactPerson}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '10px',
              borderTop: '1px solid var(--border-light)',
              fontSize: '0.8rem',
              color: 'var(--slate-500)'
            }}>
              <span>Coordinates: {pit.lat}, {pit.lng}</span>
              <span style={{ color: 'var(--secondary-700)', fontWeight: 700 }}>Status: Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Recharge Pit Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Approved Rainwater Recharge Facility">
        <form onSubmit={handleAddPitSubmit}>
          <div className="form-group">
            <label className="form-label">Facility Name (English) *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kasu Brahmananda Bio-Percolation Shaft #2"
              className="form-control"
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Telugu Designation (తెలుగు పేరు)</label>
              <input
                type="text"
                value={teluguName}
                onChange={(e) => setTeluguName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Locality / Park / Campus *</label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Jubilee Hills / KBR Park"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Daily Percolation Capacity (Litres/day) *</label>
              <input
                type="number"
                value={dailyCapacityLitres}
                onChange={(e) => setDailyCapacityLitres(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Supervising Hydrologist / Officer</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Soil & Geological Lithology</label>
            <input
              type="text"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pre-Filtration Architecture</label>
            <input
              type="text"
              value={filterSystem}
              onChange={(e) => setFilterSystem(e.target.value)}
              className="form-control"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary">
              Enroll & Map Recharge Pit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

