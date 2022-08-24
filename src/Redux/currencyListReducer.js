const SET_CURRENCY_LIST = 'SET-CURRENCY-LIST'

const initialState = {
  currency: [
    { currencyName: 'AUD', currencyPrice: 0.0241381 },
    { currencyName: 'AZN', currencyPrice: 0.02833455 },
    { currencyName: 'GBP', currencyPrice: 0.014062937 },
    { currencyName: 'AMD', currencyPrice: 6.748139 },
    { currencyName: 'BYN', currencyPrice: 0.04265 },
    { currencyName: 'BGN', currencyPrice: 0.0328381 },
    { currencyName: 'BRL', currencyPrice: 0.085048 },
    { currencyName: 'HUF', currencyPrice: 6.891466 },
    { currencyName: 'HKD', currencyPrice: 0.1305556 },
    { currencyName: 'DKK', currencyPrice: 0.1248737 },
    { currencyName: 'USD', currencyPrice: 0.0166673889 },
    { currencyName: 'EUR', currencyPrice: 0.0168044 },
    { currencyName: 'INR', currencyPrice: 1.323949 },
    { currencyName: 'KZT', currencyPrice: 7.841169 },
    { currencyName: 'CAD', currencyPrice: 0.0216209 },
    { currencyName: 'KGS', currencyPrice: 1.33829 },
    { currencyName: 'CNY', currencyPrice: 0.11447856 },
    { currencyName: 'MDL', currencyPrice: 0.321698568 },
    { currencyName: 'NOK', currencyPrice: 0.1616169 },
    { currencyName: 'PLN', currencyPrice: 0.07993 },
    { currencyName: 'RON', currencyPrice: 0.0818 },
    { currencyName: 'XDR', currencyPrice: 0.01279882 },
    { currencyName: 'SGD', currencyPrice: 0.0232593 },
    { currencyName: 'TJS', currencyPrice: 0.1708575 },
    { currencyName: 'TRY', currencyPrice: 0.301983 },
    { currencyName: 'TMT', currencyPrice: 0.0583359 },
    { currencyName: 'UZS', currencyPrice: 181.479639799 },
    { currencyName: 'UAH', currencyPrice: 0.61198 },
    { currencyName: 'CZK', currencyPrice: 0.413867885 },
    { currencyName: 'SEK', currencyPrice: 0.1777025898 },
    { currencyName: 'CHF', currencyPrice: 0.0160407 },
    { currencyName: 'ZAR', currencyPrice: 0.283997 },
    { currencyName: 'KRW', currencyPrice: 22.36931288 },
    { currencyName: 'JPY', currencyPrice: 2.281766 }
  ],
};

const currencyListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENCY_LIST': {
            return {
                ...state,
                currency: action.currency
            }
        }
        default: return state;
    } 
      
        
};

export const setCurrencyList = (currency) => ({
    type: SET_CURRENCY_LIST,
    currency
})

export default currencyListReducer
