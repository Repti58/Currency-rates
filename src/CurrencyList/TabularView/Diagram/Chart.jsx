import { useEffect } from "react"
import { Chart as Charts } from "react-google-charts"
import { Link, useParams } from "react-router-dom"
import "./Chart.css"

const Chart = ({
    diagramData,
    diagramRangeReady,
    selectedRange,
    getDiagramData,
    dispatch,
    setDiagramData,
    setDiagramRangeReady,
    setSelectedRange,
    currencyItems,
}) => {
    const { currencyCode } = useParams()
    const { currencyTicker } = useParams()
    const { currencyName } = useParams()

    const getRange = (range = selectedRange) => {
        debugger
        dispatch(setDiagramRangeReady(false))
        const date = new Date()
        switch (range) {
            case "month":
                date.setMonth(date.getMonth() - 1)
                break
            case "three-month":
                date.setMonth(date.getMonth() - 3)
                break
            case "six-month":
                date.setMonth(date.getMonth() - 6)
                break
            case "year":
                date.setFullYear(date.getFullYear() - 1)
                break
            case "three-years":
                date.setFullYear(date.getFullYear() - 3)
                break
        }
        return date.toLocaleDateString("en-GB").replaceAll("/", ".")
    }

    useEffect(
        () => {
            setDiagramData()
            getDiagramData(getRange(), currencyCode, currencyTicker)
        },
        [

            diagramData
        ]
    )

    const rangeButtons = [
        ["three-years", "3Г"],
        ["year", "1Г"],
        ["six-month", "6М"],
        ["three-month", "3М"],
        ["month", "1М"],
    ]

    return !diagramData || diagramData[0][1] !== currencyTicker ? (
        <div className="loader"></div>
    ) : (
        <div>
            <div className="currency-name">
                {currencyName}. Текущий курс - {diagramData[diagramData.length - 1][1]}
            </div>
            <div className="range">
                {rangeButtons.map((i) => {
                    debugger
                    return (
                        <button
                            className={selectedRange === i[0] ? "rangeName selectedRange" : "rangeName"}
                            onClick={() => {
                                dispatch(setSelectedRange(i[0]))
                                getDiagramData(getRange(i[0]), currencyCode, currencyTicker)
                            }}
                        >
                            {i[1]}
                        </button>
                    )
                })}
            </div>
            <select className="selectCurrency">
                {currencyItems.map((i) => {
                    return <option value={i.currencyName}>
                      <Link to="123">
                      {i.currencyName}
                      </Link>
                      
                      </option>
                })}
            </select>
            <div>
                {function () {
                    return !diagramRangeReady ? <div className="loader"></div> : null
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
    )
}
export default Chart
