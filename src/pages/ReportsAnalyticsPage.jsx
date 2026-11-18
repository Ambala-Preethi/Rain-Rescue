import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  PieChart as PieIcon,
  FileSpreadsheet
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { useData } from '../context/DataContext';
import { MetricCard } from '../components/common/MetricCard';
import { exportReportsToCsv } from '../utils/exportToCsv';
import { formatLitres } from '../utils/formatters';

const WEEKLY_TREND = [
  { week: 'Week 1 (Oct)', rainfallMm: 85, waterCollectedKL: 140, waterRechargedKL: 135, waterTableRiseCm: 12 },
  { week: 'Week 2 (Oct)', rainfallMm: 120, waterCollectedKL: 210, waterRechargedKL: 202, waterTableRiseCm: 18 },
  { week: 'Week 3 (Oct)', rainfallMm: 95, waterCollectedKL: 175, waterRechargedKL: 170, waterTableRiseCm: 15 },
  { week: 'Week 4 (Oct)', rainfallMm: 60, waterCollectedKL: 110, waterRechargedKL: 108, waterTableRiseCm: 9 },
  { week: 'Week 1 (Nov)', rainfallMm: 145, waterCollectedKL: 280, waterRechargedKL: 272, waterTableRiseCm: 25 },
  { week: 'Week 2 (Nov)', rainfallMm: 110, waterCollectedKL: 195, waterRechargedKL: 190, waterTableRiseCm: 17 },
  { week: 'Week 3 (Nov)', rainfallMm: 130, waterCollectedKL: 245, waterRechargedKL: 238, waterTableRiseCm: 22 }
];

export const ReportsAnalyticsPage = () => {
  const { reports, dailyChartData, areaCollectionData, metrics } = useData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('monsoon_season');

  const handleDownloadCsv = () => {
    exportReportsToCsv(reports, `RainRescue_Comprehensive_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Rainwater Recovery & Environmental Analytics
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
            Audited hydrological data for Greater Hyderabad & Telangana State Ground Water Department.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="form-select"
            style={{ width: 'auto' }}
          >
            <option value="current_week">Current Week</option>
            <option value="current_month">Current Month</option>
            <option value="monsoon_season">Complete Monsoon 2026</option>
          </select>

          <button
            className="btn btn-secondary"
            onClick={handleDownloadCsv}
            style={{ fontWeight: 700 }}
          >
            <Download size={16} /> Download CSV
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid-4">
        <MetricCard
          title="Monsoon Water Recovered"
          value={formatLitres(metrics.totalWaterCollectedLitres)}
          icon={Droplet}
          color="primary"
          subtext="Prevented from drainage overflow"
        />
        <MetricCard
          title="Aquifer Volume Injected"
          value={formatLitres(metrics.totalWaterDeliveredLitres)}
          icon={CheckCircle2}
          color="secondary"
          subtext="Injected through recharge pits"
        />
        <MetricCard
          title="Groundwater Elevation"
          value={`+${metrics.estimatedGroundwaterRiseCm} cm`}
          icon={TrendingUp}
          color="amber"
          subtext="Hydraulic head increase"
        />
        <MetricCard
          title="Water Quality Compliance"
          value="98.4%"
          icon={ShieldCheck}
          color="secondary"
          subtext="Pass rate for pH & Turbidity"
        />
      </div>

      {/* Chart 1: Daily Water Collection vs. Recharge Delivery */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <BarChart3 size={20} color="var(--primary-600)" />
              Daily Rainwater Collection vs. Aquifer Recharge (Litres)
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Comparison of volume extracted from streets vs. infused into approved recharge pits
            </div>
          </div>
          <span className="badge badge-info">Demonstration Data</span>
        </div>

        <div style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyChartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(v) => `${v / 1000}k L`} />
              <Tooltip formatter={(val) => [`${val.toLocaleString()} Litres`, '']} />
              <Legend />
              <Bar dataKey="collectedLitres" name="Collected Excess Rainwater" fill="#0284c7" radius={[6, 6, 0, 0]} />
              <Bar dataKey="deliveredLitres" name="Delivered to Recharge Pit" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2 & 3: Weekly Trends & Area Distribution */}
      <div className="grid-2">
        {/* Weekly Rain vs Groundwater Elevation */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
                Weekly Rain Intensity vs. Aquifer Rise (+cm)
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                Demonstrating direct correlation between recovery and water table rise
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_TREND} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="waterTableRiseCm" name="Water Table Rise (cm)" stroke="#16a34a" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="rainfallMm" name="Rainfall (mm)" stroke="#0284c7" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area-Wise Water Volume Distribution */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
                Area-Wise Harvest Volume Breakdown (kL)
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                Top Hyderabad flood alleviation zones
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaCollectionData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="area" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip formatter={(val) => [`${val} kL`, 'Volume']} />
                <Area type="monotone" dataKey="volumeKL" name="Volume (kL)" stroke="#0e8ce9" fill="#e0effe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Environmental Impact Report Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f8fafc, #f0fdf4)', border: '1px solid var(--secondary-200)' }}>
        <div className="card-header">
          <h3 className="card-title">
            <CheckCircle2 size={20} color="var(--secondary-700)" />
            Telangana State Ground Water Audit: Monthly Impact Card
          </h3>
          <span className="badge badge-success">Official Demonstration Audit</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 700 }}>MUNICIPAL ROAD RETENTION SAVINGS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '4px' }}>
              85% Reduction
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '4px' }}>
              Inundation duration reduced from 4.5 hours down to 45 minutes on major arterial junctions.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 700 }}>SUMMER WATER SCARCITY OFFSET</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary-700)', marginTop: '4px' }}>
              ~18,500 Families
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '4px' }}>
              Sufficient groundwater reserved to supply domestic borewells through May-June dry months.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 700 }}>CARBON & ENERGY AVOIDANCE</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: '4px' }}>
              -42,000 kWh
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginTop: '4px' }}>
              Saved in deep pumping energy by keeping local water table levels high.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

