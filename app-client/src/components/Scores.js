import React from 'react';
import Popover from 'react-bootstrap/Popover';
import PopoverTitle from 'react-bootstrap/PopoverTitle';
import PopoverContent from 'react-bootstrap/PopoverContent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

// Click on winner to display player names, races, and scores

const popover = (
    <Popover id="player-names">
        <PopoverTitle>Results</PopoverTitle>
        <PopoverContent>
            Test (list of scores here)
        </PopoverContent>
    </Popover>
);

export default ({
    playerData
}) =>
    <OverlayTrigger 
        trigger="click" 
        placement="right"
        overlay={popover}
    >
        <Button variant="primary">Winner</Button>
    </OverlayTrigger>