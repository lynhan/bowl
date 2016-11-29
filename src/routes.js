import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App'

// const Routes = (props) => (
//   <Router {...props}>
//     <Route path="*" component={App} />
//   </Router>
// );

const Routes = {
  path: '/',
  component: App
  // indexRoute: { component: Dashboard },
  // childRoutes: [
  //   { path: 'about', component: About },
  //   {
  //     path: 'inbox',
  //     component: Inbox,
  //     childRoutes: [{
  //       path: 'messages/:id',
  //       onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
  //     }]
  //   },
  //   {
  //     component: Inbox,
  //     childRoutes: [{
  //       path: 'messages/:id', component: Message
  //     }]
  //   }
  // ]
}
export default Routes;
