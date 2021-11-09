import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { housesReducer, usersReducer } from "./reducer";

const rootReducer = combineReducers({
  housesReducer: housesReducer,
  usersReducer: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
