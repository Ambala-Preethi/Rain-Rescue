import React, { useState } from 'react';
import { 
  Inbox, 
  MapPin, 
  Truck, 
  Droplet, 
  Check, 
  X, 
  ArrowRight, 
  Filter, 
  Search,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/formatters';

export const CollectionRequestsPage = ({ setActivePage }) => {
  const { currentUser } = useAuth();
  const { reports, tankers, rechargePits, collectionRequests, assignTankerToReport, updateRequestStage } = useData();

  const myTanker = tankers.find(t => t.id === currentUser?.tankerId) || tankers[0];

  // Requests approved for pickup or assigned
  const availableApprovedReports = reports.filter(r => r.status === 'approved_for_collection');
  const activeRequests = collectionRequests.filter(r => r.status !== 'delivered' && r.status !== 'rejected_contaminated');

  const handleAcceptRequest = (req) => {
    updateRequestStage(req.id, 'accepted', 3);
    setActivePage('delivery-tracking');
  };

  const handleClaimReport = (rep) => {
    // Automatically pick the nearest recharge pit (e.g. PIT-HYD-01 or PIT-HYD-02)
    const targetPit = rechargePits[0];
    const newReq = assignTankerToReport(rep.id, myTanker.id, targetPit.id);
    if (newReq) {
      updateRequestStage(newReq.id, 'accepted', 3);
      setActivePage('delivery-tracking');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Collection Requests Queue
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
          Approved urban waterlogging spots ready for tanker extraction and transport to approved recharge pits.
        </p>
      </div>

      {/* Operator Status Alert */}
      <div style={{
        background: myTanker.availability === 'available' ? 'var(--secondary-50)' : 'var(--amber-50)',
        border: `1px solid ${myTanker.availability === 'available' ? 'var(--secondary-200)' : '#fde68a'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Truck size={22} color={myTanker.availability === 'available' ? 'var(--secondary-700)' : '#b45309'} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--slate-900)' }}>
              Operating as: {myTanker.registrationNumber} ({myTanker.operatorName})
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
              Capacity: {(myTanker.capacityLitres).toLocaleString()} L • Status: <strong>{myTanker.availability.toUpperCase()}</strong>
            </div>
          </div>
        </div>

        {activeRequests.length > 0 && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActivePage('delivery-tracking')}
          >
            Track Active Mission ({activeRequests.length}) <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* 1. Directly Assigned Missions (Waiting for Operator Acceptance) */}
      {collectionRequests.filter(r => r.status === 'assigned').length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid var(--primary-600)' }}>
          <div className="card-header">
            <h3 className="card-title">
              <Inbox size={20} color="var(--primary-600)" />
              Newly Dispatched Missions (Acceptance Required)
            </h3>
            <span className="badge badge-info">Municipal Dispatch</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {collectionRequests
              .filter(r => r.status === 'assigned')
              .map(req => {
                const rep = reports.find(r => r.id === req.reportId);
                const pit = rechargePits.find(p => p.id === req.rechargePitId);

                return (
                  <div key={req.id} style={{
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-700)' }}>{req.id}</span>
                        <StatusBadge status="assigned" />
                      </div>

                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--slate-900)', marginBottom: '4px' }}>
                        {rep?.area}
                      </div>

                      <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', marginBottom: '10px' }}>
                        <strong>Est. Runoff:</strong> {(rep?.waterVolumeLitres || 0).toLocaleString()} L • <strong>Depth:</strong> {rep?.waterDepthFeet} ft<br />
                        <strong>Destination:</strong> {pit?.name} ({pit?.locality})
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => handleAcceptRequest(req)}
                      >
                        <Check size={14} /> Accept Mission
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setActivePage('map')}
                      >
                        <MapPin size={14} /> View Map
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 2. Available Approved Reports Pool (Self-Assignment) */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Droplet size={20} color="var(--primary-600)" />
              Approved Inundation Spots Available for Pickup
            </h3>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Verified by GHMC desk. Pick an inundation point to deploy your tanker.
            </div>
          </div>
          <span className="badge badge-success">{availableApprovedReports.length} Available</span>
        </div>

        {availableApprovedReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--slate-400)' }}>
            No unassigned approved waterlogging spots right now. Check back as new rain reports come in.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Spot / Landmark</th>
                  <th>Locality</th>
                  <th>Est. Volume</th>
                  <th>Severity</th>
                  <th>Source</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableApprovedReports.map((rep) => (
                  <tr key={rep.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{rep.area}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>Reported by: {rep.reportedBy}</div>
                    </td>
                    <td>{rep.locality}</td>
                    <td>
                      <strong>{(rep.waterVolumeLitres).toLocaleString()} L</strong>
                    </td>
                    <td>
                      <span style={{
                        color: rep.severity === 'Severe' ? 'var(--red-600)' :
                               rep.severity === 'High' ? '#ea580c' : '#16a34a',
                        fontWeight: 700
                      }}>
                        {rep.severity}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.825rem' }}>{rep.waterSource}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleClaimReport(rep)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Truck size={14} /> Accept & Dispatch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

