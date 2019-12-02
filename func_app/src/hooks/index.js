import { useEffect, useState } from 'react';
import { firebase } from '../firebase';
import { useUserValue } from '../context';
import { getUserId } from '../helpers/auth';

/*
    Queries Firebase for all instances in 'games' where userId matches the logged in 
    user where 'inProgress' is flagged as true. Sets 'gameInProgress' to true if any
    games are found to be in progress and returns state object.
*/

export const useProgress = () => {
    const [gameInProgress, setGameInProgress] = useState(false)
    const { loggedIn, setLoggedIn } = useUserValue();
    const userId = getUserId();

    useEffect(() => {
        firebase
            .firestore()
            .collection('games')
            .where('userId', '==', userId)
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

/*
    Initializes a gameData state object, queries Firebase for a currently 
    in-progress game and updates state if that game exists
*/


export const useGameData = () => {
    const initialData = {
        numPlayers: 0,
        winner: '',
    }
    for (let i = 0; i <=5; i++) {
        initialData[`player${i+1}`] = {
            name: '',
            score: 0,
            race: ''
        }
    }
    const [gameData, setGameData] = useState(initialData)
    const userId = getUserId();

    useEffect(() => {
        firebase
            .firestore()
            .collection('games')
            .where('userId', '==', userId)
            .where('inProgress', '==', true)
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(item => (
                    item.get('gameData')
                ));
                if (data.length > 0) {
                    setGameData(data[0]);
                    console.log(data);
                }
            });
        }, []);
    return { gameData, setGameData };
}