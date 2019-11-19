import { firebase } from '../firebase';

/*
    Queries Firestore for games with 'inProgress' set to true and deletes
    all matching documents (should be one deleted record maximum)
*/

export const deleteActiveGame = () => {
    firebase
        .firestore()
        .collection('games')
        .where('userId', '==', 'testID1234')
        .where('inProgress', '==', true)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            })
        });   
}

/*
    @param gameData: object representing initial game state
    @param userId: userId of logged in user
*/

export const saveNewGame = (gameData, userId) => {
    firebase
        .firestore()
        .collection('games')
        .add({
            gameData: gameData,
            userId: userId,
            inProgress: true
        });
}      


/*
    Queries Firestore and returns a user data object
*/

export const getUserData = () => {

}

