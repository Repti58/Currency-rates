import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyList, setDate } from "./Redux/currencySlice";
import TabularView from "./CurrencyList/TabularView/TabularView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MosaicView from "./CurrencyList/MosaicView/MosaicView";

function App() {
  const axios = require("axios").default;

  const dispatch = useDispatch();
  const currencySliceData = useSelector((state) => state.currencySlice);
  const currencyItems = useSelector((state) => state.currencySlice.currency[1]);
  const selectedDate = useSelector((state) => state.currencySlice.date);
  const responseDate = useSelector(
    (state) => state.currencySlice.currency[0].currencyDate
  );
  const responsePrevDate = useSelector(
    (state) => state.currencySlice.currency[0].prevCurrencyDate
  );

  let ratesData = [];

  const getCurrencyList = async () => {
    const getModifyDate = selectedDate.replaceAll(".", "/");
    try {
      await axios
        .get(
          `https://currency-rates-backend.vercel.app/api?date=${getModifyDate}`
        )
        .then((response) => {
          ratesData = response.data;
        });
    } catch {}
    dispatch(setCurrencyList(ratesData));
  };

  const selectDate = (date) => {
    const modifyDate = new Date(date).toLocaleDateString();
    dispatch(setDate(modifyDate));
  };

  useEffect(() => {
    getCurrencyList();
  }, [selectedDate]);

  return (
    <div className="wrapper">
      <header className="sticky-top">
        <div className="container container_top">
          <p>Официальные курсы валют к рублю по данным центробанка РФ</p>
          <span className="date-picker">
            <DatePicker
              closeOnScroll={true}
              value={selectedDate}
              onChange={(date) => selectDate(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              disabledKeyboardNavigation
            />
          </span>
          <span className="view-buttons">
            <Link to="/tabular-view">
              <button type="button" className="btn btn-primary btn-sm">
                <i className="bi bi-table"></i>
              </button>
            </Link>
            <Link to="/mosaic-view">
              <button type="button" className="btn btn-primary btn-sm">
                <i className="bi bi-grid-fill"></i>
              </button>
            </Link>
          </span>
        </div>
      </header>
      <div className="container body">
        {!currencyItems[0] ? (
          <div className="no-data">За выбранный период данных не найдено</div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<TabularView currencyItems={currencyItems} />}
            />
            <Route
              path="/mosaic-view"
              element={<MosaicView currencyItems={currencyItems} />}
            />
            <Route
              path="/tabular-view"
              element={
                <TabularView
                  currencyItems={currencyItems}
                  prevCurrencyDate={responsePrevDate}
                  currencyDate={responseDate}
                />
              }
            />
            <Route
              path="/Currency-rates"
              element={
                <TabularView
                  currencyItems={currencyItems}
                  prevCurrencyDate={responsePrevDate}
                  currencyDate={responseDate}
                />
              }
            />
          </Routes>
        )}
      </div>
      <footer>Курсы валют по даным центробанка РФ</footer>
    </div>
  );
}

export default App;
