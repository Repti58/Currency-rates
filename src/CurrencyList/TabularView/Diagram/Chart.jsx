import { Chart as Charts } from "react-google-charts"

const Chart = (props) => {
    debugger
    return (
        <div className="diagram">
            <Charts
                // chartType="SteppedAreaChart"
                chartType="LineChart"
                data={props.diagramData}
                width="100%"
                height="400px"
            />
        </div>
    )
}
export default Chart
