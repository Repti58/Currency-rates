import axios from "axios";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch } from "react-redux";
import { setDiagramData } from "../../../Redux/currencySlice";


const Diagram = (props) => {
  debugger
  let ticker
 switch (props.ticker) {
  case "AUD":
    ticker = "R01010";
    break
  case "AZN":
    ticker = "R01020A"
    break
  case "GBP":
    ticker = "R01035"
    break
  case "AMD":
    ticker = "R01060"
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
            `http://localhost:3003/ratesDynamic?dateStart=12/02/2023&dateEnd=12.03.2023&currencyName=${ticker}`          
          )
          .then((response) => {
            debugger
            diagramData = response.data
            diagramData.unshift(["date" ,props.ticker]);
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
