import React from 'react';
import Switch from 'react-router-dom/Switch';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Results from './containers/Results';
import PropRoute from './components/PropRoute';
import New from './containers/New';

export default ({ props }) => 
    <Switch>
        <PropRoute path="/" exact component={Home} props={props} />
        <PropRoute path="/login" exact component={Login} props={props} />
        <PropRoute path="/register" exact component={Register} props={props} />
        <PropRoute path="/results" exact component={Results} props={props} />
        <PropRoute path="/new" exact component={New} props={props} />
    </Switch>;
