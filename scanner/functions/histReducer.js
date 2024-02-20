function histReducer(state, action) {
    switch (action.type) {
        case "setYear":
            return { ...state, year: action.payload }
        case "setQuarter":
            return { ...state, quarter: action.payload }
        default:
            throw new Error()
    }
}