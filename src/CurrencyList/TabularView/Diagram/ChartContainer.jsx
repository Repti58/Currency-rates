import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { setDiagramData, setDiagramRangeReady, setSelectedRange, setRequestedCurrency } from "../../../Redux/chartSlice"
import Chart from "./Chart"
import "./Chart.css"

const ChartContainer = ({ dispatch, currencyItems }) => {
    const { currencyCode } = useParams()
    const { currencyTicker } = useParams()
    const { currencyName } = useParams()
    const diagramData = useSelector((state) => state.chartSlice.diagramData)
    const diagramRangeReady = useSelector((state) => state.chartSlice.diagramRangeReady)
    const selectedRange = useSelector((state) => state.chartSlice.selectedRange)
    const requestedCurrency = useSelector((state) => state.chartSlice.requestedCurrency)

    //Получаем от Бэкэнда данные для Chart и сохраняем в Store<<<
    const getDiagramData = async (
        startDate,
        currencyCode = requestedCurrency[0],
        currencyTicker = requestedCurrency[1]
    ) => {
        debugger
        if (!requestedCurrency[0]) {
            setRequestedCurrency([currencyItems[0][2], currencyItems[0][1], currencyItems[0][3]])
        }

        let diagramData
        const currentDate = new Date().toLocaleDateString("en-GB").replaceAll("/", ".")
        // startDate = startDate ? startDate : "15.01.2023"
        try {
            await axios
                .get(
                    // `http://localhost:3003/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
                    `https://currency-rates-backend.vercel.app/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
                )
                .then((response) => {
                    diagramData = response.data
                    diagramData.unshift(["date", currencyTicker])
                    dispatch(setDiagramData(diagramData))
                    dispatch(setDiagramRangeReady(true))
                })
        } catch {}
    }
    //Получаем от Бэкэнда данные для Chart и сохраняем в Store>>>

    //Вычисляем начальную дату для запроса динамики курса<<<
    const getStartDate = (range = selectedRange) => {
        dispatch(setDiagramRangeReady(false))
        const date = new Date()
        switch (range) {
            case "1M":
                date.setMonth(date.getMonth() - 1)
                break
            case "3M":
                date.setMonth(date.getMonth() - 3)
                break
            case "6M":
                date.setMonth(date.getMonth() - 6)
                break
            case "1Г":
                date.setFullYear(date.getFullYear() - 1)
                break
            case "3Г":
                date.setFullYear(date.getFullYear() - 3)
                break
        }
        return date.toLocaleDateString("en-GB").replaceAll("/", ".")
    }
    //Вычисляем начальную дату для запроса динамики курса>>>

    useEffect(() => {
        setDiagramData()
        getDiagramData(getStartDate())
    }, [requestedCurrency])

    const rangeButtons = ["3Г", "1Г", "6M", "3M", "1M"]
    const SetSelect = (value) => {
        debugger
        const selectCurrencyItem = currencyItems.find(({ id }) => id === value)
        const currencyCode = selectCurrencyItem.currencyCode
        const currencyTicker = selectCurrencyItem.currencyTicker
        const currencyName = selectCurrencyItem.currencyName
        console.log(selectCurrencyItem)
        dispatch(setDiagramData(null))
        dispatch(setRequestedCurrency([currencyCode, currencyTicker, currencyName]))
        getDiagramData(getStartDate(), currencyCode, currencyTicker)
    }
    return (
        <div>
            <div className="control">
                <div className="subcontrol">
                    {/* Навигация<<< */}
                    <span className="gotolist-btn">
                        <Link to="/tabular-view">
                            <button type="button" className="btn btn-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-table"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                                </svg>
                            </button>
                        </Link>
                        {/* <Link to="Currency-rates/mosaic-view">
              <button type="button" className="btn btn-primary btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  fill="currentColor"
                  // class="bi bi-grid-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                </svg>
              </button>
            </Link> */}
                    </span>
                    {/* Навигация>>> */}
                    <span className="select-container">
                        <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                                debugger
                                SetSelect(e.target.value)
                            }}
                        >
                            <option value="default">Выберите валюту</option>
                            {currencyItems.map((i) => {
                                return <option value={i.id}>{i.currencyName}</option>
                            })}
                        </select>
                    </span>
                </div>
                <span className="range-container">
                    {rangeButtons.map((i) => {
                        return (
                            // <button type="button" class="btn btn-secondary">Secondary</button>
                            <button
                                type="button"
                                className={selectedRange === i ? "btn btn__range btn-primary selectedRange" : "btn btn__range btn-primary"}
                                onClick={() => {
                                    dispatch(setSelectedRange(i))
                                    getDiagramData(getStartDate(i))
                                }}
                            >
                                {i}
                            </button>
                        )
                    })}
                </span>
            </div>

            <div>
                {!diagramRangeReady ? (
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : null}
            </div>
            <div>
                <Chart diagramData={diagramData} requestedCurrency={requestedCurrency} />
            </div>
        </div>
    )
}

export default ChartContainer
