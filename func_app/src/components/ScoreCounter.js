import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default ({
    score,
    updateScore,
    playerId
}) => 
    <ButtonGroup>
        <Button 
            className="score-down" 
            variant="outline-dark" 
            onClick={() => updateScore(playerId, -1)}
        >
            -
        </Button>
        <Button 
        className="score-counter" 
        variant="outline-dark"
        >
            {score}
        </Button>
        <Button 
        className="score-up" 
        variant="outline-dark" 
        onClick={
() => updateScore(playerId, 1)}
        >
            +
        </Button>
    </ButtonGroup>;
