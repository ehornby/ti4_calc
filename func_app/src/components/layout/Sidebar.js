import React, { useState } from 'react';
import { useProgressValue, useGameDataValue } from '../../context';
import 
{ Modal, 
ModalTitle,
ModalBody,
ModalFooter,
Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { deleteActiveGame, saveNewGame } from '../../helpers';
import { NumOfPlayers } from '../NumOfPlayers';
import { PlayerInput } from '../PlayerInput';

export const Sidebar = ({ setDisplayGame }) => {
    const { gameInProgress, setGameInProgress } = useProgressValue();
    const { gameData, setGameData } = useGameDataValue();
    const [showCancel, setShowCancel] = useState(false);
    const [showNewGame, setShowNewGame] = useState(false);

    // Handles cancelling an in-progress game and deleting the DB record

    const handleCancel = () => {
        setShowCancel(false);
        setGameData( {} );
        deleteActiveGame('testID1234');
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
        saveNewGame(gameData, 'testID1234');
        setGameInProgress(true);
        setDisplayGame(true);
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
                    onClick={() => setDisplayGame(true)}
                >
                    Continue Game
                </li>
                : null
                }
                <li
                    data-testid='game-results'
                    className='game-results'
                    onClick={() => setDisplayGame(false)}
                >
                    Game History
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
                    <Button onClick={() => setShowCancel(false)}>
                        No, keep playing!
                    </Button>
                    <Button onClick={handleCancel}>
                        Yes,abandon game!
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
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleStartGame}
                    >
                        Start game!
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    );
}