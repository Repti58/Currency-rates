import React from "react";
import "./TabularView.css";

const TabularView = (props) => {
  return (
    // <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Букв код</th>
          <th>Единиц</th>
          <th>Валюта</th>
          <th>Курс</th>
          {!props.currencyItems[0].currencyPriceYesterday ? (<></>) : (
            <th className="differense-head-cell" colSpan={2}>
              Изменение
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {props.currencyItems.map((i) => (
          <tr>
            <td className="">{i.currencyTicker}</td>
            <td className="">{i.currencyNominal}</td>
            <td className="">{i.currencyName}</td>
            <td className="">{i.currencyPriceToday}</td>
            {i.currencyPriceYesterday ? (
              <td className="difference">{i.difference}</td>
            ) : (
              <></>
            )}
            {i.currencyPriceYesterday ? (
              <td className="">
                {i.currencyPriceYesterday === i.currencyPriceToday ? (
                  <>-</>
                ) : i.currencyPriceYesterday > i.currencyPriceToday ? (
                  <div className="currency-item__currency-move-down">▼</div>
                ) : (
                  <div className="currency-item__currency-move-up">▲</div>
                )}
              </td>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    // </div>
  );
};
export default TabularView;
