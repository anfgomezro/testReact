import React from 'react';
import SignUpForm from './SignUpForm';
import {Switch, BrowserRouter, Route} from 'react-router-dom'

const App = () => 
  (<BrowserRouter>
    <Switch>
      <Route exact path='/'>
        <SignUpForm/>
      </Route>
      <Route path='/service'>
        <h1>Hello map</h1>
      </Route>
    </Switch>
  </BrowserRouter>);

module.exports = App;