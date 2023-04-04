import { Chart as Charts } from "chart.js/auto"
import { Line } from "react-chartjs-2"

const Chart = (props) => {
    const labels = props.diagramData ? props.diagramData.map((i) => i[0]) : null
    const priceData = props.diagramData ? props.diagramData.map((i) => i[1]) : null

    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: "rgb(235, 218, 228)",
                data: priceData,
                fill: true,
                tension: 0.1,
                pointBackgroundColor: "rgb(78, 99, 137)",
                pointRadius: 0,
                borderWidth: 2,
                borderColor: "rgb(78, 99, 137)",
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
        },
    }

    return (
        <div className="diagram">
            <div className="currency-title">
                <div className="currency-title__title">{`( ${props.requestedCurrency[1]} ) ${props.requestedCurrency[2]}`}</div>
                <span>Текущий курс - </span>
                <span
                    className={
                        props.diagramData
                            ? props.diagramData[props.diagramData.length - 1][1] >
                              props.diagramData[props.diagramData.length - 2][1]
                                ? "currency-title__price currency-title__price_up"
                                : "currency-title__price currency-title__price_down"
                            : null
                    }
                >
                    {props.diagramData ? props.diagramData[props.diagramData.length - 1][1] : null}
                </span>
            </div>
            <div className="chart-container">{props.diagramData ? <Line data={data} options={options} /> : null}</div>
        </div>
    )
}
export default Chart
