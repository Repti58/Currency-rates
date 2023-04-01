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
    const getDiagramData = async (startDate) => {
        if (!requestedCurrency[0]) {
            setRequestedCurrency([currencyItems[0][2], currencyItems[0][1], currencyItems[0][3]])
        }

        let diagramData
        const currentDate = new Date().toLocaleDateString("en-GB").replaceAll("/", ".")
        // startDate = startDate ? startDate : "15.01.2023"
        try {
            await axios
                .get(
                    `http://localhost:3003/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${requestedCurrency[0]}`
                    // `https://currency-rates-backend.vercel.app/ratesDynamic?dateStart=${startDate}&dateEnd=${currentDate}&currencyName=${currencyCode}`
                )
                .then((response) => {
                    diagramData = response.data
                    diagramData.unshift(["date", requestedCurrency[1]])
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
    }, [])

    const rangeButtons = ["3Г", "1Г", "6M", "3M", "1M"]
    const SetSelect = (value) => {
        debugger
        const selectCurrencyItem = currencyItems.find(({ id }) => id === value)
        // const valueTest = JSON.stringify(value)
        console.log(selectCurrencyItem)
        dispatch(setDiagramData(null))
        dispatch(
            setRequestedCurrency([
                selectCurrencyItem.currencyCode,
                selectCurrencyItem.currencyTicker,
                selectCurrencyItem.currencyName,
            ])
        )
        getDiagramData(getStartDate())
    }
    return (
        <div>
            {/* <div className="currency-name">
                {requestedCurrency[2]}. Текущий курс - {diagramData ? diagramData[diagramData.length - 1][1] : null}
            </div> */}
            <span>
                <div class="input-group mb-3" role="group" aria-label="Basic example">
                    {rangeButtons.map((i) => {
                        return (
                            <button
                                type="button"
                                className={selectedRange === i ? "btn selectedRange" : "btn"}
                                onClick={() => {
                                    dispatch(setSelectedRange(i))
                                    getDiagramData(getStartDate(i))
                                }}
                            >
                                {i}
                            </button>
                        )
                    })}
                </div>
            </span>
            <span>
                <select className="form-select" aria-label="Default select example" onChange={(e) => {
                    debugger
                    SetSelect(e.target.value)
                }}>
                    <option selected>Выберите валюту</option>
                    {currencyItems.map((i) => {
                    // debugger
                    console.log(i)
                    return <option value={i.id}>{i.currencyName}</option>
                })}
                </select>
            </span>
            {/* <select
                className="selectCurrency"
                onChange={(e) => {
                    debugger
                    SetSelect(e.target.value)
                }}
            >
                <option value="startMessage">Выберите валюту</option>
                {currencyItems.map((i) => {
                    // debugger
                    console.log(i)
                    return <option value={i.id}>{i.currencyName}</option>
                })}
            </select> */}
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
