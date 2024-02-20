function udfReducer (state = initialState, { type, payload }) {
  const udfs = state.get('udfs')

  switch (type) {
    case LOAD_UDFS:
      return state.set('error', false)
    case LOAD_UDFS_SUCCESS:
      return state.set('udfs', payload.udfs)
    case LOAD_PROJECT_UDFS:
      return state.set('error', false)
    case LOAD_PROJECT_UDFS_SUCCESS:
      return state.set('udfs', payload.udfs)
    case LOAD_SINGLE_UDF:
      return state.set('error', false)
    case LOAD_SINGLE_UDF_SUCCESS:
      return state.set('udfs', payload.udf)
    case ADD_UDF:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case ADD_UDF_SUCCESS:
      udfs.unshift(payload.udf)
      return state
        .set('udfs', udfs.slice())
        .set('modalLoading', false)
    case ADD_UDF_ERROR:
      return state.set('modalLoading', false)
    case LOAD_UDF_DETAIL:
      return state
    case LOAD_UDF_DETAIL_SUCCESS:
      return state
    case EDIT_UDF:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case EDIT_UDF_SUCCESS:
      const startIndex = udfs.indexOf(udfs.find(p => Object.is(p.id, payload.udf.id)))
      udfs.fill(payload.udf, startIndex, startIndex + 1)
      return state
        .set('udfs', udfs.slice())
        .set('modalLoading', false)
    case EDIT_UDF_ERROR:
      return state.set('modalLoading', false)
    case DELETE_UDF:
      return state
    case DELETE_UDF_SUCCESS:
      return state.set('udfs', udfs.filter(g => !Object.is(g.id, payload.result)))
    case DELETE_UDF_ERROR:
      return state
    case GET_ERROR:
      return state.set('error', payload.error)
    default:
      return state
  }
}