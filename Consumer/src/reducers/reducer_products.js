import { STORE_PRODUCTS } from '../actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case STORE_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}
