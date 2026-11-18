import React, { useState } from 'react';
import { 
  Truck, 
  Droplet, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Power, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatLitres, formatDate } from '../utils/formatters';

export const TankerDashboardPage = ({ setActivePage }) => {
  const { currentUser } = useAuth();
  const { tankers, collectionRequests, reports, rechargePits, toggleTankerAvailability } = useData();

  // Find operator tanker or fallback to TNK-01
  const myTanker = tankers.find(t => t.id === currentUser?.tankerId) || tankers[0];

  // Active missions assigned to this operator
  const myActiveRequests = collectionRequests.filter(r => 
    r.tankerId === myTanker.id && 
    r.status !== 'delivered' && 
    r.status !== 'rejected_contaminated'
  );

  // Completed missions
  const myCompletedRequests = collectionRequests.filter(r => 
    r.tankerId === myTanker.id && 
    r.status === 'delivered'
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Operator Status Header */}
      <div style={{
        background: 'linear-gradient(135deg, #075985, #0369a1)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.9, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700 }}>
            WATER TANKER LOGISTICS PORTAL
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '4px 0' }}>
            {myTanker.operatorName} • {myTanker.registrationNumber}
          </h1>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Base Station: <strong>{myTanker.currentLocationName}</strong> • Tank Capacity: <strong>{(myTanker.capacityLitres || 0).toLocaleString()} Litres</strong>
          </p>
        </div>

        {/* Availability Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '10px 16px',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 700 }}>CURRENT FLEET STATUS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase' }}>
              {myTanker.availability === 'available' ? '🟢 Ready for Pickup' : '🟠 On Active Duty'}
            </div>
          </div>
          <button
            onClick={() => toggleTankerAvailability(myTanker.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: myTanker.availability === 'available' ? 'var(--amber-500)' : 'var(--secondary-500)',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Power size={14} />
            {myTanker.availability === 'available' ? 'Set Busy' : 'Set Ready'}
          </button>
        </div>
      </div>

      {/* Operator Metric Cards */}
      <div className="grid-4">
        <MetricCard
          title="Total Recovered"
          value={formatLitres(myTanker.totalWaterRecoveredLitres || 0)}
          icon={Droplet}
          color="primary"
          subtext="Excess floodwater salvaged"
        />
        <MetricCard
          title="Completed Trips"
          value={myTanker.tripsCompleted || 0}
          unit="Missions"
          icon={CheckCircle2}
          color="secondary"
          subtext="Recharged into recharge pits"
        />
        <MetricCard
          title="Active Missions"
          value={myActiveRequests.length}
          icon={Truck}
          color="amber"
          subtext="Assigned queue"
        />
        <MetricCard
          title="Fleet Rating"
          value={`${myTanker.rating || 4.9} / 5.0`}
          icon={TrendingUp}
          color="secondary"
          subtext="Verified GHMC Partner"
        />
      </div>

      {/* Current Active Mission Spotlight */}
      {myActiveRequests.length > 0 ? (
        <div className="card" style={{ borderLeft: '4px solid var(--amber-500)' }}>
          <div className="card-header">
            <div>
              <span className="badge badge-warning" style={{ marginBottom: '4px' }}>ACTIVE ASSIGNMENT</span>
              <h3 className="card-title" style={{ fontSize: '1.25rem' }}>
                Mission in Progress: {myActiveRequests[0].id}
              </h3>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setActivePage('delivery-tracking')}
            >
              Open Step-by-Step Tracker <ArrowRight size={16} />
            </button>
          </div>

          {(() => {
            const req = myActiveRequests[0];
            const rep = reports.find(r => r.id === req.reportId);
            const pit = rechargePits.find(p => p.id === req.rechargePitId);

            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '0.5rem' }}>
                <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)' }}>PICKUP LOCATION (FLOOD SPOT)</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '2px' }}>
                    {rep?.area || 'Waterlogging Area'}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', marginTop: '4px' }}>
                    Volume: <strong>{(rep?.waterVolumeLitres || 0).toLocaleString()} L</strong> • Severity: <strong>{rep?.severity}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)', marginTop: '4px' }}>
                    Reported by: {rep?.reportedBy} ({rep?.citizenPhone})
                  </div>
                </div>

                <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)' }}>DESTINATION RECHARGE FACILITY</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--secondary-800)', marginTop: '2px' }}>
                    {pit?.name || 'Recharge Basin'}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--secondary-700)', fontWeight: 600, marginTop: '2px' }}>
                    {pit?.teluguName} • {pit?.locality}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--slate-600)', marginTop: '4px' }}>
                    Filtration: {pit?.filterSystem}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--secondary-100)', color: 'var(--secondary-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
            <CheckCircle2 size={28} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-800)' }}>
            No Active Inundation Dispatches
          </h3>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginTop: '4px', maxWidth: '500px', margin: '4px auto 1rem' }}>
            Your tanker is ready. Check the Collection Requests Pool to view approved citizen waterlogging points awaiting transport.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setActivePage('collection-requests')}
          >
            Browse Available Collection Requests
          </button>
        </div>
      )}

      {/* Completed Delivery History */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <CheckCircle2 size={20} color="var(--secondary-600)" />
            Completed Recharge Operations History
          </h3>
          <span className="badge badge-success">{myCompletedRequests.length} Operations Completed</span>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Mission ID</th>
                <th>Pickup Location</th>
                <th>Recharge Basin</th>
                <th>Water Delivered</th>
                <th>Quality Clearance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {collectionRequests
                .filter(r => r.status === 'delivered')
                .map((req) => {
                  const rep = reports.find(r => r.id === req.reportId);
                  const pit = rechargePits.find(p => p.id === req.rechargePitId);

                  return (
                    <tr key={req.id}>
                      <td><strong>{req.id}</strong></td>
                      <td>{rep?.area || 'Highway Inundation Point'}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{pit?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--secondary-700)' }}>{pit?.teluguName}</div>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--secondary-800)' }}>
                          {(req.waterDeliveredLitres || 10000).toLocaleString()} L
                        </strong>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', color: 'var(--slate-700)' }}>
                          pH {req.qualityScreening?.phValue || 7.4} • {req.qualityScreening?.turbidityNtu || 18} NTU
                        </span>
                      </td>
                      <td>
                        <StatusBadge status="delivered" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

