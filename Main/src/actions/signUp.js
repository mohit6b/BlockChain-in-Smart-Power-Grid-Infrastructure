import * as types from './action-types';

import { auth } from '../firebase';
import { firebase } from '../firebase';


export const signUp = (data, handleResult) => {

  auth.doCreateUserWithEmailAndPassword(data.username, data.password)
    .then(user => {
      var ref = firebase.database.ref().child('user');
      var extraData = {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role
      }
          
      //use 'child' and 'set' combination to save data in your own generated key  
      ref.child(user.user.uid).set(extraData).then(function(ref) {       
        console.log('regiestered userInfo --> ', data)
        handleResult(true, null);
      }.bind(this), function(error) {        
        console.log('update user infor Error:', error); 
        handleResult(false, error.message);
      });

    })
    .catch(error => {
      console.log('Registered User Error: ', error);
      handleResult(false, error.message);
    });
}
