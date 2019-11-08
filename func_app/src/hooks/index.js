import { useEffect } from 'react';
import { firebase } from '../firebase';

export const CheckInProgress = () => {

    return (
        useEffect(() => {
            let userData = firebase
            .firestore()
            .collection('games')
            .where('userId', '==', 'testID1234')
            .where('inProgress', '==', true); 
            
            return  (
                userData.length !== 0
            );            
        }, [])
    );
}