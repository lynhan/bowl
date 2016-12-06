import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { Router } from 'react-router';

// my stuff
import App from './components/App'
import BrowseFood from './components/App/BrowseFood'
import BrowsePlace from './components/App/BrowsePlace'
import AddFood from './components/App/AddFood'
import ProfileUser from './components/App/ProfileUser'

const Routes = {
  path: '/',
  component: App,
  indexRoute: { component: BrowseFood },
  childRoutes: [
    { path: 'food', component: BrowseFood },
    { path: 'place', component: BrowsePlace },
    { path: 'submit', component: AddFood },
    { path: 'me', component: ProfileUser },
    // {
    //   path: 'inbox',
    //   component: Inbox,
    //   childRoutes: [{
    //     path: 'messages/:id',
    //     onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
    //   }]
    // },
    // {
    //   component: Inbox,
    //   childRoutes: [{
    //     path: 'messages/:id', component: Message
    //   }]
    // }
  ]
}

ReactDOM.render(
    <Router routes={Routes} history={browserHistory} />,
    document.getElementById('root')
)
