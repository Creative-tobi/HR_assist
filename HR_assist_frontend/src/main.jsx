import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// #region agent log
fetch('http://127.0.0.1:7676/ingest/9f04e8df-d891-409a-8292-13677fae2a1c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e9a57a'},body:JSON.stringify({sessionId:'e9a57a',runId:'initial',hypothesisId:'H1',location:'src/main.jsx:6',message:'main entry executed',data:{hasRoot:!!document.getElementById('root')},timestamp:Date.now()})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
