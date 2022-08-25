const getCurrencyName = (key) => {
    switch (key) {
      case "AUD": {
        return "Австралийский доллар";
      }
      case "AZN": {
        return "Азербайджанский манат";
      }
      case "GBP": {
        return "Фунт стерлингов";
      }
      case "AMD": {
        return "Армянский драм";
      }
      case "BYN": {
        return "Белорусский рубль";
      }
      case "BGN": {
        return "Болгарский лев";
      }
      case "BRL": {
        return "Бразильский реал";
      }
      case "HUF": {
        return "Венгерский форинт";
      }
      case "HKD": {
        return "Гонконгский доллар";
      }
      case "DKK": {
        return "Датская крона";
      }
      case "USD": {
        return "Американский доллар";
      }
      case "EUR": {
        return "Евро";
      }
      case "INR": {
        return "Индийская рупия";
      }
      case "KZT": {
        return "Казахстанский тенге";
      }
      case "CAD": {
        return "Канадский доллар";
      }
      case "KGS": {
        return "Киргизский сом";
      }
      case "CNY": {
        return "Китайский юань";
      }
      case "MDL": {
        return "Молдавский лей";
      }
      case "NOK": {
        return "Норвежская крона";
      }
      case "PLN": {
        return "Польский злотый";
      }
      case "RON": {
        return "Румынский лей";
      }
      case "XDR": {
        return "XDR";
      }
      case "SGD": {
        return "Сингапурский доллар";
      }
      case "TJS": {
        return "Таджикский сомони";
      }
      case "TRY": {
        return "Турецкая лира";
      }
      case "TMT": {
        return "Туркменский манат";
      }
      case "UZS": {
        return "Узбекский сум";
      }
      case "UAH": {
        return "Украинская гривна";
      }
      case "CZK": {
        return "Чешская крона";
      }
      case "SEK": {
        return "Шведская крона";
      }
      case "CHF": {
        return "Швейцарский франк";
      }
      case "ZAR": {
        return "Южноафриканский рэнд";
      }
      case "KRW": {
        return "Южнокорейская вона";
      }
      case "JPY": {
        return "Японская йена";
      }
      default:
        return "-";
    }
  };

  export default getCurrencyName