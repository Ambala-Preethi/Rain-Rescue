import React from 'react';
import {
  Home,
  Map,
  PlusCircle,
  LayoutDashboard,
  Truck,
  Inbox,
  Navigation,
  ShieldAlert,
  Droplets,
  BarChart3,
  Info,
  Calculator,
  UserCheck,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ activePage, setActivePage, isOpen }) => {
  const { currentUser, isCitizen, isOperator, isAdmin } = useAuth();

  if (!isOpen) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Main General Section */}
        <div className="sidebar-heading">Navigation</div>
        <div
          className={`sidebar-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => setActivePage('home')}
        >
          <Home size={18} />
          <span>Overview</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'map' ? 'active' : ''}`}
          onClick={() => setActivePage('map')}
        >
          <Map size={18} />
          <span>Interactive Map</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'calculator' ? 'active' : ''}`}
          onClick={() => setActivePage('calculator')}
        >
          <Calculator size={18} />
          <span>Recharge Calculator</span>
        </div>

        {/* Citizen Section */}
        <div className="sidebar-heading" style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Citizen Portal</span>
          {isCitizen && <span style={{ fontSize: '0.65rem', color: 'var(--primary-600)', background: 'var(--primary-50)', padding: '1px 6px', borderRadius: '4px' }}>Active</span>}
        </div>
        <div
          className={`sidebar-item ${activePage === 'citizen-dashboard' ? 'active' : ''}`}
          onClick={() => setActivePage('citizen-dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Citizen Dashboard</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'report-waterlogging' ? 'active' : ''}`}
          onClick={() => setActivePage('report-waterlogging')}
        >
          <PlusCircle size={18} />
          <span>Report Waterlogging</span>
        </div>

        {/* Tanker Operator Section */}
        <div className="sidebar-heading" style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Tanker Operations</span>
          {isOperator && <span style={{ fontSize: '0.65rem', color: 'var(--primary-600)', background: 'var(--primary-50)', padding: '1px 6px', borderRadius: '4px' }}>Active</span>}
        </div>
        <div
          className={`sidebar-item ${activePage === 'operator-dashboard' ? 'active' : ''}`}
          onClick={() => setActivePage('operator-dashboard')}
        >
          <Truck size={18} />
          <span>Operator Dashboard</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'collection-requests' ? 'active' : ''}`}
          onClick={() => setActivePage('collection-requests')}
        >
          <Inbox size={18} />
          <span>Collection Requests</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'delivery-tracking' ? 'active' : ''}`}
          onClick={() => setActivePage('delivery-tracking')}
        >
          <Navigation size={18} />
          <span>Delivery Tracking</span>
        </div>

        {/* Municipal Authority / Admin Section */}
        <div className="sidebar-heading" style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>GHMC Authority</span>
          {isAdmin && <span style={{ fontSize: '0.65rem', color: 'var(--primary-600)', background: 'var(--primary-50)', padding: '1px 6px', borderRadius: '4px' }}>Active</span>}
        </div>
        <div
          className={`sidebar-item ${activePage === 'admin-dashboard' ? 'active' : ''}`}
          onClick={() => setActivePage('admin-dashboard')}
        >
          <ShieldAlert size={18} />
          <span>Admin Command Center</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'manage-tankers' ? 'active' : ''}`}
          onClick={() => setActivePage('manage-tankers')}
        >
          <Truck size={18} />
          <span>Manage Tankers</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'manage-recharge-pits' ? 'active' : ''}`}
          onClick={() => setActivePage('manage-recharge-pits')}
        >
          <Droplets size={18} />
          <span>Manage Recharge Pits</span>
        </div>
        <div
          className={`sidebar-item ${activePage === 'analytics' ? 'active' : ''}`}
          onClick={() => setActivePage('analytics')}
        >
          <BarChart3 size={18} />
          <span>Reports & Analytics</span>
        </div>

        {/* Information Section */}
        <div className="sidebar-heading" style={{ marginTop: '0.75rem' }}>About Platform</div>
        <div
          className={`sidebar-item ${activePage === 'about' ? 'active' : ''}`}
          onClick={() => setActivePage('about')}
        >
          <Info size={18} />
          <span>About RainRescue</span>
        </div>
      </div>
    </aside>
  );
};

