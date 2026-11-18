import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Droplets, Info } from 'lucide-react';
import { Modal } from '../common/Modal';
import { evaluateWaterQuality, WATER_QUALITY_LIMITS } from '../../utils/waterQualityRules';

export const QualityScreeningModal = ({ isOpen, onClose, request, onSubmit }) => {
  const [phValue, setPhValue] = useState('7.2');
  const [turbidityNtu, setTurbidityNtu] = useState('20');
  const [oilGreaseVisualCheck, setOilGreaseVisualCheck] = useState('Passed (Clear, No Sheen)');
  const [chemicalOdorCheck, setChemicalOdorCheck] = useState('Passed (Fresh Rainwater Odor)');
  const [sandGravelSettlingCleared, setSandGravelSettlingCleared] = useState(true);
  const [testerNotes, setTesterNotes] = useState('');

  if (!request) return null;

  const evaluation = evaluateWaterQuality({
    phValue,
    turbidityNtu,
    oilGreaseVisualCheck,
    chemicalOdorCheck,
    sandGravelSettlingCleared
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) return;

    onSubmit({
      performedBy: 'Certified Mobile Water Quality Inspector',
      phValue: parseFloat(phValue),
      turbidityNtu: parseFloat(turbidityNtu),
      oilGreaseVisualCheck,
      chemicalOdorCheck,
      sandGravelSettlingCleared,
      labApprovalStatus: evaluation.statusText,
      notes: testerNotes || 'Inspected as per Central Ground Water Board (CGWB) & GHMC rainwater harvesting norms.'
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Step 7 & 8: Water Quality Screening & Aquifer Clearance">
      <div style={{ marginBottom: '1rem', background: 'var(--primary-50)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-100)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-800)', fontWeight: 700, fontSize: '0.875rem' }}>
          <ShieldCheck size={18} />
          Aquifer Protection Protocol
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--primary-900)', marginTop: '4px', lineHeight: 1.4 }}>
          <strong>Critical Rule:</strong> Never assume all storm floodwater is clean. Runoff with motor oil, industrial acids, or raw sewage is strictly prohibited from entering deep recharge pits.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          {/* pH Field */}
          <div className="form-group">
            <label className="form-label">
              pH Level (Safe: {WATER_QUALITY_LIMITS.PH_MIN} – {WATER_QUALITY_LIMITS.PH_MAX})
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="14"
              value={phValue}
              onChange={(e) => setPhValue(e.target.value)}
              className="form-control"
              required
            />
            <div className="form-hint">Standard rainwater in Hyderabad typically tests pH 6.8 - 7.6.</div>
          </div>

          {/* Turbidity NTU */}
          <div className="form-group">
            <label className="form-label">
              Turbidity (Max: {WATER_QUALITY_LIMITS.TURBIDITY_MAX_NTU} NTU)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              max="200"
              value={turbidityNtu}
              onChange={(e) => setTurbidityNtu(e.target.value)}
              className="form-control"
              required
            />
            <div className="form-hint">Excess silt is trapped via reverse-graded gravel filters.</div>
          </div>
        </div>

        {/* Oil and grease check */}
        <div className="form-group">
          <label className="form-label">Hydrocarbon / Motor Oil Visual Inspection</label>
          <select
            value={oilGreaseVisualCheck}
            onChange={(e) => setOilGreaseVisualCheck(e.target.value)}
            className="form-select"
          >
            <option value="Passed (Clear, No Sheen)">Passed (Clear, No Oil Sheen)</option>
            <option value="Failed (Visible Oil Film / Hydrocarbons)">Failed (Visible Oil Film / Automotive Spill)</option>
          </select>
        </div>

        {/* Chemical odor check */}
        <div className="form-group">
          <label className="form-label">Odor & Contamination Assessment</label>
          <select
            value={chemicalOdorCheck}
            onChange={(e) => setChemicalOdorCheck(e.target.value)}
            className="form-select"
          >
            <option value="Passed (Fresh Rainwater Odor)">Passed (Natural Rainwater / Earthy Odor)</option>
            <option value="Failed (Industrial Chemical Smell)">Failed (Industrial Solvent or Chemical Odor)</option>
            <option value="Failed (Sewage / Anaerobic Smell)">Failed (Sewage Inflow Detected)</option>
          </select>
        </div>

        {/* Sedimentation check */}
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="settling-check"
            checked={sandGravelSettlingCleared}
            onChange={(e) => setSandGravelSettlingCleared(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          <label htmlFor="settling-check" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', cursor: 'pointer' }}>
            Pre-filtration mesh & sedimentation chamber successfully cleared
          </label>
        </div>

        {/* Inspection Notes */}
        <div className="form-group">
          <label className="form-label">Operator / Inspector Notes</label>
          <input
            type="text"
            value={testerNotes}
            onChange={(e) => setTesterNotes(e.target.value)}
            placeholder="e.g., Clean runoff from residential road, safe for deep granite percolation"
            className="form-control"
          />
        </div>

        {/* Live Safety Decision Card */}
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: evaluation.isSafeForRecharge ? 'var(--secondary-50)' : 'var(--red-50)',
          border: `1px solid ${evaluation.isSafeForRecharge ? 'var(--secondary-200)' : 'var(--red-200)'}`,
          marginBottom: '1.25rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: evaluation.isSafeForRecharge ? 'var(--secondary-800)' : 'var(--red-700)',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}>
            {evaluation.isSafeForRecharge ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {evaluation.statusText}
          </div>
          {evaluation.errors.length > 0 && (
            <ul style={{ margin: '6px 0 0 20px', fontSize: '0.8rem', color: 'var(--red-600)' }}>
              {evaluation.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
          {evaluation.warnings.length > 0 && (
            <div style={{ fontSize: '0.78rem', color: '#b45309', marginTop: '4px' }}>
              Note: {evaluation.warnings.join(' ')}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={`btn ${evaluation.isSafeForRecharge ? 'btn-secondary' : 'btn-danger'}`}
          >
            {evaluation.isSafeForRecharge ? 'Approve for Aquifer Recharge' : 'Divert to Storm Drainage (Reject)'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

