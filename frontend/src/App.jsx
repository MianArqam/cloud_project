import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header        from './components/Header';
import CitizenAlert  from './components/CitizenAlert';
import Dashboard     from './pages/Dashboard';
import About         from './pages/About';
import Team          from './pages/Team';

const API_URL    = import.meta.env.VITE_API_URL    || 'http://localhost:5001/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

function App() {
  const [reports, setReports]           = useState([]);
  const [connected, setConnected]       = useState(false);
  const [citizenAlerts, setCitizenAlerts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/reports`)
      .then(r => setReports(r.data))
      .catch(() => toast.error('Could not connect to the server.'));

    const socket = io(SOCKET_URL);
    socket.on('connect',    () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('new_report', (report) => {
      setReports(prev => [report, ...prev]);
      if (report.severity === 'Critical') {
        toast.error(`CRITICAL: ${report.type} reported!`, { icon: '🚨', autoClose: false });
      } else {
        toast.info(`New ${report.severity} alert: ${report.type}`);
      }
    });

    socket.on('update_report', (updated) => {
      setReports(prev =>
        updated.status === 'Resolved'
          ? prev.filter(r => r._id !== updated._id)
          : prev.map(r => r._id === updated._id ? updated : r)
      );
    });

    socket.on('citizen_alert', (alert) => {
      setCitizenAlerts(prev => [...prev, { ...alert, id: Date.now() + Math.random() }]);
    });

    return () => socket.disconnect();
  }, []);

  const dismissAlert = (id) => setCitizenAlerts(prev => prev.filter(a => a.id !== id));

  const criticalCount = reports.filter(r => r.severity === 'Critical').length;

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer theme="dark" position="top-right" />
      <Header connected={connected} criticalCount={criticalCount} reportCount={reports.length} />
      <CitizenAlert alerts={citizenAlerts} onDismiss={dismissAlert} />
      <Routes>
        <Route path="/"      element={<Dashboard reports={reports} apiUrl={API_URL} />} />
        <Route path="/about" element={<About />} />
        <Route path="/team"  element={<Team />} />
      </Routes>
    </div>
  );
}

export default App;
