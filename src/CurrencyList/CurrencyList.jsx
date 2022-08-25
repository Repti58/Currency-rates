import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./CurrencyList.css";
import axios from "axios";
import { setCurrencyList } from "../Redux/currencyListReducer";
import getCurrencyName from "./getCurrencyName";

const CurrencyList = () => {
  debugger;
  const dispatch = useDispatch();
  const currencyItems = useSelector((state) => state.currencyList.currency);
  console.log("currencyItems >>>>> ", currencyItems);

  const getCurrencyList = () => {
    const ratesData = [];
    axios.get("https://www.cbr-xml-daily.ru/latest.js").then((response) => {
      console.log("response >>>> ", response);
      const dataObjToArrTransform = Object.entries(response.data.rates);

      dataObjToArrTransform.forEach(([key, value]) => {
        

        ratesData.push({
          currencyTicker: key,
          currencyName: getCurrencyName(key),
          currencyPrice: (value = (1 / value).toFixed(2)),
        });
      });
      console.log("ratesData >>>> ", ratesData);
      dispatch(setCurrencyList(ratesData));
    });
  };

  useEffect(() => {
    debugger;
    getCurrencyList();
  }, []);
  const date = new Date().toLocaleDateString()
  return (
    <div className="wrapper">
      <p>Курсы иностранных валют к рублю (RUB) на {date}</p>
      {/* <button onClick={() => getCurrencyList()}>Get list</button> */}
      <div className="currency-item-wrapper">
        {currencyItems.map((i) => (
          <div className="currency-item">
            <CurrencyItem
              currencyTicker={i.currencyTicker}
              currencyName={i.currencyName}
              currencyPrice={i.currencyPrice}
            />
          </div>
        ))}
       
      </div>
      <div className="footer">

      <a href="https://www.cbr-xml-daily.ru/">Курсы ЦБ РФ в XML и JSON, API</a>
      </div>
    </div>
  );
};
export default CurrencyList;
