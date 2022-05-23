import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFSKOqQ_avVWQmOLxoXfphm92-ljMasxM",
    authDomain: "mymra-f6924.firebaseapp.com",
    projectId: "mymra-f6924",
    storageBucket: "mymra-f6924.appspot.com",
    messagingSenderId: "722700824434",
    appId: "1:722700824434:web:c95f58f3ebb982fd1b77eb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()
export const auth = firebase.auth();