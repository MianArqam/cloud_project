import React, { useEffect } from 'react';
import { X, AlertTriangle, Siren } from 'lucide-react';

const SEVERITY_THEME = {
  Critical: {
    bg:     'rgba(127,29,29,0.97)',
    border: '#ef4444',
    glow:   '0 0 0 1px rgba(239,68,68,0.5), 0 8px 32px rgba(239,68,68,0.3)',
    badge:  { background: 'rgba(239,68,68,0.25)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)' },
    icon:   <Siren size={20} className="text-red-300" />,
    label:  'CRITICAL EMERGENCY ALERT',
    labelColor: '#fca5a5',
  },
  High: {
    bg:     'rgba(124,45,18,0.97)',
    border: '#f97316',
    glow:   '0 0 0 1px rgba(249,115,22,0.4), 0 8px 24px rgba(249,115,22,0.2)',
    badge:  { background: 'rgba(249,115,22,0.25)', color: '#fdba74', border: '1px solid rgba(249,115,22,0.4)' },
    icon:   <AlertTriangle size={20} className="text-orange-300" />,
    label:  'HIGH SEVERITY ALERT',
    labelColor: '#fdba74',
  },
  Medium: {
    bg:     'rgba(120,53,15,0.97)',
    border: '#f59e0b',
    glow:   '0 0 0 1px rgba(245,158,11,0.4), 0 8px 24px rgba(245,158,11,0.15)',
    badge:  { background: 'rgba(245,158,11,0.25)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.4)' },
    icon:   <AlertTriangle size={20} className="text-amber-300" />,
    label:  'EMERGENCY NOTICE',
    labelColor: '#fcd34d',
  },
  Low: {
    bg:     'rgba(23,37,84,0.97)',
    border: '#3b82f6',
    glow:   '0 0 0 1px rgba(59,130,246,0.4), 0 8px 24px rgba(59,130,246,0.15)',
    badge:  { background: 'rgba(59,130,246,0.25)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.4)' },
    icon:   <AlertTriangle size={20} className="text-blue-300" />,
    label:  'AREA NOTIFICATION',
    labelColor: '#93c5fd',
  },
};

const TYPE_ICONS = { Flood: '🌊', Earthquake: '🏚', Fire: '🔥', 'Medical Emergency': '🚑', Other: '⚠️' };

function AlertBanner({ alert, onDismiss }) {
  const theme = SEVERITY_THEME[alert.severity] || SEVERITY_THEME.Low;

  // Auto-dismiss non-critical after 12s
  useEffect(() => {
    if (alert.severity !== 'Critical') {
      const t = setTimeout(onDismiss, 12000);
      return () => clearTimeout(t);
    }
  }, [alert.severity, onDismiss]);

  return (
    <div
      className="fade-in flex items-start gap-4 px-5 py-4 rounded-xl"
      style={{
        background:   theme.bg,
        border:       `1px solid ${theme.border}`,
        boxShadow:    theme.glow,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">{theme.icon}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.labelColor }}>
            {theme.label}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={theme.badge}>
            {alert.severity}
          </span>
        </div>
        <p className="text-sm font-semibold text-white mb-0.5">
          {TYPE_ICONS[alert.type] || '⚠️'} {alert.type}
          {alert.reporterName && alert.reporterName !== 'Anonymous'
            ? <span className="font-normal text-slate-300"> — reported by {alert.reporterName}</span>
            : null
          }
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">{alert.description}</p>
        <p className="text-xs text-slate-400 mt-1">
          📍 {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
          {alert.severity !== 'Critical' && <span className="ml-3 opacity-60">Auto-dismisses in 12s</span>}
        </p>
      </div>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default function CitizenAlert({ alerts, onDismiss }) {
  if (alerts.length === 0) return null;

  return (
    <div
      className="fixed left-0 right-0 z-40 px-4 pt-2 space-y-2 pointer-events-none"
      style={{ top: '3.5rem' }}
    >
      {alerts.map(alert => (
        <div key={alert.id} className="pointer-events-auto">
          <AlertBanner alert={alert} onDismiss={() => onDismiss(alert.id)} />
        </div>
      ))}
    </div>
  );
}
