import { useEffect, useState } from 'react';
import { firebase } from '../firebase';

export const useProgress = () => {
    const [gameInProgress, setGameInProgress] = useState(false)

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
            })            

    }, [])

    return { gameInProgress, setGameInProgress };
}

