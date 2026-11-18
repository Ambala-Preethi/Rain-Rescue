import React from 'react';
import { 
  Droplet, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Activity, 
  Sparkles, 
  Compass, 
  HelpCircle, 
  Layers, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatLitres } from '../utils/formatters';
import { RainwaterCalculator } from '../components/calculator/RainwaterCalculator';

export const HomePage = ({ setActivePage }) => {
  const { switchPersona } = useAuth();
  const { metrics, reports, rechargePits } = useData();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="hero-overlay-pattern" />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}>
            <Droplet size={16} fill="white" />
            HYDERABAD & TELANGANA SMART WATER INITIATIVE
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Every Drop Counts.<br />
            Every Drop Matters.
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#e0f2fe',
            marginBottom: '2rem',
            maxWidth: '680px'
          }}>
            Turning Urban Floodwater into Tomorrow's Groundwater. RainRescue connects citizens, municipal authorities, and water tanker operators to recover excess monsoon rainwater and channel it safely into approved recharge facilities.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => {
                switchPersona('citizen');
                setActivePage('report-waterlogging');
              }}
              style={{ fontWeight: 700 }}
            >
              <Droplet size={20} />
              Report Waterlogging
            </button>

            <button
              className="btn btn-outline btn-lg"
              onClick={() => {
                switchPersona('operator');
                setActivePage('operator-dashboard');
              }}
              style={{ background: 'rgba(255, 255, 255, 0.9)', color: 'var(--slate-900)', fontWeight: 700 }}
            >
              <Truck size={20} />
              Join as a Tanker Operator
            </button>

            <button
              className="btn btn-outline btn-lg"
              onClick={() => setActivePage('map')}
              style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
            >
              <MapPin size={20} />
              Explore Live Map
            </button>
          </div>
        </div>
      </section>

      {/* Live Impact Counters Bar */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary-600)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
            TOTAL WATER COLLECTED
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: '4px' }}>
            {formatLitres(metrics.totalWaterCollectedLitres)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            From verified Hyderabad flood points
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--secondary-600)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
            DELIVERED FOR RECHARGE
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary-700)', marginTop: '4px' }}>
            {formatLitres(metrics.totalWaterDeliveredLitres)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            Screened & injected into recharge pits
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
            AQUIFER RECHARGE RISE
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b45309', marginTop: '4px' }}>
            +{metrics.estimatedGroundwaterRiseCm} cm
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            Measured water table elevation
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #6366f1' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
            ACTIVE TANKER FLEET
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4338ca', marginTop: '4px' }}>
            {metrics.availableTankersCount} Available
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            Ready for on-demand stormwater pickup
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          <span className="badge badge-info" style={{ marginBottom: '8px' }}>THE 10-STEP RECOVERY CYCLE</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            How RainRescue Operates
          </h2>
          <p style={{ color: 'var(--slate-600)', marginTop: '8px', fontSize: '1rem' }}>
            A systematic engineering and community workflow ensuring safety, quality screening, and certified groundwater injection.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Phase 1 */}
          <div style={{
            background: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-100)',
              color: 'var(--primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              1
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
              Citizen Detection & Report
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Residents identify stagnant rainwater on streets, open aprons, or basements, pin the exact spot on our interactive map, upload a photo, and estimate volume.
            </p>
          </div>

          {/* Phase 2 */}
          <div style={{
            background: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--secondary-100)',
              color: 'var(--secondary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              2
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
              Municipal Verification & Dispatch
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              GHMC desk verifies the reported puddle for contamination risks, checks catchment purity, and dispatches the nearest verified water tanker with target recharge pit coordinates.
            </p>
          </div>

          {/* Phase 3 */}
          <div style={{
            background: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: '#fef3c7',
              color: '#b45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              3
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
              Screening & Sedimentation
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Water undergoes mandatory screening: pH (6.5-8.5), Turbidity (&lt;35 NTU), and zero hydrocarbon sheen. Contaminated water is rejected; clean runoff is cleared for transport.
            </p>
          </div>

          {/* Phase 4 */}
          <div style={{
            background: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: '#ede9fe',
              color: '#6d28d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              4
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
              Groundwater Recharge
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Tankers deliver the water to approved multi-tiered gravel-sand recharge pits across Hyderabad parks and institutions, elevating the water table for upcoming summers.
            </p>
          </div>
        </div>
      </section>

      {/* User Roles Introduction */}
      <section>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem' }}>
          <span className="badge badge-success" style={{ marginBottom: '8px' }}>COLLABORATIVE ECOSYSTEM</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Choose Your Role
          </h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '1rem', marginTop: '4px' }}>
            RainRescue connects three essential pillars to solve urban waterlogging.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Citizen Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplet size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-900)' }}>Resident / Citizen</h3>
                <span className="badge badge-neutral">Community Reporter</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
              Spot water accumulation on your street? Take a picture, pinpoint coordinates, estimate volume, and monitor real-time recovery.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => {
                switchPersona('citizen');
                setActivePage('citizen-dashboard');
              }}
              style={{ width: '100%', borderColor: 'var(--primary-300)', color: 'var(--primary-700)' }}
            >
              Enter Citizen Portal <ArrowRight size={16} />
            </button>
          </div>

          {/* Tanker Operator Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--secondary-100)', color: 'var(--secondary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-900)' }}>Water Tanker Operator</h3>
                <span className="badge badge-success">Recovery Logistics</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
              Own or drive a water tanker? Put idle fleet capacity to work during rainy spells, pick up excess floodwater, perform field tests, and deliver to recharge pits.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => {
                switchPersona('operator');
                setActivePage('operator-dashboard');
              }}
              style={{ width: '100%', borderColor: 'var(--secondary-300)', color: 'var(--secondary-700)' }}
            >
              Enter Operator Portal <ArrowRight size={16} />
            </button>
          </div>

          {/* Municipal Administrator Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-900)' }}>GHMC / Authority</h3>
                <span className="badge badge-warning">Command & Control</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
              Municipal command center to audit citizen reports, dispatch tankers, manage approved recharge pits, inspect water tests, and export analytics.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => {
                switchPersona('admin');
                setActivePage('admin-dashboard');
              }}
              style={{ width: '100%', borderColor: '#fcd34d', color: '#b45309' }}
            >
              Enter Admin Portal <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Rainwater Calculator */}
      <section>
        <RainwaterCalculator />
      </section>
    </div>
  );
};

