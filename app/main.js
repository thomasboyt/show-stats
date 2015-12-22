require('../styles/main.less');

import React from 'react';
import ReactDOM from 'react-dom';

import Stats from './components/Stats';

const stats = require('json!yaml!../data/stats.yml');

ReactDOM.render((
  <Stats stats={stats} />
), document.getElementById('container'));
