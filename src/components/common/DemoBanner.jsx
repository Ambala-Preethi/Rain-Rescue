import React from 'react';
import { AlertCircle, RotateCcw, Droplets } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DemoBanner = () => {
  const { resetToDemoData } = useData();

  return (
    <div className="demo-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          fontSize: '0.75rem'
        }}>
          PROTOTYPE DEMO
        </span>
        <span>
          <strong>RainRescue Telangana:</strong> Converting urban floodwater to groundwater in Hyderabad.
        </span>
        <span style={{ opacity: 0.85, fontSize: '0.78rem' }}>
          *Simulated demonstration data using LocalStorage for review & testing.
        </span>
      </div>
      <button
        onClick={resetToDemoData}
        title="Reset mock data to initial demo state"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.78rem',
          padding: '3px 10px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#ffffff',
          cursor: 'pointer'
        }}
      >
        <RotateCcw size={12} />
        Reset Demo Data
      </button>
    </div>
  );
};

