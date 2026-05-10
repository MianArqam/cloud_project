import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

const SEVERITY = {
  Critical: { color: 'red',    dot: '#ef4444' },
  High:     { color: 'orange', dot: '#f97316' },
  Medium:   { color: 'yellow', dot: '#f59e0b' },
  Low:      { color: 'blue',   dot: '#3b82f6' },
};

const getIcon = (severity) => {
  const { color } = SEVERITY[severity] || SEVERITY.Low;
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export default function DisasterMap({ reports }) {
  return (
    <div className="w-full h-full glass-panel p-2 relative">
      <MapContainer center={[20, 0]} zoom={2} className="h-full w-full rounded-xl" style={{ minHeight: '200px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {reports.map((report) => (
          <Marker
            key={report._id}
            position={[report.location.lat, report.location.lng]}
            icon={getIcon(report.severity)}
          >
            <Popup>
              <div style={{ minWidth: '175px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '13px', color: '#e2e8f0' }}>{report.type}</strong>
                  <span style={{
                    fontSize: '10px', padding: '2px 7px', borderRadius: '9999px', fontWeight: 600,
                    background: (SEVERITY[report.severity]?.dot || '#3b82f6') + '22',
                    color: SEVERITY[report.severity]?.dot || '#3b82f6',
                    border: `1px solid ${(SEVERITY[report.severity]?.dot || '#3b82f6')}44`,
                  }}>
                    {report.severity}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', lineHeight: '1.4' }}>
                  {report.description}
                </p>
                <p style={{ fontSize: '11px', color: '#475569' }}>
                  By {report.reporterName || 'Anonymous'}
                </p>
                <p style={{ fontSize: '11px', color: '#475569' }}>
                  {new Date(report.timestamp).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Severity Legend */}
      <div style={{
        position: 'absolute', bottom: '14px', left: '14px', zIndex: 1000,
        background: 'rgba(6,12,24,0.88)', border: '1px solid rgba(148,163,184,0.1)',
        borderRadius: '8px', padding: '8px 10px', backdropFilter: 'blur(10px)',
      }}>
        <p style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '6px' }}>
          Severity
        </p>
        {Object.entries(SEVERITY).map(([key, { dot }]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
