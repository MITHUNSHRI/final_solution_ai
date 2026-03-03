import React, { useState, useEffect } from 'react';
import { useUIConfig } from '../context/UIConfigContext';
import { Settings, Save, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const AdminSettings = () => {
    const { config, reloadConfig, loading } = useUIConfig();
    const [localConfig, setLocalConfig] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    // Sync local state when config loads
    useEffect(() => {
        if (config) {
            setLocalConfig(JSON.parse(JSON.stringify(config))); // Deep copy
        }
    }, [config]);

    if (loading || !localConfig) {
        return <div className="p-8 flex items-center justify-center text-secondary h-full"><Loader2 className="animate-spin mr-2" /> Loading Engine Configuration...</div>;
    }

    const handleActionChange = (actionKey, field, value) => {
        setLocalConfig(prev => ({
            ...prev,
            buttons: {
                ...prev.buttons,
                [actionKey]: {
                    ...prev.buttons[actionKey],
                    [field]: value
                }
            }
        }));
    };

    const handleFeatureChange = (featureKey, field, value) => {
        setLocalConfig(prev => ({
            ...prev,
            features: {
                ...prev.features,
                [featureKey]: {
                    ...prev.features[featureKey],
                    [field]: value
                }
            }
        }));
    };

    const saveConfiguration = async () => {
        setSaving(true);
        setSaveStatus(null);
        try {
            const response = await fetch(`${API_BASE}/api/config`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(localConfig)
            });

            if (!response.ok) throw new Error('Failed to save configuration');

            setSaveStatus('success');
            reloadConfig(); // Update global context immediately so other pages see changes
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (err) {
            console.error(err);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(null), 4000);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 flex flex-col gap-8 w-full h-[calc(100vh-100px)] overflow-y-auto animate-fade-in relative z-10">

            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="text-indigo-600" /> UI Control Center</h2>
                    <p className="text-sm text-secondary mt-1">Dynamically override button labels, actions, and features across the application without code changes.</p>
                </div>
                <button
                    onClick={saveConfiguration}
                    disabled={saving}
                    className="btn btn-primary shadow-lg shadow-indigo-500/20"
                >
                    {saving ? <><Loader2 size={16} className="animate-spin mr-2" /> Saving...</> :
                        saveStatus === 'success' ? <><CheckCircle2 size={16} className="mr-2" /> Saved & Applied!</> :
                            <><Save size={16} className="mr-2" /> Publish Configuration</>}
                </button>
            </div>

            <div className="flex gap-8">

                {/* Feature Flags */}
                <div className="w-1/3 flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Global Feature Flags</h3>
                    <div className="flex flex-col gap-3">
                        {Object.entries(localConfig.features).map(([key, feature]) => (
                            <div key={key} className="glass-panel bg-white p-4 flex items-center justify-between shadow-sm">
                                <span className="text-sm font-medium">{feature.label}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={feature.enabled}
                                        onChange={(e) => handleFeatureChange(key, 'enabled', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button Architecture overrides */}
                <div className="w-2/3 flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Dynamic Action Buttons</h3>

                    <div className="grid grid-cols-1 gap-4">
                        {Object.entries(localConfig.buttons).map(([actionKey, actionData]) => (
                            <div key={actionKey} className="glass-panel bg-white p-5 flex flex-col gap-4 shadow-sm border-l-4" style={{ borderLeftColor: actionData.uiStyle === 'primary' ? '#4f46e5' : actionData.uiStyle === 'accent' ? '#059669' : '#slate-300' }}>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                                        <div className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-mono">{actionKey}</div>
                                    </h4>

                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                                            <input type="checkbox" checked={actionData.visible} onChange={(e) => handleActionChange(actionKey, 'visible', e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                                            Visible
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                                            <input type="checkbox" checked={actionData.enabled} onChange={(e) => handleActionChange(actionKey, 'enabled', e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                                            Enabled
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Display Label</label>
                                        <input
                                            type="text"
                                            className="input py-1.5 text-sm w-full bg-slate-50 border-slate-200"
                                            value={actionData.label}
                                            onChange={(e) => handleActionChange(actionKey, 'label', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Internal Endpoint Override</label>
                                        <input
                                            type="text"
                                            className="input py-1.5 text-sm w-full bg-slate-50 border-slate-200 font-mono text-xs text-indigo-600"
                                            value={actionData.endpoint}
                                            onChange={(e) => handleActionChange(actionKey, 'endpoint', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Success Feedback Message</label>
                                        <input
                                            type="text"
                                            className="input py-1.5 text-sm w-full bg-slate-50 border-slate-200"
                                            value={actionData.successMessage}
                                            onChange={(e) => handleActionChange(actionKey, 'successMessage', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Styling</label>
                                        <select
                                            className="input py-1.5 text-sm w-full bg-slate-50 border-slate-200 text-slate-700"
                                            value={actionData.uiStyle}
                                            onChange={(e) => handleActionChange(actionKey, 'uiStyle', e.target.value)}
                                        >
                                            <option value="primary">Primary (Indigo)</option>
                                            <option value="accent">Accent (Emerald)</option>
                                            <option value="outline">Outline (Ghost)</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
