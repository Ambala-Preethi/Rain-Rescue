import React from 'react';

export const MetricCard = ({ title, value, unit, icon: Icon, color = 'primary', subtext, trend }) => {
  return (
    <div className={`metric-card ${color}`}>
      <div>
        <div className="metric-label">{title}</div>
        <div className="metric-value">
          {value}
          {unit && <span style={{ fontSize: '1rem', fontWeight: 600, marginLeft: '4px', color: 'var(--slate-500)' }}>{unit}</span>}
        </div>
        {subtext && (
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '4px' }}>
            {subtext}
          </div>
        )}
      </div>
      <div 
        className="metric-icon-wrap" 
        style={{
          background: color === 'secondary' ? 'var(--secondary-100)' :
                      color === 'amber' ? 'var(--amber-50)' :
                      color === 'red' ? 'var(--red-100)' : 'var(--primary-100)',
          color: color === 'secondary' ? 'var(--secondary-700)' :
                 color === 'amber' ? 'var(--amber-600)' :
                 color === 'red' ? 'var(--red-600)' : 'var(--primary-700)'
        }}
      >
        {Icon && <Icon size={26} />}
      </div>
    </div>
  );
};

