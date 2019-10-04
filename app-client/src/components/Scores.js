import React from 'react';
import Popover from 'react-bootstrap/Popover';
import PopoverTitle from 'react-bootstrap/PopoverTitle';
import PopoverContent from 'react-bootstrap/PopoverContent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// Click on winner to display player names, races, and scores

function generatePlayerTable(data) {
    function sorter(a, b) {
        if (parseInt(a[1]) < parseInt(b[-1])) return 1;
        if (parseInt(a[1]) > parseInt(b[1])) return -1;
        return 0
    }

    const sortedData = Object.values(data).sort(sorter);
    let players = [];
    for (var player of sortedData) {
        players.push(
            <tr>
                <td>{player[0]}</td>
                <td>{player[1]}</td>
            </tr>
        );
    }
    
    return(
        players
    );
}

export default ({
    data
}) =>
    <OverlayTrigger 
        trigger="click" 
        placement="right"
        overlay={
            <Popover id="player-names">
                <PopoverTitle>Results</PopoverTitle>
                <PopoverContent>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generatePlayerTable(data)}
                        </tbody>
                    </Table>
                </PopoverContent>
            </Popover>
        }
    >
        <Button variant="primary">Winner</Button>
    </OverlayTrigger>