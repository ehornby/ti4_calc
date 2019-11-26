import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDKa-m3MctSUaLqeHbLDoICuYDmVU6VsGM",
    authDomain: "ti4-tracker.firebaseapp.com",
    databaseURL: "https://ti4-tracker.firebaseio.com",
    projectId: "ti4-tracker",
    storageBucket: "ti4-tracker.appspot.com",
    messagingSenderId: "385013137546",
    appId: "1:385013137546:web:57bb38ff4642d243422d73"    
})

export { firebaseConfig as firebase };