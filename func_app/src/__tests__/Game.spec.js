import React from 'react';
import { Game } from '../components/Game';
import { useGameDataValue } from '../context/gamedata-context';
import { useProgressValue } from '../context/progress-context';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { testGameData } from '../../testData';
import { getGameWinner, checkForDuplicateRaces } from '../helpers';

beforeEach(() => {
    cleanup();
    jest.resetAllMocks();
});

jest.mock('../context/gamedata-context.js');
jest.mock('../context/progress-context.js')


test('renders the game', async () => {
    useGameDataValue.mockImplementation(() => ({
        gameData: testGameData
    }));
    useProgressValue.mockImplementation(() => ({
        inProgress: true
    }));
    const { getByTestId } = render(<Game />);
    await waitForElement(() => [
        expect(getByTestId('game')).toBeTruthy(),
        expect(getByTestId('show-confirm-score')).toBeTruthy(),
    ]);
});

test('determines game winner', () => {
    expect(getGameWinner(testGameData)).toBe('player2');
})

test('catches duplicate races', () => {
    expect(checkForDuplicateRaces(testGameData)).toBe(false);
});
