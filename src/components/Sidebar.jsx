import React from 'react';
import { LayoutDashboard, Database, Target, Users, Bot, Settings, Zap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'ingestion', label: 'Data Ingestion', icon: Database },
        { id: 'segmentation', label: 'AI Segmentation', icon: Target },
        { id: 'leads', label: 'Customers / Leads', icon: Users },
        { id: 'campaigns', label: 'GenAI Campaigns', icon: Bot },
    ];

    return (
        <aside style={{ width: '260px', minHeight: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', borderRight: '1px solid #e2e8f0', background: '#ffffff', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ background: '#4f46e5', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
                    <Zap size={22} color="white" />
                </div>
                <div>
                    <h1 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Aura AI</h1>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>Outbound Sales Intel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem', paddingLeft: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Main Menu</p>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.65rem 0.75rem', borderRadius: '0.5rem',
                            border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                            background: activeTab === item.id ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                            color: activeTab === item.id ? '#4f46e5' : '#475569',
                            fontWeight: activeTab === item.id ? 600 : 500,
                            fontSize: '0.875rem',
                            borderLeft: activeTab === item.id ? '3px solid #4f46e5' : '3px solid transparent',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                    onClick={() => setActiveTab('admin')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.65rem 0.75rem', borderRadius: '0.5rem',
                        border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                        background: activeTab === 'admin' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                        color: activeTab === 'admin' ? '#4f46e5' : '#475569',
                        fontWeight: 500, fontSize: '0.875rem',
                        borderLeft: activeTab === 'admin' ? '3px solid #4f46e5' : '3px solid transparent',
                    }}
                >
                    <Settings size={18} />
                    <span>Admin Settings</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', marginTop: '0.25rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>
                        M
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>mithun</p>
                        <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>mithunuser2525@gmail.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
