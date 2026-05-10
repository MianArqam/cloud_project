import React from 'react';
import DisasterMap from '../components/DisasterMap';
import ReportForm from '../components/ReportForm';
import LiveAlerts from '../components/LiveAlerts';

export default function Dashboard({ reports, apiUrl }) {
  return (
    <main
      className="flex-1 max-w-screen-2xl w-full mx-auto p-3 gap-3 grid grid-cols-1 lg:grid-cols-12"
      style={{ height: 'calc(100vh - 3.5rem)' }}
    >
      <div className="col-span-1 lg:col-span-3 h-full overflow-y-auto">
        <ReportForm apiUrl={apiUrl} />
      </div>

      <div className="col-span-1 lg:col-span-6 h-[50vh] lg:h-full" style={{ zIndex: 0, position: 'relative' }}>
        <DisasterMap reports={reports} />
      </div>

      <div className="col-span-1 lg:col-span-3 h-[40vh] lg:h-full">
        <LiveAlerts reports={reports} apiUrl={apiUrl} />
      </div>
    </main>
  );
}
