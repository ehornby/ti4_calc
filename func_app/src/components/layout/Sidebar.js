/*
    TODO    - fix re-rendering when game is cancelled
            - directly implement checking of game in progress
*/

import React, { useState } from 'react';
import { useUserValue, useProgressValue } from '../../context';
import 
{ Modal, 
ModalTitle,
ModalBody,
ModalFooter,
} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { Button } from 'react-bootstrap';
import { deleteActiveGame } from '../../helpers';
import { NumOfPlayers } from '../NumOfPlayers';
import { PlayerInput } from '../PlayerInput';
import { useGameDataValue } from '../../context';

export const Sidebar = () => {
    const { gameInProgress, setGameInProgress } = useProgressValue();
    const { gameData, setGameData } = useGameDataValue();
    const [showCancel, setShowCancel] = useState(false);
    const [showNewGame, setShowNewGame] = useState(false);

    // Handles cancelling an in-progress game and deleting the DB record

    const handleCancel = () => {
        deleteActiveGame();
        setShowCancel(false);
        setGameInProgress(false);
    }

    // Handles closing the new game modal and clears gameData

    const handleCloseNewGame = () => {
        setShowNewGame(false);
        setGameData( {} );
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
                    Continue Game
                </li>
                : null
                }
                <li
                    data-testid='game-results'
                    className='game-results'
                >
                    Game History
                </li>
            </ul>
        </div>

        {/*
            Modal to cancel game in progress if one exists
        */}

        <div className='cancel-game'>
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
                Select number of players:
            </ModalBody>
                <NumOfPlayers /> 
                <PlayerInput />               
            </Modal>
        </div>
        </>
    );
}