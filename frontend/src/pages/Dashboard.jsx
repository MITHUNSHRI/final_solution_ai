import React from 'react';
import { metricsData, recentLeads, campaignData } from '../data/mockData';
import { Users, Clock, Mail, LineChart, ArrowUpRight, ArrowDownRight, MapPin, Building, Briefcase } from 'lucide-react';

const MetricCard = ({ title, data, icon: Icon }) => (
    <div className="glass-panel p-6 w-full">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${data.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {data.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {data.trend}
            </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">{data.value}</h3>
        <p className="text-secondary text-sm">{title}</p>
    </div>
);

const Dashboard = () => {
    return (
        <div className="p-8 flex flex-col gap-8 w-full animate-fade-in">

            {/* Metrics Row */}
            <div className="grid grid-cols-4 gap-6">
                <MetricCard title="Qualified Leads Gen" data={metricsData.qualifiedLeads} icon={Users} />
                <MetricCard title="Sales Effort Saved" data={metricsData.salesEffortSaved} icon={Clock} />
                <MetricCard title="AI Emails Sent" data={metricsData.emailsSent} icon={Mail} />
                <MetricCard title="Avg. Conversion Rate" data={metricsData.conversionRate} icon={LineChart} />
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Active Campaigns */}
                <div className="glass-panel p-6 col-span-2 flex flex-col delay-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Active GenAI Campaigns</h3>
                        <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">View All</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {campaignData.map(campaign => (
                            <div key={campaign.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors overflow-hidden">
                                <div className="flex flex-col gap-1 w-1/3 min-w-0">
                                    <span className="font-medium text-sm text-primary-50 truncate">{campaign.name}</span>
                                    <span className={`badge w-fit ${campaign.status === 'Active' ? 'badge-success' : campaign.status === 'Scheduled' ? 'badge-warning' : 'badge-primary'}`}>
                                        {campaign.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-8 w-1/2 justify-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-secondary">Sent</span>
                                        <span className="font-semibold">{campaign.sent}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-secondary">Opened</span>
                                        <span className="font-semibold">{campaign.opened}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-secondary">Replied</span>
                                        <span className="font-semibold text-emerald-400">{campaign.replied}</span>
                                    </div>
                                </div>

                                <div className="w-1/6 flex justify-end">
                                    <button className="btn-icon">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Matches / Recent Leads */}
                <div className="glass-panel p-6 delay-200 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Top Matched Leads</h3>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        {recentLeads.slice(0, 4).map(lead => (
                            <div key={lead.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm">
                                    {lead.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex flex-col flex-1 truncate">
                                    <span className="font-medium text-sm truncate group-hover:text-indigo-400 transition-colors">{lead.name}</span>
                                    <div className="flex items-center gap-2 text-xs text-secondary truncate">
                                        <Building size={12} /> <span className="truncate">{lead.company}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-emerald-400 font-bold text-sm">{lead.matchScore}%</span>
                                    <span className="text-xs text-tertiary">Match</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-outline w-full mt-4 text-sm">
                        View All Internal Matches
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
