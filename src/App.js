import "./App.css";
import CurrencyList from "./CurrencyList/MosaicView/MosaicView";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyList } from "./Redux/currencySlice";
import TabularView from "./CurrencyList/TabularView/TabularView";

function App() {
  const axios = require("axios").default;

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

        <Routes>
          <Route path="/mosaic-view" element={<CurrencyList currencyItems={currencyItems} />} />
          <Route path="/tabular-view" element={<TabularView currencyItems={currencyItems} />} />
        </Routes>
        <div className="footer">
          <a href="https://www.cbr-xml-daily.ru/">
            Курсы ЦБ РФ в XML и JSON, API
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
