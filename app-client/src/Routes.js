import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';

export default (props) => 
    <Switch>
        <Route path="/" exact component={Home} props={props} />
        <Route path="/login" exact component={Login} props={props} />
        <Route path="/register" exact component={Register} props={props} />
    </Switch>;
