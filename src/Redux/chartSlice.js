import { createSlice } from "@reduxjs/toolkit"

const chartSlice = createSlice({
    name: "ChartSlice",
    initialState: {
        diagramData: undefined,
        diagramRangeReady: true,
        selectedRange: "month",
        requestedCurrency: ["R01235", "USD", "Доллар США"]
    },

    reducers: {
        setDiagramData(state, action) {
            state.diagramData = []
            state.diagramData = action.payload
        },

        setDiagramRangeReady(state, action) {
            state.diagramRangeReady = action.payload
        },

        setSelectedRange(state, action) {
            state.selectedRange = action.payload
        },

        setRequestedCurrency(state, action) {            
            state.requestedCurrency = action.payload
        }
    },
})

export default chartSlice.reducer
export const { setDiagramData, setDiagramRangeReady, setSelectedRange, setRequestedCurrency } = chartSlice.actions
