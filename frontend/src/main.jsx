import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = () => {
  const [backendStatus, setBackendStatus] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus({ loading: false, data, error: null }))
      .catch(err => setBackendStatus({ loading: false, data: null, error: err.message }));
  }, []);

  return (
    <div className="container">
      <header className="glass-header">
        <h1>Experiment 9</h1>
        <div className="badge gold">Containerized & Scalable</div>
      </header>
      
      <main>
        <div className="card">
          <h2>Deployment Status</h2>
          {backendStatus.loading && <p className="animate-pulse">Checking connectivity...</p>}
          {backendStatus.data && (
            <div className="status-grid">
              <div className="status-item">
                <span className="label">Backend:</span>
                <span className="value success">ONLINE</span>
              </div>
              <div className="status-item">
                <span className="label">Database:</span>
                <span className="value success">{backendStatus.data.database}</span>
              </div>
              <div className="status-item">
                <span className="label">Environment:</span>
                <span className="value highlight">{backendStatus.data.environment}</span>
              </div>
            </div>
          )}
          {backendStatus.error && (
            <div className="status-item">
              <span className="label">Backend:</span>
              <span className="value error">OFFLINE (Check local Docker)</span>
            </div>
          )}
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Infrastructure</h3>
            <p>AWS ALB + Auto Scaling Group (min: 2, max: 5)</p>
          </div>
          <div className="info-card">
            <h3>CI/CD</h3>
            <p>GitHub Actions Pipeline (Lint -> Build -> Push)</p>
          </div>
        </div>
      </main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
