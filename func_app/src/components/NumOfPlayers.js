import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useGameDataValue } from '../context';

export const NumOfPlayers = () => {
    let players = [];
    const { gameData, setGameData } = useGameDataValue();

    // Sets the first index of gameData to be equal to the number of players 
    // Creates a template for gameData and updates state

    const createGameDataTemplate = (eventKey) => {
        let tempData = {};
        tempData['numPlayers'] = eventKey;
        for (let i = 1; i <= eventKey; i++) {
            tempData[`player${i}`] = {
                name: "",
                score: 0,
                race: ""
            }
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
        <DropdownButton
            title={
                (gameData.numPlayers == 0 || gameData.numPlayers == undefined)
                ?
                'Select number of players'
                :
                `${gameData.numPlayers} players`
            }
        >
            {players}
        </DropdownButton> 
    );
}

