import React from 'react';
import { Sidebar } from './Sidebar';
import { Game } from '../Game';
import { History } from '../History';
import { Splash } from '../Splash';
import { useUserValue } from '../../context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const Content = () => {
    const { loggedIn, setLoggedIn } = useUserValue();
   
    return (
        <section className='content'>        
            {loggedIn
            ?
            <Router>        
                <Sidebar/>
                <Switch>
                    <Route path='/game' component={Game} />
                    <Route path='/history' component={History} />
                </Switch>
            </Router>
            :
            <Splash />
            }
        </section>
    );
}
