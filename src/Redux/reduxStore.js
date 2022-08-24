import { combineReducers, legacy_createStore } from "redux";
import currencyListReducer from "./currencyListReducer";

const reducers = combineReducers({
    currencyList: currencyListReducer,
})

const store = legacy_createStore(reducers)

window.store = store

export default store