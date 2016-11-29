import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { Router } from 'react-router';

// my stuff
import App from './components/App'

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

ReactDOM.render(
    <Router routes={Routes} history={browserHistory} />,
    document.getElementById('root')
)
