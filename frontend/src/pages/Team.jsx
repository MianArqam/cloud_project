import React from 'react';
import { ShieldAlert, Code, Cloud, Cpu } from 'lucide-react';
import Footer from '../components/Footer';

const MEMBERS = [
  {
    name:       'Asad Ali',
    initials:   'AA',
    role:       'Team Lead · Backend & Cloud Architect',
    roleShort:  'Backend & Cloud',
    gradient:   'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    glowColor:  'rgba(124,58,237,0.25)',
    badgeBg:    'rgba(124,58,237,0.12)',
    badgeBorder:'rgba(124,58,237,0.3)',
    badgeColor: '#a78bfa',
    icon:       <Cloud size={14} />,
    bio:        'Leads the overall system architecture and backend development. Responsible for designing scalable REST APIs, integrating cloud services, and ensuring secure communication between microservices.',
    responsibilities: [
      'Designed the microservices-based system architecture',
      'Developed and documented all REST API endpoints',
      'Integrated cloud compute, database, and storage services',
      'Implemented authentication and security middleware',
    ],
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth', 'Cloud Architecture', 'Socket.io'],
  },
  {
    name:       'Abbas',
    initials:   'AB',
    role:       'Frontend & UI/UX Developer',
    roleShort:  'Frontend & UI/UX',
    gradient:   'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    glowColor:  'rgba(14,165,233,0.25)',
    badgeBg:    'rgba(14,165,233,0.12)',
    badgeBorder:'rgba(14,165,233,0.3)',
    badgeColor: '#38bdf8',
    icon:       <Code size={14} />,
    bio:        'Crafts the user-facing experience of the platform, from the real-time alert dashboard to the interactive map. Focuses on responsive design, accessibility, and seamless API integration.',
    responsibilities: [
      'Designed and implemented the full UI/UX for the web app',
      'Built the real-time disaster map with interactive markers',
      'Connected all frontend components to backend REST APIs',
      'Implemented live alert feeds and toast notification system',
    ],
    skills: ['React', 'Vite', 'Tailwind CSS', 'Leaflet.js', 'Socket.io Client', 'Axios', 'UI/UX'],
  },
  {
    name:       'Mian Arqam',
    initials:   'MA',
    role:       'DevOps Engineer & Data Processing',
    roleShort:  'DevOps & Data',
    gradient:   'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
    glowColor:  'rgba(5,150,105,0.25)',
    badgeBg:    'rgba(5,150,105,0.12)',
    badgeBorder:'rgba(5,150,105,0.3)',
    badgeColor: '#34d399',
    icon:       <Cpu size={14} />,
    bio:        'Manages the cloud infrastructure, deployment pipeline, and real-time data processing layer. Ensures the system is containerized, continuously integrated, and production-ready.',
    responsibilities: [
      'Set up cloud infrastructure and container orchestration',
      'Configured Docker and Docker Compose for local dev',
      'Implemented CI/CD pipeline with GitHub Actions',
      'Handles real-time data ingestion and system monitoring',
    ],
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Cloud Infra', 'Monitoring', 'Linux'],
  },
];

export default function Team() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto px-6 py-20 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
              <ShieldAlert size={12} />
              The People Behind Respondr
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5">
              Meet Our{' '}
              <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Team
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
              Three engineers — one backend architect, one frontend developer, and one DevOps engineer —
              building a real-world cloud application together.
            </p>
          </div>
        </section>

        {/* Team Cards */}
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {MEMBERS.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>

          {/* Team note */}
          <div
            className="mt-12 p-6 rounded-xl text-center"
            style={{ background: 'rgba(13,22,38,0.6)', border: '1px solid rgba(148,163,184,0.08)' }}
          >
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
              This project was developed as part of a <span className="text-slate-300 font-medium">Cloud Computing</span> course,
              demonstrating practical implementation of distributed systems, real-time data processing, and cloud-native deployment principles.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MemberCard({ member: m }) {
  return (
    <div
      className="glass-panel flex flex-col overflow-hidden"
      style={{ transition: 'box-shadow 0.2s' }}
    >
      {/* Top gradient band */}
      <div className="h-1.5 w-full" style={{ background: m.gradient }} />

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ background: m.gradient, boxShadow: `0 4px 16px ${m.glowColor}` }}
          >
            {m.initials}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 leading-tight">{m.name}</h3>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium mt-1 px-2 py-0.5 rounded-full"
              style={{ background: m.badgeBg, border: `1px solid ${m.badgeBorder}`, color: m.badgeColor }}
            >
              {m.icon} {m.roleShort}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{m.bio}</p>

        {/* Responsibilities */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Responsibilities</h4>
          <ul className="space-y-2">
            {m.responsibilities.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs text-slate-500">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: m.badgeColor }} />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="mt-auto">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {m.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: m.badgeBg, border: `1px solid ${m.badgeBorder}`, color: m.badgeColor }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
