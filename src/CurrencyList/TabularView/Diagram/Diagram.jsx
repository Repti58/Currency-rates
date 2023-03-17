import axios from "axios";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDiagramData } from "../../../Redux/currencySlice";
import "./Diagram.css";

const Diagram = (props) => {
  debugger
  const selectedDate = props.selectedDate;

  setTimeout(() => {
    const diagram = document.querySelector(".diagram");
    const datePickerMonthSelect = document.querySelector(
      ".date-picker-container"
    );

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

  console.log(useParams());
  const { currencyCode } = useParams();
  const { currencyTicker } = useParams();
  const { currencyName } = useParams();

  const dispatch = useDispatch();

  let diagramData;

  const getDiagramData = async (startDate) => {
    startDate = startDate ? startDate : "01.01.2022";
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
    setDiagramData();
    getDiagramData();
  }, [selectedDate]);

  const getRange = (range) => {
    debugger
    // dispatch(setDiagramData(undefined));
    const date = new Date();
    switch(range) {
      case 'month':
        date.setMonth(date.getMonth() -1);
        break;
      case 'three-month':
        date.setMonth(date.getMonth() -3);
        break;
      case 'six-month':
        date.setMonth(date.getMonth() -6);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() -1);
        break;
      case 'three-years':
        date.setFullYear(date.getFullYear() -3);
        break;
    }
    return date.toLocaleDateString("en-GB").replaceAll("/", ".");
  };
  
  return !props.diagramData || props.diagramData[0][1] !== currencyTicker ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="currency-name">
        Динамика курса {currencyName} за месяц
      </div>
      <div className="range">
          <span className="rangeName" onClick={() => {
            getDiagramData(getRange('three-years'));
          }}>3 Года
          </span>
          <span className="rangeName" onClick={() => {
              getDiagramData(getRange('year'));
              }}>Год
          </span>
          <span className="rangeName" onClick={() => {
            getDiagramData(getRange('six-month'));
              }}>6 Месяцев
          </span>
          <span className="rangeName" onClick={() => {
            getDiagramData(getRange('three-month'));
              }}>3 Месяца
          </span>
          <span className="rangeName" onClick={() => {
              getDiagramData(getRange('month'));
              }}>Месяц
          </span>
         
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
