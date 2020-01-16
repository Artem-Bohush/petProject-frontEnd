import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Template from './components/Template';
import AuthenticatedRoute from './components/AuthenticatedRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      signup: false,
      template: false,
      successSignup: { display: 'none' },
      userEmail: '',
      userName: '',
      userBalance: '',
    };
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <AuthenticatedRoute path="/" exact component={Template} />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App;