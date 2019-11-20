import React from 'react';
import { Sidebar } from './Sidebar';
import { Game } from '../Game';
import { Splash } from '../Splash';
import { useUserValue, useProgressValue } from '../../context';

export const Content = () => {
    const { loggedIn, setLoggedIn } = useUserValue();
    
    return (
        <section className='content'>
            {loggedIn
            ?
            <>        
                <Sidebar />
                <Game />
            </>
            :
                <Splash />
            }
        </section>
    );
}
