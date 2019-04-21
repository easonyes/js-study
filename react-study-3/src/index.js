import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import {  Route, Redirect, Switch } from 'react-router';
import { createBrowserHistory } from  'history';
import App from './components/App/App';
import Home from './components/Home/Home';
import Repos from './components/Repos/Repos';
// import About from './components/About/';
import User from './components/User/User';
import FindFirstFew from './components/Contacts/Contacts'
// import Contacts from './components/Contacts';



ReactDOM.render(
  <BrowserRouter basename={"/"}>
    <div>
      <Route path="/" component={App} />
      <Route component={Home} />
      <Route strict={true} exact={true} path="/repos/:name" component={Repos} />
      <Switch>
      <Route path="/about" render={() => (<div>sadasdasdas</div>)} />
      <Route path="/user" component={User} />
      </Switch>
      <Route path="/contacts" component={FindFirstFew} />
    </div>
  </BrowserRouter>,
  document.getElementById('app'));

/* 另外一种写法：
const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/repos/:name" component={Repos} />
      <Route path="/about" component={About} />
      <Route path="/user" component={User} />
      <Route path="/contacts" component={Contacts} />
    </Route>
);

ReactDOM.render(
  <Router routes={routes} history={hashHistory} />,
  document.getElementById('app'));
*/