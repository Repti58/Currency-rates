import axios from "axios";
import { useEffect } from "react";
import { Chart as Charts } from "react-google-charts";
import { useParams } from "react-router-dom";
import "./Chart.css";


const Chart = ({
  diagramData,
  diagramRangeReady,
  selectedRange,
  getDiagramData,
  dispatch,
  setDiagramData,
  setDiagramRangeReady,
  setSelectedRange,
}) => {
  const { currencyCode } = useParams();
  const { currencyTicker } = useParams();
  const { currencyName } = useParams();

  const getRange = (range = selectedRange) => {
    debugger;
    dispatch(setDiagramRangeReady(false));
    const date = new Date();
    switch (range) {
      case "month":
        date.setMonth(date.getMonth() - 1);
        break;
      case "three-month":
        date.setMonth(date.getMonth() - 3);
        break;
      case "six-month":
        date.setMonth(date.getMonth() - 6);
        break;
      case "year":
        date.setFullYear(date.getFullYear() - 1);
        break;
      case "three-years":
        date.setFullYear(date.getFullYear() - 3);
        break;
    }
    return date.toLocaleDateString("en-GB").replaceAll("/", ".");
  };

  useEffect(
    () => {
      setDiagramData();
      getDiagramData(getRange(), currencyCode, currencyTicker);
    },
    [
      // selectedDate
    ]
  );

  return !diagramData || diagramData[0][1] !== currencyTicker ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="currency-name">
        {currencyName}. Текущий курс - {diagramData[diagramData.length - 1][1]}
      </div>
      <div className="range">
        <span
          className={
            selectedRange === "three-years"
              ? "rangeName selectedRange"
              : "rangeName"
          }
          onClick={() => {
            dispatch(setSelectedRange("three-years"));
            getDiagramData(
              getRange("three-years"),
              currencyCode,
              currencyTicker
            );
          }}
        >
          3Г
        </span>
        <span
          className={
            selectedRange === "year" ? "rangeName selectedRange" : "rangeName"
          }
          onClick={() => {
            dispatch(setSelectedRange("year"));
            getDiagramData(getRange("year"), currencyCode, currencyTicker);
          }}
        >
          1Г
        </span>
        <span
          className={
            selectedRange === "six-month"
              ? "rangeName selectedRange"
              : "rangeName"
          }
          onClick={() => {
            dispatch(setSelectedRange("six-month"));
            getDiagramData(getRange("six-month"), currencyCode, currencyTicker);
          }}
        >
          6М
        </span>
        <span
          className={
            selectedRange === "three-month"
              ? "rangeName selectedRange"
              : "rangeName"
          }
          onClick={() => {
            dispatch(setSelectedRange("three-month"));
            getDiagramData(
              getRange("three-month"),
              currencyCode,
              currencyTicker
            );
          }}
        >
          3М
        </span>
        <span
          className={
            selectedRange === "month" ? "rangeName selectedRange" : "rangeName"
          }
          onClick={() => {
            dispatch(setSelectedRange("month"));
            getDiagramData(getRange("month"), currencyCode, currencyTicker);
          }}
        >
          1М
        </span>
      </div>
      <div>
        {function () {
          return !diagramRangeReady ? <div className="loader"></div> : null;
        }}
      </div>
      <div className="diagram">
        <Charts
          // chartType="SteppedAreaChart"
          chartType="LineChart"
          data={diagramData}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};
export default Chart;
