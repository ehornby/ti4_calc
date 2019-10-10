import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './ScoreCounter.css';

export default ({
    score,
    updateScore,
    playerId
}) =>
    <ButtonGroup>
        <Button className="score-down" variant="outline-dark" onClick={() => updateScore(playerId, false)}>-</Button>
        <Button className="score-counter" variant="outline-dark">{score}</Button>
        <Button className="score-up" variant="outline-dark" onClick={() => updateScore(playerId, true)}>+</Button>
    </ButtonGroup>;
