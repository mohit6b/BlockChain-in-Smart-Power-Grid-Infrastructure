import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const config = {
  apiKey: "AIzaSyCNagPUDyID6yg0FqKogXUMM0SfG7Salzo",
  authDomain: "dev-auth-130a5.firebaseapp.com",
  databaseURL: "https://dev-auth-130a5.firebaseio.com",
  projectId: "dev-auth-130a5",
  storageBucket: "dev-auth-130a5.appspot.com",
  messagingSenderId: "256846010326"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
  auth,
  database,
}