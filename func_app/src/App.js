import React from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { UserProvider, ProgressProvider } from './context';

export const App = () => {
  return (
    <>
    <UserProvider>
      <ProgressProvider>
        <Header />
        <Content />
      </ProgressProvider>
    </UserProvider>
    </>
  );
}