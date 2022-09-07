const CurrencyItem = (props) => {
  return (
    
      
        
        <div>
          <td className="">
            {props.currencyName} ({props.currencyNominal} ед.)
          </td>
          <td className="">
            {props.currencyTicker}
          </td>
          <td className="">
            {props.currencyPriceYesterday}
          </td>
          <td className="">
            {props.currencyPriceToday}
          </td>
          <td className="">
            {props.currencyPriceYesterday === props.currencyPriceToday ? (
              <></>
            ) : props.currencyPriceYesterday > props.currencyPriceToday ? (
              <td className="">▼</td>
            ) : (
              <td className="">▲</td>
            )}
          </td>
          </div>
        
     
    
  );
};

export default CurrencyItem;
