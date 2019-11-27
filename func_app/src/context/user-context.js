import React, { createContext, useContext, useState } from 'react';
import firebase from 'firebase';

export const UserContext = createContext();
export const UserProvider = ({children}) => {
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setLoggedIn(true)
        }
      });
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
export const useUserValue = () => useContext(UserContext);