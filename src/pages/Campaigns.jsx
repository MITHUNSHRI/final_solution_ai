import React, { useState, useEffect } from 'react';
import { campaignData } from '../data/mockData';
import { Send, Calendar, MessageSquare, Sparkles, Wand2, ChevronRight, CheckCircle2, Loader2, Check } from 'lucide-react';
import DynamicActionBtn from '../components/DynamicActionBtn';

const Campaigns = ({ leads = [] }) => {
    const [selectedCampaign, setSelectedCampaign] = useState(campaignData[0]);
    const [selectedLeadIndex, setSelectedLeadIndex] = useState(0);

    const defaultBody = `Hi {firstName},\n\nI noticed {company} has been scaling your cloud infrastructure rapidly recently. Often, this leads to complex, runaway AWS costs that pull your engineering team away from product development.\n\n*** AI Injected Context from Repository (Cloud Cost Use-case) ***\nWe recently helped a similar Enterprise SaaS company reduce their monthly AWS bill by 34% within 60 days, purely through automated orchestration—requiring zero code changes from their engineering team.\n\nGiven you're currently leading the efforts at {company}, would you be open to a brief chat next week to see how this framework could apply to your current setup?\n\nBest,\nMithun\nmithunshri2005@gmail.com`;

    const [emailBody, setEmailBody] = useState('');

    // Auto-replace variables when lead changes or campaign changes
    useEffect(() => {
        const lead = leads[selectedLeadIndex] || {};
        const firstName = lead.name ? lead.name.split(' ')[0] : 'Lead';
        const company = lead.company || 'your company';

        let newBody = defaultBody
            .replace(/\{firstName\}/g, firstName)
            .replace(/\{company\}/g, company);

        setEmailBody(newBody);
    }, [selectedCampaign, selectedLeadIndex, leads]);

    const handleSend = () => {
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setSentStatus('sent');
            setTimeout(() => setSentStatus(null), 3000);
        }, 1500);
    };

    return (
        <div className="p-8 flex gap-8 w-full h-[calc(100vh-100px)] overflow-hidden animate-fade-in relative z-10">

            {/* Campaign List */}
            <div className="w-1/3 flex flex-col gap-4 overflow-y-auto pr-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">Campaigns</h2>
                    <DynamicActionBtn
                        actionKey="action_generate_campaign"
                        payload={{ campaignId: selectedCampaign.id, leadId: leads[selectedLeadIndex]?.id }}
                        className="text-xs py-1.5 px-3"
                    >
                        <><Wand2 size={14} className="mr-1" /> Auto-Generate</>
                    </DynamicActionBtn>
                </div>

                {campaignData.map(campaign => (
                    <div
                        key={campaign.id}
                        onClick={() => setSelectedCampaign(campaign)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedCampaign.id === campaign.id ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-sm max-w-[70%]">{campaign.name}</h3>
                            <span className={`badge text-[10px] ${campaign.status === 'Active' ? 'badge-success' : campaign.status === 'Scheduled' ? 'badge-warning' : 'badge-primary'}`}>
                                {campaign.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-secondary mt-2">
                            <div className="flex items-center gap-1"><Send size={12} /> {campaign.sent}</div>
                            <div className="flex items-center gap-1"><MessageSquare size={12} /> {campaign.replied}</div>
                        </div>

                        <div className="mt-3 w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${campaign.progress}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Campaign Details & GenAI Preview */}
            <div className="w-2/3 flex flex-col gap-6 overflow-y-auto pr-4 relative">

                <div className="glass-panel p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">{selectedCampaign.name}</h2>
                            <p className="text-sm text-secondary">Targeting: Enterprise SaaS (High Maturity)</p>
                        </div>
                        <div className="flex gap-2 relative">
                            <DynamicActionBtn
                                actionKey="action_schedule_email"
                                payload={{ campaignId: selectedCampaign.id, datetime: new Date().toISOString() }}
                            >
                                <><Calendar size={16} /> Schedule</>
                            </DynamicActionBtn>

                            <DynamicActionBtn
                                actionKey="action_send_email"
                                payload={{
                                    leadEmail: leads[selectedLeadIndex]?.email || 'test@example.com',
                                    subject: `Reducing ${leads[selectedLeadIndex]?.company || 'your company'}'s AWS spend`,
                                    body: emailBody
                                }}
                            >
                                <><Send size={16} /> Send Now</>
                            </DynamicActionBtn>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div className="flex flex-col">
                            <span className="text-xs text-secondary mb-1">Generated From</span>
                            <span className="text-sm font-medium flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Cloud Cost Optimization Case Study</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-secondary mb-1">Pain Point Mapped</span>
                            <span className="text-sm font-medium flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> High Infrastructure Spend</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-secondary mb-1">Audience Size</span>
                            <span className="text-sm font-medium">{leads.length} Leads</span>
                        </div>
                    </div>
                </div>

                {/* GenAI Email Preview */}
                <div className="glass-panel p-0 overflow-hidden flex flex-col h-full flex-1 border border-indigo-500/20">
                    <div className="bg-indigo-50/5 border-b border-indigo-100 p-4 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
                            <Sparkles size={16} /> GenAI Personalization Preview (Editable)
                        </div>
                        <div className="flex gap-2 items-center">
                            <span className="text-xs text-secondary">Simulated Target:</span>
                            <select
                                className="input py-1 px-2 text-xs w-48 bg-white border-indigo-200"
                                value={selectedLeadIndex}
                                onChange={(e) => setSelectedLeadIndex(Number(e.target.value))}
                            >
                                {leads.map((l, idx) => (
                                    <option key={l.id} value={idx}>{l.name} ({l.company})</option>
                                ))}
                                {leads.length === 0 && <option value="0">Add a lead first...</option>}
                            </select>
                            <span className="w-3 h-3 rounded-full bg-danger/80 ml-2"></span>
                            <span className="w-3 h-3 rounded-full bg-warning/80"></span>
                            <span className="w-3 h-3 rounded-full bg-success/80"></span>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 bg-white">
                        <div className="p-4 bg-slate-50 border-b border-slate-200">
                            <div className="flex mb-2"><span className="w-20 text-secondary text-sm">To:</span> <span className="font-medium text-slate-800 text-sm">{leads[selectedLeadIndex]?.email || 'No target selected'}</span></div>
                            <div className="flex mb-2"><span className="w-20 text-secondary text-sm">From:</span> <span className="font-medium text-slate-800 text-sm">Mithun &lt;mithunshri2005@gmail.com&gt;</span></div>
                            <div className="flex"><span className="w-20 text-secondary text-sm">Subject:</span> <span className="font-medium text-slate-800 text-sm">Reducing {leads[selectedLeadIndex]?.company || 'your company'}'s AWS spend without engineering overhead</span></div>
                        </div>

                        <textarea
                            className="bg-white text-slate-700 p-6 flex-1 w-full resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50 leading-relaxed font-sans text-sm"
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                        />
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-secondary">
                        <span>Preview {selectedLeadIndex + 1} of {leads.length} variations</span>
                        <div className="flex items-center gap-4">
                            <button className="hover:text-indigo-600 transition-colors">Regenerate Tone</button>
                            <button
                                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                                onClick={() => setSelectedLeadIndex((prev) => (prev + 1) % Math.max(1, leads.length))}
                            >
                                Next Target <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Campaigns;
