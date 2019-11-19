/* 
    TODO
    - Pull gameData for inProgress game on load
*/

import React, { useState } from 'react';
import { useGameDataValue } from '../context';

export const Game = () => {
    const { gameData, setGameData } = useGameDataValue();

    const generatePlayerTable = () => {
        let players = [];
        let numPlayers = gameData[0];

        for (let i = 1; i <= numPlayers; i++) {
            console.log(gameData[`player${i}`])
            players.push (
                <h1>{gameData[i][0]}</h1>
            )
        }
        return players;
    }

    return (
        <div className='game'>
            <h1>Game!</h1>
            {generatePlayerTable}
        </div>
        )
}