import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Layout from './components/Layout';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Layout} />
  </Route>
)
