import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { Header } from '../components/layout/Header';
import { useUserValue } from '../context/user-context';

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

test('renders the logged out header', async () => {
    useUserValue.mockImplementation(() => ({
        loggedIn: false
    }));
    const { getByTestId } = render(<Header />);
    await waitForElement(() => [
        expect(getByTestId('header')).toBeTruthy(),
        expect(getByTestId('links-loggedout')).toBeTruthy(),
    ]);
});