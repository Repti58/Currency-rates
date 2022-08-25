const CurrencyItem = (props) => {
return (
    <div>
        <div className="currency-item__currency-name">{props.currencyName}</div>
        <div className="currency-item__currency-ticker">{props.currencyTicker}</div>
        <div className="currency-item__currency-price">{props.currencyPrice}</div>
    </div>
)
}

export default CurrencyItem