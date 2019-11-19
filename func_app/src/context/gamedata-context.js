/*
    @param gameData: { _numOfPlayers, [...player1], [...player2]...[...playern] }
    [...playern]: [_playerName, _score, _race]
*/

import React, { createContext, useContext, useState } from 'react';

export const GameDataContext = createContext();
export const GameDataProvider = ({children}) => {
    const [gameData, setGameData] = useState({});

    return (
        <GameDataContext.Provider value={{ gameData, setGameData }}>
            {children}
        </GameDataContext.Provider>
    );
}

export const useGameDataValue = () => useContext(GameDataContext);