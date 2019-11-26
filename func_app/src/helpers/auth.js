import firebase from 'firebase';

export const firebaseLogin = async (email, password, setLoggedIn) => {
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            setLoggedIn(true);
        })
        .catch(error => {
            alert(error)
    })
}

export const firebaseRegister = async (email, password,setLoggedIn) => {
    await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            setLoggedIn(true);
        })
        .catch(error => {
            alert(error);
    })
}

export const firebaseSignOut = async () => {
    await firebase
        .auth()
        .signOut()
        .catch(error => {
            alert(error);
    });
}

export const getUserId = () => {
    let user = firebase.auth().currentUser;
    if (user) {
        return user.uid;
    }
}

export const getUserSignInName = () => {
    let user = firebase.auth().currentUser;
    if (user) {
        if (user.displayName) {
            return user.displayName;
        }
        else {
            return user.email;
        }
    }
}