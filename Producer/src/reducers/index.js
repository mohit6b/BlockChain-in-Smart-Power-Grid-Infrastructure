import { combineReducers } from "redux";
import SuppliesReducer from "./reducer_products";

const rootReducer = combineReducers({
  supplies: SuppliesReducer,
});

export default rootReducer;
