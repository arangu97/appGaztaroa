import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCNWPqMmi64oFBN6BBNZ6IqMIlrEFKOLhU",
    authDomain: "dsm-aranguren-appgaztaroa.firebaseapp.com",
    databaseURL: "https://dsm-aranguren-appgaztaroa.firebaseio.com",
    projectId: "dsm-aranguren-appgaztaroa",
    storageBucket: "dsm-aranguren-appgaztaroa.appspot.com",
    messagingSenderId: "462122493284",
    appId: "1:462122493284:web:7c27633d7f43d467700671",
    measurementId: "G-BF8QHGXDWR"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
