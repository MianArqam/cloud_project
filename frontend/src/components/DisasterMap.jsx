import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue with React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Custom icons based on severity
const getIcon = (severity) => {
  const color = severity === 'Critical' ? 'red' : 
                severity === 'High' ? 'orange' : 
                severity === 'Medium' ? 'yellow' : 'blue';
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export default function DisasterMap({ reports }) {
  // Default to a central location (e.g., center of US or a specific region)
  const center = [39.8283, -98.5795]; 

  return (
    <div className="w-full h-full p-2 glass-panel">
      <MapContainer center={center} zoom={4} className="h-full w-full rounded-xl">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {reports.map((report) => (
          <Marker 
            key={report._id} 
            position={[report.location.lat, report.location.lng]}
            icon={getIcon(report.severity)}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-lg mb-1">{report.type}</h3>
                <p className="text-sm mb-2"><span className="font-semibold">Severity:</span> {report.severity}</p>
                <p className="text-sm mb-2">{report.description}</p>
                <p className="text-xs text-gray-500">Reported by: {report.reporterName}</p>
                <p className="text-xs text-gray-500">{new Date(report.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
