import React from 'react';
import { ShieldAlert, Target, Layers, Server, Zap, Bell, Database, Cloud, Activity, Shield, Globe } from 'lucide-react';
import Footer from '../components/Footer';

const OBJECTIVES = [
  { icon: <Layers size={18} />,   title: 'Scalable Platform',        desc: 'Cloud-native architecture that scales automatically to handle any volume of emergency reports.' },
  { icon: <Bell size={18} />,     title: 'Real-Time Alerts',         desc: 'Instant push notifications and live WebSocket feeds keep responders informed as events unfold.' },
  { icon: <Activity size={18} />, title: 'Responder Coordination',   desc: 'Centralized dashboard enables multiple response teams to coordinate efficiently in real time.' },
  { icon: <Target size={18} />,   title: 'Predictive Analytics',     desc: 'Cloud analytics provide risk assessment and data-driven insights to anticipate disaster impact.' },
  { icon: <Shield size={18} />,   title: 'High Availability',        desc: 'Fault-tolerant design with auto-scaling and load balancing ensures zero downtime during crises.' },
  { icon: <Globe size={18} />,    title: 'Multi-User Interaction',   desc: 'Supports simultaneous citizens, field responders, and command-center operators on one platform.' },
];

const ARCHITECTURE = [
  { icon: <Globe size={16} />,    label: 'Frontend App',         desc: 'React web interface for reporting and monitoring' },
  { icon: <Server size={16} />,   label: 'Backend REST API',     desc: 'Node.js + Express handling all request logic'     },
  { icon: <Database size={16} />, label: 'Cloud Database',       desc: 'MongoDB storing reports, users, and event logs'   },
  { icon: <Zap size={16} />,      label: 'Real-Time Processing', desc: 'Socket.io for live bidirectional data streams'    },
  { icon: <Bell size={16} />,     label: 'Notification System',  desc: 'SMS / email / in-app alerts via FCM and Twilio'   },
  { icon: <Cloud size={16} />,    label: 'Cloud Storage',        desc: 'Object storage for incident media and documents'  },
];

const TECH = {
  'Cloud Platform': ['AWS', 'Microsoft Azure', 'Google Cloud'],
  'Backend':        ['Node.js', 'Express.js', 'Socket.io'],
  'Frontend':       ['React', 'Vite', 'Tailwind CSS'],
  'Database':       ['MongoDB', 'Mongoose'],
  'DevOps':         ['Docker', 'Kubernetes', 'GitHub Actions'],
  'Notifications':  ['Firebase FCM', 'Twilio'],
};

const TECH_COLORS = {
  'Cloud Platform': { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)',  color: '#60a5fa' },
  'Backend':        { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)',  color: '#34d399' },
  'Frontend':       { bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.25)',  color: '#a78bfa' },
  'Database':       { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  color: '#fbbf24' },
  'DevOps':         { bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.25)',  color: '#fb923c' },
  'Notifications':  { bg: 'rgba(236,72,153,0.1)',  border: 'rgba(236,72,153,0.25)',  color: '#f472b6' },
};

export default function About() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-4xl mx-auto px-6 py-20 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
              <ShieldAlert size={12} />
              Cloud Computing Course Project
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              <span className="text-slate-100">Cloud-Based Smart</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Disaster Management
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              A real-time emergency response platform that helps authorities and citizens
              coordinate efficiently during natural disasters — powered by cloud computing.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">

          {/* Project Overview */}
          <section>
            <SectionHeader label="Overview" title="What is Respondr?" />
            <div className="glass-panel p-8 mt-6">
              <p className="text-slate-400 text-base leading-relaxed">
                Respondr.cloud is a cloud-native disaster management system designed to bridge the gap
                between affected citizens and emergency responders. The platform leverages real-time data
                streams, interactive mapping, and cloud analytics to improve situational awareness and
                emergency response time during floods, earthquakes, fires, and other critical events.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mt-4">
                Built on a microservices architecture deployed via Docker, the system integrates live
                user reports, WebSocket-driven alert broadcasting, and geospatial visualization — giving
                command centers an up-to-the-second view of unfolding situations.
              </p>
            </div>
          </section>

          {/* Objectives */}
          <section>
            <SectionHeader label="Objectives" title="What We Set Out to Build" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {OBJECTIVES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="glass-panel p-5 transition-all"
                  style={{ ':hover': { borderColor: 'rgba(59,130,246,0.3)' } }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg text-blue-400" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.18)' }}>
                      {icon}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section>
            <SectionHeader label="Architecture" title="System Components" />
            <p className="text-slate-500 text-sm mt-2 mb-6">
              The system follows a microservices-based architecture — each component is independently deployable and communicates via REST APIs and WebSockets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ARCHITECTURE.map(({ icon, label, desc }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(13,22,38,0.7)', border: '1px solid rgba(148,163,184,0.08)' }}
                >
                  <div className="p-2 rounded-lg flex-shrink-0 text-slate-400" style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.1)' }}>
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-600 font-mono">0{i + 1}</span>
                      <span className="text-sm font-medium text-slate-300">{label}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <SectionHeader label="Technology" title="Stack We Used" />
            <div className="mt-6 space-y-5">
              {Object.entries(TECH).map(([category, items]) => {
                const style = TECH_COLORS[category];
                return (
                  <div key={category} className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 w-32 flex-shrink-0 uppercase tracking-wider">{category}</span>
                    <div className="flex flex-wrap gap-2">
                      {items.map(item => (
                        <span
                          key={item}
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>{label}</span>
      <h2 className="text-2xl font-bold text-slate-100 mt-1">{title}</h2>
    </div>
  );
}
