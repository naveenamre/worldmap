import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        if (registration.waiting && navigator.serviceWorker.controller) {
          window.dispatchEvent(new CustomEvent('world-learner-update-ready', { detail: registration }));
        }

        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(new CustomEvent('world-learner-update-ready', { detail: registration }));
            }
          });
        });
      })
      .catch((error) => {
        console.warn('Offline service worker registration failed:', error);
      });

    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload());
  });
}
