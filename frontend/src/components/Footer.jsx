import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Globe, Database, Server, Cloud } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',      label: 'Dashboard' },
  { to: '/about', label: 'About'     },
  { to: '/team',  label: 'Our Team'  },
];

const TECH_STACK = [
  { icon: <Server size={12} />,   label: 'Node.js + Express' },
  { icon: <Globe size={12} />,    label: 'React + Vite'      },
  { icon: <Database size={12} />, label: 'MongoDB'           },
  { icon: <Cloud size={12} />,    label: 'Docker'            },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(148,163,184,0.08)', background: 'rgba(6,12,24,0.98)' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 rounded-lg" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <ShieldAlert size={16} className="text-blue-400" />
              </div>
              <span className="font-bold text-slate-100">
                Respondr<span className="text-blue-400">.cloud</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              A real-time cloud-based disaster management and emergency response system
              built for rapid situational awareness.
            </p>
            <p className="text-slate-600 text-xs mt-3">
              Cloud Computing Course Project — 2025
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="text-sm text-slate-500 hover:text-blue-400 transition-colors no-underline"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full text-slate-400"
                  style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.1)' }}
                >
                  {icon} {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pt-6 text-xs text-slate-600"
          style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
        >
          <span>© 2025 Respondr.cloud — All rights reserved</span>
          <span>Asad Ali · Abbas · Mian Arqam</span>
        </div>
      </div>
    </footer>
  );
}
