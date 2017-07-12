import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import MainBoard from './components/MainBoard';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainBoard} />
  </Route>
)
