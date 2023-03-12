import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyList, setDate } from "./Redux/currencySlice";
import TabularView from "./CurrencyList/TabularView/TabularView";
import DatePicker from "react-datepicker";
import Diagram from "./CurrencyList/TabularView/Diagram/Diagram";
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
  const diagramData = useSelector((state) => state.currencySlice.diagramData)

  let ratesData = [];

  const getCurrencyList = async () => {
    const getModifyDate = selectedDate.replaceAll(".", "/");
    try {
      await axios
        .get(
          // `https://currency-rates-backend.vercel.app/api?date=${getModifyDate}`
          `http://localhost:3003/api?date=${getModifyDate}`
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
      <header className="sticky">
        <div className="container">
          <div className="title">
          <p>Официальные курсы валют к рублю по данным центробанка РФ</p>
          </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  fill="currentColor"
                  class="bi bi-list-ul"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
              </button>
            </Link>
            <Link to="/mosaic-view">
              <button type="button" className="btn btn-primary btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  fill="currentColor"
                  class="bi bi-grid-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                </svg>
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
              path="/mosaic-view"
              element={<MosaicView currencyItems={currencyItems} />}
            />
            <Route
              path={"/tabular-view" && "/*"}
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
            <Route
            path="/diagram"
            element={
              <Diagram
              diagramData={diagramData}
              />
            }
            />
          </Routes>
        )}
      </div>
      <footer className="footer">Курсы валют по даным центробанка РФ</footer>
    </div>
  );
}

export default App;
