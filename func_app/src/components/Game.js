import React, { useState, useEffect } from 'react';
import { useGameDataValue, useProgressValue } from '../context';
import { Table } from 'react-bootstrap';
import ScoreCounter from './ScoreCounter';
import EndGame from './EndGame';
import { deleteActiveGame, saveGameInProgress, getActiveGameId, setGameWinner } from '../helpers';

export const Game = () => {
    const { gameData, setGameData } = useGameDataValue();
    const { gameInProgress, setGameInProgress } = useProgressValue();
    const [activeGameId, setActiveGameId] = useState('');

    const updateScore = (id, inc) => {
        let tempData = {...gameData};
        let playerScore = tempData[`player${id}`].score;

        if (inc > 0 || (inc < 0 && playerScore > 0)) {
            tempData[`player${id}`].score += inc;  
            setGameData(tempData);          
        }
    }
    // Loads the active game ID if a game is currently in progress

    useEffect(() => {
        if (gameInProgress) {
            getActiveGameId('testID1234', setActiveGameId);
        }
        else {
            setActiveGameId('');
        }
    },[gameInProgress]);

    const cancelGame = () => {
        setGameData( {} );
        deleteActiveGame('testID1234');
        setGameInProgress(false);
    }

    const completeGame = () => {
        setGameWinner(gameData, setGameData);
        saveGameInProgress(activeGameId, gameData, setGameData);
        setGameData( {} )
        setGameInProgress(false);
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
            <>
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
            </Table>
            <EndGame 
                cancelGame={cancelGame}
                completeGame={completeGame}
            />
            </>
            }
        </div>
    );
}