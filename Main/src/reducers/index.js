import { combineReducers } from "redux";
import AuthReducer from "./reducer_authentication";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
