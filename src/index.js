import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import Routes from './routes'
import { Router, Route } from 'react-router';
import './index.css'

ReactDOM.render(
    <Router routes={Routes} history={browserHistory} />,
    document.getElementById('root')
);
