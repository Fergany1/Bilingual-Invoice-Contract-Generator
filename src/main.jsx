import "@fontsource/cairo/400.css";
import "@fontsource/cairo/600.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './print.css'
import './scratch.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
