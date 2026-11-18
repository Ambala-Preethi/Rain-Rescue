import React from 'react';
import { 
  Droplet, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Heart, 
  Sparkles,
  Info
} from 'lucide-react';

export const AboutPage = ({ setActivePage }) => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Intro */}
      <div className="hero-gradient" style={{ padding: '2.5rem' }}>
        <span style={{
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.04em'
        }}>
          PROJECT VISION & ARCHITECTURE
        </span>
        <h1 style={{ fontSize: '2.3rem', fontWeight: 800, margin: '12px 0 8px' }}>
          About RainRescue
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#e0f2fe', lineHeight: 1.5 }}>
          Smart Rainwater Recovery & Groundwater Recharge Platform for Hyderabad and Telangana.
        </p>
      </div>

      {/* The Core Problem & Dual Paradox */}
      <div className="card">
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>
          Solving Hyderabad's Dual Water Paradox
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: 800, marginBottom: '6px' }}>
              <AlertTriangle size={18} />
              Problem 1: Monsoon Urban Flooding
            </div>
            <p style={{ fontSize: '0.875rem', color: '#7f1d1d', lineHeight: 1.5 }}>
              Heavy downpours in Hyderabad create massive waterlogging across low-lying flyovers, subways (Begumpet, Malakpet), and major intersections (Tolichowki, Kukatpally), paralyzing transit and damaging public infrastructure.
            </p>
          </div>

          <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: 800, marginBottom: '6px' }}>
              <AlertTriangle size={18} />
              Problem 2: Summer Groundwater Scarcity
            </div>
            <p style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: 1.5 }}>
              By April and May, deep granitic borewells across Jubilee Hills, Madhapur, and Gachibowli dry up, forcing millions of residents and commercial complexes to rely on expensive private water tankers.
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '1.5rem',
          background: 'linear-gradient(135deg, #f0fdf4, #e0f2fe)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--secondary-200)'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--secondary-900)', marginBottom: '4px' }}>
            The RainRescue Solution: The Missing Logistics Link
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)', lineHeight: 1.5 }}>
            RainRescue treats urban floodwater as a high-value resource. Instead of letting clean stormwater wash away into polluted drains, we mobilize available water tankers to vacuum excess water from flooded points, screen it rigorously for contaminants, and transport it to approved rainwater harvesting structures located in parks and public institutions.
          </p>
        </div>
      </div>

      {/* Safety & Aquifer Protection Protocol */}
      <div className="card">
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>
          Mandatory Safety & Aquifer Protection Rules
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
          Groundwater aquifers, once contaminated, take decades to recover. RainRescue operates under strict hydrological safety safeguards:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--secondary-100)', color: 'var(--secondary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
              1
            </div>
            <div>
              <strong style={{ color: 'var(--slate-900)', fontSize: '0.95rem' }}>No Direct Groundwater Injection</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                Untreated runoff is never directly pumped into borewells. All harvested water must pass through multi-tiered sedimentation basins, sand-gravel filter beds, and percolation shafts.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--secondary-100)', color: 'var(--secondary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
              2
            </div>
            <div>
              <strong style={{ color: 'var(--slate-900)', fontSize: '0.95rem' }}>Water Quality Screening Protocol</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                Every tanker load is inspected on-site: pH must fall between 6.5 and 8.5, turbidity must remain below 35 NTU, and there must be zero visible oil or hydrocarbon sheen.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--secondary-100)', color: 'var(--secondary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
              3
            </div>
            <div>
              <strong style={{ color: 'var(--slate-900)', fontSize: '0.95rem' }}>Contamination Rejection & Diversion</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                Water originating near gas stations, chemical plants, or with sewage ingress is flagged and redirected to standard stormwater drains, preventing contamination of pristine aquifers.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--secondary-100)', color: 'var(--secondary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
              4
            </div>
            <div>
              <strong style={{ color: 'var(--slate-900)', fontSize: '0.95rem' }}>Geologically Approved Recharge Pits Only</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                Delivery is restricted to certified recharge facilities verified by the Central Ground Water Board (CGWB) and Telangana State Ground Water Department for local lithology and percolation safety.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack & Architecture */}
      <div className="card">
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>
          Technical Architecture & Full-Stack Readiness
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
          <div style={{ background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <strong>Frontend Core:</strong>
            <div style={{ color: 'var(--slate-600)', marginTop: '4px' }}>React 18 + Vite (ESM)</div>
          </div>
          <div style={{ background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <strong>Geospatial Engine:</strong>
            <div style={{ color: 'var(--slate-600)', marginTop: '4px' }}>Leaflet + OpenStreetMap</div>
          </div>
          <div style={{ background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <strong>Analytics & Charts:</strong>
            <div style={{ color: 'var(--slate-600)', marginTop: '4px' }}>Recharts Data Visualization</div>
          </div>
          <div style={{ background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <strong>Data Storage:</strong>
            <div style={{ color: 'var(--slate-600)', marginTop: '4px' }}>LocalStorage Prototype (Structured for Supabase / Firebase)</div>
          </div>
        </div>
      </div>

      {/* Prototype Disclaimer */}
      <div style={{
        background: 'var(--primary-50)',
        border: '1px solid var(--primary-200)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        fontSize: '0.85rem',
        color: 'var(--primary-900)',
        lineHeight: 1.5
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '4px' }}>
          <Info size={16} /> Prototype Demonstration Notice
        </div>
        This web application is an interactive full-featured demonstration prototype built to illustrate the operational workflow of smart urban rainwater recovery and groundwater recharge in Hyderabad and Telangana. The data, locations, and simulated user roles are designed for testing, demonstration, and evaluation purposes.
      </div>
    </div>
  );
};

