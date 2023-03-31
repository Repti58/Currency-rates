import { Chart as Charts } from "react-google-charts"

const Chart = (props) => {
    
    return (
        <div className="diagram">
          {props.diagramData ? 
            <Charts
                // chartType="SteppedAreaChart"
                chartType="LineChart"
                data={props.diagramData}
                width="100%"
                height="400px"
            />
            : 
            <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
            }
        </div>
    )
}
export default Chart
