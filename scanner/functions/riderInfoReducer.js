function riderInfoReducer (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_RIDERINFOS:
      return state
    case LOAD_RIDERINFOS_SUCCESS:
      return state.set('riderInfos', payload.riderInfos)
    default:
      return state
  }
}