import React from 'react';
import { 
  Droplet, 
  PlusCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  Truck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate, formatLitres } from '../utils/formatters';

export const CitizenDashboardPage = ({ setActivePage }) => {
  const { currentUser } = useAuth();
  const { reports, collectionRequests, metrics } = useData();

  // Filter reports submitted by current citizen or all demonstration reports
  const myReports = reports;

  const citizenContributionLitres = reports
    .filter(r => r.status === 'completed' || r.status === 'in_progress')
    .reduce((sum, r) => sum + (r.waterVolumeLitres || 0), 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0e8ce9, #0284c7)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.9, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700 }}>
            RESIDENT PORTAL • TELANGANA
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '4px 0' }}>
            Namaste, {currentUser?.name || 'Citizen'}!
          </h1>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', maxWidth: '600px' }}>
            Thank you for helping keep Hyderabad's roads safe and our deep granite aquifers replenished.
          </p>
        </div>

        <button
          className="btn btn-secondary btn-lg"
          onClick={() => setActivePage('report-waterlogging')}
          style={{ fontWeight: 700 }}
        >
          <PlusCircle size={20} />
          Report Waterlogging Now
        </button>
      </div>

      {/* Citizen Key Metrics */}
      <div className="grid-4">
        <MetricCard
          title="Active Reports"
          value={reports.filter(r => r.status !== 'completed').length}
          icon={Clock}
          color="amber"
          subtext="Under municipal review or collection"
        />
        <MetricCard
          title="Cleared Inundations"
          value={reports.filter(r => r.status === 'completed').length}
          icon={CheckCircle2}
          color="secondary"
          subtext="Safely directed to recharge pits"
        />
        <MetricCard
          title="Water Recovered"
          value={formatLitres(citizenContributionLitres)}
          icon={Droplet}
          color="primary"
          subtext="From your community reports"
        />
        <MetricCard
          title="City Aquifer Rise"
          value={`+${metrics.estimatedGroundwaterRiseCm} cm`}
          icon={TrendingUp}
          color="secondary"
          subtext="Groundwater table elevation"
        />
      </div>

      {/* Recent Reported Waterlogging Spots */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Droplet size={20} color="var(--primary-600)" />
              Reported Waterlogging Locations
            </h3>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Track verification status and tanker collection progress
            </div>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActivePage('report-waterlogging')}
          >
            <PlusCircle size={15} />
            New Report
          </button>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Area / Spot</th>
                <th>Water Depth</th>
                <th>Est. Volume</th>
                <th>Severity</th>
                <th>Reported On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myReports.map((rep) => {
                const linkedReq = collectionRequests.find(r => r.reportId === rep.id);

                return (
                  <tr key={rep.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={rep.photoUrl || "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=100&q=80"}
                          alt={rep.area}
                          style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ color: 'var(--slate-900)', fontSize: '0.95rem' }}>{rep.area}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'var(--slate-400)' }}>
                            ID: {rep.id} • {rep.locality}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{rep.waterDepthFeet || 1.5} ft</td>
                    <td>
                      <strong>{(rep.waterVolumeLitres || 0).toLocaleString()} L</strong>
                    </td>
                    <td>
                      <span style={{
                        color: rep.severity === 'Severe' ? 'var(--red-600)' :
                               rep.severity === 'High' ? '#ea580c' :
                               rep.severity === 'Moderate' ? '#b45309' : '#16a34a',
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}>
                        {rep.severity}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.825rem' }}>{formatDate(rep.reportedAt)}</td>
                    <td>
                      <StatusBadge status={rep.status} />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setActivePage('map')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <MapPin size={13} /> View on Map
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Community Impact Story */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4, #e0f2fe)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        border: '1px solid var(--secondary-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ maxWidth: '750px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary-800)', fontWeight: 700, fontSize: '0.85rem' }}>
            <Sparkles size={16} />
            COMMUNITY ENVIRONMENTAL IMPACT
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '4px' }}>
            Why reporting waterlogging saves Hyderabad's water future
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginTop: '6px', lineHeight: 1.5 }}>
            Each 10,000-litre tanker diverted from urban roads to an approved <em>recharge pit</em> directly recharges the weathered granitic aquifers beneath Hyderabad. Without this initiative, that water would wash silt into Musi river drains and evaporate, leaving borewells dry by April.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => setActivePage('calculator')}
        >
          Try Impact Calculator
        </button>
      </div>
    </div>
  );
};

