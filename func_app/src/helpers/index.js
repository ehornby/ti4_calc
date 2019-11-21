import { firebase } from '../firebase';
/*
    @param userId (string): userId of currently logged in user

    Queries Firestore for games with 'inProgress' set to true and deletes
    all matching documents (should be one deleted record maximum)
*/

export const deleteActiveGame = (userId) => {
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
    @param gameData (obj): object representing initial game state
    @param userId (string): userId of logged in user

    Creates an initial game entry in Firebase
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
    @param userId (string): userId of logged in user
    @param setActiveGameId (fn): callback to set activeGameId state in Sidebar

    Queries Firebase for active game and sets active gameId 
*/

export const getActiveGameId =  (userId, setActiveGameId) => {
    firebase
        .firestore()
        .collection('games')
        .where('userId', '==', userId)
        .where('inProgress', '==', true)
        .get()
        .then(snapshot => {
            const data = snapshot.docs.map(item => (
                setActiveGameId(item.id)
            ));
    });
}

/*
    @param gameId (string): gameId of current game in progress
    @param gameData (obj): object with data of in progress game

    Writes current game progress to Firebase
*/

export const saveGameInProgress = (gameId, gameData) => {
    firebase
        .firestore()
        .collection('games')
        .doc(gameId)
        .set({
            gameData: gameData,
            inProgress: false
        },
        { merge: true });
}

/*
    Queries Firestore and returns a user data object
*/

export const getUserData = () => {

}

