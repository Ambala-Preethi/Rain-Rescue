import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Droplet, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  Download, 
  Check, 
  X, 
  TrendingUp, 
  BarChart3,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { useData } from '../context/DataContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { AssignTankerModal } from '../components/workflow/AssignTankerModal';
import { exportReportsToCsv } from '../utils/exportToCsv';
import { formatLitres, formatDate } from '../utils/formatters';

export const AdminDashboardPage = ({ setActivePage }) => {
  const { 
    reports, 
    tankers, 
    rechargePits, 
    collectionRequests, 
    dailyChartData, 
    areaCollectionData, 
    metrics, 
    verifyReport 
  } = useData();

  const [selectedReportForAssign, setSelectedReportForAssign] = useState(null);
  const [filterLocality, setFilterLocality] = useState('all');

  const pendingVerificationReports = reports.filter(r => r.status === 'pending_verification');
  const approvedAwaitingTanker = reports.filter(r => r.status === 'approved_for_collection');

  const handleExportCsv = () => {
    exportReportsToCsv(reports, `GHMC_Rainwater_Recovery_Report_${new Date().toISOString().slice(0,10)}.csv`);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Admin Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #092c4c, #064b85)',
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
          <div style={{ fontSize: '0.825rem', opacity: 0.9, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700 }}>
            GREATER HYDERABAD MUNICIPAL CORPORATION • COMMAND CENTRE
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '4px 0' }}>
            RainRescue Municipal Operations & Analytics
          </h1>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Real-time storm water extraction dispatch, water quality verification, and recharge pit management.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-secondary"
            onClick={handleExportCsv}
            style={{ fontWeight: 700 }}
          >
            <Download size={16} /> Export CSV Report
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setActivePage('manage-recharge-pits')}
            style={{ background: 'white', color: 'var(--slate-900)' }}
          >
            Manage Recharge Pits
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid-4">
        <MetricCard
          title="Total Reports Logged"
          value={metrics.totalReportsCount}
          icon={Droplet}
          color="primary"
          subtext="From citizens & sensors"
        />
        <MetricCard
          title="Available Tankers"
          value={`${metrics.availableTankersCount} / ${tankers.length}`}
          icon={Truck}
          color="secondary"
          subtext="Ready for dispatch"
        />
        <MetricCard
          title="Recharged Volume"
          value={formatLitres(metrics.totalWaterDeliveredLitres)}
          icon={CheckCircle2}
          color="secondary"
          subtext="Infused into aquifers"
        />
        <MetricCard
          title="Water Table Elevation"
          value={`+${metrics.estimatedGroundwaterRiseCm} cm`}
          icon={TrendingUp}
          color="amber"
          subtext="Cumulative aquifer rise"
        />
      </div>

      {/* Pending Citizen Verification Backlog */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Clock size={20} color="#b45309" />
              Citizen Inundation Reports Awaiting Municipal Verification
            </h3>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Verify flood spots to authorize tanker dispatch or reject contaminated runoff
            </div>
          </div>
          <span className="badge badge-warning">{pendingVerificationReports.length} Pending Audit</span>
        </div>

        {pendingVerificationReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--slate-400)' }}>
            No reports currently pending verification. All logged spots have been evaluated.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Spot / Landmark</th>
                  <th>Locality</th>
                  <th>Volume</th>
                  <th>Water Depth</th>
                  <th>Severity</th>
                  <th>Citizen Contact</th>
                  <th>Decision Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingVerificationReports.map(rep => (
                  <tr key={rep.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{rep.area}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>ID: {rep.id}</div>
                    </td>
                    <td>{rep.locality}</td>
                    <td><strong>{rep.waterVolumeLitres.toLocaleString()} L</strong></td>
                    <td>{rep.waterDepthFeet} ft</td>
                    <td>
                      <span style={{
                        color: rep.severity === 'Severe' ? 'var(--red-600)' :
                               rep.severity === 'High' ? '#ea580c' : '#16a34a',
                        fontWeight: 700
                      }}>
                        {rep.severity}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.825rem' }}>{rep.reportedBy} ({rep.citizenPhone})</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => verifyReport(rep.id, true)}
                          title="Approve for Tanker Pickup"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => verifyReport(rep.id, false, "GHMC Officer", "Suspected industrial sewage mixing")}
                          title="Flag Contaminated / Divert"
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approved Reports Awaiting Tanker Assignment */}
      {approvedAwaitingTanker.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid var(--primary-600)' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <Truck size={20} color="var(--primary-600)" />
                Approved Spots Ready for Tanker Assignment (Step 4)
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                Assign an available tanker and destination recharge pit
              </div>
            </div>
            <span className="badge badge-info">{approvedAwaitingTanker.length} Ready to Dispatch</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {approvedAwaitingTanker.map(rep => (
              <div key={rep.id} style={{
                background: 'var(--slate-50)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--slate-900)' }}>{rep.area}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                    {rep.locality} • Est. <strong>{rep.waterVolumeLitres.toLocaleString()} L</strong> ({rep.waterDepthFeet} ft)
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '6px' }}>
                    {rep.description}
                  </p>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => setSelectedReportForAssign(rep)}
                  >
                    <Truck size={15} /> Assign Tanker & Recharge Pit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Charts Section (Recharts) */}
      <div className="grid-2">
        {/* Daily Rainwater Collection & Delivery */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
                <BarChart3 size={18} color="var(--primary-600)" />
                Daily Water Collection vs. Recharge Delivery (Litres)
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                Demonstration trend over 7-day monsoon spell
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} L`, '']} />
                <Legend />
                <Bar dataKey="collectedLitres" name="Collected Water (L)" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deliveredLitres" name="Recharged into Aquifer (L)" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area-Wise Waterlogging & Harvest Volume */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
                <Droplet size={18} color="var(--secondary-600)" />
                Area-Wise Harvest Volume (kiloLitres - kL)
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                Hyderabad key urban corridors
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaCollectionData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="area" type="category" stroke="#64748b" fontSize={11} width={130} />
                <Tooltip formatter={(value) => [`${value} kL`, 'Harvested']} />
                <Bar dataKey="volumeKL" name="Volume Harvested (kL)" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Assign Tanker Modal */}
      {selectedReportForAssign && (
        <AssignTankerModal
          isOpen={!!selectedReportForAssign}
          onClose={() => setSelectedReportForAssign(null)}
          report={selectedReportForAssign}
        />
      )}
    </div>
  );
};

