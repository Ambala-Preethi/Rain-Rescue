import React from 'react';
import { Check, Clock, AlertTriangle, ShieldCheck, Truck, Droplet } from 'lucide-react';

export const WORKFLOW_STEPS = [
  { index: 1, key: 'requested', title: '1. Citizen Report', short: 'Reported' },
  { index: 2, key: 'verified', title: '2. Admin Verification', short: 'Verified' },
  { index: 3, key: 'suitability_checked', title: '3. Suitability Check', short: 'Suitable' },
  { index: 4, key: 'assigned', title: '4. Tanker Assigned', short: 'Assigned' },
  { index: 5, key: 'accepted', title: '5. Operator Accepted', short: 'Accepted' },
  { index: 6, key: 'water_collected', title: '6. Water Collected', short: 'Collected' },
  { index: 7, key: 'screening', title: '7. Quality Screening', short: 'Screening' },
  { index: 8, key: 'approved_for_transport', title: '8. Transport Approved', short: 'Approved' },
  { index: 9, key: 'delivered', title: '9. Recharge Delivered', short: 'Delivered' },
  { index: 10, key: 'metrics_updated', title: '10. Aquifer Updated', short: 'Recharged' }
];

export const StatusProgressTracker = ({ currentStageIndex = 1, isRejected = false }) => {
  return (
    <div style={{ width: '100%', margin: '1rem 0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflowX: 'auto',
        padding: '10px 0'
      }}>
        {/* Background track line */}
        <div style={{
          position: 'absolute',
          top: '25px',
          left: '20px',
          right: '20px',
          height: '4px',
          background: 'var(--slate-200)',
          zIndex: 0
        }} />

        {/* Progress highlight line */}
        <div style={{
          position: 'absolute',
          top: '25px',
          left: '20px',
          width: `${Math.min(100, Math.max(0, ((currentStageIndex - 1) / 9) * 100))}%`,
          height: '4px',
          background: isRejected ? 'var(--red-500)' : 'var(--secondary-500)',
          zIndex: 1,
          transition: 'width 0.4s ease'
        }} />

        {WORKFLOW_STEPS.map((step) => {
          const isDone = currentStageIndex > step.index;
          const isCurrent = currentStageIndex === step.index;
          const isFailed = isRejected && isCurrent;

          return (
            <div
              key={step.index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '65px',
                zIndex: 2,
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isFailed ? 'var(--red-600)' :
                              isDone ? 'var(--secondary-600)' :
                              isCurrent ? 'var(--primary-600)' : 'white',
                  border: isCurrent ? '3px solid var(--primary-200)' : '2px solid var(--slate-300)',
                  color: (isDone || isCurrent || isFailed) ? 'white' : 'var(--slate-400)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  boxShadow: isCurrent ? '0 0 0 4px rgba(2, 111, 198, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {isDone ? <Check size={16} /> : isFailed ? '✕' : step.index}
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent ? 'var(--primary-700)' : isDone ? 'var(--secondary-800)' : 'var(--slate-400)',
                marginTop: '6px',
                textAlign: 'center',
                lineHeight: 1.1
              }}>
                {step.short}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

