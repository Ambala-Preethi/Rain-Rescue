import React, { useState } from 'react';
import { 
  Map, 
  MapPin, 
  Layers, 
  Filter, 
  Search, 
  Droplets, 
  Truck, 
  ShieldCheck, 
  Info,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { RainRescueMap } from '../components/map/RainRescueMap';
import { formatLitres } from '../utils/formatters';

export const InteractiveMapPage = ({ setActivePage }) => {
  const { reports, tankers, rechargePits, collectionRequests } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const activeMissionsCount = collectionRequests.filter(r => r.status !== 'delivered' && r.status !== 'rejected_contaminated').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Hyderabad Rainwater & Recharge Map
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
            Live geospatial overview of urban flood points, active tanker units, and recharge basins.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-primary"
            onClick={() => setActivePage('report-waterlogging')}
          >
            <MapPin size={16} /> Report New Flood Spot
          </button>
        </div>
      </div>

      {/* Metric Quick Stats strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem'
      }}>
        <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🔴
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>WATERLOGGING</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>{reports.length} Spots</div>
          </div>
        </div>

        <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🔵
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>TANKER FLEET</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>{tankers.length} Tankers</div>
          </div>
        </div>

        <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🟢
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>RECHARGE PITS</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>{rechargePits.length} Pits</div>
          </div>
        </div>

        <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffedd5', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🟠
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>ACTIVE MISSIONS</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>{activeMissionsCount} Operations</div>
          </div>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="card" style={{ padding: '0.75rem' }}>
        <RainRescueMap height="620px" zoom={12} />
      </div>

      {/* Bottom Locality Highlights Grid */}
      <div className="grid-2">
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
            Approved Rainwater Harvesting Structures
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rechargePits.map(pit => (
              <div
                key={pit.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--slate-50)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                    {pit.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--secondary-700)', fontWeight: 600 }}>
                    {pit.teluguName} • {pit.locality}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                    {pit.dailyCapacityLitres.toLocaleString()} L/day
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--secondary-700)', fontWeight: 600 }}>
                    +{pit.waterTableRiseRecordedCm} cm Rise
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
            Real-Time Inundation Clearance Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reports.slice(0, 4).map(rep => (
              <div
                key={rep.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--slate-50)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                    {rep.area}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                    Volume: {rep.waterVolumeLitres.toLocaleString()} L • Severity: {rep.severity}
                  </div>
                </div>
                <div>
                  <span className={`badge ${
                    rep.status === 'completed' ? 'badge-success' :
                    rep.status === 'in_progress' ? 'badge-info' : 'badge-warning'
                  }`}>
                    {rep.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

