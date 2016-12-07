import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { Router } from 'react-router';

const Routes = {
    path: '/',
    component: require('./components/App'),
    indexRoute: { onEnter: (nextState, replace) => replace('/food') },
    childRoutes: [
        require('./routes/BrowseFood'),
        require('./routes/BrowsePlace'),
        require('./routes/Submit'),
        require('./routes/ProfileUser'),
        require('./routes/Oop'),
    ]
}

ReactDOM.render(
    <Router routes={Routes} history={browserHistory} />,
    document.getElementById('root')
)
