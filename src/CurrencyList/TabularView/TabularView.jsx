import React from "react";
import { Link } from "react-router-dom";
import "./TabularView.css";

const TabularView = (props) => {
  return (
    <div>
      {!props.currencyItems[2] ? (
        <div className="loader"></div>
      ) : (
        <table className="table table table-striped table-hover">
          <thead>
            <tr>
              <th>Букв код</th>
              <th>Единиц</th>
              <th>Валюта</th>
              <th className="currency-hcell">
                Курс<br></br>
                {props.currencyDate}
              </th>
              <th className="differense-head-cell" colSpan={2}>
                Изменение от <br></br> {props.prevCurrencyDate}
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {props.currencyItems.map((i) => (
              <tr key={i.id}>                
                <td className="">{i.currencyTicker}</td>
                <td className="">{i.currencyNominal}</td>
                <td className="">
                  <Link to={i.currencyTicker} className="link">
                    {i.currencyName}
                  </Link>
                </td>
                {i.currencyTicker === "USD" ||
                i.currencyTicker === "EUR" ||
                i.currencyTicker === "GBP" ||
                i.currencyTicker === "JPY" ? (
                  <td className="currency-cell accent">
                    {i.currencyPriceToday}
                  </td>
                ) : (
                  <td className="currency-cell">{i.currencyPriceToday}</td>
                )}
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
      )}
      
    </div>
  );
};
export default TabularView;
