import React from "react";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./MosaicView.css";

const MosaicView = (props) => {
  return (
    <div className="mosaic-view">
      {props.currencyItems.map((i) => (
        <div className="currency-item">
          <CurrencyItem
            key={i.id}
            currencyTicker={i.currencyTicker}
            currencyName={i.currencyName}
            // currencyNominal={i.currencyNominal}
            currencyPriceToday={i.currencyPriceToday}
            currencyPriceYesterday={i.currencyPriceYesterday}
          />
        </div>
      ))}
    </div>
  );
};
export default MosaicView;
