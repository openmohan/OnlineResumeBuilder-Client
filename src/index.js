import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js'
import NotFound from './components/NotFound.jsx'
import Home from './components/Home.jsx'
import { Router, Route, Link, browserHistory, IndexRoute,DefaultRoute,Redirect,IndexRedirect  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {Provider } from 'react-redux'
import configureStore from '../configureStore'

let store = configureStore();

ReactDOM.render(
	<Provider store={store} >
	<Router history = {browserHistory}>
	<Route path = "/" component = {App}>
    <IndexRoute component={Home}/>
      <Route path="/mohan" component={Home}/>
	  	<Route path="*" component={NotFound}/>
	</Route>
	</Router>
	</Provider>
	, document.getElementById('root'));
