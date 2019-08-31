import React from 'react';
import { Provider } from 'react-redux';
import {HashRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
document.getElementById('root'));
