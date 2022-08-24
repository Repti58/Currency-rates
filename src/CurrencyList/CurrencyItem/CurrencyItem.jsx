const CurrencyItem = (props) => {
return (
    <div>
        <div>{props.currencyName}</div>
        <div>{props.currencyPrice}</div>
    </div>
)
}

export default CurrencyItem