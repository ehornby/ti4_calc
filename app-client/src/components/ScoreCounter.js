import React, { Fragment } from 'react';
import InputGroup, { InputGroupPrepend, InputGroupAppend } from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export default ({
    score,
    updateScore,
    playerId
}) =>
    <Fragment>
        <Button onClick={() => updateScore(playerId, false)}>-</Button>
        <h1>{score}</h1>
        <Button onClick={() => updateScore(playerId, true)}>+</Button>
    </Fragment>;
