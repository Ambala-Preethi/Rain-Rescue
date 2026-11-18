import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { DemoBanner } from './components/common/DemoBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CitizenDashboardPage } from './pages/CitizenDashboardPage';
import { ReportWaterloggingPage } from './pages/ReportWaterloggingPage';
import { InteractiveMapPage } from './pages/InteractiveMapPage';
import { TankerDashboardPage } from './pages/TankerDashboardPage';
import { CollectionRequestsPage } from './pages/CollectionRequestsPage';
import { DeliveryTrackingPage } from './pages/DeliveryTrackingPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ManageTankersPage } from './pages/ManageTankersPage';
import { ManageRechargePitsPage } from './pages/ManageRechargePitsPage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalyticsPage';
import { AboutPage } from './pages/AboutPage';
import { RainwaterCalculator } from './components/calculator/RainwaterCalculator';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      case 'citizen-dashboard':
        return <CitizenDashboardPage setActivePage={setActivePage} />;
      case 'report-waterlogging':
        return <ReportWaterloggingPage setActivePage={setActivePage} />;
      case 'map':
        return <InteractiveMapPage setActivePage={setActivePage} />;
      case 'operator-dashboard':
        return <TankerDashboardPage setActivePage={setActivePage} />;
      case 'collection-requests':
        return <CollectionRequestsPage setActivePage={setActivePage} />;
      case 'delivery-tracking':
        return <DeliveryTrackingPage setActivePage={setActivePage} />;
      case 'admin-dashboard':
        return <AdminDashboardPage setActivePage={setActivePage} />;
      case 'manage-tankers':
        return <ManageTankersPage setActivePage={setActivePage} />;
      case 'manage-recharge-pits':
        return <ManageRechargePitsPage setActivePage={setActivePage} />;
      case 'analytics':
        return <ReportsAnalyticsPage setActivePage={setActivePage} />;
      case 'calculator':
        return (
          <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>
              Telangana Rainwater Harvest Potential Calculator
            </h1>
            <RainwaterCalculator />
          </div>
        );
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      <DemoBanner />
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        toggleSidebar={toggleSidebar}
      />
      <div className="main-layout">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          isOpen={isSidebarOpen}
        />
        <main className="main-content">
          {renderCurrentPage()}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

