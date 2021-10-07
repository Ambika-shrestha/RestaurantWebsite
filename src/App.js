import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './User/mainView/Main';
import Dashboard from './User/dashboard/Dashboard';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}
export default App;
