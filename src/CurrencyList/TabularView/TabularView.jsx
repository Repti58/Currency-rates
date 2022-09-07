import React from "react";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./TabularView.css";

const TabularView = (props) => {
  return (
    <div>
    <table id="currency-table">
      <thead>
      <tr>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        
        </tr>
      </thead>
      <tbody>

      
      {props.currencyItems.map((i) => (
        
<tr>
          <td className="">
            {i.currencyName} ({i.currencyNominal} ед.)
          </td>
          <td className="">
            {i.currencyTicker}
          </td>
          <td className="">
            {i.currencyPriceYesterday}
          </td>
          <td className="">
            {i.currencyPriceToday}
          </td>
          <td className="">
            {i.currencyPriceYesterday === i.currencyPriceToday ? (
              <></>
            ) : i.currencyPriceYesterday > i.currencyPriceToday ? (
              <td className="">▼</td>
            ) : (
              <td className="">▲</td>
            )}
          </td>
          




          {/* <CurrencyItem
            currencyTicker={i.currencyTicker}
            currencyName={i.currencyName}
            currencyNominal={i.currencyNominal}
            currencyPriceToday={i.currencyPriceToday}
            currencyPriceYesterday={i.currencyPriceYesterday}
          /> */}
        </tr>
      ))}
      </tbody>
    </table>
    </div>
  );
};
export default TabularView;
