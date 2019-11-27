import React from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { UserProvider, ProgressProvider, GameDataProvider } from './context';

export const App = () => {

  return (
    <>
    <UserProvider>
      <GameDataProvider>
        <ProgressProvider>
          <Header />
          <Content />
        </ProgressProvider>
      </GameDataProvider>
    </UserProvider>
    </>
  );
}