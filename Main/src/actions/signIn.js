import * as types from './action-types';
// Firebase
import { auth } from '../firebase';
import { firebase } from '../firebase';

export const signIn = (username, password, handleResult) => {
  auth.doSignInWithEmailAndPassword(username, password)
    .then(() => {
      console.log('Sign in success...')
      handleResult(true, null);
    })
    .catch(error => {
      console.log('Sign in Error:', error)
      handleResult(false, error.message);
    });
}
