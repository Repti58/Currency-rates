import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, legacy_createStore } from "redux";
import currencySlice from "./currencySlice";

const store = configureStore({
  reducer: {
    currencySlice,
  },
});

window.store = store;

export default store;
