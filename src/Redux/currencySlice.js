import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currencyTodaySlice",
  initialState: {
    currency: [
      { currencyDate: "", prevCurrencyDate: "" },
      [{ id: "0", currencyPriceYesterday: "" }],
      { selectedDateRequest: null },
    ],
    date: new Date().toLocaleDateString("en-GB").replaceAll("/", "."),
    diagramData: undefined,
    diagramRangeReady: true,
    selectedRange: "month",
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

    setDiagramData(state, action) {
      state.diagramData = [];
      state.diagramData = action.payload;
    },

    setDiagramRangeReady(state, action) {
      state.diagramRangeReady = action.payload;
    },

    setSelectedRange(state, action) {
      state.selectedRange = action.payload;
    },
  },
});

export default currencySlice.reducer;
export const {
  setCurrencyList,
  setDate,
  setDiagramData,
  setDiagramRangeReady,
  setSelectedRange,
} = currencySlice.actions;
