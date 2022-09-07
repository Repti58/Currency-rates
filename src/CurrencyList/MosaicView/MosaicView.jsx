import React from "react";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./MosaicView.css";

const CurrencyList = (props) => {
  return (
    <div>
      {props.currencyItems.map((i) => (
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
  );
};
export default CurrencyList;
