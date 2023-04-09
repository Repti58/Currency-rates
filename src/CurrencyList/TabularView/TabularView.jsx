import React from "react"
import ReactDatePicker from "react-datepicker"
import { Link } from "react-router-dom/dist"
import { setDiagramData, setRequestedCurrency } from "../../Redux/chartSlice"
import "./TabularView.css"

const TabularView = ({
    currencyItems,
    prevCurrencyDate,
    currencyDate,
    selectedDate,
    dispatch,
    setDate,
    selectedDateRequest,
}) => {
    //Переводим, полученную из календаря дату в нужный формат<<<
    const selectDate = (date) => {
        const modifyDate = new Date(date).toLocaleDateString()
        dispatch(setDate(modifyDate))
    }
    //Переводим, полученную из календаря дату в нужный формат>>>

    return (
        <div>
            <div className="date-picker">
                <div className="date-picker-container">
                    {/* Клендарь<<< */}
                    <ReactDatePicker
                        closeOnScroll={true}
                        value={selectedDate}
                        onChange={(date) => {
                            selectDate(date)
                        }}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        disabledKeyboardNavigation
                        withPortal
                        // disabled
                    />
                    {/* Клендарь>>> */}
                </div>

                {/* Если нет данных включам лоадер<<< */}
                {currencyItems[0] && selectedDate !== selectedDateRequest ? (
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : null}
                {/* Если нет данных включам лоадер>>> */}
            </div>

            <p className="info">*Данные предоставляются Центробанком РФ на последний рабочий день </p>

            {!currencyItems[0] ? (
                <div className="no-data">За выбранный период данных не найдено</div>
            ) : !currencyItems[2] ? null : (
                <table className="table table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Код</th>
                            {/* <th>Единиц</th> */}
                            <th>Валюта</th>
                            <th className="currency-hcell">
                                Курс<br></br>
                                {currencyDate}*
                            </th>
                            <th className="differense-head-cell" colSpan={2}>
                                Изм от <br></br> {prevCurrencyDate}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {currencyItems.map((i) => (
                            <tr key={i.id}>
                                <td className="">{i.currencyTicker}</td>
                                {/* <td className="">{i.currencyNominal}</td> */}
                                <td className="">
                                    <Link
                                        onClick={() => {
                                            dispatch(setDiagramData(null))
                                            dispatch(
                                                setRequestedCurrency([i.currencyCode, i.currencyTicker, i.currencyName])
                                            )
                                        }}
                                        to={"/Chart"}
                                        className="link"
                                    >
                                        {i.currencyName}
                                    </Link>
                                </td>
                                <td className="currency-cell">{i.currencyPriceToday}</td>
                                {/* )} */}
                                {i.currencyPriceYesterday ? <td className="difference">{i.difference}</td> : <></>}
                                {i.currencyPriceYesterday ? (
                                    <td className="">
                                        {i.currencyPriceYesterday === i.currencyPriceToday ? (
                                            <>-</>
                                        ) : i.currencyPriceYesterday > i.currencyPriceToday ? (
                                            <div className="currency-item-tabular__currency-move-down">▼</div>
                                        ) : (
                                            <div className="currency-item-tabular__currency-move-up">▲</div>
                                        )}
                                    </td>
                                ) : (
                                    <></>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default TabularView
