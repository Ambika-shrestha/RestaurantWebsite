import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './loginView/login';
import Main from './mainView/Main';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          {/* <Route path="/" exact component={Login} />
          <Route path="/" exact component={Login} /> */}
        </Switch>
      </Router>
    </React.Fragment>
    
  );
}

export default App;
