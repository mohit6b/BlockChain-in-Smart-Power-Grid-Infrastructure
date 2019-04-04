import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
// pages
import Home from './pages/home'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import Dashboard from './pages/dashboard'
import Demo from './pages/demo'
import Records from './pages/records'
import Journey from './pages/journey'
import Certificate from './pages/certificate'

// Redux actions
import * as types from './actions/action-types';
// Firebase
import { auth } from './firebase';
import { firebase } from './firebase';


class App extends Component {
  
  componentDidMount() {
    firebase.auth.onAuthStateChanged(function(user) {
      console.log('AUTH STATE CHANGE.......')
      if (user) {
        var ref = firebase.database.ref().child('user');
        ref.child(user.uid).on('value', function(snapshot) {
          const dbUser = snapshot.val();
          const userInfoObj = {userName: user.email, ...dbUser}
          console.log('Signed in userInfo --> ', userInfoObj);
          this.props.store.dispatch({
            type: types.AUTH_STATE_CHANGE,
            userInfo: userInfoObj
          })
        }.bind(this))
      } else {
        this.props.store.dispatch({
          type: types.AUTH_STATE_CHANGE,
          userInfo: null
        })
      }
    }.bind(this));
  }
  
  render() {
    return (

      <div>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/records" component={Records} />
          <Route path='/journey' component={Journey} />
          <Route path='/certificate' component={Certificate} />
          <Route path='/demo' component={Demo} />
          <Route path="/" component={Home} />
          <Route render={() => <h1>Page Not found</h1>} />
        </Switch>
      </div>

    );
  }
}

export default App;
