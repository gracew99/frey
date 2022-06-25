import { DAppProvider, Rinkeby, Mumbai } from '@usedapp/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: "https://polygon-mumbai.g.alchemy.com/v2/i3LS8KpQECA-H42U2EYYyVFArwrSTDSz",
  },
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>
);