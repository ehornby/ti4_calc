import React, { createContext, useContext, useState } from 'react';

export const ProgressContext = createContext();
export const ProgressProvider = ({children}) => {
    const [ gameInProgress, setGameInProgress ] = useState(false);

    return (
        <ProgressContext.Provider value={{ gameInProgress, setGameInProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgressValue = () => useContext(ProgressContext);