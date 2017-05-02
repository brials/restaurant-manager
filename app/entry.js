'use strict';

const React = require('react'); //eslint-disable-line
const ReactDOM = require('react-dom');
var App = require('./component/App'); //eslint-disable-line
require('./scss/main.scss');
ReactDOM.render(
  <App />,
  document.getElementById('app') //eslint-disable-line
);
