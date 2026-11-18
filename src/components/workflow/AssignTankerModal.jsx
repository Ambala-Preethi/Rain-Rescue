import React, { useState } from 'react';
import { Truck, Droplets, MapPin, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useData } from '../../context/DataContext';

export const AssignTankerModal = ({ isOpen, onClose, report }) => {
  const { tankers, rechargePits, assignTankerToReport } = useData();

  const availableTankers = tankers.filter(t => t.availability === 'available');
  const [selectedTankerId, setSelectedTankerId] = useState('');
  const [selectedPitId, setSelectedPitId] = useState('');

  // Auto-select first available options if available
  React.useEffect(() => {
    if (availableTankers.length > 0 && !selectedTankerId) {
      setSelectedTankerId(availableTankers[0].id);
    }
    if (rechargePits.length > 0 && !selectedPitId) {
      setSelectedPitId(rechargePits[0].id);
    }
  }, [availableTankers, rechargePits]);

  if (!report) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTankerId || !selectedPitId) return;

    assignTankerToReport(report.id, selectedTankerId, selectedPitId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Tanker & Recharge Facility for ${report.id}`}>
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginBottom: '4px' }}>
          Target Inundation Point:
        </div>
        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)' }}>
          {report.area}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--primary-700)', marginTop: '2px' }}>
          Est. Volume: <strong>{(report.waterVolumeLitres || 0).toLocaleString()} Litres</strong> • Severity: <strong>{report.severity}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Available Water Tanker</label>
          {availableTankers.length === 0 ? (
            <div style={{ color: 'var(--red-500)', fontSize: '0.85rem', padding: '8px', background: 'var(--red-50)', borderRadius: '6px' }}>
              No available tankers at this moment. All units are currently on duty or in transit.
            </div>
          ) : (
            <select
              value={selectedTankerId}
              onChange={(e) => setSelectedTankerId(e.target.value)}
              className="form-select"
              required
            >
              {availableTankers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.registrationNumber} — {t.operatorName} (Cap: {(t.capacityLitres).toLocaleString()} L, {t.currentLocationName})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Select Approved Destination Recharge Facility</label>
          <select
            value={selectedPitId}
            onChange={(e) => setSelectedPitId(e.target.value)}
            className="form-select"
            required
          >
            {rechargePits.map(pit => (
              <option key={pit.id} value={pit.id}>
                {pit.name} ({pit.locality}) — Cap: {(pit.dailyCapacityLitres).toLocaleString()} L/day
              </option>
            ))}
          </select>
        </div>

        <div style={{
          background: 'var(--slate-50)',
          border: '1px solid var(--border-light)',
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          color: 'var(--slate-600)',
          marginBottom: '1.25rem'
        }}>
          💡 <strong>GHMC Dispatch Note:</strong> Assigning will alert the tanker operator's dashboard with turn-by-turn pickup and delivery coordinates. Operator must carry out on-site settling & screening before transporting.
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={availableTankers.length === 0}
          >
            Dispatch Tanker
          </button>
        </div>
      </form>
    </Modal>
  );
};

