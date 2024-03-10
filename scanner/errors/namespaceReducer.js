function namespaceReducer (state = initialState, { type, payload }) {
  const namespaces = state.get('namespaces')
  switch (type) {
    case LOAD_ADMIN_ALL_NAMESPACES:
      return state.set('error', false)
    case LOAD_ADMIN_ALL_NAMESPACES_SUCCESS:
      return state.set('namespaces', payload.namespaces)
    case LOAD_USER_NAMESPACES:
      return state.set('error', false)
    case LOAD_USER_NAMESPACES_SUCCESS:
      return state.set('namespaces', payload.namespaces)
    case LOAD_SELECT_NAMESPACES:
      return state
    case LOAD_SELECT_NAMESPACES_SUCCESS:
      return state.set('namespaces', payload.namespaces)
    case LOAD_NAMESPACE_DATABASE:
      return state
    case LOAD_NAMESPACE_DATABASE_SUCCESS:
      return state
    case LOAD_TABLE_NAME_EXIST:
      return state.set('tableNameExited', false)
    case LOAD_TABLE_NAME_EXIST_SUCCESS:
      return state.set('tableNameExited', false)
    case LOAD_TABLE_NAME_EXIST_ERROR:
      return state.set('tableNameExited', true)
    case ADD_NAMESPACE:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case ADD_NAMESPACE_SUCCESS:
      for (let i = 0; i < payload.result.length; i++) {
        namespaces.unshift(payload.result[i])
      }
      return state
        .set('namespaces', namespaces.slice())
        .set('modalLoading', false)
    case LOAD_SINGLE_NAMESPACE:
      return state
    case LOAD_SINGLE_NAMESPACE_SUCCESS:
      return state
    case EDIT_NAMESPACE:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case EDIT_NAMESPACE_SUCCESS:
      const startIndex = namespaces.indexOf(namespaces.find(p => Object.is(p.id, payload.result.id)))
      namespaces.fill(payload.result, startIndex, startIndex + 1)
      return state
        .set('namespaces', namespaces.slice())
        .set('modalLoading', false)
    case LOAD_PROJECT_NS_ALL:
      return state.set('error', false)
    case LOAD_PROJECT_NS_ALL_SUCCESS:
      return state.set('namespaces', payload.result)
    case SET_SCHEMA:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case SET_SCHEMA_SUCCESS:
      return state.set('modalLoading', false)
    case QUERY_SCHEMA_CONFIG:
      return state.set('error', false)
    case QUERY_SCHEMA_CONFIG_SUCCESS:
      return state
    case DELETE_NS:
      return state
    case DELETE_NS_SUCCESS:
      return state.set('namespaces', namespaces.filter(g => !Object.is(g.id, payload.result)))
    case DELETE_NS_ERROR:
      return state
    case GET_ERROR:
      return state.set('error', payload.error)
    default:
      return state
  }
}