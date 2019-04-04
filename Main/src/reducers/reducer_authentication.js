import * as types from '../actions/action-types';

const INITIAL_STATE = {userInfo: null};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.AUTH_STATE_CHANGE:
      return {userInfo: action.userInfo};
   
    default:
      return state;
  }
  return state;
}
