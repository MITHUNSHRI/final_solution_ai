import React from 'react';
import { dataSources } from '../data/mockData';
import { Database, Link, RefreshCw, CheckCircle2, Cloud } from 'lucide-react';

const DataIngestion = () => {
    return (
        <div className="p-8 flex flex-col gap-8 w-full animate-fade-in">
            <div className="flex justify-between items-center bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-xl">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-indigo-100">Data Connections</h3>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-6">

                {/* Connected Sources */}
                <div className="glass-panel p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Database className="text-indigo-400" size={20} />
                        <h3 className="text-lg font-bold">Connected Sources</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        {dataSources.map(source => (
                            <div key={source.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4 text-sm font-medium w-3/5">
                                    <div className={`p-2 rounded-lg ${source.type === 'CRM' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                        {source.type === 'CRM' ? <Cloud size={18} /> : <Database size={18} />}
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <span className="truncate">{source.name}</span>
                                        <span className="text-xs text-secondary">{source.type}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center w-1/5">
                                    <span className={`text-xs flex items-center gap-1 ${source.status === 'Connected' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {source.status === 'Connected' ? <CheckCircle2 size={14} /> : <RefreshCw size={14} className="animate-spin" />}
                                        {source.status}
                                    </span>
                                </div>

                                <div className="text-xs text-tertiary w-1/5 text-right">
                                    {source.lastSync}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sync Status / Config */}
                <div className="glass-panel p-6 flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Sync Configuration</h3>

                    <div className="flex flex-col gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            <h4 className="font-medium text-sm mb-1">CRM Sync Frequency</h4>
                            <p className="text-xs text-secondary mb-3">Currently set to sync every 2 hours.</p>
                            <select className="input text-sm p-2 w-full appearance-none bg-black/20" defaultValue="2h">
                                <option value="15m">Every 15 minutes</option>
                                <option value="1h">Every 1 hour</option>
                                <option value="2h">Every 2 hours</option>
                                <option value="24h">Daily</option>
                            </select>
                        </div>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                            <h4 className="font-medium text-sm mb-1">Repository AI Embeddings</h4>
                            <p className="text-xs text-secondary mb-3">Automatically vectorizes new case studies for fast semantic matching.</p>
                            <button className="btn btn-outline w-full text-sm">Force Rebuild Embeddings</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DataIngestion;
