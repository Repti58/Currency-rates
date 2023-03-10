import { Chart } from "react-google-charts";


const Diagram = (props) => {
    debugger
    return (
<Chart
  chartType="LineChart"  
  data={props.diagramData}   
  width="100%"
  height="400px"            
/>
    )
}
export default Diagram