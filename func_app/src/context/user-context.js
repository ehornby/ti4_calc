import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();
export const UserProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
export const useUserValue = () => useContext(UserContext);