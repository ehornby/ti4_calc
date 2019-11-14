import React, { useState, useEffect } from 'react';
import { useUserValue, useProgressValue } from '../../context';

export const Sidebar = () => {
    const { loggedIn, setLoggedIn } = useUserValue();
    const { gameInProgress, setGameInProgress } = useProgressValue();
    const [showCancel, setShowCancel] = useState(false);
    const [showNewGame, setShowNewGame] = useState(false);

    return (
        <div className='sidebar' data-testid='sidebar'>
            <ul className='sidebar__generic'>
                <li
                    data-testid='new-game'
                    className='new-game'
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
    )
}