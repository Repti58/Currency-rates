import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currencyTodaySlice",
  initialState: {
    currency: [{}, [{currencyPriceYesterday: ''}]],
    date: new Date().toLocaleDateString()
  },
  reducers: {
    setCurrencyList(state, action) {
      state.currency = [];
      state.currency.push(...action.payload);
    },
    setDate(state, action) {
      state.date = action.payload
    }
  },
});

export default currencySlice.reducer;
export const { setCurrencyList, setDate } = currencySlice.actions;
