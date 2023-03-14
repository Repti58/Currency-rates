import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currencyTodaySlice",
  initialState: {
    currency: [
      { currencyDate: "", prevCurrencyDate: "" },
      [{ id: "0", currencyPriceYesterday: "" }],
    ],
    date: new Date().toLocaleDateString('en-GB').replaceAll("/", "."),
    diagramData: undefined
   
    // ["date", "XXX"],
    // ["01.01", 79],
    // ["02.01", 75],
    // ["03.01", 74],
    // ["04.01", 73],
    // ["05.01", 76],
    // ["06.01", 73],
    // ["07.01", 74],
    // ["08.01", 75]
  
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
      
      state.diagramData = []
      state.diagramData = action.payload;
    },
    
  },
});

export default currencySlice.reducer;
export const { setCurrencyList, setDate, setDiagramData } = currencySlice.actions;
