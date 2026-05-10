import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AlertCircle, Send, Navigation, Loader2 } from 'lucide-react';

const DISASTER_TYPES = [
  { value: 'Flood',             icon: '🌊' },
  { value: 'Earthquake',        icon: '🏚' },
  { value: 'Fire',              icon: '🔥' },
  { value: 'Medical Emergency', icon: '🚑' },
  { value: 'Other',             icon: '⚠️' },
];

const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

const SEVERITY_ACTIVE = {
  Low:      'bg-blue-500/15 border-blue-500/40 text-blue-300',
  Medium:   'bg-amber-500/15 border-amber-500/40 text-amber-300',
  High:     'bg-orange-500/15 border-orange-500/40 text-orange-300',
  Critical: 'bg-red-500/15 border-red-500/40 text-red-300',
};

const SEVERITY_DOT = {
  Low:      'bg-blue-400',
  Medium:   'bg-amber-400',
  High:     'bg-orange-400',
  Critical: 'bg-red-400',
};

export default function ReportForm({ apiUrl }) {
  const [formData, setFormData] = useState({
    type: 'Flood',
    severity: 'Medium',
    description: '',
    lat: '',
    lng: '',
    reporterName: '',
    notifyArea: false,
  });
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
        }));
        toast.success('Location detected!');
        setLocating(false);
      },
      (error) => {
        const messages = {
          1: 'Permission denied — please allow location access in your browser settings.',
          2: 'Location unavailable. Enter coordinates manually.',
          3: 'Request timed out. Please try again.',
        };
        toast.error(messages[error.code] || 'Could not get location.');
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/reports`, {
        type:         formData.type,
        severity:     formData.severity,
        description:  formData.description,
        reporterName: formData.reporterName,
        notifyArea:   formData.notifyArea,
        location: { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) },
      });
      toast.success(formData.notifyArea ? 'Report submitted & citizens notified!' : 'Emergency report submitted!');
      setFormData(prev => ({ ...prev, description: '', lat: '', lng: '', reporterName: '', notifyArea: false }));
    } catch {
      toast.error('Failed to submit report. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-1.5 rounded-lg" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={16} className="text-red-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-100 leading-none">Report Emergency</h2>
          <p className="text-slate-500 mt-0.5" style={{ fontSize: '10px' }}>Submit a new incident report</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Incident Type */}
        <div>
          <label className="block text-slate-400 font-medium mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Incident Type
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {DISASTER_TYPES.map(({ value, icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: value }))}
                className="flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all"
                style={formData.type === value
                  ? { background: 'rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.4)', color: '#93c5fd' }
                  : { background: 'transparent', borderColor: 'rgba(148,163,184,0.1)', color: '#64748b' }
                }
              >
                <span style={{ fontSize: '18px', lineHeight: 1 }}>{icon}</span>
                <span className="text-center leading-tight font-medium" style={{ fontSize: '9px' }}>{value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-slate-400 font-medium mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Severity Level
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {SEVERITIES.map((sev) => {
              const isActive = formData.severity === sev;
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, severity: sev }))}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-all ${
                    isActive ? SEVERITY_ACTIVE[sev] : 'border-slate-700/50 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? SEVERITY_DOT[sev] : 'bg-slate-600'}`} />
                  {sev}
                </button>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-400 font-medium mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe the emergency situation..."
            className="input-field resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-slate-400 font-medium mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Coordinates
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="number" step="any" name="lat"
              placeholder="Latitude" value={formData.lat}
              onChange={handleChange} required
              className="input-field"
            />
            <input
              type="number" step="any" name="lng"
              placeholder="Longitude" value={formData.lng}
              onChange={handleChange} required
              className="input-field"
            />
          </div>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={locating}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={locating
              ? { borderColor: 'rgba(59,130,246,0.3)', color: '#60a5fa', background: 'rgba(59,130,246,0.06)' }
              : { borderColor: 'rgba(148,163,184,0.12)', color: '#64748b', background: 'transparent' }
            }
            onMouseEnter={e => { if (!locating) { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'; e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.background = 'rgba(59,130,246,0.05)'; }}}
            onMouseLeave={e => { if (!locating) { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.12)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}}
          >
            {locating
              ? <><Loader2 size={13} className="animate-spin" /> Detecting location…</>
              : <><Navigation size={13} /> Use My Location</>
            }
          </button>
        </div>

        {/* Reporter */}
        <div>
          <label className="block text-slate-400 font-medium mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Reporter <span className="normal-case text-slate-600">(optional)</span>
          </label>
          <input
            type="text" name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            placeholder="Anonymous"
            className="input-field"
          />
        </div>

        {/* Notify Area Toggle */}
        <div
          className="flex items-center justify-between p-3 rounded-lg cursor-pointer"
          style={{
            background: formData.notifyArea ? 'rgba(59,130,246,0.08)' : 'rgba(13,22,38,0.6)',
            border: `1px solid ${formData.notifyArea ? 'rgba(59,130,246,0.3)' : 'rgba(148,163,184,0.1)'}`,
            transition: 'all 0.15s',
          }}
          onClick={() => setFormData(prev => ({ ...prev, notifyArea: !prev.notifyArea }))}
        >
          <div className="flex-1 min-w-0 mr-3">
            <p className="text-sm font-medium text-slate-200 leading-none">Notify Nearby Citizens</p>
            <p className="text-slate-500 mt-1" style={{ fontSize: '11px' }}>
              Broadcast an emergency alert to all connected users in the area
            </p>
          </div>
          {/* Toggle switch */}
          <div
            className="relative flex-shrink-0 w-10 h-5 rounded-full transition-colors"
            style={{ background: formData.notifyArea ? '#3b82f6' : 'rgba(71,85,105,0.5)' }}
          >
            <span
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
              style={{ left: formData.notifyArea ? '1.25rem' : '0.125rem', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
          style={{
            background: loading ? 'rgba(59,130,246,0.4)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(59,130,246,0.25)',
          }}
        >
          {loading ? 'Submitting…' : <><Send size={14} /> Submit Emergency Report</>}
        </button>

      </form>
    </div>
  );
}
