import React from 'react';
import { useGameDataValue } from '../context';
import { FormControl, FormGroup } from 'react-bootstrap';

export const PlayerInput = () => {
    const { gameData, setGameData } = useGameDataValue();
    let numPlayers = gameData[0];

    const handleChange = (num, val) => {
        const tempData = {...gameData}
        tempData[num][0] = val;
        setGameData(tempData);        
    }

    let players = [];
    for (let num = 1; num <= numPlayers; num++) {
        players.push(
            <FormGroup
                controlId={`player${num}`}
                className='player-entry'
            >
                <FormControl 
                    type='text' 
                    required
                    placeholder={`Player ${num}`}
                    value={gameData[num][0]}
                    onChange={(e) => handleChange(num, e.target.value)} 
                />
            </FormGroup>
        );
    }

    return players;
}