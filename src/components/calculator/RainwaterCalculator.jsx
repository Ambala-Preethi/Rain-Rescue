import React, { useState } from 'react';
import { Calculator, Droplets, ArrowUpRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const RainwaterCalculator = () => {
  const [areaSqMeters, setAreaSqMeters] = useState(500); // 500 sq meters (typical commercial or apartment roof/apron)
  const [rainfallMm, setRainfallMm] = useState(75); // 75 mm (moderate-heavy monsoon spell in Hyderabad)
  const [surfaceType, setSurfaceType] = useState('0.85'); // 0.85 for concrete / paved road

  // Formula: Volume (Litres) = Catchment Area (sq m) * Rainfall (mm) * Runoff Coefficient
  const runoffCoeff = parseFloat(surfaceType);
  const harvestableLitres = Math.round(areaSqMeters * rainfallMm * runoffCoeff);
  
  // Hyderabad fractured granitic aquifer specifics:
  // Roughly 100,000 Litres infused through a recharge pit with an effective aquifer area of ~1000m² at specific yield Sy ~ 0.03
  // results in ~0.33m (33cm) of local water table rise!
  const estimatedTableRiseCm = ((harvestableLitres / 100000) * 33).toFixed(1);
  const tankerLoads = (harvestableLitres / 10000).toFixed(1);
  const daysOfWaterForFamily = Math.round(harvestableLitres / 650); // 650L daily consumption for family of 4 in Hyderabad

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Calculator size={20} color="var(--primary-600)" />
          Rainwater Recovery & Groundwater Recharge Impact Calculator
        </h3>
        <span className="badge badge-info">Telangana Hydrological Model</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Input Parameters */}
        <div>
          <div className="form-group">
            <label className="form-label">
              Catchment Area (Square Metres): <strong>{areaSqMeters} m²</strong> ({Math.round(areaSqMeters * 10.764)} sq. ft)
            </label>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={areaSqMeters}
              onChange={(e) => setAreaSqMeters(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-600)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-400)' }}>
              <span>50 m² (Small Plot)</span>
              <span>1,500 m² (Apartment)</span>
              <span>5,000 m² (IT Park / Highway)</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Rainfall Event Intensity (mm): <strong>{rainfallMm} mm</strong>
            </label>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={rainfallMm}
              onChange={(e) => setRainfallMm(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-600)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-400)' }}>
              <span>10 mm (Light Shower)</span>
              <span>75 mm (Monsoon Downpour)</span>
              <span>250 mm (Extreme Cloudburst)</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Catchment Surface Type & Runoff Efficiency</label>
            <select
              value={surfaceType}
              onChange={(e) => setSurfaceType(e.target.value)}
              className="form-select"
            >
              <option value="0.90">Concrete Rooftop / Metal Deck (90% runoff)</option>
              <option value="0.85">Asphalt Main Road / Flyover (85% runoff)</option>
              <option value="0.75">Paved Interlocking Pavers (75% runoff)</option>
              <option value="0.50">Residential Garden / Semi-open Soil (50% runoff)</option>
            </select>
            <div className="form-hint">
              Runoff coefficient represents percentage of rainfall that generates harvestable overland flow.
            </div>
          </div>
        </div>

        {/* Calculated Impact Results */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f7ff, #f0fdf4)',
          border: '1px solid var(--primary-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-800)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Estimated Harvest Potential
          </div>

          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-900)', margin: '0.25rem 0' }}>
            {harvestableLitres.toLocaleString()}{' '}
            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--slate-600)' }}>Litres</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
            Equivalent to <strong>{(harvestableLitres / 1000).toFixed(1)} kiloLitres (kL)</strong> of fresh water prevented from clogging city storm drains.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>WATER TABLE RISE</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary-700)' }}>
                +{estimatedTableRiseCm} cm
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Local granite aquifer recharge</div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>TANKER FLEET TRIPS</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                {tankerLoads} Tankers
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>10,000L standard capacity</div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>HOUSEHOLD SUMMER BENEFIT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)' }}>
                Provides ~{daysOfWaterForFamily} days of water security for a family of four during the dry summer months.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

