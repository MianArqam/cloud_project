import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShieldAlert } from 'lucide-react';

import DisasterMap from './components/DisasterMap';
import ReportForm from './components/ReportForm';
import LiveAlerts from './components/LiveAlerts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

function App() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch initial data
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${API_URL}/reports`);
        setReports(response.data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
        toast.error('Could not connect to the server.');
      }
    };
    
    fetchReports();

    // Set up WebSocket connection
    const socket = io(SOCKET_URL);
    
    socket.on('connect', () => {
      console.log('Connected to real-time server');
    });

    socket.on('new_report', (newReport) => {
      setReports((prev) => [newReport, ...prev]);
      // Play a sound or show a special notification based on severity
      if (newReport.severity === 'Critical') {
        toast.error(`CRITICAL ALERT: ${newReport.type} reported in your area!`, {
          icon: <ShieldAlert />,
          autoClose: false, // User must dismiss it
        });
      } else {
        toast.info(`New alert: ${newReport.type} (${newReport.severity})`);
      }
    });

    socket.on('update_report', (updatedReport) => {
      setReports((prev) => 
        prev.map(r => r._id === updatedReport._id ? updatedReport : r)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer theme="dark" position="top-right" />
      
      {/* Header */}
      <header className="glass-panel rounded-none border-t-0 border-x-0 border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-primary w-8 h-8" />
            <h1 className="text-xl font-bold tracking-wide">
              Respondr<span className="text-primary">.cloud</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </span>
              System Online
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-screen-2xl w-full mx-auto p-4 gap-4 grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-4rem)]">
        
        {/* Left Sidebar - Reporting Form */}
        <div className="col-span-1 lg:col-span-3 h-full overflow-y-auto hidden-scrollbar">
          <ReportForm apiUrl={API_URL} />
        </div>

        {/* Center - Interactive Map */}
        <div className="col-span-1 lg:col-span-6 h-[50vh] lg:h-full relative z-0">
          <DisasterMap reports={reports} />
        </div>

        {/* Right Sidebar - Live Feed */}
        <div className="col-span-1 lg:col-span-3 h-[40vh] lg:h-full">
          <LiveAlerts reports={reports} />
        </div>

      </main>
    </div>
  );
}

export default App;
