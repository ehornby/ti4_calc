/*
    @param gameData: { _numOfPlayers, {...player1}, {...player2}, {...playern} }
    {...playern}: {
        name: "",
        score: 0,
        race: ""
    }
*/

import React, { createContext, useContext } from 'react';
import { useGameData } from '../hooks';

export const GameDataContext = createContext();
export const GameDataProvider = ({children}) => {
    const { gameData, setGameData } = useGameData();

    return (
        <GameDataContext.Provider value={{ gameData, setGameData }}>
            {children}
        </GameDataContext.Provider>
    );
}

export const useGameDataValue = () => useContext(GameDataContext);