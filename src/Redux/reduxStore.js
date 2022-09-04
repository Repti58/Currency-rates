import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, legacy_createStore } from "redux";
import currencySlice from "./currencySlice";

// const reducers = combineReducers({
//     currencyList: currencyListReducer,
// })

const store = configureStore ({
reducer: {
    currencySlice    
}
})

window.store = store

export default store