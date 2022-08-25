const CurrencyItem = (props) => {
  return (
    <div>
      <div className="currency-item__currency-name">{props.currencyName}</div>
      <div className="currency-item__currency-ticker">
        {props.currencyTicker}
      </div>
      <div className="currency-item__currency-previous-price">{props.previous}</div>
      <div className="currency-item__currency-price">{props.currencyPrice}</div>
      <div className="currency-item__currency-move">
        {props.previous > props.currencyPrice ? (
          <div className="currency-item__currency-move-down">▼</div>
        ) : (
          <div className="currency-item__currency-move-up">▲</div>
        )}
      </div>
    </div>
  );
};

export default CurrencyItem;
