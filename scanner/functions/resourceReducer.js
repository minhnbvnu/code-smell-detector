function resourceReducer (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_RESOURCES:
      return state
    case LOAD_RESOURCES_SUCCESS:
      return state.set('resources', payload.resources)
    default:
      return state
  }
}