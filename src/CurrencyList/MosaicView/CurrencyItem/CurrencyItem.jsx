const CurrencyItem = (props) => {
  return (
    <div>
      <div>
        <div className="currency-item__currency-name">
          {props.currencyName} <br />({props.currencyNominal} ед.)
        </div>
        <div className="currency-item__currency-ticker">
          {props.currencyTicker}
        </div>
        <div className="currency-item__currency-previous-price">
          {props.currencyPriceYesterday}
        </div>
        <div className="currency-item__currency-price">
          {props.currencyPriceToday}
        </div>
        <div className="currency-item__currency-move">
          {props.currencyPriceYesterday === props.currencyPriceToday ? (
            <></>
          ) : props.currencyPriceYesterday > props.currencyPriceToday ? (
            <div className="currency-item__currency-move-down">▼</div>
          ) : (
            <div className="currency-item__currency-move-up">▲</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyItem;
