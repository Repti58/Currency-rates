import { Chart as Charts } from "react-google-charts"

const Chart = (props) => {
    const options = {
        // title: `(${props.requestedCurrency[1]}) ${props.requestedCurrency[2]}`,
        legend: "none",
        colors: ["rgb(78, 99, 137)"],
        lineWidth: 3,
    }
    return (
        <div className="diagram">
            <div className="currency-title">
                <div className="currency-title__title">{`(${props.requestedCurrency[1]}) ${props.requestedCurrency[2]}`}</div>
                <span>Текущий курс - </span>
                <span
                    className={
                        props.diagramData
                            ? props.diagramData[props.diagramData.length - 1][1] >
                              props.diagramData[props.diagramData.length - 2][1]
                                ? "currency-title__price currency-title__price_up"
                                : "currency-title__price currency-title__price_down"
                            : null
                    }
                >
                    {props.diagramData ? props.diagramData[props.diagramData.length - 1][1] : null}
                </span>
            </div>
            <div className="chart-container">
                {props.diagramData ? (
                    <Charts
                        // chartType="SteppedAreaChart"
                        chartType="LineChart"
                        data={props.diagramData}
                        width="100%"
                        height="100%"
                        options={options}
                    />
                ) : null}
            </div>
        </div>
    )
}
export default Chart
