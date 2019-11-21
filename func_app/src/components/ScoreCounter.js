import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default ({
    score,
    updateScore,
    playerId
}) => 
    <ButtonGroup className='score-counter'>
        <Button 
            className="score-counter__down" 
            variant="outline-dark" 
            onClick={() => updateScore(playerId, -1)}
        >
            -
        </Button>
        <Button 
            className="score-counter__display" 
            variant="outline-dark"
        >
            {score}
        </Button>
        <Button 
            className="score-counter__up" 
            variant="outline-dark" 
            onClick={() => updateScore(playerId, 1)}
        >
            +
        </Button>
    </ButtonGroup>;
