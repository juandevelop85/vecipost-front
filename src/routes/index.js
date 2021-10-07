import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

import Layout from '../pages/layout';
import NotFound from '../pages/404';

import { Posts } from '../pages/posts/Posts';
import { PostsStatus } from '../pages/status/PostsStatus';
import { PublicPosts } from '../pages/public_post/PublicPosts';
import { PublicComment } from '../pages/public_comments/PublicComment';

const RouteApp = () => (
  <Layout>
    <Switch>
      <PublicRoute restricted={true} exact path='/' component={Posts} />
      <PublicRoute restricted={true} exact path='/status/:id' component={PostsStatus} />
      <PublicRoute restricted={true} exact path='/create/post' component={PublicPosts} />
      <PublicRoute restricted={true} exact path='/create/comment/:id' component={PublicComment} />

      <Route path='/404' component={NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  </Layout>
);

export default RouteApp;
