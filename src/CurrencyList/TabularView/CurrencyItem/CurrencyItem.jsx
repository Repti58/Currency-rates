const CurrencyItem = (props) => {
  return (
    <tr>
      <td>{props.currencyTicker}</td>
      <td>{props.currencyNominal}</td>
      <td>{props.currencyName}</td>
      <td className="currency-cell">{props.currencyPriceToday}</td>
      {props.currencyPriceYesterday ? (
        <td className="difference">{props.difference}</td>
      ) : (
        <></>
      )}
      {props.currencyPriceYesterday ? (
        <td className="">
          {props.currencyPriceYesterday === props.currencyPriceToday ? (
            <>-</>
          ) : props.currencyPriceYesterday > props.currencyPriceToday ? (
            <div className="currency-item__currency-move-down">▼</div>
          ) : (
            <div className="currency-item__currency-move-up">▲</div>
          )}
        </td>
      ) : (
        <></>
      )}
    </tr>
  );
};

export default CurrencyItem;
