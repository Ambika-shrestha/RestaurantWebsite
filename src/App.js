import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
