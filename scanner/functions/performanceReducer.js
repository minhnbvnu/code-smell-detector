function performanceReducer (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_PERFORMANCES:
      return state
    case LOAD_PERFORMANCES_SUCCESS:
      return state.set('performances', payload.performances)
    default:
      return state
  }
}