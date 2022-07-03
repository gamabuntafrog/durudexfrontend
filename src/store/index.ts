import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>






