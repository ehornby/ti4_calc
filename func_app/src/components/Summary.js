import React from 'react';
import Popover from 'react-bootstrap/Popover';
import PopoverTitle from 'react-bootstrap/PopoverTitle';
import PopoverContent from 'react-bootstrap/PopoverContent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

    const generatePlayerTable = (gameData) => {
        let numPlayers = gameData.numPlayers;
        let workingData = [];

        for (let i = 0; i < numPlayers; i++) {
            workingData[[`player${i+1}`]] = gameData[`player${i+1}`];
        }
        let players = [];
        for (let i = 0; i < numPlayers; i++) {
            players.push(
                <tr>
                    <td>{workingData[`player${i+1}`].name}</td>
                    <td>{workingData[`player${i+1}`].score}</td>
                </tr>
            )
        }
        return players;
    }

    export default ({ gameData }) =>
        <OverlayTrigger 
            trigger="click" 
            placement="right"
            overlay={
                <Popover id="player-names">
                    <PopoverTitle>Game Results</PopoverTitle>
                    <PopoverContent>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generatePlayerTable(gameData)}
                            </tbody>
                        </Table>
                    </PopoverContent>
                </Popover>
            }
        >
        <Button variant="primary">{gameData.winner}</Button>
        </OverlayTrigger>
