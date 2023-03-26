import axios from "axios";
import { useEffect } from "react";
import { Chart as Charts } from "react-google-charts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDiagramData, setDiagramRangeReady, setSelectedRange } from "../../../Redux/currencySlice";
import "./Chart.css";

const Chart = (props) => {
  
  
  // const selectedDate = props.selectedDate;
  const currentDate = new Date().toLocaleDateString('en-GB').replaceAll("/", ".")
 

  console.log(useParams());
  const { currencyCode } = useParams();
  const { currencyTicker } = useParams();
  const { currencyName } = useParams();

  const dispatch = useDispatch();

  let diagramData;

  const getDiagramData = async (startDate) => {
    
    startDate = startDate ? startDate : getRange(props.selectedRange);
    try {
      await axios
        .get(
          `http://localhost:3003/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
          // `https://currency-rates-backend.vercel.app/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
        )
        .then((response) => {
          diagramData = response.data;
          diagramData.unshift(["date", currencyTicker]);
        });
    } catch {}

    dispatch(setDiagramData(diagramData));
    dispatch(setDiagramRangeReady(true));
  };

  useEffect(() => {
    setDiagramData();
    getDiagramData();
  }, [
    // selectedDate
  ]);

  const getRange = (range) => {
    
    dispatch(setDiagramRangeReady(false));
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
        {currencyName}. Текущий курс - {props.diagramData[props.diagramData.length -1][1]}
      </div>
      <div className="range">
          <span className={props.selectedRange === "three-years"? "rangeName selectedRange" : "rangeName"} onClick={() => {
            dispatch(setSelectedRange('three-years'))
            getDiagramData(getRange('three-years'));
          }}>3Г
          </span>
          <span className={props.selectedRange === "year"? "rangeName selectedRange" : "rangeName"} onClick={() => {
            dispatch(setSelectedRange('year'))
              getDiagramData(getRange('year'));
              }}>1Г
          </span>
          <span className={props.selectedRange === "six-month"? "rangeName selectedRange" : "rangeName"} onClick={() => {
            dispatch(setSelectedRange('six-month'))
            getDiagramData(getRange('six-month'));
              }}>6М
          </span>
          <span className={props.selectedRange === "three-month"? "rangeName selectedRange" : "rangeName"} onClick={() => {
            dispatch(setSelectedRange('three-month'))
            getDiagramData(getRange('three-month'));
              }}>3М
          </span>
          <span className={props.selectedRange === "month"? "rangeName selectedRange" : "rangeName"} onClick={() => {
            dispatch(setSelectedRange('month'))
              getDiagramData(getRange('month'));
              }}>1М
          </span>
         
      </div>
      <div>
      {function() {
        
        return !props.diagramRangeReady? <div className="loader"></div> : null}}
        
      </div>
      <div className="diagram">
        <Charts
          // chartType="SteppedAreaChart"
          chartType="LineChart"
          data={props.diagramData}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};
export default Chart;
