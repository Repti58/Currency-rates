import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currencyTodaySlice",
  initialState: {
    currency: [],
  },
  reducers: {
    setCurrencyList(state, action) {
      state.currency = [];
      state.currency.push(...action.payload);
    },
  },
});

export default currencySlice.reducer;
export const { setCurrencyList } = currencySlice.actions;
