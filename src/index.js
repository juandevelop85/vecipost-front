import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/styles/fonts.css';
import './assets/styles/globals.scss';
import './assets/styles/buttons.css';

import RouteApp from './routes';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history} basename={window.location.pathname}>
      <Provider store={store}>
        <RouteApp />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
