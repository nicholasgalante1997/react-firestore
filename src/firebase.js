import firebase from 'firebase/app';
import 'firebase/firestore';

const settings = {
    timestampsInSnapshots: true 
};

const config = {
    apiKey: "AIzaSyBMFJ6iklyT3yJkdKqZLmAeILTY2X4TLW8",
    authDomain: "djamware-tut.firebaseapp.com",
    projectId: "djamware-tut",
    storageBucket: "djamware-tut.appspot.com",
    messagingSenderId: "315413663499",
    appId: "1:315413663499:web:b5a35198470baaf7209c0e",
    measurementId: "G-H7B7C263X2"
}

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;