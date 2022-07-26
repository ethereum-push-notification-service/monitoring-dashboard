import { Suspense } from 'react';
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';

import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import 'simplebar/src/simplebar.css';

function getLibrary(provider) {
  const gottenProvider = new ethers.providers.Web3Provider(provider, 'any'); // this will vary according to whether you use e.g. ethers or web3.js
  return gottenProvider;
}

ReactDOM.render(
  <Suspense fallback={<div />}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <HelmetProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </HelmetProvider>
    </Web3ReactProvider>
  </Suspense>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
