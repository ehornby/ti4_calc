/* 
    TODO
*/

import React, { useState } from 'react';
import { useGameDataValue, useProgressValue } from '../context';

export const Game = () => {
    const { gameData, setGameData } = useGameDataValue();
    const { gameInProgress, setGameInProgress } = useProgressValue();

    const generatePlayerTable = () => {
        let players = [];
        let numPlayers = gameData[0];

        for (let i = 1; i <= numPlayers; i++) {
            players.push (
                <h1>{gameData[`player${i}`][0]}</h1>
            )
        }
        return players;
    }

    return (
        <div className='game'>
        {gameInProgress &&
        <>
        {() => generatePlayerTable}
        </>
        }
        </div>
        )
}