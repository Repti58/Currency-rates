import axios from "axios";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDiagramData } from "../../../Redux/currencySlice";
import "./Diagram.css";

const Diagram = (props) => {
  debugger;
  console.log(useParams());
  const { currencyCode } = useParams();
  const { currencyTicker } = useParams();
  const { currencyName } = useParams();

  const dispatch = useDispatch();

  let diagramData;

  useEffect(() => {
    setDiagramData();
    const getDiagramData = async () => {
      try {
        await axios
          .get(
            `http://localhost:3003/ratesDynamic?dateStart=12/02/2023&dateEnd=12.03.2023&currencyName=${currencyCode}`
          )
          .then((response) => {
            diagramData = response.data;
            diagramData.unshift(["date", currencyTicker]);
          });
      } catch {}

      dispatch(setDiagramData(diagramData));
    };
    getDiagramData();
  }, []);
  return !props.diagramData ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="currency-name">{currencyName}</div>
      <div className="diagram">
        <Chart          
          chartType="LineChart"
          data={props.diagramData}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};
export default Diagram;
