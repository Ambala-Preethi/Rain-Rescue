import React from 'react';
import { Droplet, Heart, Shield, PhoneCall } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: '#071d32',
      color: 'white',
      padding: '2.5rem 1.5rem 1.5rem',
      marginTop: 'auto',
      borderTop: '1px solid #143555'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Brand & mission */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284c7, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Droplet size={18} fill="white" />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>RainRescue</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
            "Every Drop Counts. Every Drop Matters."<br />
            Transforming urban floodwaters across Hyderabad and Telangana into secure groundwater recharge for the summer.
          </p>
          <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#38bdf8' }}>
            Groundwater Recharge Initiative
          </div>
        </div>

        {/* Key safety & operations */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: '#e2e8f0' }}>
            Aquifer Safety & Protocol
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 2 }}>
            <li>✓ Multi-Tiered Silt Sedimentation</li>
            <li>✓ Mandatory pH & Turbidity Lab Screening</li>
            <li>✓ Hydrocarbon & Industrial Runoff Rejection</li>
            <li>✓ Permissible Recharge Pits Only (CGWB Standards)</li>
          </ul>
        </div>

        {/* Emergency & Municipal Contact */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: '#e2e8f0' }}>
            Emergency Rainwater Coordination
          </h4>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>GHMC Inundation Helpline: <strong>040-21111111 / 100</strong></div>
            <div>Telangana Ground Water Dept: <strong>040-23396781</strong></div>
            <div>Tanker Emergency Dispatch: <strong>1800-425-RAIN (7246)</strong></div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        <div>
          © {new Date().getFullYear()} RainRescue Telangana. Demonstration Prototype for Smart Urban Flood Mitigation.
        </div>
        <div>
          Built with React & Vite • OpenStreetMap • Recharts • LocalStorage Ready
        </div>
      </div>
    </footer>
  );
};

