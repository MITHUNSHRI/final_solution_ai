import React from 'react';
import { segmentationData } from '../data/mockData';
import { BrainCircuit, Filter, PieChart, Users, Zap } from 'lucide-react';

const Segmentation = () => {
    return (
        <div className="p-8 flex flex-col gap-8 w-full animate-fade-in">
            {/* Header Area */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold mb-1">AI Customer Segmentation</h2>
                    <p className="text-sm text-secondary">Dynamically mapped based on CRM maturity and repository use-cases.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn btn-outline"><Filter size={16} /> Filter</button>
                    <button className="btn btn-accent"><BrainCircuit size={16} /> Re-run AI Analysis</button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="glass-panel p-6 flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400"><Users size={24} /></div>
                    <div>
                        <h4 className="text-2xl font-bold">1,510</h4>
                        <p className="text-xs text-secondary">Total Segmented Leads</p>
                    </div>
                </div>
                <div className="glass-panel p-6 flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><PieChart size={24} /></div>
                    <div>
                        <h4 className="text-2xl font-bold">5</h4>
                        <p className="text-xs text-secondary">Primary Clusters Found</p>
                    </div>
                </div>
                <div className="glass-panel p-6 flex items-center gap-4 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <div className="p-3 bg-indigo-500 rounded-xl text-white"><Zap size={24} /></div>
                    <div>
                        <h4 className="text-2xl font-bold text-indigo-400">92%</h4>
                        <p className="text-xs text-secondary">Avg AI Match Confidence</p>
                    </div>
                </div>
            </div>

            {/* Segments Table */}
            <div className="glass-panel mt-2 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-xs text-secondary uppercase tracking-wider">
                            <th className="p-4 font-medium">Customer Segment</th>
                            <th className="p-4 font-medium">Audience Size</th>
                            <th className="p-4 font-medium">CRM Maturity</th>
                            <th className="p-4 font-medium">Mapped Internal Use-Case</th>
                            <th className="p-4 font-medium text-right">AI Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {segmentationData.map((seg, idx) => (
                            <tr key={seg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <span className="font-semibold text-sm group-hover:text-indigo-400 transition-colors">{seg.segment}</span>
                                </td>
                                <td className="p-4 text-sm">{seg.size} leads</td>
                                <td className="p-4">
                                    <span className={`badge ${seg.maturity === 'High' ? 'badge-success' : seg.maturity === 'Medium' ? 'badge-warning' : 'badge-primary'}`}>
                                        {seg.maturity}
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-medium text-emerald-100 bg-emerald-500/5 rounded">
                                    {seg.relevantUseCase}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500" style={{ width: `${seg.aiScore}%` }}></div>
                                        </div>
                                        <span className="text-sm font-bold">{seg.aiScore}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Segmentation;
