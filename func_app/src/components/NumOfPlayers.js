import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { useGameDataValue } from '../context';

export const NumOfPlayers = () => {
    let players = [];
    const { gameData, setGameData } = useGameDataValue();

    // Sets the first index of gameData to be equal to the number of players 
    // Creates a template for gameData and updates state

    const createGameDataTemplate = (eventKey) => {
        let tempData = {};
        tempData[0] = eventKey;
        for (let i = 1; i <= eventKey; i++) {
            tempData[i] = ["", 0, ""]
        }
        setGameData(tempData);
    }

    for (let num = 3; num <= 6; num++) {
        players.push(
            <Dropdown.Item 
                eventKey={num} 
                onSelect={(eventKey) => createGameDataTemplate(eventKey)}
            >
                {num}
            </Dropdown.Item>
        );
    }
    return (
        <Dropdown>
            <DropdownToggle>
                <DropdownMenu>
                    {players}
                </DropdownMenu>
            </DropdownToggle>
        </Dropdown>    
    );
}

