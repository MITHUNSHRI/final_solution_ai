import React, { useState } from 'react';
import { Contact, Edit2, Plus, Search, Mail, Building, Trash2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const Leads = ({ leads, setLeads }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', company: '', role: '', industry: '' });
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpenModal = (lead = null) => {
        if (lead) {
            setEditingLead(lead);
            setFormData(lead);
        } else {
            setEditingLead(null);
            setFormData({ name: '', email: '', company: '', role: '', industry: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLead(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingLead) {
                // UPDATE existing customer in database
                const res = await fetch(`${API_BASE}/api/customers/${editingLead.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (res.ok) {
                    const updated = await res.json();
                    setLeads(leads.map(l => l.id === editingLead.id ? updated : l));
                }
            } else {
                // CREATE new customer in database
                const res = await fetch(`${API_BASE}/api/customers`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, matchScore: Math.floor(Math.random() * 20) + 75 })
                });
                if (res.ok) {
                    const newCustomer = await res.json();
                    setLeads([...leads, newCustomer]);
                } else {
                    const err = await res.json();
                    alert(err.error || 'Failed to save customer.');
                }
            }
        } catch {
            // Backend offline — fallback to local state only
            if (editingLead) {
                setLeads(leads.map(l => l.id === editingLead.id ? { ...l, ...formData } : l));
            } else {
                const newId = leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1;
                setLeads([...leads, { id: newId, matchScore: 80, ...formData }]);
            }
        } finally {
            setSaving(false);
            handleCloseModal();
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this customer?')) return;
        try {
            await fetch(`${API_BASE}/api/customers/${id}`, { method: 'DELETE' });
        } catch {
            // Offline — just remove from local state
        }
        setLeads(leads.filter(l => l.id !== id));
    };


    const filteredLeads = searchQuery.trim() === ''
        ? leads
        : leads.filter(l =>
            [l.name, l.email, l.company, l.role, l.industry]
                .join(' ').toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

    return (
        <div className="p-8 flex flex-col gap-8 w-full animate-fade-in relative h-[calc(100vh-100px)] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold mb-1">Customers & Leads</h2>
                    <p className="text-sm text-secondary">Manage your prospects and view AI match scores.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary" size={16} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="input pl-10 text-sm py-2"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={16} /> Add Lead
                    </button>
                </div>
            </div>

            {/* Leads Table */}
            <div className="glass-panel overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-xs text-secondary uppercase tracking-wider">
                            <th className="p-4 font-medium">Name & Role</th>
                            <th className="p-4 font-medium">Contact</th>
                            <th className="p-4 font-medium">Company & Industry</th>
                            <th className="p-4 font-medium">AI Match</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.length === 0 && (
                            <tr><td colSpan="5" className="p-8 text-center text-secondary">
                                {searchQuery ? `No leads found matching "${searchQuery}"` : 'No leads yet. Add one to get started!'}
                            </td></tr>
                        )}
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm">
                                            {lead.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm group-hover:text-indigo-400 transition-colors">{lead.name}</span>
                                            <span className="text-xs text-secondary">{lead.role}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <Mail size={14} className="text-tertiary" /> {lead.email}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm flex items-center gap-1"><Building size={14} className="text-tertiary" /> {lead.company}</span>
                                        <span className="text-xs text-secondary mt-1 ml-5">{lead.industry}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-400 font-bold text-sm">{lead.matchScore}%</span>
                                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${lead.matchScore}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="btn-icon p-2 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300" onClick={() => handleOpenModal(lead)}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="btn-icon p-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300" onClick={() => handleDelete(lead.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-panel w-full max-w-md p-6 relative">
                        <h3 className="text-xl font-bold mb-4">{editingLead ? 'Edit Lead' : 'Add New Lead'}</h3>
                        <form onSubmit={handleSave} className="flex flex-col gap-4">

                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-secondary">Full Name</label>
                                <input required type="text" className="input bg-black/30" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. John Doe" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-secondary">Email</label>
                                <input required type="email" className="input bg-black/30" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-secondary">Company</label>
                                    <input required type="text" className="input bg-black/30" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Company Inc" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-secondary">Role</label>
                                    <input required type="text" className="input bg-black/30" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="CEO" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-secondary">Industry</label>
                                <input required type="text" className="input bg-black/30" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} placeholder="e.g. SaaS, FinTech" />
                            </div>

                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editingLead ? 'Save Changes' : 'Add Lead'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Leads;
