import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Main from './mainView/Main';
import Dashboard from './dashboard/Dashboard';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/dashboard" component={Dashboard} />
           {/*
          <Route path="/" exact component={Login} /> */}
        </Switch>
      </Router>
    </React.Fragment>
    
  );
}

export default App;
