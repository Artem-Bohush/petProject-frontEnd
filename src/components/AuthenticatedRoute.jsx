import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginSignupService from '../services/LoginSignupService';

class AuthenticatedRoute extends Component {
  render() {
    if (LoginSignupService.isUserLoggedIn()) {
      return <Route {...this.props} />
    } else {
      return <Redirect to="/login" />
    }

  }
}

export default AuthenticatedRoute;