import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FirebaseResponse } from './context/UserContext'
import "flyonui/flyonui";
import './themes.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseResponse>   
      <App />
    </FirebaseResponse>
 
  </StrictMode>,
)
