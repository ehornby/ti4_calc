import React from 'react';
import { Sidebar } from './Sidebar';
import { Game } from '../Game';
import { Splash } from '../Splash';
import { useUserValue } from '../../context';

export const Content = () => {
    const { loggedIn, setLoggedIn } = useUserValue();

    return (
    <>
    {loggedIn
    ?
    <>        
    <Sidebar />
    <Game />
    </>
    :
    <Splash />
    }
    </>
    );
}
