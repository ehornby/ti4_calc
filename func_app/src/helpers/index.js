import { firebase } from '../firebase';
import moment from 'moment';
import { getUserId } from './auth';
/*
    @param userId {string}: userId of currently logged in user

    Queries Firestore for games with 'inProgress' set to true and deletes
    all matching documents (should be one deleted record maximum)
*/

export const deleteActiveGame = () => {
    const userId = getUserId();
    firebase
        .firestore()
        .collection('games')
        .where('userId', '==', userId)
        .where('inProgress', '==', true)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            })
        });   
}

/*
    @param gameId {string}: gameId of current game in progress
    @param gameData {obj}: object with data of in progress game

    Writes current game progress to Firebase
*/

export const saveCompletedGame = (gameData) => {
    const userId = getUserId();
    firebase
        .firestore()
        .collection('games')
        .add({
            userId: userId,
            gameData: gameData,
            inProgress: false,
            dateTime: moment().format('MMM Do YYYY'),
        });
}

export const getGameWinner = gameData => {
    for (let i = 0; i < gameData.numPlayers; i++) {
        if (gameData[`player${i+1}`].score == 10) {
            return gameData[`player${i+1}`].name;
        }
    }
    return null;
}

export const checkForSingleWinner = gameData => {
    let count = 0;
    for (let i = 0; i < gameData.numPlayers; i++) {
        if (gameData[`player${i+1}`].score >= 10) {
            count++;
        }
    }
    if (count == 1) {
        return true;
    }
    else { return false };
}

export const checkPlayerNames = gameData => {
    for (let i = 0; i < gameData.numPlayers; i++) {
        if (gameData[`player${i+1}`].name == '') {
            return false;
        }
    }
    return true;
}

/* 
    @param gameData {obj}: object with data of in progress game

    Checks if more than one player has chosen the same race
*/

export const checkForDuplicateRaces = gameData => {
    let races = [];
    for (let i = 0; i < gameData.numPlayers; i++) {
        races.push(
            gameData[`player${i+1}`].race
        )
    }
    let raceSet = new Set(races);
    raceSet = [...raceSet].filter(x => x != '')
    if (raceSet.length !== races.length || raceSet.length == 0) {
        return false;
    }
    else { return true; }
}

export const checkForValidRaces = gameData => {
    console.log(gameData);
    for (let i = 0; i < gameData.numPlayers; i++) {
        if (gameData[`player${i+1}`].race == "") {
            console.log('invalid race')
            return false;
        }
    }
    return true;
}

export const createNewUser = email => {
    let userId = getUserId();
    firebase
        .firestore()
        .collection('users')
        .add({
            email: email,
            userId: userId
        })

}