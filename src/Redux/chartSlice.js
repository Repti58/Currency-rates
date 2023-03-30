import { createSlice } from "@reduxjs/toolkit"

const chartSlice = createSlice({
    name: "ChartSlice",
    initialState: {
        diagramData: undefined,
        diagramRangeReady: true,
        selectedRange: "month",
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
    },
})

export default chartSlice.reducer
export const { setDiagramData, setDiagramRangeReady, setSelectedRange } = chartSlice.actions
