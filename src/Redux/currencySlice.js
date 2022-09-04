import { createSlice } from "@reduxjs/toolkit"

// const SET_CURRENCY_LIST = "SET_CURRENCY_LIST";

// const initialState = {
//   currency: [
    
//   ],
// };

// const currencyListReducer = (state = initialState, action) => {
//   
//   switch (action.type) {
//     case "SET_CURRENCY_LIST": {      
//       return {
//         ...state,
//         currency: [          
//           ...action.currency
//         ],
//       };
//     }
//     default:
//       return state
//   }
// };

// export const setCurrencyList = (ratesData) => ({
//   type: SET_CURRENCY_LIST,
//   currency: ratesData,
// });

// export default currencyListReducer;


const currencySlice = createSlice({
name: 'currencyTodaySlice',
initialState: {
  currency: []
},
reducers: {
setCurrencyList(state, action) {
state.currency.push(...action.payload)
}
}
})



export default currencySlice.reducer
export const {setCurrencyList} = currencySlice.actions


