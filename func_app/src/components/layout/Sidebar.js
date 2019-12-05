import React, { useState, useEffect } from 'react';
import { useProgressValue, useGameDataValue } from '../../context';
import 
{ Modal, 
ModalTitle,
ModalBody,
ModalFooter,
Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import 
{ deleteActiveGame, 
checkForDuplicateRaces, 
checkPlayerNames, 
checkForValidRaces } from '../../helpers';
import { NumOfPlayers } from '../NumOfPlayers';
import { PlayerInput } from '../PlayerInput';
import { getUserId } from '../../helpers/auth';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const { gameInProgress, setGameInProgress } = useProgressValue();
    const { gameData, setGameData } = useGameDataValue();
    const [showCancel, setShowCancel] = useState(false);
    const [showNewGame, setShowNewGame] = useState(false);
    const [validInput, setValidInput] = useState(false);
    const userId = getUserId();

    useEffect(() => {
        if (
            checkForDuplicateRaces(gameData) &&
            checkForValidRaces(gameData) &&
            checkPlayerNames(gameData)
        ) {
            setValidInput(true);
        }
        else {
            setValidInput(false);
        }

    }, [gameData])

    // Handles cancelling an in-progress game and deleting the DB record

    const handleCancel = () => {
        setShowCancel(false);
        setGameData( {} );
        deleteActiveGame(userId);
        setGameInProgress(false);
    }

    // Handles closing the new game modal and clears gameData

    const handleCloseNewGame = () => {
        setShowNewGame(false);
        setGameData( {} );
    }

    // Handles starting a new game

    const handleStartGame = () => {
        setShowNewGame(false);
        setGameInProgress(true);
    }
    
    return (
        <>
        <div className='sidebar' data-testid='sidebar'>
            <ul className='sidebar__generic'>
                <li
                    data-testid='new-game-link'
                    className='new-game-link'
                    onClick={() => {
                        gameInProgress
                        ?
                        setShowCancel(true)
                        :
                        setShowNewGame(true)
                    }}
                >
                    New Game
                </li>                        
                {gameInProgress
                ?
                <li
                    data-testid='continue-game'
                    className='continue-game'
                >
                    <Link to='/game'>Continue Game</Link>
                </li>
                : null
                }
                <li
                    data-testid='game-results'
                    className='game-results'
                >
                    <Link to='/history'>Game History</Link>
                </li>
            </ul>
        </div>

        {/*
            Modal to cancel game in progress if one exists
        */}

        <div className='show-cancel-game'>
            <Modal
                show={showCancel}
                onHide={() => setShowCancel(false)}
            >
                <ModalHeader>
                    <ModalTitle>
                        Warning!
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>Are you sure you wish to abandon the current game?</ModalBody>  
                <ModalFooter>
                    <Button onClick={handleCancel} variant='outline-danger'>
                        Yes, abandon game!
                    </Button>
                    <Button onClick={() => setShowCancel(false)} variant='outline-success'>
                        No, keep playing!
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        
        {/*
            Modal to initalize new game
        */}

        <div className='show-new-game'>
            <Modal
                show={showNewGame}
                onHide={handleCloseNewGame}
            >
            <ModalHeader>
                <ModalTitle>Start new game</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className='show-new-game__num'>
                    <NumOfPlayers /> 
                </div>
                <div className='show-new-game__input'>
                    <PlayerInput />               
                </div>
            </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={handleCloseNewGame}
                        variant='outline-danger'
                    >
                        Cancel
                    </Button>
                    <Link to='/game'>
                    <Button
                        onClick={handleStartGame}
                        variant='outline-success'
                        disabled={!validInput}
                    >
                        Start game!
                    </Button>
                    </Link>
                </ModalFooter>
            </Modal>
        </div>
        </>
    );
}