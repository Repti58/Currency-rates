import React from "react";
import "./TabularView.css";

const TabularView = (props) => {
  return (
    // <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Букв код</th>
          <th>Единиц</th>
          <th>Валюта</th>
          <th>Курс</th>
          <th className="differense-head-cell" colSpan={2}>
            Изменение
          </th>
        </tr>
      </thead>
      <tbody>
        {props.currencyItems.map((i) => (
          <tr>
            <td className="">{i.currencyTicker}</td>
            <td className="">{i.currencyNominal}</td>
            <td className="">{i.currencyName}</td>
            {/* <td className="">{i.currencyPriceYesterday}</td> */}
            <td className="">{i.currencyPriceToday}</td>
            <td className="difference">{i.difference}</td>
            <td className="">
              {i.currencyPriceYesterday === i.currencyPriceToday ? (
                <>-</>
              ) : i.currencyPriceYesterday > i.currencyPriceToday ? (
                <td className="currency-item__currency-move-down">▼</td>
              ) : (
                <td className="currency-item__currency-move-up">▲</td>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    // </div>
  );
};
export default TabularView;