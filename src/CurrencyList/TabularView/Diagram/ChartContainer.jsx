import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { setDiagramData, setDiagramRangeReady, setSelectedRange } from "../../../Redux/chartSlice"
import Chart from "./Chart"
import "./Chart.css"

const ChartContainer = ({ dispatch, currencyItems }) => {
    debugger
    const { currencyCode } = useParams()
    const { currencyTicker } = useParams()
    const { currencyName } = useParams()
    const diagramData = useSelector((state) => state.chartSlice.diagramData)
    const diagramRangeReady = useSelector((state) => state.chartSlice.diagramRangeReady)
    const selectedRange = useSelector((state) => state.chartSlice.selectedRange)

    //Получаем от Бэкэнда данные для Chart и сохраняем в Store<<<
    const getDiagramData = async (startDate, currencyCode, currencyTicker) => {
        let diagramData
        const currentDate = new Date().toLocaleDateString("en-GB").replaceAll("/", ".")
        // startDate = startDate ? startDate : "15.01.2023"
        try {
            await axios
                .get(
                    `http://localhost:3003/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
                    // `https://currency-rates-backend.vercel.app/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
                )
                .then((response) => {
                    diagramData = response.data
                    diagramData.unshift(["date", currencyTicker])
                })
        } catch {}

        dispatch(setDiagramData(diagramData))
        dispatch(setDiagramRangeReady(true))
    }
    //Получаем от Бэкэнда данные для Chart и сохраняем в Store>>>

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

    useEffect(() => {
        debugger
        setDiagramData()
        getDiagramData(getRange(), currencyCode, currencyTicker)
    }, [])

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
                    return (
                        <option value={i.currencyName}>
                            <Link to="123">{i.currencyName}</Link>
                        </option>
                    )
                })}
            </select>
            <div>
                {function () {
                    return !diagramRangeReady ? <div className="loader"></div> : null
                }}
            </div>
            <Chart diagramData={diagramData} />
        </div>
    )
}

export default ChartContainer
