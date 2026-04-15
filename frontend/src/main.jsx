import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  return (
    <div>
      <h1>Experiment 9</h1>
      <p>Containerized React App deployed via CI/CD to AWS.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
