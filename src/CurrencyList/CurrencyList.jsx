import React from "react";
import { useSelector } from "react-redux";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./CurrencyList.css";

const CurrencyList = () => {
  const currencyItems = useSelector((state) => state.currencyList.currency);
  console.log("currencyItems >>>>> ", currencyItems);
  return (
    <div>
      <p>Курсы валют</p>
      <div>
        {currencyItems.map((i) => (
          <div className="currency-item">
            <CurrencyItem
              currencyName={i.currencyName}
              currencyPrice={i.currencyPrice}
            />
          </div>
        ))}
        {/* <div className="currency-item">1</div>
        <div className="currency-item">2</div>
        <div className="currency-item">3</div>
        <div className="currency-item">4</div>
        <div className="currency-item">5</div>
        <div className="currency-item">6</div> */}
      </div>
    </div>
  );
};
export default CurrencyList;
