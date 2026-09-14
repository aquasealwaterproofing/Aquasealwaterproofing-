import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, LogOut, CheckCircle2, KeyRound, Users, Phone, MessageCircle, X, Trash2, RefreshCw } from 'lucide-react';
import { useAdminMode, ADMIN_PIN } from '../../lib/adminAuth';

interface LeadRecord {
  id: string;
  createdAt: string;
  type: string;
  name: string;
  phone: string;
  location?: string;
  structureType?: string;
  problemArea?: string;
  message?: string;
}

export const AdminControlBar: React.FC = () => {
  const { isAdmin, isDev, previewAsVisitor, toggleVisitorPreview, loginWithPin, logoutAdmin } = useAdminMode();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [leadsCount, setLeadsCount] = useState<number>(0);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Poll or load inquiries when in admin mode
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setLeadsCount(data.count || 0);
      }
    } catch (e) {
      // Fallback to local storage if offline
      try {
        const local = JSON.parse(localStorage.getItem('aquaseal_saved_leads') || '[]');
        setLeads(local);
        setLeadsCount(local.length);
      } catch (err) {}
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isAdmin && !previewAsVisitor) {
      fetchLeads();
      const interval = setInterval(fetchLeads, 15000);
      return () => clearInterval(interval);
    }
  }, [isAdmin, previewAsVisitor]);

  const handleDeleteLead = async (id: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setLeadsCount((prev) => Math.max(0, prev - 1));
    } catch (e) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  // If in audience preview mode
  if (previewAsVisitor) {
    return (
      <div className="fixed bottom-3 left-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="bg-[#0A2540] text-white text-xs px-3.5 py-2 rounded-md shadow-2xl border border-amber-400/60 flex items-center gap-2.5">
          <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-amber-300">Audience View (Visitor Mode):</span>
            <span className="text-slate-300 ml-1 hidden sm:inline">All video change icons are hidden from visitors.</span>
          </div>
          <button
            type="button"
            onClick={toggleVisitorPreview}
            className="ml-1 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-[#0A2540] rounded font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            Return to Owner Mode
          </button>
        </div>
      </div>
    );
  }

  // If logged in / authorized as Owner/Admin (e.g. inside AI Studio)
  if (isAdmin) {
    return (
      <>
        <div className="fixed bottom-3 left-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-[#0A2540]/95 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-md shadow-2xl border border-[#FFD700]/50 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="font-black text-[#FFD700] uppercase tracking-wider text-[10px]">AI Studio Owner</span>
              <span className="text-slate-300 hidden md:inline text-[11px]">• WhatsApp + Leads Active</span>
            </div>

            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={() => {
                  fetchLeads();
                  setShowLeadsModal(true);
                }}
                className="px-2 py-1 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border border-emerald-400/40"
                title="View Customer Inspection Inquiries"
              >
                <Users className="w-3 h-3 text-[#FFD700]" />
                <span>Leads ({leadsCount})</span>
              </button>

              <button
                type="button"
                onClick={toggleVisitorPreview}
                title="Test what your audience and visitors see"
                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border border-white/20"
              >
                <Eye className="w-3 h-3 text-[#FFD700]" />
                <span className="hidden sm:inline">Test Audience View</span>
              </button>

              {!isDev && (
                <button
                  type="button"
                  onClick={logoutAdmin}
                  title="Lock admin controls on this device"
                  className="p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-300 rounded transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Received Leads Modal */}
        {showLeadsModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
              <div className="bg-[#0A2540] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">
                      Customer Inspection Requests & Leads ({leads.length})
                    </h3>
                    <p className="text-xs text-slate-300">
                      All form submissions sent to WhatsApp (+91 97114 94386) are logged here.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={fetchLeads}
                    className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-white/10"
                    title="Refresh list"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadsModal(false)}
                    className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
                {leads.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-700">No leads recorded yet</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      When a visitor clicks "Get Free Inspection" and submits the form, their details will appear here and in WhatsApp (+91 97114 94386).
                    </p>
                  </div>
                ) : (
                  leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="border border-slate-200 rounded-lg p-3.5 bg-slate-50 hover:bg-white transition-colors space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#0A2540] text-sm">{lead.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#0A2540] text-[10px] font-bold uppercase tracking-wider">
                              {lead.type || 'inspection'}
                            </span>
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            {new Date(lead.createdAt).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                            title="Open WhatsApp Chat"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-600" />
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded bg-blue-100 hover:bg-blue-200 text-[#0A2540] transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700 bg-white p-2.5 rounded border border-slate-200/60">
                        <div>
                          <span className="text-slate-400">Phone: </span>
                          <span className="font-mono font-bold text-[#0A2540]">{lead.phone}</span>
                        </div>
                        {lead.location && (
                          <div>
                            <span className="text-slate-400">City/Location: </span>
                            <span className="font-medium">{lead.location}</span>
                          </div>
                        )}
                        {lead.problemArea && (
                          <div>
                            <span className="text-slate-400">Issue: </span>
                            <span className="font-bold text-[#0A2540]">{lead.problemArea}</span>
                          </div>
                        )}
                        {lead.structureType && (
                          <div>
                            <span className="text-slate-400">Structure: </span>
                            <span className="font-medium">{lead.structureType}</span>
                          </div>
                        )}
                      </div>

                      {lead.message && (
                        <div className="text-slate-600 bg-amber-50/60 border border-amber-200/60 p-2 rounded text-[11px]">
                          <span className="font-bold text-amber-900">Note: </span>
                          {lead.message}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Not logged in and not in visitor preview:
  // Render a tiny invisible/discreet trigger or PIN modal if activated
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginWithPin(pinInput);
    if (success) {
      setShowPinModal(false);
      setPinInput('');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  return (
    <>
      {/* Discreet owner trigger button at bottom-left */}
      <button
        type="button"
        onClick={() => setShowPinModal(true)}
        className="fixed bottom-2 left-2 z-30 opacity-20 hover:opacity-100 p-1.5 rounded bg-black/40 text-white transition-opacity text-[9px] flex items-center gap-1"
        title="Owner Login"
        aria-label="Owner Login"
      >
        <Lock className="w-2.5 h-2.5" />
        <span className="hidden sm:inline">Owner</span>
      </button>

      {/* Admin PIN Unlock Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-[#0A2540] animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 mb-3">
              <KeyRound className="w-5 h-5 text-[#0A2540]" />
              <h3 className="text-base font-black uppercase tracking-tight">AI Studio Owner Portal</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Enter owner PIN to unlock video upload controls on this browser.
            </p>
            <form onSubmit={handlePinSubmit} className="space-y-3">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter PIN (Default: 97114)"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:border-[#0A2540]"
                  autoFocus
                />
                {pinError && (
                  <span className="text-[11px] text-red-600 font-medium mt-1 block">
                    Incorrect PIN. Please try again.
                  </span>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 font-bold uppercase rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0A2540] text-[#FFD700] text-xs font-black uppercase tracking-wider rounded hover:bg-[#123659]"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
