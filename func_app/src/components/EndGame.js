import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default ({
    cancelGame,
    completeGame,
}) => 
    <ButtonGroup className='end-game'>
        <Button
            className='cancel-game'
            data-testid='cancel-game'
            onClick={cancelGame}
        >
            Cancel
        </Button>
        <Button
            className='complete-game'
            data-testid='complete-game'
            onClick={completeGame}
        >
            Complete Game
        </Button>
    </ButtonGroup>