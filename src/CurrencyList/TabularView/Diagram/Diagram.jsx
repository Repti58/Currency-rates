import axios from "axios";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDiagramData } from "../../../Redux/currencySlice";
import "./Diagram.css";

const Diagram = (props) => {

  document.onclick = function(e) {
    debugger
    const datePickerMonthSelect = document.querySelector(".react-datepicker-ignore-onclickoutside")
    const diagram = document.querySelector(".diagram")
    debugger
    if (e.target !== datePickerMonthSelect) {
      diagram.classList.remove("diagram_back-line")
    } else {
      diagram.classList.add("diagram_back-line")
    }
  }

  
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
            `http://localhost:3003/ratesDynamic?dateStart=12/02/2023&dateEnd=16.03.2023&currencyName=${currencyCode}`
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
  return (!props.diagramData || (props.diagramData[0][1] !== currencyTicker)) ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="currency-name">Динамика курса {currencyName} за месяц</div>
      <div className="diagram"  
      // onClick={() => {
      //     debugger
      //     diagramToFrontLine()}}
          >
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
