import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ApolloClientProvider from './apolloClient'; // Ensure path is correct

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloClientProvider>
      <App />
    </ApolloClientProvider>
  </React.StrictMode>
);
