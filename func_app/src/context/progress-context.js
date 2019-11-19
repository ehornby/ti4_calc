/*
    TODO - remove this context and implement directly in Sidebar
*/

import React, { createContext, useContext } from 'react';
import { useProgress } from '../hooks';

export const ProgressContext = createContext();
export const ProgressProvider = ({children}) => {
    const { gameInProgress, setGameInProgress } = useProgress();

    return (
        <ProgressContext.Provider value={{ gameInProgress, setGameInProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgressValue = () => useContext(ProgressContext);