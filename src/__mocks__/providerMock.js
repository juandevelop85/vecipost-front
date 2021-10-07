import React from 'react';
// import './index.css';
// import './assets/styles/fonts.css';
// import './assets/styles/globals.scss';
// import './assets/styles/buttons.css';

import { store } from '../app/store';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

const history = createBrowserHistory();

const ProviderMock = (props) => (
  <Provider store={store}>
    <Router history={history}>{props.children}</Router>
  </Provider>
);

export default ProviderMock;
