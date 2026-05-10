import React from 'react';
import { Activity, MapPin } from 'lucide-react';

export default function LiveAlerts({ reports }) {
  
  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-danger text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-warning text-slate-900';
      default: return 'bg-primary text-white';
    }
  };

  return (
    <div className="glass-panel p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 pb-2 border-b border-slate-700">
        <Activity className="text-primary animate-pulse" />
        Live Feed
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {reports.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No active alerts.</p>
        ) : (
          reports.map((report) => (
            <div key={report._id} className="bg-surface/50 rounded-lg p-3 border-l-4 border-slate-600 hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-slate-200 group-hover:text-primary transition-colors">{report.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityBadge(report.severity)}`}>
                  {report.severity}
                </span>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2 mb-2">{report.description}</p>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {report.location.lat.toFixed(2)}, {report.location.lng.toFixed(2)}
                </span>
                <span>{new Date(report.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
