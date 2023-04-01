import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyList, setDate } from "./Redux/currencySlice";
import TabularView from "./CurrencyList/TabularView/TabularView";
import "react-datepicker/dist/react-datepicker.css";
// import MosaicView from "./CurrencyList/MosaicView/MosaicView";
import ChartContainer from "./CurrencyList/TabularView/Diagram/ChartContainer";


function App() {

  const axios = require("axios").default;
  const dispatch = useDispatch();

  //Получаем данные из Store<<<
  const currencyItems = useSelector((state) => state.currencySlice.currency[1]);
  const selectedDate = useSelector((state) => state.currencySlice.date);
  const responseDate = useSelector((state) => state.currencySlice.currency[0].currencyDate);
  const responsePrevDate = useSelector((state) => state.currencySlice.currency[0].prevCurrencyDate);
  const selectedDateRequest = useSelector((state) => state.currencySlice.currency[2].selectedDateRequest);
  
  
  
  //Получаем данные из Store>>>

  let ratesData = [];


  //Получаем от Бэкэнда данные по валютам на выбранную дату и сохраняем в Store<<<
  const getCurrencyList = async () => {
    
    try {
      await axios
        .get(
          // `https://currency-rates-backend.vercel.app/api?date=${selectedDate}`
          `http://localhost:3003/api?date=${selectedDate}`
        )
        .then((response) => {
          ratesData = response.data;
          ratesData.push({selectedDateRequest: selectedDate});
          console.log(ratesData);
          dispatch(setCurrencyList(ratesData));
        });
    } catch(e) {alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack)}
  };
  //Получаем от Бэкэнда данные по валютам на выбранную дату и сохраняем в Store>>>



  
  // //Получаем от Бэкэнда данные для Chart и сохраняем в Store<<<
  // const getDiagramData = async (startDate, currencyCode, currencyTicker) => {
  //   let diagramData;    
  //   const currentDate = new Date().toLocaleDateString('en-GB').replaceAll("/", ".")
  //   // startDate = startDate ? startDate : "15.01.2023"
  //   try {
  //     await axios
  //       .get(
  //         `http://localhost:3003/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
  //         // `https://currency-rates-backend.vercel.app/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
  //       )
  //       .then((response) => {
  //         diagramData = response.data;
  //         diagramData.unshift(["date", currencyTicker]);
  //       });
  //   } catch {}

  //   dispatch(setDiagramData(diagramData));
  //   dispatch(setDiagramRangeReady(true));
  // };
  // //Получаем от Бэкэнда данные для Chart и сохраняем в Store>>>


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

          {/* Навигация<<< */}
          <span className="view-buttons">
            {/* <Link to="/tabular-view">
            <button type="button" class="btn btn-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-table"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                </svg>
              </button>
            </Link> */}
            {/* <Link to="Currency-rates/mosaic-view">
              <button type="button" className="btn btn-primary btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  fill="currentColor"
                  // class="bi bi-grid-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                </svg>
              </button>
            </Link> */}
          </span>
          {/* Навигация>>> */}

        </div>        
      </header>

      <div className="container body">
       
          <Routes>
            {/* <Route
              path="/Currency-rates/mosaic-view"
              element={<MosaicView currencyItems={currencyItems} />}
            /> */}
            <Route
              path={"/Currency-rates/tabular-view" && "/*"}
              element={
                <TabularView
                  currencyItems={currencyItems}
                  prevCurrencyDate={responsePrevDate}
                  currencyDate={responseDate}
                  selectedDate={selectedDate}
                  dispatch={dispatch}
                  setDate={setDate}
                  selectedDateRequest={selectedDateRequest}
                  

                />
              }
            />
            {/* <Route
              path="/Currency-rates"
              element={
                <TabularView
                  currencyItems={currencyItems}
                  prevCurrencyDate={responsePrevDate}
                  currencyDate={responseDate}
                  diagramData={diagramData}
                />
              }
            /> */}

            <Route
              path={"/Chart"}
              // path="/AUD"
              element={
                <ChartContainer
                  // getDiagramData={getDiagramData}
                  dispatch={dispatch}
                  currencyItems={currencyItems}
                />
              }
            />
          </Routes>
       
      </div>
      <footer className="footer">Курсы валют по даным центробанка РФ</footer>
    </div>
  );
}

export default App;
