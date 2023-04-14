import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyList, setDate } from "./Redux/currencySlice";
import TabularView from "./CurrencyList/TabularView/TabularView";
import "react-datepicker/dist/react-datepicker.css";
// import MosaicView from "./CurrencyList/MosaicView/MosaicView";
import ChartContainer from "./Diagram/ChartContainer";


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
          `https://currency-rates-backend.vercel.app/api?date=${selectedDate}`
          // `http://localhost:3003/api?date=${selectedDate}`
        )
        .then((response) => {
          ratesData = response.data;
          ratesData.push({selectedDateRequest: selectedDate});
          dispatch(setCurrencyList(ratesData));
        });
    } catch(e) {alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack)}
  };
  //Получаем от Бэкэнда данные по валютам на выбранную дату и сохраняем в Store>>>

  useEffect(() => {
    getCurrencyList();
  }, [selectedDate]);

  return (
    <div className="wrapper">
      <header>
      {/* <div className="container"> */}

          <div className="title">
            <p>Официальные курсы валют к рублю по данным Центрального банка РФ</p>
          </div>    

         

        {/* </div>         */}
      </header>

      <div className="container body">
       
          <Routes>
            {/* <Route
              path="Chart/Currency-rates/mosaic-view"
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
              element={
                <ChartContainer
                  dispatch={dispatch}
                  currencyItems={currencyItems}
                />
              }
            />
          </Routes>
       
      </div>
      {/* <footer className="footer">Курсы валют по даным центробанка РФ</footer> */}
    </div>
  );
}

export default App;
