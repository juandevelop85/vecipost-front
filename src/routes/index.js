import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

import Layout from '../pages/layout';
import NotFound from '../pages/404';
import App from '../App';

import { Counter } from '../pages/counter/Counter';
import { Posts } from '../pages/posts/Posts';

const RouteApp = () => (
  <Layout>
    <Switch>
      <PublicRoute restricted={true} exact path='/' component={Counter} />
      <PublicRoute restricted={true} exact path='/posts' component={Posts} />

      <Route path='/404' component={NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  </Layout>
);

export default RouteApp;
