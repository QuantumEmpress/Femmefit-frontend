import React from 'react'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Prevent transition flash on page load
document.documentElement.classList.add('no-transition');
window.addEventListener('load', () => {
  document.documentElement.classList.remove('no-transition');
});

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}