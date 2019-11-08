import React, { useState } from 'react';
import { CheckInProgress } from '../../hooks';


export const Sidebar = () => {
    const inProgressState = CheckInProgress();

    const [gameInProgress, setGameInProgress] = useState(inProgressState);
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