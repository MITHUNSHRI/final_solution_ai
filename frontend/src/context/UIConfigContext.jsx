import React, { createContext, useContext, useState, useEffect } from 'react';

// Default configuration used if backend is offline
const DEFAULT_CONFIG = {
    features: {
        crmSync: { enabled: true, label: 'CRM Live Sync' },
        aiSequencing: { enabled: true, label: 'AI Email Sequencing' },
        autoApproveEmails: { enabled: false, label: 'Auto-Approve Outbound Emails' },
        useRepositoryEmbeddings: { enabled: true, label: 'Vectorize Internal Case Studies' }
    },
    buttons: {
        action_generate_campaign: { label: 'Auto-Generate AI Copy', visible: true, enabled: true, endpoint: '/api/actions/action_generate_campaign', method: 'POST', successMessage: 'Generated!', errorMessage: 'Failed.', uiStyle: 'primary' },
        action_send_email: { label: 'Dispatch Email Now', visible: true, enabled: true, endpoint: '/api/actions/action_send_email', method: 'POST', successMessage: 'Email sent!', errorMessage: 'Send failed.', uiStyle: 'accent' },
        action_schedule_email: { label: 'Schedule Campaign', visible: true, enabled: true, endpoint: '/api/actions/action_schedule_email', method: 'POST', successMessage: 'Scheduled!', errorMessage: 'Failed.', uiStyle: 'outline' },
        action_force_sync: { label: 'Force CRM Re-Sync', visible: true, enabled: true, endpoint: '/api/actions/action_force_sync', method: 'POST', successMessage: 'Sync requested.', errorMessage: 'Sync failed.', uiStyle: 'outline' }
    }
};

const UIConfigContext = createContext();

export const UIConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [loading] = useState(false);

    const fetchConfig = async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);
            const response = await fetch(`${API_BASE}/api/config`, { signal: controller.signal });
            clearTimeout(timeout);
            if (response.ok) {
                const data = await response.json();
                setConfig(data);
            }
        } catch (err) {
            console.info('Backend offline — using default UI config. App works normally.');
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const reloadConfig = () => fetchConfig();

    return (
        <UIConfigContext.Provider value={{ config, loading, reloadConfig }}>
            {children}
        </UIConfigContext.Provider>
    );
};

export const useUIConfig = () => useContext(UIConfigContext);
