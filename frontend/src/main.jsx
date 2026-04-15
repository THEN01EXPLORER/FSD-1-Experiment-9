import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = () => {
  const [backendStatus, setBackendStatus] = useState({ loading: true, data: null, error: null });
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus({ loading: false, data, error: null }))
      .catch(err => setBackendStatus({ loading: false, data: null, error: err.message }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const isOnline = !!backendStatus.data;
  const isLoading = backendStatus.loading;

  return (
    <div className="app">
      {/* Animated background orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <div className="logo">
              <div className="logo-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span>FSD Experiment 9</span>
            </div>
            <div className="header-badges">
              <span className="badge badge-live">
                <span className="pulse-dot"></span>
                LIVE
              </span>
              <span className="badge badge-version">v1.0.0</span>
            </div>
          </div>
          <h1 className="hero-title">
            Full-Stack <span className="gradient-text">Cloud Deployment</span>
          </h1>
          <p className="hero-subtitle">
            Containerized application with Docker, CI/CD pipeline, and AWS infrastructure
          </p>
        </header>

        {/* Status Dashboard */}
        <section className="dashboard">
          <div className="section-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            System Health
          </div>

          <div className="status-cards">
            {/* Backend Status */}
            <div className={`status-card ${isLoading ? 'loading' : isOnline ? 'online' : 'offline'}`}>
              <div className="status-card-header">
                <div className="status-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <span className="status-label">Backend API</span>
                <span className={`status-indicator ${isLoading ? 'loading' : isOnline ? 'online' : 'offline'}`}>
                  {isLoading ? '...' : isOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
              <div className="status-details">
                <div className="detail-row">
                  <span>Endpoint</span>
                  <span className="mono">/api/health</span>
                </div>
                <div className="detail-row">
                  <span>Port</span>
                  <span className="mono">5000</span>
                </div>
                <div className="detail-row">
                  <span>Runtime</span>
                  <span className="mono">Node.js + Express</span>
                </div>
              </div>
            </div>

            {/* Database Status */}
            <div className={`status-card ${isLoading ? 'loading' : isOnline ? 'online' : 'offline'}`}>
              <div className="status-card-header">
                <div className="status-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                </div>
                <span className="status-label">Database</span>
                <span className={`status-indicator ${isLoading ? 'loading' : isOnline && backendStatus.data?.database === 'connected' ? 'online' : 'offline'}`}>
                  {isLoading ? '...' : isOnline && backendStatus.data?.database === 'connected' ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
              <div className="status-details">
                <div className="detail-row">
                  <span>Engine</span>
                  <span className="mono">MongoDB</span>
                </div>
                <div className="detail-row">
                  <span>Container</span>
                  <span className="mono">mongo:latest</span>
                </div>
                <div className="detail-row">
                  <span>Port</span>
                  <span className="mono">27017</span>
                </div>
              </div>
            </div>

            {/* Environment Info */}
            <div className="status-card info">
              <div className="status-card-header">
                <div className="status-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <span className="status-label">Environment</span>
                <span className="status-indicator env">
                  {isOnline ? backendStatus.data?.environment?.toUpperCase() : 'N/A'}
                </span>
              </div>
              <div className="status-details">
                <div className="detail-row">
                  <span>Uptime</span>
                  <span className="mono uptime">{formatUptime(uptime)}</span>
                </div>
                <div className="detail-row">
                  <span>Timestamp</span>
                  <span className="mono">{isOnline ? new Date(backendStatus.data?.timestamp).toLocaleTimeString() : '—'}</span>
                </div>
                <div className="detail-row">
                  <span>Region</span>
                  <span className="mono">us-east-1</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="architecture">
          <div className="section-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            Architecture & Pipeline
          </div>

          <div className="arch-grid">
            <div className="arch-card">
              <div className="arch-icon docker">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
              </div>
              <h3>Docker</h3>
              <p>Multi-stage builds with separate containers for frontend (Nginx), backend (Node), and database (MongoDB)</p>
              <div className="arch-tags">
                <span>Dockerfile</span>
                <span>Compose</span>
                <span>Multi-stage</span>
              </div>
            </div>

            <div className="arch-card">
              <div className="arch-icon cicd">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3>CI/CD Pipeline</h3>
              <p>GitHub Actions workflow: Lint → Build → Docker Build → Deploy to AWS on every push to main</p>
              <div className="arch-tags">
                <span>GitHub Actions</span>
                <span>Auto Deploy</span>
              </div>
            </div>

            <div className="arch-card">
              <div className="arch-icon aws">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
              </div>
              <h3>AWS Infrastructure</h3>
              <p>CloudFormation IaC with EC2 (t3.micro Free Tier), Security Groups, and automated provisioning</p>
              <div className="arch-tags">
                <span>CloudFormation</span>
                <span>EC2</span>
                <span>Free Tier</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>FSD Experiment 9 — Full-Stack Deployment &amp; DevOps</p>
          <p className="footer-sub">Docker • GitHub Actions • AWS CloudFormation • React • Node.js • MongoDB</p>
        </footer>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
