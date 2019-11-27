import React, { useState, useEffect } from 'react';
import { useGameDataValue, useProgressValue } from '../context';
import ScoreCounter from './ScoreCounter';
import EndGame from './EndGame';
import 
{ Modal, 
ModalTitle,
ModalBody,
ModalFooter,
Button,
Table } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import 
{ deleteActiveGame, 
saveGameInProgress, 
getActiveGameId, 
setGameWinner } from '../helpers';

export const Game = () => {
    const { gameData, setGameData } = useGameDataValue();
    const { gameInProgress, setGameInProgress } = useProgressValue();
    const [activeGameId, setActiveGameId] = useState('');
    const [showScoreConfirm, setShowScoreConfirm] = useState(false);

    // Loads the active game ID if a game is currently in progress

    useEffect(() => {
        if (gameInProgress) {
            getActiveGameId('testID1234', setActiveGameId);
        }
        else {
            setActiveGameId('');
        }
    },[gameInProgress]);

    const updateScore = (id, inc) => {
        let tempData = {...gameData};
        let playerScore = tempData[`player${id}`].score;

        if (inc > 0 || (inc < 0 && playerScore > 0)) {
            tempData[`player${id}`].score += inc;  
            setGameData(tempData);          
        }
    }

    const cancelGame = () => {
        setGameData( {} );
        deleteActiveGame('testID1234');
        setGameInProgress(false);
    }
    const completeGame = () => {
        setShowScoreConfirm(false);
        setGameWinner(gameData, setGameData);
        saveGameInProgress(activeGameId, gameData, setGameData);
        setGameData( {} )
        setGameInProgress(false);
    }

    // Checks to see if any player has achieved a score of ten points

    const checkForWinner = () => {
        let winnerFound = false;
        const numPlayers = gameData.numPlayers;
        for (let i = 0; i < numPlayers; i++) {
            if (gameData[`player${i+1}`].score == 10) {
                winnerFound = true;
                break;
            }
        }
        if (winnerFound) { completeGame(); }
        else {
            setShowScoreConfirm(true);
        }
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
        <>
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
                completeGame={checkForWinner}
            />
            </>
            }
        </div>
        <div className='show-confirm-score'>
            <Modal
                show={showScoreConfirm}
                onHide={() => setShowScoreConfirm(false)}
            >
                <ModalHeader>
                    <ModalTitle>
                        Warning!
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>No one has made it to 10 points - are you sure you wish to complete the game?</ModalBody>  
                <ModalFooter>
                    <Button onClick={() => setShowScoreConfirm(false)}>
                        No, keep playing!
                    </Button>
                    <Button onClick={completeGame}>
                        Yes,complete game!
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    );
}