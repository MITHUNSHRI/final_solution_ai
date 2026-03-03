import React, { useState } from 'react';
import { useUIConfig } from '../context/UIConfigContext';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

// A completely configuration-driven button
const DynamicActionBtn = ({ actionKey, payload = {}, onComplete = () => { }, className = "", children }) => {
    const { config, loading: configLoading } = useUIConfig();
    const [isExecuting, setIsExecuting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' or 'error'
    const [message, setMessage] = useState('');

    // Wait until backend config loads
    if (configLoading || !config) return null;

    const actionConfig = config.buttons[actionKey];

    // Respect Visibility rule from backend config
    if (!actionConfig || !actionConfig.visible) return null;

    const handleClick = async () => {
        setIsExecuting(true);
        setStatus(null);
        setMessage('');

        try {
            const response = await fetch(`/api/actions/${actionKey}`, {
                method: actionConfig.method || 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || actionConfig.errorMessage);
            }

            setStatus('success');
            setMessage(actionConfig.successMessage || 'Success');
            onComplete(data);

            // Reset success visually after 3 seconds
            setTimeout(() => {
                setStatus(null);
                setMessage('');
            }, 3000);

        } catch (err) {
            console.error(`DynamicActionBtn error [${actionKey}]:`, err);
            setStatus('error');
            setMessage(err.message || actionConfig.errorMessage);

            // Reset error visually after 5 seconds
            setTimeout(() => {
                setStatus(null);
                setMessage('');
            }, 5000);
        } finally {
            setIsExecuting(false);
        }
    };

    // Determine visual style based on backend config
    let btnClass = "btn";
    if (actionConfig.uiStyle === 'primary') btnClass += " btn-primary";
    else if (actionConfig.uiStyle === 'accent') btnClass += " btn-accent";
    else if (actionConfig.uiStyle === 'outline') btnClass += " btn-outline";

    // Override if custom class provided
    if (className) btnClass += ` ${className}`;

    // Respect Enabled rule from backend config
    const isDisabled = !actionConfig.enabled || isExecuting || status === 'success';

    return (
        <div className="flex flex-col items-center relative group">
            <button
                className={`${btnClass} ${status === 'success' ? '!bg-emerald-500 !text-white !border-transparent' : ''}`}
                onClick={handleClick}
                disabled={isDisabled}
                title={actionConfig.label}
            >
                {isExecuting ? <><Loader2 size={16} className="animate-spin mr-1" /> Executing...</> :
                    status === 'success' ? <><CheckCircle2 size={16} className="mr-1" /> {actionConfig.label}</> :
                        children || actionConfig.label}
            </button>

            {/* Minimal inline feedback tooltip */}
            {status && (
                <div className={`absolute top-full mt-2 text-[10px] px-2 py-1 rounded-md whitespace-nowrap z-50 animate-fade-in
                    ${status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default DynamicActionBtn;
