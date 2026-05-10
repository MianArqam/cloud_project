import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, WifiOff, Menu, X } from 'lucide-react';

const NAV = [
  { to: '/',      label: 'Dashboard' },
  { to: '/about', label: 'About'     },
  { to: '/team',  label: 'Our Team'  },
];

export default function Header({ connected, criticalCount, reportCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(6,12,24,0.97)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148,163,184,0.08)',
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 no-underline">
          <div className="relative">
            <div
              className="p-1.5 rounded-lg"
              style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <ShieldAlert size={18} className="text-blue-400" />
            </div>
            {criticalCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                style={{ fontSize: '9px', background: '#ef4444', boxShadow: '0 0 6px rgba(239,68,68,0.5)' }}
              >
                {criticalCount}
              </span>
            )}
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-100">
              Respondr<span className="text-blue-400">.cloud</span>
            </span>
            <p className="text-slate-500 leading-none" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Disaster Response System
            </p>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-medium transition-all no-underline ${
                  isActive
                    ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {reportCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-200">{reportCount}</span>
              <span className="text-slate-500">incidents</span>
            </div>
          )}

          <div
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full"
            style={connected
              ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }
              : { background: 'rgba(239,68,68,0.1)',  border: '1px solid rgba(239,68,68,0.2)',  color: '#f87171' }
            }
          >
            {connected ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Live
              </>
            ) : (
              <><WifiOff size={11} /> Offline</>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-3 space-y-1"
          style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
        >
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-all no-underline ${
                  isActive
                    ? 'bg-blue-500/15 text-blue-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
