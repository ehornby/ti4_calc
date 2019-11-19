import { useEffect, useState } from 'react';
import { firebase } from '../firebase';
import { useUserValue, useProgressValue } from '../context';

/*
    Queries Firebase for all instances in 'games' where userId matches the logged in 
    user where 'inProgress' is flagged as true. Sets 'gameInProgress' to true if any
    games are found to be in progress and returns state object.
*/

export const useProgress = () => {
    const [gameInProgress, setGameInProgress] = useState(false)
    const { loggedIn, setLoggedIn } = useUserValue();

    useEffect(() => {
        firebase
            .firestore()
            .collection('games')
            .where('userId', '==', 'testID1234')
            .where('inProgress', '==', true)
            .get()
            .then(snapshot => {
                const userData = snapshot.docs.map(item => ({
                    ...item.data(),
                }));

                if (userData.length > 0) {
                    setGameInProgress(true);
                }
                else {
                    setGameInProgress(false);
                }
            });          
    }, [loggedIn])
    return { gameInProgress, setGameInProgress };
}

export const useGameData = () => {
    const [gameData, setGameData] = useState( {} );

    useEffect(() => {
        firebase
            .firestore()
            .collection('games')
            .where('userId', '==', 'testID1234')
            .where('inProgress', '==', true)
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(item => ({
                    ...item.get('gameData')
                }));

                if (data.length > 0) {
                    setGameData(data[0]);
                    console.log(data[0], 'hook');
                }
            })

    }, []);
    return { gameData, setGameData };
}