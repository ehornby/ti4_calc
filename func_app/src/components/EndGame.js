import React from 'react';
import { Button } from 'react-bootstrap';

export default ({
    cancelGame,
    completeGame,
    validWinner,
}) => 
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
