import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Radio, MapPin, Loader2, CheckCircle, Clock } from 'lucide-react';

const TYPE_ICONS = {
  Flood:              '🌊',
  Earthquake:         '🏚',
  Fire:               '🔥',
  'Medical Emergency':'🚑',
  Other:              '⚠️',
};

const SEVERITY_STYLE = {
  Critical: { border: '#ef4444', badge: { background: 'rgba(239,68,68,0.12)',  color: '#f87171', border: '1px solid rgba(239,68,68,0.25)'  } },
  High:     { border: '#f97316', badge: { background: 'rgba(249,115,22,0.12)', color: '#fb923c', border: '1px solid rgba(249,115,22,0.25)'  } },
  Medium:   { border: '#f59e0b', badge: { background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)'  } },
  Low:      { border: '#3b82f6', badge: { background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)'  } },
};

const STATUS_STYLE = {
  'Active':      { bg: 'rgba(239,68,68,0.1)',  color: '#f87171', border: 'rgba(239,68,68,0.2)'  },
  'In Progress': { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function AlertCard({ report, apiUrl }) {
  const [loading, setLoading] = useState(false);
  const s = SEVERITY_STYLE[report.severity] || SEVERITY_STYLE.Low;
  const statusStyle = STATUS_STYLE[report.status] || STATUS_STYLE['Active'];

  const updateStatus = async (newStatus) => {
    setLoading(true);
    try {
      await axios.patch(`${apiUrl}/reports/${report._id}`, { status: newStatus });
      if (newStatus === 'Resolved') {
        toast.success(`Report marked as resolved.`);
      } else {
        toast.info(`Status updated to "${newStatus}".`);
      }
    } catch {
      toast.error('Failed to update status.');
    }
    setLoading(false);
  };

  return (
    <div
      className="rounded-lg p-3 fade-in"
      style={{
        background:  'rgba(13,22,38,0.6)',
        border:      '1px solid rgba(148,163,184,0.07)',
        borderLeft:  `3px solid ${s.border}`,
        transition:  'background 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(13,22,38,0.9)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,22,38,0.6)'; }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0 }}>{TYPE_ICONS[report.type] || '⚠️'}</span>
          <span className="text-sm font-medium text-slate-200 truncate">{report.type}</span>
        </div>
        <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium" style={s.badge}>
          {report.severity}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-500 line-clamp-2 mb-2 ml-6" style={{ fontSize: '11px' }}>
        {report.description}
      </p>

      {/* Location + time */}
      <div className="flex items-center justify-between ml-6 mb-3">
        <span className="flex items-center gap-1 text-slate-600" style={{ fontSize: '10px' }}>
          <MapPin size={9} /> {report.location.lat.toFixed(2)}, {report.location.lng.toFixed(2)}
        </span>
        <span className="text-slate-600" style={{ fontSize: '10px' }}>{timeAgo(report.timestamp)}</span>
      </div>

      {/* Status + actions */}
      <div
        className="flex items-center justify-between pt-2.5 ml-0"
        style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
      >
        {/* Current status pill */}
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
          style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }}
        >
          <span className="w-1 h-1 rounded-full inline-block" style={{ background: statusStyle.color }} />
          {report.status}
        </span>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          {loading && <Loader2 size={12} className="text-slate-500 animate-spin" />}

          {!loading && report.status === 'Active' && (
            <button
              onClick={() => updateStatus('In Progress')}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all"
              style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}
              title="Mark as In Progress"
            >
              <Clock size={11} /> In Progress
            </button>
          )}

          {!loading && report.status !== 'Resolved' && (
            <button
              onClick={() => updateStatus('Resolved')}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
              title="Mark as Resolved"
            >
              <CheckCircle size={11} /> Resolve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LiveAlerts({ reports, apiUrl }) {
  return (
    <div className="glass-panel flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <Radio size={15} className="text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">Live Feed</span>
        </div>
        {reports.length > 0 && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' }}
          >
            {reports.length}
          </span>
        )}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <Radio size={28} className="text-slate-700 mb-3" />
            <p className="text-sm text-slate-500">No active incidents</p>
            <p className="text-slate-600 mt-1" style={{ fontSize: '11px' }}>Reports will appear here in real time</p>
          </div>
        ) : (
          reports.map(report => (
            <AlertCard key={report._id} report={report} apiUrl={apiUrl} />
          ))
        )}
      </div>
    </div>
  );
}
