import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currencyTodaySlice",
  initialState: {
    currency: [
      { currencyDate: "", prevCurrencyDate: "" },
      [{ id: "0", currencyPriceYesterday: "" }],
    ],
    date: new Date().toLocaleDateString('en-GB').replaceAll("/", "."),
    diagramData: undefined,
    datePickerSwitcher: "disabled",
  
  
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

    setDatePickerSwitcher(state, action) {
      state.datePicker = action.payload
    }
    
  },
});

export default currencySlice.reducer;
export const { setCurrencyList, setDate, setDiagramData } = currencySlice.actions;
