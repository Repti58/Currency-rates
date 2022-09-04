import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./CurrencyList.css";
// import xml2js from 'xml2js'
import { setCurrencyList } from "../Redux/currencySlice";
import getCurrencyName from "./getCurrencyName";
// import { parseString } from 'xml2js';
var convert = require("xml-js");
const axios = require("axios").default;
// const parseString = require('xml2js').parseString;

const CurrencyList = () => {
  const dispatch = useDispatch();
  const currencyItems = useSelector((state) => state.currencySlice.currency);
  console.log("currencyItems >>>>> ", currencyItems);

  const getCurrencyList = async () => {
    let ratesDataToday = [];
    let ratesDataYesterday = [];

    await axios.get("http://localhost:3003/today").then((response) => {
      const currencyData = response.data.ValCurs.Valute;
      console.log("currencyData >>>>> ", currencyData);
      ratesDataToday = currencyData;
      console.log("ratesDataToday>>>>>>>>>>>", ratesDataToday);
    });

    await axios.get("http://localhost:3003/yesterday").then((response) => {
      const currencyData = response.data.ValCurs.Valute;
      console.log("currencyData >>>>> ", currencyData);
      ratesDataYesterday = currencyData;
      console.log("ratesDataYesterday>>>>>>>>>>>", ratesDataYesterday);
    });

    const merge = [];
    for (let i = 0; i < ratesDataToday.length; i++) {
      merge.push({
        currencyTicker: ratesDataToday[i].CharCode._text,
        currencyName: ratesDataToday[i].Name._text,
        currencyNominal: ratesDataToday[i].Nominal._text,
        currencyPriceToday: ratesDataToday[i].Value._text,
        currencyPriceYesterday: ratesDataYesterday[i].Value._text,
      });
    }

    dispatch(setCurrencyList(merge));

    // axios.get('http://www.cbr.ru/scripts/XML_daily.asp', {mode: 'no-cors'})
    // .then((response) => {

    //     response = response.data
    //     console.log('response >>>>> ', response);
    //     console.log(convert.xml2json(response, {compact: true, spaces: 4}));
    // })
    // .catch((error) => {
    //   console.log(`error >>>>` , error.response);
    // })

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
              currencyNominal={i.currencyNominal}
              currencyPriceToday={i.currencyPriceToday}
              currencyPriceYesterday={i.currencyPriceYesterday}
              // previous={currencyYesterdayItems.previous}
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
