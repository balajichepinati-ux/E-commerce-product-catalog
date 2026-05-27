import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Zap, Star } from 'lucide-react';
import './PagesStyles.css';

export default function About() {
  const stats = [
    { label: 'Neural Processing Rate', value: '124 Tbps' },
    { label: 'Global Operations Cores', value: '16 Cores' },
    { label: 'Spatial Calibration Index', value: '99.8%' },
    { label: 'Active Users Enrolled', value: '2.4 Million' }
  ];

  const timelineNodes = [
    {
      year: '3076 BE',
      title: 'Matrix Foundation Layer Decoupled',
      desc: 'Nexus Vortex decoupling completed under subatomic thermal matrices. Initial neural link bandwidth protocols established successfully.'
    },
    {
      year: '3080 BE',
      title: 'Plasma Ionization Acoustical Array Deployed',
      desc: 'Decoupled audio delivery from physical diaphragms. Spatial acoustics fields calibrated across 64 sector cores.'
    },
    {
      year: '3084 BE',
      title: 'Vortex Marketplace Hub Online',
      desc: 'Launched the Next-Generation Spatial Hardware Marketplace. Enabled instant real-time telemetry calibration and shopping clearance.'
    }
  ];

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      {/* Title */}
      <div className="page-title-section">
        <h1 className="cyber-title">Vortex Core Legacy</h1>
        <p>Calibrating the future of sensory workspace logistics and quantum technology integration.</p>
      </div>

      <div className="about-sections">
        {/* Intro Split Grid */}
        <section className="about-intro-grid">
          <div className="about-narrative">
            <h2 className="font-display" style={{ fontSize: '1.6rem', color: 'var(--neon-cyan)', marginBottom: '8px' }}>
              The Spatial Computing Evolution
            </h2>
            <p>
              Nexus Vortex was established to answer a singular technical directive: to decouple modern hardware aesthetics from legacy structural barriers. We build glassmorphic computing modules, subatomic acoustics, and neural-synchronized wearables.
            </p>
            <p>
              By fusing aerospace-grade carbon graphene with active localized air ionization fields, our processing decks and spatial modules breathe real-time interactive energy directly into your physical and digital workspace.
            </p>
            <Link to="/products" className="btn-primary" style={{ marginTop: '16px', width: 'max-content' }}>
              Explore Our Technologies
            </Link>
          </div>

          <div className="about-visual-box glass animate-float">
            <div className="details-image-bg" />
            <img src="/images/headset.png" alt="Futuristic Headset visual" />
          </div>
        </section>

        {/* Stats metrics */}
        <section className="glass" style={{ padding: '40px var(--space-2xl)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="font-display" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--neon-cyan)', textShadow: '0 0 10px rgba(0, 229, 255, 0.2)' }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.5px' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="about-timeline-section">
          <h2 className="cyber-title" style={{ fontSize: '1.6rem', marginBottom: '24px', textAlign: 'center' }}>
            Telemetry Milestones
          </h2>
          <div className="about-timeline">
            {timelineNodes.map((node, i) => (
              <div key={i} className="timeline-node">
                <div className="timeline-node-card glass hover-lift">
                  <div className="timeline-node-year">{node.year}</div>
                  <h3 className="timeline-node-title font-display">{node.title}</h3>
                  <p className="timeline-node-desc">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
