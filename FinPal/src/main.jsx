import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FirebaseResponse } from './context/UserContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseResponse>   
      <App />
    </FirebaseResponse>
 
  </StrictMode>,
)
