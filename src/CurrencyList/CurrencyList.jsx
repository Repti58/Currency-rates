import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./CurrencyList.css";
// import xml2js from 'xml2js'
import { setCurrencyList } from "../Redux/currencyListReducer";
import getCurrencyName from "./getCurrencyName";
// import { parseString } from 'xml2js';
var convert = require('xml-js');
const axios = require('axios').default;
// const parseString = require('xml2js').parseString;


const CurrencyList = () => {
  debugger
  const dispatch = useDispatch();
  const currencyItems = useSelector((state) => state.currencyList.currency);
  console.log("currencyItems >>>>> ", currencyItems);

  const getCurrencyList = async () => {
    debugger
    const ratesData = [];


let res = await fetch('http://localhost:3003/api')
res = await res.json()
  
  console.log('response >>>>> ', res);
  ratesData.push(res.ValCurs.Valute)
  console.log('ratesData>>>>>>>>>>>', ratesData[0]);



// axios.get('http://www.cbr.ru/scripts/XML_daily.asp', {mode: 'no-cors'})
// .then((response) => {
  
//     response = response.data
//     console.log('response >>>>> ', response);
//     console.log(convert.xml2json(response, {compact: true, spaces: 4}));
// })
// .catch((error) => {
//   console.log(`error >>>>` , error.response);
// })
dispatch(setCurrencyList(ratesData[0]))


    // axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
    // .then((response) => {
    //   console.log("response >>>> ", response);
    //   const dataObjToArrTransform = Object.entries(response.data.Valute);

    //   dataObjToArrTransform.forEach(([key, value]) => {
    //     ratesData.push({
    //       currencyTicker: key,
    //       currencyName: getCurrencyName(key),
    //       currencyPrice: value.Value.toFixed(2),
    //       previous: value.Previous.toFixed(2),
    //     });
    //   });
    //   console.log("ratesData >>>> ", ratesData);
    //   dispatch(setCurrencyList(ratesData));
    // })
    // .catch((error) => console.log(`error >>>>>`, error.response));
  };

  useEffect(() => {
    getCurrencyList();
  }, []);

  const date = new Date().toLocaleDateString();
  return (
    <div className="wrapper">
      <div className="currency-item-wrapper">
        <p>Курсы иностранных валют к рублю (RUB) на {date}</p>

        {currencyItems.map((i) => (
          <div className="currency-item">
            <CurrencyItem
           
              currencyTicker={i.currencyTicker}
              currencyName={i.currencyName}
              currencyPrice={i.currencyPrice}
              previous={i.previous}
            />
          </div>
        ))}
      </div>
      <div className="footer">
        <a href="https://www.cbr-xml-daily.ru/">
          Курсы ЦБ РФ в XML и JSON, API
        </a>
      </div>
    </div>
  );
};
export default CurrencyList;
