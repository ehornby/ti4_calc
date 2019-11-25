import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Game } from '../Game';
import { History } from '../History';
import { Splash } from '../Splash';
import { useUserValue } from '../../context';

export const Content = () => {
    const { loggedIn, setLoggedIn } = useUserValue();
    const [displayGame, setDisplayGame] = useState(true);
    
    return (
        <section className='content'>
        
            {loggedIn
            ?
            <>        
                <Sidebar 
                    setDisplayGame={setDisplayGame}
                />
                {displayGame 
                ?
                <Game />
                :
                <History />
                }
            </>
            :
                <Splash />
            }
        </section>
    );
}
