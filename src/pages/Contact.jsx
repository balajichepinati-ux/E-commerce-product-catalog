import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, Shield } from 'lucide-react';
import './PagesStyles.css';

export default function Contact() {
  const { showToast } = useApp();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Support');
  const [message, setMessage] = useState('');

  const contactSlots = [
    { label: 'Secure Email Terminal', value: 'support@nexusvortex.net', icon: <Mail size={18} /> },
    { label: 'Quantum Phone Frequency', value: '+88 (900) 124-7890', icon: <Phone size={18} /> },
    { label: 'Logistics Coordinates', value: 'Sector 4, Bangalore Grid 400', icon: <MapPin size={18} /> }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Telemetry transmission is missing parameters', 'info');
      return;
    }

    // Trigger success alert
    showToast(`Telemetry message logged under [${topic}] wave`, 'success');

    // Reset Form
    setName('');
    setEmail('');
    setTopic('Support');
    setMessage('');
  };

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      {/* Title */}
      <div className="page-title-section">
        <h1 className="cyber-title">Contact Command</h1>
        <p>Establish direct hyper-frequency lines with our support cores or logistics sectors.</p>
      </div>

      <div className="contact-split-grid">
        {/* Left Address slots */}
        <div className="contact-info-cards">
          {contactSlots.map((slot, i) => (
            <div key={i} className="contact-slot-card glass hover-lift">
              <div className="contact-slot-icon">{slot.icon}</div>
              <div>
                <div className="contact-slot-title">{slot.label}</div>
                <div className="contact-slot-value font-display">{slot.value}</div>
              </div>
            </div>
          ))}

          <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '3px solid var(--neon-cyan)' }}>
            <Shield size={24} color="var(--neon-cyan)" style={{ flexShrink: '0' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              All communications encrypted end-to-end under sub-synapse frequency matrix standards.
            </span>
          </div>
        </div>

        {/* Right Form terminal */}
        <div className="contact-form-panel glass">
          <h3 className="font-display">Transmit Message Telemetry</h3>
          <form onSubmit={handleFormSubmit} className="review-form-fields" style={{ marginTop: '20px' }}>
            
            <label className="form-label-custom">
              Calibrator Name
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Balaji Rao" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="form-label-custom">
              Email Node
              <input 
                type="email" 
                className="input-field" 
                placeholder="e.g. balaji@vortex.net" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-label-custom">
              Frequency Band (Topic)
              <select 
                className="input-field" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)' }}
              >
                <option value="Support">Support Calibration Node</option>
                <option value="Enterprise">Enterprise Workspace Sync</option>
                <option value="Wholesale">Bulk Hardware Procurement</option>
                <option value="Feedback">Quantum Calibration Feedback</option>
              </select>
            </label>

            <label className="form-label-custom">
              Log Message Logs
              <textarea 
                className="input-field" 
                placeholder="Compose your secure transmission logs here..." 
                rows="5"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ resize: 'none' }}
              />
            </label>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              <Send size={16} /> Transmit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
