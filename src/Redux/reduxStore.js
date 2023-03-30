import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currencySlice";
import chartSlice from "./chartSlice";

const store = configureStore({
  reducer: {
    currencySlice,
    chartSlice,
  },
});

window.Storage = store;

export default store;
