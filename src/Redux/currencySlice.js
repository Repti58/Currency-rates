import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currencyTodaySlice",
  initialState: {
    currency: [
      { currencyDate: "", prevCurrencyDate: "" },
      [{ id: "0", currencyPriceYesterday: "" }],
    ],
    date: new Date().toLocaleDateString(),
  },
  reducers: {
    setCurrencyList(state, action) {
      state.currency = [];
      !action.payload[0]
        ? (state.currency = [
            { currencyDate: "", prevCurrencyDate: "" },
            [{ currencyPriceYesterday: "" }],
          ])
        : state.currency.push(...action.payload);
    },
    setDate(state, action) {
      state.date = action.payload;
    },
  },
});

export default currencySlice.reducer;
export const { setCurrencyList, setDate } = currencySlice.actions;
