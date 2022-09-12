import "./App.css";
import CurrencyList from "./CurrencyList/MosaicView/MosaicView";
import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyList, setDate } from "./Redux/currencySlice";
import TabularView from "./CurrencyList/TabularView/TabularView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const axios = require("axios").default;
  const nowDate = new Date().toLocaleDateString();

  const dispatch = useDispatch();
  const currencyItems = useSelector((state) => state.currencySlice.currency[1]);
  const selectedDate = useSelector((state) => state.currencySlice.date);
  const responseDate = useSelector((state) => state.currencySlice.currency[0].currencyDate);
  const responsePrevDate = useSelector((state) => state.currencySlice.currency[0].prevCurrencyDate);
  console.log("currencyItems >>>>> ", currencyItems);

  let ratesData = [];
 
  const getCurrencyList = async () => {   
    const getModifyDate =  selectedDate.replaceAll('.', '/')
    await axios
      .get(`http://localhost:3003/api?date=${getModifyDate}`)
      .then((response) => {
        ratesData = response.data;
        console.log("getCurrencyListForDate>>>>>>>>>>>", response.data);
      });
    dispatch(setCurrencyList(ratesData));
  };

  const selectDate = (date) => {    
    const modifyDate = new Date(date).toLocaleDateString()    
    dispatch(setDate(modifyDate));
  };

  useEffect(() => {
    getCurrencyList();
  }, [selectedDate]);


  return (
    <div className="wrapper">
      <div className="currency-item-wrapper">
        <p>Официальные курсы валют к рублю по данным ЦБ РФ на {responseDate}</p>
        <DatePicker closeOnScroll={true} value={selectedDate} onChange={(date) => selectDate(date)}/>
        <div className="view-buttons">
          {/* <input 
          value={selectedDate}
           onChange={selectDate}></input> */}
          {/* <button
            onClick={() => getCurrencyList()}
            type="button"
            class="btn btn-primary btn-sm"
          >Ok</button> */}
          <Link to="/mosaic-view">
            <button
              
              type="button"
              class="btn btn-primary btn-sm"
            >
              <i class="bi bi-grid-fill"></i>
            </button>
          </Link>
          <Link to="/tabular-view">
            <button
              
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
            element={<TabularView currencyItems={currencyItems} prevCurrencyDate={responsePrevDate} currencyDate={responseDate}/>}
          />
        </Routes>
        <div className="footer">Курсы ЦБ РФ в XML и JSON, API</div>
      </div>
    </div>
  );
}

export default App;
