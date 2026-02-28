import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DataIngestion from './pages/DataIngestion';
import Segmentation from './pages/Segmentation';
import Campaigns from './pages/Campaigns';
import Leads from './pages/Leads';
import AdminSettings from './pages/AdminSettings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalLeads, setGlobalLeads] = useState([]);

  // Load leads from database on startup
  useEffect(() => {
    fetch('/api/customers')
      .then(r => r.json())
      .then(data => setGlobalLeads(Array.isArray(data) ? data : []))
      .catch(() => { }); // Backend offline — leads start empty
  }, []);


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ingestion':
        return <DataIngestion />;
      case 'segmentation':
        return <Segmentation />;
      case 'leads':
        return <Leads leads={globalLeads} setLeads={setGlobalLeads} />;
      case 'campaigns':
        return <Campaigns leads={globalLeads} />;
      case 'admin':
        return <AdminSettings />;
      default:
        return <Dashboard />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'ingestion':
        return 'Data Sources & Repositories';
      case 'segmentation':
        return 'Customer Mapping & Segments';
      case 'leads':
        return 'Customer & Lead Management';
      case 'campaigns':
        return 'GenAI Outbound Campaigns';
      case 'admin':
        return 'System Configuration';
      default:
        return 'Aura AI';
    }
  };

  return (
    <div className="flex w-full min-h-screen relative z-10">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden h-screen bg-[#f8fafc]/50 backdrop-blur-3xl relative">
        <Header title={getHeaderTitle()} />
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
