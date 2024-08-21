import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css'; // Include this if you have any global styles

// Create a root element to render the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
