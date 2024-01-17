import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter } from 'react-router-dom'
import { SecretsProvider } from './contexts/secretsContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='1011075111633-1g896tah517jtjj2bj8fetq9lpeso63l.apps.googleusercontent.com'>
      <BrowserRouter>
        <SecretsProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </SecretsProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
