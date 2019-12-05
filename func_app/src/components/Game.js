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
getGameWinner,
saveCompletedGame,
checkForSingleWinner } from '../helpers';

export const Game = () => {
    const { gameData, setGameData } = useGameDataValue();
    const { gameInProgress, setGameInProgress } = useProgressValue();
    const [showScoreConfirm, setShowScoreConfirm] = useState(false);
    const [validWinner, setValidWinner] = useState(true);

    // Ensures user does not close or reload window accidentally with a game in progress

    window.addEventListener('beforeunload', (event) => {
        if (gameInProgress) {
            event.returnValue = 'Game in progress! Cancel game before leaving.';
        }
    });

    useEffect(() => {
        if (checkForSingleWinner(gameData)) {
            setValidWinner(true);
        }
        else {
            setValidWinner(false);
        }
    }, [gameData]);

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
        deleteActiveGame();
        setGameInProgress(false);
    }

    const completeGame = () => {
        setShowScoreConfirm(false);
        saveCompletedGame(gameData);
        setGameData( {} )
        setGameInProgress(false);
    }

    const setGameWinner = () => {
        let winner = getGameWinner(gameData);
        let tempData = {...gameData};
        if (winner && winner != '') {
            tempData.winner = winner;
        }
        console.log(tempData);
        setGameData(tempData);
    }

    // Checks to see if any player has achieved a score of ten points

    const checkForWinner = () => {
        let winnerFound = false;
        const numPlayers = gameData.numPlayers;
        for (let i = 0; i < numPlayers; i++) {
            if (gameData[`player${i+1}`].score >= 10) {
                winnerFound = true;
                setGameWinner();
                break;
            }
        }
        if (!checkForSingleWinner(gameData)) {
            alert('Multiple players have ten or more points - please correct!');
        }
        else if (winnerFound) { completeGame(); }
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
        <div className='game' data-testid='game'>
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
            <div className='valid-winner'>
                {!validWinner &&
                <p>Multiple players have ten or more points, please correct!</p>
                }
            </div>
            <div className='end-game' data-testid='end-game'>
                <Button
                    className='cancel-game'
                    data-testid='cancel-game'
                    onClick={cancelGame}
                    variant='outline-danger'
                >
                    Cancel
                </Button>
                <Button
                    className='complete-game'
                    data-testid='complete-game'
                    onClick={completeGame}
                    variant='outline-success'
                    disabled={!validWinner}
                >
                    Complete Game
                </Button>
        </div>
            </>
            }
        </div>
        <div className='show-confirm-score' data-testid='show-confirm-score'>
            <Modal
                show={showScoreConfirm}
                onHide={() => setShowScoreConfirm(false)}
            >
                <ModalHeader>
                    <ModalTitle>
                        Warning!
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>No one has made it to 10 points - do you want to continue playing?</ModalBody>  
                <ModalFooter>
                    <Button onClick={completeGame} variant='outline-danger'>
                        No, end the game!
                    </Button>
                    <Button onClick={() => setShowScoreConfirm(false)} variant='outline-success'>
                        Yes, keep playing!
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    );
}