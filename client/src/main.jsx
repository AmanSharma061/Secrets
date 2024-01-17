import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter } from 'react-router-dom'
import { SecretsProvider } from './contexts/secretsContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SecretsProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SecretsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
