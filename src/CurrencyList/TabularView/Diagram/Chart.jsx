import { Chart as Charts } from "react-google-charts"

const Chart = ({
  diagramData,
  requestedCurrency,
}) => {
    
    return (
        <div className="diagram">
          <div className="currency-name">
                {requestedCurrency[2]}. Текущий курс - {diagramData ? diagramData[diagramData.length - 1][1] : null}
            </div>
          {diagramData ? 
            <Charts
                // chartType="SteppedAreaChart"
                chartType="LineChart"
                data={diagramData}
                width="100%"
                height="400px"
            />
            : null
            // <div class="lds-ellipsis">
            //             <div></div>
            //             <div></div>
            //             <div></div>
            //             <div></div>
            //         </div>
            }
        </div>
    )
}
export default Chart
