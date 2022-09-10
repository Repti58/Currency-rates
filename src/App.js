import "./App.css";
import CurrencyList from "./CurrencyList/MosaicView/MosaicView";
import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyList, setDate } from "./Redux/currencySlice";
import TabularView from "./CurrencyList/TabularView/TabularView";

function App() {
  const axios = require("axios").default;

  const dispatch = useDispatch();
  const currencyItems = useSelector((state) => state.currencySlice.currency);
  const selectedDate = useSelector((state) => state.currencySlice.date);
  console.log("currencyItems >>>>> ", currencyItems);

  let ratesData = [];
  const getCurrencyList = async () => {
    await axios.get("http://localhost:3003/api").then((response) => {
      ratesData = response.data;
      console.log("ratesDataToday>>>>>>>>>>>", ratesData);
    });

    dispatch(setCurrencyList(ratesData));
  };

  const getCurrencyListForDate = async () => {    
    await axios
      .get(`http://localhost:3003/date_request?date=${selectedDate}`)
      .then((response) => {
        ratesData = response.data;
        console.log("getCurrencyListForDate>>>>>>>>>>>", response.data);
      });
    dispatch(setCurrencyList(ratesData));
  };

  const selectDate = (e) => {
    dispatch(setDate(e.target.value));
  };

  useEffect(() => {
    getCurrencyList();
  }, []);

  const date = new Date().toLocaleDateString();

  return (
    <div className="wrapper">
      <div className="currency-item-wrapper">
        <p>Официальные курсы валют к рублю по данным ЦБ РФ на {date}</p>
        <div className="view-buttons">
          <input value={selectedDate} onChange={selectDate}></input>
          <button
            onClick={() => getCurrencyListForDate()}
            type="button"
            class="btn btn-primary btn-sm"
          ></button>
          <Link to="/mosaic-view">
            <button
              onClick={() => getCurrencyList()}
              type="button"
              class="btn btn-primary btn-sm"
            >
              <i class="bi bi-grid-fill"></i>
            </button>
          </Link>
          <Link to="/tabular-view">
            <button
              onClick={() => getCurrencyList()}
              type="button"
              class="btn btn-primary btn-sm"
            >
              <i class="bi bi-list"></i>
            </button>
          </Link>
        </div>

        <Routes>
          <Route
            path="/mosaic-view"
            element={<CurrencyList currencyItems={currencyItems} />}
          />
          <Route
            path="/tabular-view"
            element={<TabularView currencyItems={currencyItems} />}
          />
        </Routes>
        <div className="footer">Курсы ЦБ РФ в XML и JSON, API</div>
      </div>
    </div>
  );
}

export default App;
