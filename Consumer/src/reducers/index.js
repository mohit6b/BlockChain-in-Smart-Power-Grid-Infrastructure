import { combineReducers } from "redux";
import ProuctsReducer from "./reducer_products";

const rootReducer = combineReducers({
  supplies: ProuctsReducer,
});

export default rootReducer;
