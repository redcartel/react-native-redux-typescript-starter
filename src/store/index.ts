import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listReducer from './list';
import api from "./middleware/api";
import log from "./middleware/log";

export type RootState = {
    list: { id: number, message: string }[]
}

const reducer = combineReducers({
    list: listReducer
})

const createStore = () => configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api).concat(log)
});

export default createStore