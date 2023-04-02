import { Chart as Charts } from "react-google-charts"

const Chart = (props) => {
    return (
        <div className="diagram">
            <div className="currency-name">
                {props.requestedCurrency[2]}. Текущий курс -{" "}
                {props.diagramData ? props.diagramData[props.diagramData.length - 1][1] : null}
            </div>
            {props.diagramData ? (
                <Charts
                    // chartType="SteppedAreaChart"
                    chartType="LineChart"
                    data={props.diagramData}
                    width="100%"
                    height="400px"
                />
            ) : null}
        </div>
    )
}
export default Chart
