import React from 'react';
import { Game } from '../components/Game';
import { useGameDataValue } from '../context/gamedata-context';
import { useProgressValue } from '../context/progress-context';
import { render, cleanup, waitForElement } from '@testing-library/react';
import 
{ testGameData, 
testGameDataNoWinner,
testGameDataMultipleWinners, 
testGameDataBlankNames,
testGameDataBlankRaces} from '../../testData';
import 
{ getGameWinner, 
checkForDuplicateRaces, 
checkPlayerNames,
checkForSingleWinner,
checkForValidRaces} from '../helpers';

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
});

test('returns null if no game winner', () => {
    expect(getGameWinner(testGameDataNoWinner)).toBe(null);
});

test('catches multiple players with 10 points', () => {
    expect(checkForSingleWinner(testGameDataMultipleWinners)).toBe(false);
    expect(checkForSingleWinner(testGameData)).toBe(true);
});

test('catches duplicate races', () => {
    expect(checkForDuplicateRaces(testGameData)).toBe(true);
});

test('catches blank player names', () => {
    expect(checkPlayerNames(testGameData)).toBe(true);
    expect(checkPlayerNames(testGameDataBlankNames)).toBe(false);
});

test('catches unselected races', () => {
    expect(checkForValidRaces(testGameData)).toBe(true);
    expect(checkForValidRaces(testGameDataBlankRaces)).toBe(false);
});