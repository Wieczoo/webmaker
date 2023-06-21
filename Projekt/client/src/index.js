import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
window.$url = "https://localhost:7298/api";
window.$remotehost = "https://localhost:7298/";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

