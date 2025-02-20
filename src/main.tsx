import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// main.js
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

worker.onmessage = function (e) {
    console.log('Message received from worker', e.data);
};

worker.postMessage({ msg_type: 0, data: { filename: 'example.stl' } });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
