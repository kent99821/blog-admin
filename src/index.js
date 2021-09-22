import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,Switch, Route,  Redirect } from 'react-router-dom';
import AdminIndex from './pages/AdminIndex';
import MyRouter from './myRouter/index';
import Login from './pages/Login';
import './index.css'


ReactDOM.render(
  (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <MyRouter path='/admin' component={AdminIndex}></MyRouter>
        <Redirect path="/" to="/admin" />
      </Switch>
    </HashRouter>
  ),
  document.getElementById('root')
);
