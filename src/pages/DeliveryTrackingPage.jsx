import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Droplet, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle,
  Navigation,
  ArrowRight,
  Eye
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatusProgressTracker } from '../components/workflow/StatusProgressTracker';
import { QualityScreeningModal } from '../components/workflow/QualityScreeningModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatLitres } from '../utils/formatters';

export const DeliveryTrackingPage = ({ setActivePage }) => {
  const { collectionRequests, reports, tankers, rechargePits, updateRequestStage, submitQualityScreening } = useData();

  // Active or selected mission
  const activeRequests = collectionRequests.filter(r => r.status !== 'delivered' && r.status !== 'rejected_contaminated');
  const [selectedRequestId, setSelectedRequestId] = useState(activeRequests[0]?.id || collectionRequests[0]?.id);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);

  // Form inputs for volume entries
  const [collectedLitresInput, setCollectedLitresInput] = useState('10000');
  const [deliveredLitresInput, setDeliveredLitresInput] = useState('9800');

  const currentReq = collectionRequests.find(r => r.id === selectedRequestId) || collectionRequests[0];
  const linkedReport = reports.find(r => r.id === currentReq?.reportId);
  const linkedTanker = tankers.find(t => t.id === currentReq?.tankerId);
  const linkedPit = rechargePits.find(p => p.id === currentReq?.rechargePitId);

  if (!currentReq) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <Truck size={36} color="var(--slate-400)" style={{ margin: '0 auto 12px' }} />
        <h3>No Collection Requests in Queue</h3>
        <p style={{ color: 'var(--slate-500)', marginTop: '4px' }}>
          Browse collection requests to begin a rainwater recovery trip.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setActivePage('collection-requests')}>
          Go to Collection Requests
        </button>
      </div>
    );
  }

  // Handle stage advances
  const handleReachedPoint = () => {
    updateRequestStage(currentReq.id, 'reached_collection_point', 4);
  };

  const handleWaterCollected = () => {
    updateRequestStage(currentReq.id, 'water_collected', 6, {
      waterCollectedLitres: Number(collectedLitresInput)
    });
  };

  const handleScreeningCleared = (screeningData) => {
    submitQualityScreening(currentReq.id, screeningData);
  };

  const handleConfirmDelivery = () => {
    updateRequestStage(currentReq.id, 'delivered', 10, {
      waterDeliveredLitres: Number(deliveredLitresInput) || currentReq.waterCollectedLitres
    });
  };

  const isRejected = currentReq.status === 'rejected_contaminated';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Mission Live Tracker: {currentReq.id}
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
            Multi-stage verified rainwater collection, quality screening, and aquifer delivery.
          </p>
        </div>

        {/* Mission selector dropdown if multiple */}
        {collectionRequests.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--slate-600)', fontWeight: 600 }}>Select Mission:</span>
            <select
              value={selectedRequestId}
              onChange={(e) => setSelectedRequestId(e.target.value)}
              className="form-select"
              style={{ width: 'auto' }}
            >
              {collectionRequests.map(r => (
                <option key={r.id} value={r.id}>
                  {r.id} ({r.status.replace(/_/g, ' ')})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Visual Workflow Stepper (1 to 10) */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)' }}>
            10-Step Recovery Workflow Status
          </h3>
          <StatusBadge status={currentReq.status} />
        </div>
        <StatusProgressTracker currentStageIndex={currentReq.stageIndex || 2} isRejected={isRejected} />
      </div>

      {/* Journey Map & Location Details Grid */}
      <div className="grid-2">
        {/* Origin / Collection Spot */}
        <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📍
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626' }}>STEP 1 - 6: PICKUP SITE</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                {linkedReport?.area || 'Waterlogging Location'}
              </h3>
            </div>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--slate-600)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Coordinates:</strong> {linkedReport?.lat}, {linkedReport?.lng}</div>
            <div><strong>Estimated Volume:</strong> {(linkedReport?.waterVolumeLitres || 0).toLocaleString()} Litres</div>
            <div><strong>Water Depth:</strong> {linkedReport?.waterDepthFeet} ft ({linkedReport?.severity} Severity)</div>
            <div><strong>Source:</strong> {linkedReport?.waterSource}</div>
            <div><strong>Citizen Contact:</strong> {linkedReport?.reportedBy} ({linkedReport?.citizenPhone})</div>
          </div>
        </div>

        {/* Destination / Recharge Pit */}
        <div className="card" style={{ borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🌱
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>STEP 8 - 10: RECHARGE BASIN</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                {linkedPit?.name || 'Approved Recharge Pit'}
              </h3>
            </div>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--slate-600)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Telugu Designation:</strong> {linkedPit?.teluguName}</div>
            <div><strong>Locality:</strong> {linkedPit?.locality}</div>
            <div><strong>Daily Percolation Rate:</strong> {(linkedPit?.dailyCapacityLitres || 0).toLocaleString()} L/day</div>
            <div><strong>Soil Lithology:</strong> {linkedPit?.soilType}</div>
            <div><strong>Filter Architecture:</strong> {linkedPit?.filterSystem}</div>
          </div>
        </div>
      </div>

      {/* Stage Action Box (Interactive Operations for Operator) */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff, #f8fafc)', border: '2px solid var(--primary-200)', padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>
          Active Stage Operator Actions
        </h3>

        {/* Stage: Accepted -> Move to Collection Point */}
        {currentReq.status === 'accepted' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>
                Stage 4: En Route to Inundation Spot
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                Tanker {linkedTanker?.registrationNumber} is navigating to {linkedReport?.area}.
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleReachedPoint}>
              <Navigation size={16} /> Confirm Arrival at Collection Point
            </button>
          </div>
        )}

        {/* Stage: Reached Collection Point -> Collect Water */}
        {currentReq.status === 'reached_collection_point' && (
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)', marginBottom: '8px' }}>
              Stage 5 & 6: Pumping & Extraction
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
              Connect suction hoses to the designated puddle / storm depression. Enter actual volume pumped into tanker:
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="number"
                  value={collectedLitresInput}
                  onChange={(e) => setCollectedLitresInput(e.target.value)}
                  className="form-control"
                  style={{ width: '160px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Litres</span>
              </div>

              <button className="btn btn-primary" onClick={handleWaterCollected}>
                <Droplet size={16} /> Confirm Water Collected
              </button>
            </div>
          </div>
        )}

        {/* Stage: Water Collected -> Perform Quality Screening (Step 7) */}
        {currentReq.status === 'water_collected' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>
                Stage 7: Mandatory Water Quality Screening & Settling
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                <strong>Safety Rule:</strong> Must verify pH (6.5-8.5), Turbidity (&lt;35 NTU), and absence of motor oil before transport.
              </p>
            </div>
            <button className="btn btn-secondary" onClick={() => setIsScreeningModalOpen(true)}>
              <ShieldCheck size={18} /> Open Quality Inspection Form
            </button>
          </div>
        )}

        {/* Stage: Screening Passed -> Transport & Deliver to Recharge Facility (Step 8 & 9) */}
        {currentReq.status === 'approved_for_transport' && (
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--secondary-800)', marginBottom: '8px' }}>
              Stage 8 & 9: Transport Cleared & Delivery to Recharge Facility
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
              Quality tests cleared successfully! Transporting to <strong>{linkedPit?.name}</strong>. Enter delivered volume to complete recharge:
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="number"
                  value={deliveredLitresInput}
                  onChange={(e) => setDeliveredLitresInput(e.target.value)}
                  className="form-control"
                  style={{ width: '160px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Litres Delivered</span>
              </div>

              <button className="btn btn-secondary" onClick={handleConfirmDelivery}>
                <CheckCircle2 size={16} /> Confirm Delivery & Aquifer Recharge
              </button>
            </div>
          </div>
        )}

        {/* Stage: Delivered / Completed (Step 10) */}
        {currentReq.status === 'delivered' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--secondary-800)' }}>
            <CheckCircle2 size={32} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                Operation Complete! {currentReq.waterDeliveredLitres.toLocaleString()} Litres Safely Recharged.
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                Water table impact registered in Telangana Ground Water Department registry.
              </div>
            </div>
          </div>
        )}

        {/* Stage: Contaminated / Diverted */}
        {currentReq.status === 'rejected_contaminated' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--red-700)' }}>
            <AlertTriangle size={32} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                Water Diverted Away From Aquifer (Contamination Detected)
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                Water failed chemical/turbidity limits. Safely diverted to storm drainage to prevent underground water contamination.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Water Quality Inspection Record (if screened) */}
      {currentReq.qualityScreening && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <ShieldCheck size={20} color="var(--secondary-600)" />
              Certified On-Site Screening Log
            </h3>
            <span className="badge badge-success">Passed CGWB Protocol</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ background: 'var(--slate-50)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>pH LEVEL</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>{currentReq.qualityScreening.phValue}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--secondary-700)' }}>Optimal (6.5 - 8.5)</div>
            </div>

            <div style={{ background: 'var(--slate-50)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>TURBIDITY</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>{currentReq.qualityScreening.turbidityNtu} NTU</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--secondary-700)' }}>Within settling limit</div>
            </div>

            <div style={{ background: 'var(--slate-50)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>HYDROCARBON SHEEN</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>{currentReq.qualityScreening.oilGreaseVisualCheck}</div>
            </div>

            <div style={{ background: 'var(--slate-50)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 700 }}>ODOR / CHEMICALS</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>{currentReq.qualityScreening.chemicalOdorCheck}</div>
            </div>
          </div>
        </div>
      )}

      {/* Quality Screening Modal */}
      <QualityScreeningModal
        isOpen={isScreeningModalOpen}
        onClose={() => setIsScreeningModalOpen(false)}
        request={currentReq}
        onSubmit={handleScreeningCleared}
      />
    </div>
  );
};

