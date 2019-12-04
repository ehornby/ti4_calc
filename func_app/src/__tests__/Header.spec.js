import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { Header } from '../components/layout/Header';
import { useUserValue } from '../context/user-context';
import { testGameData } from '../../testData';

beforeEach(() => {
    cleanup();
    jest.resetAllMocks();
});

jest.mock('../context/user-context.js');

test('renders the logged in header', async () => {
    useUserValue.mockImplementation(() => ({
        loggedIn: true
    }));
    const { getByTestId } = render(<Header />);
    await waitForElement(() => [
        expect(getByTestId('header')).toBeTruthy(),
        expect(getByTestId('welcome')).toBeTruthy(),
        expect(getByTestId('links-loggedin')).toBeTruthy(),
    ]);
});