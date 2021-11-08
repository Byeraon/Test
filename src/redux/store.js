import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { housesReducer } from "./reducer";

const rootReducer = combineReducers({
  housesReducer: housesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
