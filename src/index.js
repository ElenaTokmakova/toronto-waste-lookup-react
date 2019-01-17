import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./assets/styles/style.scss";

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <App />, document.getElementById('app')
);