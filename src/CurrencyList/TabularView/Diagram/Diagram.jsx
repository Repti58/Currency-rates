import axios from "axios";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch } from "react-redux";
import { setDiagramData } from "../../../Redux/currencySlice";


const Diagram = (props) => {
  const dispatch = useDispatch();
  debugger;
  let diagramData;
  const getDiagramData = async () => {
    debugger;

    try {
      await axios     
        .get(
          `http://localhost:3003/ratesDynamic?dateStart=10/02/2023&dateEnd=10/03/2023&currencyName=R01700`
          // `https://currency-rates-backend.vercel.app/api?date=${getModifyDate}`
          // `http://localhost:3003/api?date=${getModifyDate}`
        )
        .then((response) => {
          debugger
          diagramData = response.data;
        });
    } catch {}
    debugger;
    dispatch(setDiagramData(diagramData));
  };

  useEffect(() => {
    debugger;
    getDiagramData();
  }, []);
  return (
    <Chart
      chartType="LineChart"
      data={props.diagramData}
      width="100%"
      height="400px"
    />
  );
};
export default Diagram;
