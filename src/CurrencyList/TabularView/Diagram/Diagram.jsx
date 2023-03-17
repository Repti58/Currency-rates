import axios from "axios";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDiagramData } from "../../../Redux/currencySlice";
import "./Diagram.css";

const Diagram = (props) => {
  const selectedDate = props.selectedDate;

  setTimeout(() => {
    const diagram = document.querySelector(".diagram");
    const datePickerMonthSelect = document.querySelector(
      ".date-picker-container"
    );

    debugger;
    datePickerMonthSelect.addEventListener("focusin", function () {
      if (diagram) {
        diagram.classList.add("diagram_back-line");
      }
    });
    if (diagram) {
      datePickerMonthSelect.addEventListener("focusout", function () {
        diagram.classList.remove("diagram_back-line");
      });
    }
  }, 0); 

  debugger;
  console.log(useParams());
  const { currencyCode } = useParams();
  const { currencyTicker } = useParams();
  const { currencyName } = useParams();

  const dispatch = useDispatch();

  let diagramData;

  const getDiagramData = async (startDate) => {
    startDate = (startDate? startDate : "01.01.2022")
    try {
      await axios
        .get(
          `http://localhost:3003/ratesDynamic?dateStart=${startDate}&dateEnd=${selectedDate}&currencyName=${currencyCode}`
        )
        .then((response) => {
          diagramData = response.data;
          diagramData.unshift(["date", currencyTicker]);
        });
    } catch {}

    dispatch(setDiagramData(diagramData));
  };

  useEffect(() => {
    debugger;
    setDiagramData();    
    getDiagramData();
  }, [selectedDate]);
  return !props.diagramData || props.diagramData[0][1] !== currencyTicker ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="currency-name">
        Динамика курса {currencyName} за месяц
      </div>
      <div className="range">
        
        <span onClick={() => getDiagramData('01.01.2019')}>Месяц</span>
        <span>3 Месяца</span>
        <span>6 Месяцев</span>
        <span>Год</span>
      </div>
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
