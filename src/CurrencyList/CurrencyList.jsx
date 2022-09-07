import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./CurrencyList.css";
import { setCurrencyList } from "../Redux/currencySlice";
const axios = require("axios").default;

const CurrencyList = () => {
  const dispatch = useDispatch();
  const currencyItems = useSelector((state) => state.currencySlice.currency);
  console.log("currencyItems >>>>> ", currencyItems);

  const getCurrencyList = async () => {
    let ratesData = [];

    await axios.get("http://localhost:3003/api").then((response) => {
      ratesData = response.data;
      console.log("ratesDataToday>>>>>>>>>>>", ratesData);
    });

    dispatch(setCurrencyList(ratesData));
  };

  useEffect(() => {
    getCurrencyList();
  }, []);

  const date = new Date().toLocaleDateString();
  return (
    <div className="wrapper">
      <div className="currency-item-wrapper">
        <p>Курсы иностранных валют к рублю по данным ЦБ РФ на {date}</p>

        {currencyItems.map((i) => (
          <div className="currency-item">
            <CurrencyItem
              currencyTicker={i.currencyTicker}
              currencyName={i.currencyName}
              currencyNominal={i.currencyNominal}
              currencyPriceToday={i.currencyPriceToday}
              currencyPriceYesterday={i.currencyPriceYesterday}
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
