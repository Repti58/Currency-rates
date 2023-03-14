import axios from "axios";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDiagramData } from "../../../Redux/currencySlice";


const Diagram = (props) => {
  console.log(useParams());
  const { tickerName } = useParams();
  debugger
  let tickerCode
 switch (tickerName) {
  case "AUD":
    tickerCode = "R01010";
    break
  case "AZN":
    tickerCode = "R01020A"
    break
  case "GBP":
    tickerCode = "R01035"
    break
  case "AMD":
    tickerCode = "R01060"
    break
 }
  const dispatch = useDispatch();
  debugger;
  let diagramData;
  

  useEffect(() => {
    debugger;
    setDiagramData()
    const getDiagramData = async () => {
      debugger;
  
      try {
        await axios     
          .get(
            `http://localhost:3003/ratesDynamic?dateStart=12/02/2023&dateEnd=12.03.2023&currencyName=${tickerCode}`          
          )
          .then((response) => {
            debugger
            diagramData = response.data
            diagramData.unshift(["date", tickerName]);
          });
      } catch {}
      debugger;
      dispatch(setDiagramData(diagramData));
    };
    getDiagramData();

  }, []);
  return (
    !props.diagramData ? (
      <div className="loader"></div>
    ) : (
    <Chart className="diagram"
      chartType="LineChart"
      data={props.diagramData}
      width="100%"
      height="400px"
    />
    )
  );
};
export default Diagram;
