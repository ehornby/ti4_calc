/* 
    TODO
*/

import React from 'react';
import { useGameDataValue, useProgressValue } from '../context';
import { Table } from 'react-bootstrap';
import ScoreCounter from './ScoreCounter';

export const Game = () => {
    const { gameData, setGameData } = useGameDataValue();
    const { gameInProgress, setGameInProgress } = useProgressValue();

    const updateScore = (id, inc) => {
        let tempData = {...gameData};
        tempData[`player${id}`].score += inc;
        setGameData(tempData);
    }

    const generatePlayerTable = () => {
        let players = [];
        let numPlayers = gameData.numPlayers;

        for (let i = 1; i <= numPlayers; i++) {
            players.push (
                <tr>
                    <td>{gameData[`player${i}`].name}</td>
                    <td>
                        <ScoreCounter 
                            score={gameData[`player${i}`].score}
                            updateScore={updateScore}
                            playerId={i}
                        />
                    </td>
                    <td>{gameData[`player${i}`].race}</td>
                </tr>

            );
        }
        return players;
    }

    return (
        <div className='game'>
            {gameInProgress &&
            <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Race</th>
                </tr>
            </thead>
                <tbody>
                    {generatePlayerTable()}
                </tbody>
            </Table>}
        </div>
    );
}