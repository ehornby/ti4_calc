import firebase from 'firebase';

/*
    @param email (string) : email address from form
    @param password (string) password from form
    @param setLoggedIn: callback to set login state

    Handles logging user in via Firebase auth
*/

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

/*
    @param email (string) : email address from form
    @param password (string) password from form
    @param setLoggedIn: callback to set login state

    Handles registering user via Firebase auth (also logs in)
*/

export const firebaseRegister = async (email, password, setLoggedIn) => {
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

// Handles logging user out via Firebase auth

export const firebaseSignOut = async () => {
    await firebase
        .auth()
        .signOut()
        .catch(error => {
            alert(error);
    });
}

// Gets and returns user ID from currently logged in user

export const getUserId = () => {
    let user = firebase.auth().currentUser;
    if (user) {
        return user.uid;
    }
    else { return '' }
}

/* 
    Gets and returns current user's display name if one is set,
    otherwise returns user email
*/

export const getUserSignInName = () => {
    let user = firebase.auth().currentUser;
    if (user) {
        if (user.displayName) {
            localStorage.setItem('displayName', user.displayName)
            return user.displayName;
        }
        else {
            return user.email;
        }
    }
}

/*
    @parm name (string): desired display name from form

    Updates user's profile with new display name
*/

export const changeUserSignInName = async name => {
    await firebase
        .auth()
        .currentUser
        .updateProfile({
            displayName: name
        })
        .catch(error => {
            alert(error)
        });        
}