function databaseReducer (state = initialState, { type, payload }) {
  const databases = state.get('databases')

  switch (type) {
    case LOAD_DATABASES:
      return state.set('error', false)
    case LOAD_DATABASES_SUCCESS:
      return state.set('databases', payload.databases)
    case ADD_DATABASE:
      return state.set('modalLoading', true)
    case ADD_DATABASE_SUCCESS:
      databases.unshift(payload.result)
      return state
        .set('databases', databases.slice())
        .set('modalLoading', false)
    case ADD_DATABASE_ERROR:
      return state.set('modalLoading', false)
    case LOAD_SINGLE_DATABASE:
      return state.set('error', false)
    case LOAD_SINGLE_DATABASE_SUCCESS:
      return state
    case EDIT_DATABASE:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case EDIT_DATABASE_SUCCESS:
      const startIndex = databases.indexOf(databases.find(p => Object.is(p.id, payload.result.id)))
      databases.fill(payload.result, startIndex, startIndex + 1)
      return state
        .set('databases', databases.slice())
        .set('modalLoading', false)
    case EDIT_DATABASE_ERROR:
      return state.set('modalLoading', false)
    case LOAD_DATABASES_INSTANCE:
      return state
    case LOAD_DATABASES_INSTANCE_SUCCESS:
      return state.set('dbUrlValue', payload.result)
    case DELETE_DB:
      return state
    case DELETE_DB_SUCCESS:
      return state.set('databases', databases.filter(g => !Object.is(g.id, payload.result)))
    case DELETE_DB_ERROR:
      return state
    case GET_ERROR:
      return state.set('error', payload.error)
    default:
      return state
  }
}