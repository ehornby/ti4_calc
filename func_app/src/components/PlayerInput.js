import React from 'react';
import { useGameDataValue } from '../context';
import { FormControl, FormGroup, DropdownButton } from 'react-bootstrap';
import { races } from '../constants';
import DropdownItem from 'react-bootstrap/DropdownItem';

export const PlayerInput = () => {
    const { gameData, setGameData } = useGameDataValue();
    let numPlayers = gameData.numPlayers;

    const handleNameInput = (num, val) => {
        const tempData = {...gameData}
        tempData[`player${num}`].name = val;
        setGameData(tempData);        
    }

    const handleRaceInput = (index, num) => {
        const tempData = {...gameData}
        tempData[`player${num}`].race = races[index]
        setGameData(tempData);
    }

    const createRaceDropdown = player => {
        let raceChoices = [];
        for (let i = 0; i < races.length; i++) {
            raceChoices.push(
                <DropdownItem
                    eventKey={i}
                    onSelect={(e) => handleRaceInput(e, player)}
                >
                    {races[i]}
                </DropdownItem>
            )
        }
        return raceChoices;
    }

    let players = [];
    for (let num = 1; num <= numPlayers; num++) {
        players.push(
            <div className='player-entry'>
                <FormGroup
                    controlId={`player${num}`}
                    className='player-name'
                >
                    <FormControl 
                        type='text' 
                        required
                        placeholder={`Player ${num}`}
                        value={gameData[`player${num}`][0]}
                        onChange={(e) => handleNameInput(num, e.target.value)} 
                    />
                </FormGroup>
                <DropdownButton
                    title={
                        gameData[`player${num}`].race == "" 
                        || 
                        gameData[`player${num}`].race == undefined
                        ?
                        `Player ${num} race`
                        :
                        gameData[`player${num}`].race
                        }
                        className='player-race'
                        variant='outline-dark'
                    >
                    {createRaceDropdown(num)}
                </DropdownButton>
            </div>
        );
    }

    return players;
}