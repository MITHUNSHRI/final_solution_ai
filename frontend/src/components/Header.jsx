import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useUIConfig } from '../context/UIConfigContext';

const Header = ({ title }) => {
    const { config } = useUIConfig();
    const btnConfig = config?.buttons?.action_new_campaign || { label: '+ New Campaign', visible: true, uiStyle: 'primary' };

    return (
        <header className="flex items-center justify-between px-8 py-6 glass" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, zIndex: 10 }}>
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    {title}
                </h2>
                <p className="text-sm text-secondary mt-1">AI-Powered Outbound Sales Intelligence Platform</p>
            </div>

            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads, campaigns..."
                        className="input pl-10 w-64"
                        style={{ borderRadius: 'var(--radius-full)' }}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="btn-icon relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
                    </button>


                </div>
            </div>
        </header>
    );
};

export default Header;
