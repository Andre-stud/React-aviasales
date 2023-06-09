import ReactDOM from 'react-dom/client';
import './index.scss';
import React from 'react';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
