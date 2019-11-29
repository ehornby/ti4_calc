import React from 'react';
import Popover from 'react-bootstrap/Popover';
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
            rootClose='true'
            overlay={
                <Popover id="player-names">
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
        <Button variant='outline-dark'>{gameData.winner}</Button>
        </OverlayTrigger>
