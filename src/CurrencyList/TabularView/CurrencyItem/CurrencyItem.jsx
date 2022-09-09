const CurrencyItem = (props) => {
  return (
    <div>
      <td className="">{props.currencyName}</td>
      <td className="">{props.currencyNominal}</td>
      <td className="">{props.currencyTicker}</td>
      <td className="">{props.currencyPriceYesterday}</td>
      <td className="">{props.currencyPriceToday}</td>
      <td className="">
        {props.currencyPriceYesterday === props.currencyPriceToday ? (
          <></>
        ) : props.currencyPriceYesterday > props.currencyPriceToday ? (
          <td className="">▼</td>
        ) : (
          <td className="currency-item__currency-move-up">▲</td>
        )}
      </td>
    </div>
  );
};

export default CurrencyItem;
