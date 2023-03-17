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

  //  if (!datePickerMonthSelect && diagramclass){
  //   diagramclass.classList.remove("diagram_back-line");

  // };

  // const fixOverlay = (props) => {
  //   debugger
  //   const datePickerMonthSelect = document.querySelector(".react-datepicker-ignore-onclickoutside")
  //   const diagram = document.querySelector(".diagram")
  //   debugger
  //   if (props.target !== (datePickerMonthSelect)) {
  //     diagram.classList.remove("diagram_back-line")
  //   } else {
  //     diagram.classList.add("diagram_back-line")
  //   }
  // }
  // document.onselect = function(e) {
  //   // fixOverlay(e)
  //   debugger
  //     const datePickerMonthSelect = document.querySelector(".react-datepicker-ignore-onclickoutside")
  //     const diagram = document.querySelector(".diagram")
  //     if (e.target !== (datePickerMonthSelect)) {
  //       diagram.classList.remove("diagram_back-line")
  //     } else {
  //       diagram.classList.add("diagram_back-line")
  //     }
  // }
  // document.onclick = function(e) {
  //   // fixOverlay(e)
  //   debugger
  //     const datePickerMonthSelect = document.querySelector(".react-datepicker-ignore-onclickoutside")
  //     const diagram = document.querySelector(".diagram")
  //     if (e.target !== (datePickerMonthSelect)) {
  //       diagram.classList.remove("diagram_back-line")
  //     } else {
  //       diagram.classList.add("diagram_back-line")
  //     }
  // }

  debugger;
  console.log(useParams());
  const { currencyCode } = useParams();
  const { currencyTicker } = useParams();
  const { currencyName } = useParams();

  const dispatch = useDispatch();

  let diagramData;

  useEffect(() => {
    debugger;
    setDiagramData();
    const getDiagramData = async () => {
      try {
        await axios
          .get(
            `http://localhost:3003/ratesDynamic?dateStart=15.02.2023&dateEnd=${selectedDate}&currencyName=${currencyCode}`
          )
          .then((response) => {
            diagramData = response.data;
            diagramData.unshift(["date", currencyTicker]);
          });
      } catch {}

      dispatch(setDiagramData(diagramData));
    };
    getDiagramData();
  }, [selectedDate]);
  return !props.diagramData || props.diagramData[0][1] !== currencyTicker ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="currency-name">
        Динамика курса {currencyName} за месяц
      </div>
      <div
        className="diagram"
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
