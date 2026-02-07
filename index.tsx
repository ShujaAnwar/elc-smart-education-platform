import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('ELC: Initializing application...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("ELC Error: Could not find root element to mount to");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('ELC: Application render initiated.');
  } catch (error) {
    console.error('ELC Mount Error:', error);
  }
}