import React, { useState } from 'react';
import { useGameDataValue } from '../context';

export const Game = () => {
    const { gameData, setGameData } = useGameDataValue();
    return (
        <p>Game!</p>
        )
}