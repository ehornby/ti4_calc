import React from 'react';
import InputGroup, { InputGroupPrepend, InputGroupAppend } from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export default ({
    score,
    updateScore
}) =>
    <InputGroup>
        <Button>{score}</Button>
    </InputGroup>
